import React, { useState, useEffect, useRef } from 'react';
import { searchFeeTypes, createUCDCompliantFee } from '../../utils/feeTypeService';
import type { FeeType } from '../../utils/feeTypeService';

interface FeeAutocompleteProps {
  value: string;
  onChange: (value: string, ucdData?: any) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  'data-schema-key'?: string;
  documentMode?: boolean; // For light theme in CD pages
}

export const FeeAutocomplete: React.FC<FeeAutocompleteProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = 'Enter fee description',
  className = '',
  name,
  'data-schema-key': dataSchemaKey,
  documentMode = false,
}) => {
  const [localValue, setLocalValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState<FeeType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Search for suggestions when value changes
  useEffect(() => {
    if (localValue && localValue.length >= 2) {
      const results = searchFeeTypes(localValue);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [localValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleSuggestionClick = (suggestion: FeeType) => {
    const ucdData = createUCDCompliantFee(localValue, suggestion);
    setLocalValue(suggestion.label);
    onChange(suggestion.label, ucdData);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleBlur = () => {
    // Delay blur to allow click on suggestion
    setTimeout(() => {
      setShowSuggestions(false);
      if (onBlur) onBlur();
    }, 200);
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => localValue.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
        placeholder={placeholder}
        className={documentMode 
          ? `w-full px-2 py-1 bg-white text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`
          : `w-full px-2 py-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`
        }
        name={name}
        data-schema-key={dataSchemaKey}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto ${
          documentMode 
            ? 'bg-white border border-gray-300' 
            : 'bg-gray-800 border border-gray-600'
        }`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.key}
              className={`px-3 py-2 cursor-pointer ${
                index === selectedIndex 
                  ? 'bg-blue-600 text-white' 
                  : documentMode
                    ? 'text-gray-900 hover:bg-gray-100'
                    : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="font-medium">{suggestion.label}</div>
              {suggestion.section && (
                <div className="text-xs opacity-75">Section {suggestion.section}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};