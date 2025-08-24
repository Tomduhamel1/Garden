import React, { useState, useEffect } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

interface FieldStatus {
  path: string;
  label: string;
  required: boolean;
  hasValue: boolean;
  value?: any;
}

interface SectionStatus {
  name: string;
  totalFields: number;
  completedFields: number;
  fields: FieldStatus[];
  percentage: number;
}

const ClosingDisclosureInspector: React.FC = () => {
  const { getValue } = useOrderData();
  const [sections, setSections] = useState<SectionStatus[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [refreshKey, setRefreshKey] = useState(0);

  // Define all UCD required fields by section
  const sectionDefinitions = {
    'Section A - Origination Charges': {
      basePath: 'cdfData.origination_charges',
      lines: 7,
      fields: ['description', 'payee_name', 'paid_by_borrower', 'paid_before_closing', 'paid_by_seller', 'paid_by_others', 'is_optional', 'not_required']
    },
    'Section B - Cannot Shop For': {
      basePath: 'cdfData.services_borrower_did_not_shop_for', 
      lines: 5,
      fields: ['description', 'payee_name', 'paid_by_borrower', 'paid_by_seller', 'paid_by_others', 'paid_before_closing']
    },
    'Section C - Can Shop For': {
      basePath: 'cdfData.services_borrower_did_shop_for',
      lines: 8, 
      fields: ['description', 'payee_name', 'paid_by_borrower', 'paid_by_seller', 'paid_by_others', 'paid_before_closing']
    },
    'Section E - Government Fees': {
      basePath: 'cdfData.taxes_and_government_fees',
      lines: 4,
      fields: ['description', 'payee_name', 'paid_by_borrower', 'paid_before_closing', 'paid_by_seller', 'paid_by_others', 'is_optional', 'not_required']
    },
    'Section F - Prepaids': {
      basePath: 'cdfData.prepaid_item_information',
      lines: 5,
      fields: ['description', 'paid_by_borrower', 'paid_by_seller', 'paid_before_closing', 'number_of_months']
    },
    'Section G - Escrow': {
      basePath: 'cdfData.escrow_information', 
      lines: 7,
      fields: ['description', 'paid_by_borrower', 'paid_by_seller', 'paid_before_closing', 'number_of_months']
    },
    'Section H - Other': {
      basePath: 'cdfData.other_charges',
      lines: 5,
      fields: ['description', 'payee_name', 'paid_by_borrower', 'paid_by_seller', 'paid_by_others', 'paid_before_closing']
    },
    'Section K - Borrower Credits': {
      basePath: 'cdfData.borrower_credit_information',
      lines: 5,
      fields: ['description', 'amount']
    },
    'Section L - Borrower Debits': {
      basePath: 'cdfData.borrower_debit_information', 
      lines: 4,
      fields: ['description', 'amount']
    },
    'Section M - Seller Credits': {
      basePath: 'cdfData.seller_credit_information',
      lines: 5,
      fields: ['description', 'amount']
    },
    'Section N - Seller Debits': {
      basePath: 'cdfData.seller_debit_information',
      lines: 5, 
      fields: ['description', 'amount']
    }
  };

  const calculateSectionStatus = (sectionName: string, definition: any): SectionStatus => {
    const fields: FieldStatus[] = [];
    
    for (let line = 1; line <= definition.lines; line++) {
      const lineKey = `line_${line.toString().padStart(2, '0')}`;
      
      definition.fields.forEach((fieldName: string) => {
        const path = `${definition.basePath}.${lineKey}.${fieldName}`;
        const value = getValue(path);
        const hasValue = value !== undefined && value !== null && value !== '';
        
        fields.push({
          path,
          label: `${lineKey}.${fieldName}`,
          required: true,
          hasValue,
          value
        });
      });
    }

    const completedFields = fields.filter(f => f.hasValue).length;
    const totalFields = fields.length;
    const percentage = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

    return {
      name: sectionName,
      totalFields,
      completedFields, 
      fields,
      percentage
    };
  };

  useEffect(() => {
    const newSections = Object.entries(sectionDefinitions).map(([name, definition]) => 
      calculateSectionStatus(name, definition)
    );
    
    setSections(newSections);
  }, [refreshKey, getValue]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionName)) {
        newSet.delete(sectionName);
      } else {
        newSet.add(sectionName);
      }
      return newSet;
    });
  };

  const totalFields = sections.reduce((sum, section) => sum + section.totalFields, 0);
  const totalCompleted = sections.reduce((sum, section) => sum + section.completedFields, 0);
  const overallPercentage = totalFields > 0 ? Math.round((totalCompleted / totalFields) * 100) : 0;

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    if (percentage >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';  
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-chart-line text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Closing Disclosure Field Inspector</h2>
            <span className={`px-2 py-1 rounded text-xs font-medium ${overallPercentage >= 90 ? 'bg-green-600' : overallPercentage >= 70 ? 'bg-yellow-600' : 'bg-red-600'}`}>
              {overallPercentage}% Complete
            </span>
          </div>
          <button
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
          >
            <i className="fa fa-refresh"></i>
            Refresh
          </button>
        </section>

        {/* Inspector Content */}
        <section className="px-10 py-8">
          {/* Overall Status */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Overall UCD Compliance Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getStatusColor(overallPercentage)}`}>
                  {overallPercentage}%
                </div>
                <div className="text-gray-400 text-sm">Overall Completion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {totalCompleted}/{totalFields}
                </div>
                <div className="text-gray-400 text-sm">Fields Complete</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {sections.length}
                </div>
                <div className="text-gray-400 text-sm">Sections Tracked</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${getProgressColor(overallPercentage)} transition-all duration-300`}
                  style={{ width: `${overallPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Section Breakdown */}
          <div className="space-y-4">
            {sections.map(section => (
              <div key={section.name} className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-750 flex items-center justify-between"
                  onClick={() => toggleSection(section.name)}
                >
                  <div className="flex items-center gap-4">
                    <i className={`fa ${expandedSections.has(section.name) ? 'fa-chevron-down' : 'fa-chevron-right'} text-gray-400`}></i>
                    <h4 className="font-semibold text-white">{section.name}</h4>
                    <span className={`text-sm font-medium ${getStatusColor(section.percentage)}`}>
                      {section.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      {section.completedFields}/{section.totalFields} fields
                    </span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(section.percentage)} transition-all duration-300`}
                        style={{ width: `${section.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {expandedSections.has(section.name) && (
                  <div className="border-t border-gray-600 p-4 bg-gray-850">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                      {section.fields.map(field => (
                        <div 
                          key={field.path}
                          className={`flex items-center gap-2 p-2 rounded ${field.hasValue ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'}`}
                        >
                          <i className={`fa ${field.hasValue ? 'fa-check-circle text-green-400' : 'fa-times-circle text-red-400'} text-xs`}></i>
                          <span className="font-mono truncate">{field.label}</span>
                          {field.hasValue && field.value && (
                            <span className="text-gray-400 ml-auto truncate max-w-20">
                              {String(field.value).slice(0, 15)}...
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 p-4 bg-gray-800 border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Status Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-green-400">90%+ Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-yellow-400">70-89% Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-orange-400">50-69% Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-red-400">Below 50%</span>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        {/* Quick Stats */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-tachometer-alt text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Quick Stats</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Fields:</span>
              <span className="text-white">{totalFields}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Completed:</span>
              <span className="text-green-400">{totalCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Remaining:</span>
              <span className="text-red-400">{totalFields - totalCompleted}</span>
            </div>
          </div>
        </section>

        {/* Section Summary */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-list text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Section Summary</h4>
          </div>
          <div className="space-y-1 text-xs max-h-64 overflow-y-auto">
            {sections.map(section => (
              <div key={section.name} className="flex justify-between items-center p-1">
                <span className="text-gray-300 truncate text-xs">{section.name.replace('Section ', '')}</span>
                <span className={`text-xs font-medium ${getStatusColor(section.percentage)}`}>
                  {section.percentage}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* UCD Compliance Notes */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-info-circle text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">UCD Notes</h4>
          </div>
          <div className="text-xs text-gray-400 space-y-2">
            <p>This inspector tracks field completion for TRID/UCD compliance.</p>
            <p>Target: 100% field coverage for full UCD compliance.</p>
          </div>
        </section>
      </section>
    </>
  );
};

export default ClosingDisclosureInspector;