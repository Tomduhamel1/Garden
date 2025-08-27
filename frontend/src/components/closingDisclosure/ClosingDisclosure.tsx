import React, { useState, useEffect } from 'react';
import CDPage1 from './CDPage1';
import CDPage2 from './CDPage2';
import CDPage3 from './CDPage3';
import CDPage4 from './CDPage4';
import CDPage5 from './CDPage5';
import { getFieldTypeByUCD } from '../../utils/cdFieldTypes';

const ClosingDisclosureContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCoverageStats, setShowCoverageStats] = useState(true);
  const [selectedField, setSelectedField] = useState<any>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <CDPage1 />;
      case 2:
        return <CDPage2 />;
      case 3:
        return <CDPage3 cdfData={{}} />;
      case 4:
        return <CDPage4 cdfData={{}} />;
      case 5:
        return <CDPage5 cdfData={{}} />;
      default:
        return <CDPage1 />;
    }
  };

  // Calculate coverage stats (will be dynamic based on actual field mappings)
  const calculateCoverage = () => {
    // This will eventually query all CDField components to get real stats
    const totalFields = 450; // Approximate total CD fields
    const mappedToSchema = 287; // Fields with UCD/Qualia mapping
    const mappedToGui = 156; // Fields with GUI component mapping
    const fullyMapped = 142; // Fields with both

    return {
      total: totalFields,
      schemaPercent: Math.round((mappedToSchema / totalFields) * 100),
      guiPercent: Math.round((mappedToGui / totalFields) * 100),
      fullPercent: Math.round((fullyMapped / totalFields) * 100),
      mappedToSchema,
      mappedToGui,
      fullyMapped
    };
  };

  const coverage = calculateCoverage();

  // Listen for field selection events
  useEffect(() => {
    const handleFieldSelected = (event: CustomEvent) => {
      setSelectedField(event.detail);
    };

    window.addEventListener('field-selected', handleFieldSelected as EventListener);
    return () => {
      window.removeEventListener('field-selected', handleFieldSelected as EventListener);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Sidebar - Navigation and Coverage Stats */}
      <section className="w-72 bg-gray-800 border-r border-gray-600 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <i className="fa fa-file-text"></i>
            Closing Disclosure
          </h2>

          {/* Page Navigation */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">PAGES</h3>
            <div className="space-y-1">
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Page {page}: {
                    page === 1 ? 'Loan Terms' :
                    page === 2 ? 'Loan Costs' :
                    page === 3 ? 'Cash to Close' :
                    page === 4 ? 'Additional Info' :
                    'Loan Calculations'
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Coverage Statistics */}
          {showCoverageStats && (
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Field Coverage</h3>
                <button
                  onClick={() => setShowCoverageStats(!showCoverageStats)}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>

              <div className="space-y-3">
                {/* Schema Mapping Coverage */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span> Schema Mapped
                    </span>
                    <span>{coverage.schemaPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${coverage.schemaPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {coverage.mappedToSchema} of {coverage.total} fields
                  </div>
                </div>

                {/* GUI Component Coverage */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span> GUI Components
                    </span>
                    <span>{coverage.guiPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${coverage.guiPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {coverage.mappedToGui} of {coverage.total} fields
                  </div>
                </div>

                {/* Full Coverage */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓✓</span> Fully Mapped
                    </span>
                    <span>{coverage.fullPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${coverage.fullPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {coverage.fullyMapped} of {coverage.total} fields
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 pt-3 border-t border-gray-700">
                <div className="text-xs text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Has schema mapping (UCD/Qualia)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Has GUI component field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⚠</span>
                    <span>Missing mapping</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-3 bg-gray-900 rounded text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-2">How to Use</p>
            <ul className="space-y-1">
              <li>• <strong className="text-white">Click any field value</strong> to edit it</li>
              <li>• <strong className="text-white">Hover</strong> to see yellow highlight</li>
              <li>• <strong className="text-white">Enter</strong> saves, <strong className="text-white">Esc</strong> cancels</li>
              <li>• Field info appears in right panel</li>
              <li>• Changes save to database automatically</li>
            </ul>
          </div>
          
          {/* Coverage Legend */}
          <div className="mt-4 p-3 bg-gray-900 rounded text-xs">
            <p className="font-semibold text-gray-300 mb-2">Coverage Dots</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-green-500" style={{fontSize: '8px'}}>●</span>
                <span className="text-gray-400">Has schema mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500" style={{fontSize: '8px'}}>●</span>
                <span className="text-gray-400">Has GUI component</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500" style={{fontSize: '8px'}}>●</span>
                <span className="text-gray-400">Missing mapping</span>
              </div>
            </div>
          </div>
          
          {/* Usage Tips */}
          <div className="mt-4 p-3 bg-blue-900 rounded text-xs text-blue-200">
            <p className="font-semibold mb-2">🎯 Try It Now</p>
            <p>Hover over "Purchase" in the Loan Information section, then click it to edit. Watch the right panel for field details!</p>
          </div>
        </div>
      </section>

      {/* Main Content - CD Form */}
      <section className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="py-8">
          {renderPage()}
        </div>
      </section>

      {/* Right Rail - Field Inspector */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <h3 className="text-white text-sm font-semibold mb-4">Field Inspector</h3>
        
        {selectedField ? (
          <div className="space-y-4">
            {/* Field Information */}
            <div className="bg-gray-700 rounded p-3">
              <h4 className="text-white text-xs font-semibold mb-2">Selected Field</h4>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-gray-400">Field ID:</span>
                  <div className="text-white font-mono text-xs bg-gray-800 p-1 rounded mt-1">
                    {selectedField.fieldId}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Current Value:</span>
                  <div className="text-white font-mono text-xs bg-gray-800 p-1 rounded mt-1">
                    {selectedField.value || '(empty)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Schema Mappings */}
            <div className="bg-gray-700 rounded p-3">
              <h4 className="text-white text-xs font-semibold mb-2">Schema Mappings</h4>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-gray-400">Schema Key:</span>
                  <div className="text-green-400 font-mono text-xs bg-gray-800 p-1 rounded mt-1">
                    {selectedField.schemaKey}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">UCD Mapping:</span>
                  <div className={`font-mono text-xs p-1 rounded mt-1 ${
                    selectedField.mappings?.ucd 
                      ? 'text-blue-400 bg-gray-800' 
                      : selectedField.mappings?.ucd === null 
                        ? 'text-yellow-400 bg-yellow-900/20'
                        : 'text-red-400 bg-red-900/20'
                  }`}>
                    {selectedField.mappings?.ucd || 
                     (selectedField.mappings?.ucd === null ? 'NOT IN UCD (CD form only)' : 'Not mapped')}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">Qualia Mapping:</span>
                  <div className={`font-mono text-xs p-1 rounded mt-1 ${selectedField.mappings?.qualia ? 'text-purple-400 bg-gray-800' : 'text-red-400 bg-red-900/20'}`}>
                    {selectedField.mappings?.qualia || 'Not mapped'}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">GUI Component:</span>
                  <div className={`font-mono text-xs p-1 rounded mt-1 ${selectedField.mappings?.gui ? 'text-cyan-400 bg-gray-800' : 'text-red-400 bg-red-900/20'}`}>
                    {selectedField.mappings?.gui || 'Not mapped'}
                  </div>
                </div>
              </div>
            </div>

            {/* Field Type Information */}
            <div className="bg-gray-700 rounded p-3">
              <h4 className="text-white text-xs font-semibold mb-2">Field Type Information</h4>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-gray-400">Current Type Being Used:</span>
                  <div className="text-yellow-400 font-mono text-xs bg-gray-800 p-1 rounded mt-1">
                    {selectedField.currentType || 'text'}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">UCD Required Type:</span>
                  <div className={`font-mono text-xs p-1 rounded mt-1 ${
                    selectedField.mappings?.ucd === null 
                      ? 'text-yellow-400 bg-yellow-900/20' 
                      : 'text-green-400 bg-gray-800'
                  }`}>
                    {(() => {
                      if (selectedField.mappings?.ucd === null) {
                        return 'N/A - Not a UCD field';
                      }
                      const ucdType = selectedField.mappings?.ucd ? getFieldTypeByUCD(selectedField.mappings.ucd) : null;
                      if (ucdType) {
                        return `${ucdType.ucdType} (${ucdType.inputType})`;
                      }
                      if (selectedField.mappings?.ucd) {
                        // Field has UCD mapping but no type definition
                        return 'Not defined in UCD spec';
                      }
                      return 'No UCD mapping';
                    })()}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">Qualia Type:</span>
                  <div className="text-purple-400 font-mono text-xs bg-gray-800 p-1 rounded mt-1">
                    {(() => {
                      // Infer Qualia type from field name
                      const qualiaField = selectedField.mappings?.qualia;
                      if (!qualiaField) return 'Not mapped';
                      
                      if (qualiaField.includes('amount') || qualiaField.includes('price') || qualiaField.includes('fee')) {
                        return 'number (currency)';
                      } else if (qualiaField.includes('rate') || qualiaField.includes('percent')) {
                        return 'number (percentage)';
                      } else if (qualiaField.includes('date')) {
                        return 'date';
                      } else if (qualiaField === 'loan.type' || qualiaField === 'loan.purpose' || qualiaField === 'loan.product') {
                        return 'string (enum)';
                      } else {
                        return 'string';
                      }
                    })()}
                  </div>
                </div>
                
                {selectedField.fieldTypeDef?.enumValues && (
                  <div>
                    <span className="text-gray-400">Allowed Values:</span>
                    <div className="text-cyan-400 font-mono text-xs bg-gray-800 p-1 rounded mt-1">
                      {selectedField.fieldTypeDef.enumValues.map(v => v.value).join(', ')}
                    </div>
                  </div>
                )}
                
                {selectedField.fieldTypeDef?.validation && (
                  <div>
                    <span className="text-gray-400">Validation Rules:</span>
                    <div className="text-orange-400 font-mono text-xs bg-gray-800 p-1 rounded mt-1">
                      {Object.entries(selectedField.fieldTypeDef.validation)
                        .filter(([_, value]) => value !== undefined)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Coverage Status */}
            <div className="bg-gray-700 rounded p-3">
              <h4 className="text-white text-xs font-semibold mb-2">Coverage Status</h4>
              <div className="flex items-center gap-2 text-xs">
                {selectedField.mappings?.ucd && <span className="text-green-500">● Schema</span>}
                {selectedField.mappings?.gui && <span className="text-blue-500">● GUI</span>}
                {!selectedField.mappings?.ucd && !selectedField.mappings?.gui && <span className="text-red-500">● Missing</span>}
              </div>
              
              {/* Type Compliance Status */}
              <div className="mt-2 pt-2 border-t border-gray-600">
                <div className="text-xs">
                  <span className="text-gray-400">UCD Compliance: </span>
                  {(() => {
                    if (selectedField.mappings?.ucd === null) {
                      return <span className="text-gray-500">N/A - Not a UCD field</span>;
                    }
                    const ucdType = selectedField.mappings?.ucd ? getFieldTypeByUCD(selectedField.mappings.ucd) : null;
                    if (!ucdType) {
                      return <span className="text-yellow-400">⚠ No UCD type definition</span>;
                    }
                    const isCompliant = selectedField.currentType === ucdType.inputType;
                    return isCompliant ? 
                      <span className="text-green-400">✓ UCD Compliant</span> : 
                      <span className="text-red-400">✗ UCD Non-compliant</span>;
                  })()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-700 rounded p-3 text-xs text-gray-400">
            <p className="mb-2">Click on any field to see:</p>
            <ul className="space-y-1">
              <li>• Field ID and current value</li>
              <li>• Schema key mapping</li>
              <li>• UCD/MISMO type requirements</li>
              <li>• Qualia type expectations</li>
              <li>• Current type being used</li>
              <li>• Validation rules and allowed values</li>
              <li>• Type compliance status</li>
            </ul>
            <div className="mt-3 p-2 bg-blue-900/30 rounded">
              <p className="text-blue-300 text-xs">💡 Try clicking on "Purchase" in the Loan Information section</p>
            </div>
          </div>
        )}

        <div className="mt-6 p-3 bg-gray-900 rounded">
          <div className="text-xs text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Current Page:</span>
              <span className="text-white">Page {currentPage}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Fields on Page:</span>
              <span className="text-white">47+</span>
            </div>
            <div className="flex justify-between">
              <span>Interactive:</span>
              <span className="text-green-400">100%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// No longer need to wrap with OrderDataProvider as AppShell provides it
const ClosingDisclosure: React.FC = ClosingDisclosureContent;

export default ClosingDisclosure;