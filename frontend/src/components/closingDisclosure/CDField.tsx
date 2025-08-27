import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { getFieldTypeByUCD, validateFieldValue, formatFieldInput } from '../../utils/cdFieldTypes';
import type { FieldTypeDefinition } from '../../utils/cdFieldTypes';

interface FieldMapping {
  ucd?: string;      // UCD/MISMO field name
  qualia?: string;   // Qualia field name
  custom?: string;   // Our custom field name
  gui?: string;      // Path to GUI component field
}

interface CDFieldProps {
  value?: string | number;
  fieldId: string;
  schemaKey: string;
  label?: string;
  type?: 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'select';
  readOnly?: boolean;
  mappings?: FieldMapping;
  className?: string;
  options?: { value: string; label: string }[];
  format?: 'currency' | 'percentage' | 'date';
  placeholder?: string;
  section?: string; // For tracking which CD section this belongs to
  documentMode?: boolean; // For seamless document integration
  style?: React.CSSProperties; // Allow inline styles
  getValue?: (path: string) => any; // Pass from parent
  handleFieldChange?: (path: string, value: any) => void; // Pass from parent
}

const CDField: React.FC<CDFieldProps> = ({
  value: initialValue,
  fieldId,
  schemaKey,
  label,
  type: providedType,
  readOnly = false,
  mappings = {},
  className = '',
  options: providedOptions,
  format: providedFormat,
  placeholder,
  section,
  documentMode = false,
  style = {},
  getValue: getValueProp,
  handleFieldChange: handleFieldChangeProp
}) => {
  // Use props directly - context will be provided by wrapper if needed
  const getValue = getValueProp;
  const handleFieldChange = handleFieldChangeProp;
  
  // Determine field type from UCD mapping
  const fieldTypeDef: FieldTypeDefinition | undefined = useMemo(() => {
    if (mappings.ucd) {
      return getFieldTypeByUCD(mappings.ucd);
    }
    return undefined;
  }, [mappings.ucd]);
  
  // Use schema-defined type or fall back to provided type
  const type = fieldTypeDef?.inputType || providedType || 'text';
  const format = fieldTypeDef?.format || providedFormat;
  const options = fieldTypeDef?.enumValues || providedOptions || [];
  
  const [isEditing, setIsEditing] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [localValue, setLocalValue] = useState(() => {
    const dbValue = getValue ? getValue(schemaKey) : '';
    return initialValue || dbValue || '';
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  // Check coverage status
  const hasSchemaMapping = !!(mappings.ucd || mappings.qualia || mappings.custom);
  const hasGuiField = !!mappings.gui;
  const isFullyMapped = hasSchemaMapping && hasGuiField;

  useEffect(() => {
    if (getValue && !isEditing) {
      const dbValue = getValue(schemaKey);
      if (dbValue !== undefined && dbValue !== localValue) {
        setLocalValue(dbValue);
      }
    }
  }, [schemaKey]); // Only depend on schemaKey, not isEditing or getValue

  const formatValue = (val: string | number): string => {
    if (!val) return '';
    
    switch (format) {
      case 'currency':
        const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]/g, '')) : val;
        return isNaN(num) ? '' : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(num);
      
      case 'percentage':
        const pct = typeof val === 'string' ? parseFloat(val.replace('%', '')) : val;
        return isNaN(pct) ? '' : `${pct.toFixed(3)}%`;
      
      case 'date':
        if (val instanceof Date) {
          return val.toISOString().split('T')[0];
        }
        return String(val);
      
      default:
        return String(val);
    }
  };

  const parseValue = (val: string): string | number => {
    switch (format) {
      case 'currency':
        const num = parseFloat(val.replace(/[^0-9.-]/g, ''));
        return isNaN(num) ? 0 : num;
      
      case 'percentage':
        const pct = parseFloat(val.replace('%', ''));
        return isNaN(pct) ? 0 : pct;
      
      default:
        return val;
    }
  };

  const handleEdit = () => {
    if (!readOnly) {
      setIsEditing(true);
      
      // Notify parent about field selection for right column
      window.dispatchEvent(new CustomEvent('field-selected', {
        detail: {
          fieldId,
          schemaKey,
          mappings,
          value: localValue,
          currentType: type,
          fieldTypeDef
        }
      }));
      
      setTimeout(() => {
        inputRef.current?.focus();
        // Select all text for easier editing
        if (inputRef.current && 'select' in inputRef.current) {
          (inputRef.current as HTMLInputElement).select();
        }
      }, 0);
    }
  };

  const handleSave = () => {
    const parsedValue = parseValue(String(localValue));
    
    // Validate before saving
    if (fieldTypeDef && !validateFieldValue(parsedValue, fieldTypeDef)) {
      setValidationError('Invalid value for field type');
      return;
    }
    
    // Use handleFieldChange which expects (fieldPath, value)
    if (handleFieldChange && schemaKey) {
      try {
        handleFieldChange(schemaKey, parsedValue);
      } catch (error) {
        console.error('Error saving field:', error);
      }
    }
    
    setIsEditing(false);
    setValidationError(null);
  };

  const handleCancel = () => {
    setLocalValue(getValue ? getValue(schemaKey) : initialValue || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const renderIndicators = () => {
    // In document mode, show tiny dots that are more visible
    if (documentMode) {
      return (
        <span 
          className="inline-flex gap-1 ml-1" 
          style={{ 
            verticalAlign: 'super', 
            fontSize: '6px',
            lineHeight: '1'
          }}
        >
          {hasSchemaMapping && (
            <span 
              className="text-green-600" 
              title="Has schema mapping"
              style={{ fontSize: '8px' }}
            >
              ●
            </span>
          )}
          {hasGuiField && (
            <span 
              className="text-blue-600" 
              title="Has GUI component"
              style={{ fontSize: '8px' }}
            >
              ●
            </span>
          )}
          {!hasSchemaMapping && !hasGuiField && (
            <span 
              className="text-red-500" 
              title="Missing mapping"
              style={{ fontSize: '8px' }}
            >
              ●
            </span>
          )}
        </span>
      );
    }

    return (
      <div className="flex items-center gap-1 ml-1">
        {/* Schema mapping indicator */}
        {hasSchemaMapping && (
          <span 
            className="text-green-500 text-xs"
            title={`Mapped: ${mappings.ucd ? `UCD: ${mappings.ucd}` : ''} ${mappings.qualia ? `Qualia: ${mappings.qualia}` : ''} ${mappings.custom ? `Custom: ${mappings.custom}` : ''}`}
          >
            ✓
          </span>
        )}
        
        {/* GUI field indicator */}
        {hasGuiField && (
          <span 
            className="text-green-500 text-xs"
            title={`GUI: ${mappings.gui}`}
          >
            ✓
          </span>
        )}
        
        {/* Warning if no mapping */}
        {!hasSchemaMapping && (
          <span 
            className="text-yellow-500 text-xs"
            title="No schema mapping defined"
          >
            ⚠
          </span>
        )}
      </div>
    );
  };

  const renderField = () => {
    if (!isEditing) {
      // Document mode: minimal styling, looks like printed text
      if (documentMode) {
        return (
          <span 
            className={`inline-block ${!readOnly ? 'cursor-pointer hover:bg-yellow-50' : ''} ${className}`}
            onClick={handleEdit}
            onMouseEnter={(e) => {
              if (!readOnly) {
                e.currentTarget.style.borderBottomColor = '#0066cc';
                e.currentTarget.style.backgroundColor = '#fff8dc';
              }
            }}
            onMouseLeave={(e) => {
              if (!readOnly) {
                e.currentTarget.style.borderBottomColor = 'transparent';
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
            style={{
              ...style,
              borderBottom: !readOnly ? '1px dotted transparent' : 'none',
              transition: 'all 0.2s',
              ...(!!localValue ? {} : { color: '#999', fontStyle: 'italic' }),
              position: 'relative'
            }}
          >
            {formatValue(localValue) || placeholder || '—'}
            {renderIndicators()}
          </span>
        );
      }

      // Regular mode: more visible editing affordances
      return (
        <div 
          className={`inline-flex items-center ${!readOnly ? 'cursor-pointer hover:bg-gray-100' : ''} px-1 py-0.5 rounded ${className}`}
          onClick={handleEdit}
          title="Click to edit"
        >
          <span className={`${!localValue ? 'text-gray-400' : ''}`}>
            {formatValue(localValue) || placeholder || '---'}
          </span>
          {renderIndicators()}
        </div>
      );
    }

    if (type === 'select' && options.length > 0) {
      return (
        <>
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            value={String(localValue)}
            onChange={(e) => {
              setLocalValue(e.target.value);
              setValidationError(null);
            }}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`${documentMode ? 'border-2 border-blue-400 bg-blue-50 rounded-sm px-1 py-0 text-sm font-medium text-black' : `bg-gray-700 text-white border border-blue-500 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`} ${validationError ? 'border-red-500' : ''}`}
            autoFocus
            style={{
              minWidth: '80px',
              outline: 'none',
              ...(documentMode ? {
                fontFamily: 'Arial, sans-serif',
                fontSize: 'inherit',
                lineHeight: 'inherit'
              } : {})
            }}
          >
            <option value="" className={documentMode ? "bg-white text-gray-600" : "bg-gray-800 text-gray-400"}>Select...</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value} className={documentMode ? "bg-white text-black" : "bg-gray-800 text-white"}>{opt.label}</option>
            ))}
          </select>
          {validationError && <span className="text-red-500 text-xs ml-1">{validationError}</span>}
        </>
      );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      
      // Apply input formatting if field type is defined
      if (fieldTypeDef) {
        newValue = formatFieldInput(newValue, fieldTypeDef);
      }
      
      setLocalValue(newValue);
      setValidationError(null);
    };

    const inputType = type === 'currency' || type === 'percentage' ? 'text' : 
                      type === 'date' ? 'text' : // Use text for date to control formatting
                      type === 'number' ? 'number' : 'text';

    return (
      <>
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={inputType}
          value={String(localValue)}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`${documentMode ? 'border-2 border-blue-400 bg-blue-50 rounded-sm px-1 py-0 text-sm font-medium text-black' : `bg-gray-700 text-white border border-blue-500 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`} ${validationError ? 'border-red-500' : ''}`}
          placeholder={placeholder || (type === 'date' ? 'MM/DD/YYYY' : '')}
          autoFocus
          style={{
            minWidth: '60px',
            outline: 'none',
            ...(documentMode ? {
              fontFamily: 'Arial, sans-serif',
              fontSize: 'inherit',
              lineHeight: 'inherit'
            } : {})
          }}
        />
        {validationError && <span className="text-red-500 text-xs ml-1">{validationError}</span>}
      </>
    );
  };

  // In document mode, return just the field without wrapper
  if (documentMode) {
    return renderField();
  }

  // Regular mode with wrapper and metadata
  return (
    <div className="cd-field relative inline-block" data-field-id={fieldId}>
      {label && <span className="mr-2 text-sm font-medium">{label}:</span>}
      {renderField()}
      
      {/* Metadata tooltip on hover */}
      {showMetadata && (
        <div className="absolute z-50 bg-gray-800 text-white text-xs rounded p-2 mt-1 w-64">
          <div><strong>Field ID:</strong> {fieldId}</div>
          <div><strong>Schema Key:</strong> {schemaKey}</div>
          {mappings.ucd && <div><strong>UCD:</strong> {mappings.ucd}</div>}
          {mappings.qualia && <div><strong>Qualia:</strong> {mappings.qualia}</div>}
          {mappings.custom && <div><strong>Custom:</strong> {mappings.custom}</div>}
          {mappings.gui && <div><strong>GUI:</strong> {mappings.gui}</div>}
          <div><strong>Coverage:</strong> {isFullyMapped ? 'Complete ✓✓' : hasSchemaMapping ? 'Partial ✓' : 'Missing ⚠'}</div>
        </div>
      )}
    </div>
  );
};

export default CDField;