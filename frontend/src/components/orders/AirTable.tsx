import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

interface AirTableProps {}

const AirTable: React.FC<AirTableProps> = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const [hasAirTable, setHasAirTable] = useState(false);

  const handleAddAirTable = () => {
    setHasAirTable(true);
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-line-chart text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">AIR Table</h2>
          </div>
          <button
            onClick={saveOrderData}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
          <form className="space-y-8">
            {!hasAirTable ? (
              /* Empty State Section */
              <section>
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-12 text-center">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <i className="fa fa-percent text-gray-400 text-2xl"></i>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">
                        This order does not include Adjustable Interest Rates (AIR)
                      </h3>
                    </div>

                    <button 
                      type="button" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      onClick={handleAddAirTable}
                    >
                      <i className="fa fa-plus text-sm"></i>
                      Add AIR Table
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              /* AIR Table Content - Placeholder for when table is added */
              <section>
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Adjustable Interest Rate Table</h3>
                    <button 
                      type="button" 
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center gap-2"
                      onClick={() => setHasAirTable(false)}
                    >
                      <i className="fa fa-trash text-sm"></i>
                      Remove Table
                    </button>
                  </div>
                  
                  <div className="text-center py-12 text-gray-400">
                    <i className="fa fa-table text-4xl mb-4"></i>
                    <p className="text-lg">AIR Table functionality would be implemented here</p>
                    <p className="text-sm mt-2">This would include rate adjustment periods, index rates, and payment calculations</p>
                  </div>
                </div>
              </section>
            )}
          </form>
          )}
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Chat</h4>
          <p className="text-gray-400 text-xs">Chat functionality</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Tasks</h4>
          <p className="text-gray-400 text-xs">No tasks assigned</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Notes</h4>
          <p className="text-gray-400 text-xs">No notes added</p>
        </section>
      </section>
    </>
  );
};

export default AirTable;