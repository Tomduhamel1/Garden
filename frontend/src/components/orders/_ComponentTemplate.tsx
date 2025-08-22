// Template for wiring components to the schema
// Copy this file and replace "ComponentName" with your component name
// Update the schema paths to match your section

import { useOrderData } from '../../hooks/useOrderData';

export default function ComponentName() {
  const { loading, saving, handleInputChange, handleSave, getValue } = useOrderData();

  if (loading) {
    return (
      <section className="flex-1 bg-gray-900 overflow-y-auto flex items-center justify-center">
        <div className="text-gray-400">
          <i className="fa fa-spinner fa-spin text-4xl"></i>
          <p className="mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Update icon and title */}
            <i className="fa fa-file-text text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Component Title</h2>
          </div>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 border border-green-500 rounded px-3 py-2 text-white text-sm hover:bg-green-700 disabled:bg-gray-600 disabled:border-gray-500"
            >
              <i className={`fa ${saving ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`}></i>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </section>

        <section className="px-10 py-8">
          {/* Example input field - copy and modify as needed */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Field Label</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600"
              data-schema-key="cdf.section.field_name"
              value={getValue('cdf.section.field_name')}
              onChange={handleInputChange}
            />
          </div>

          {/* Example number field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Amount Field</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600"
              data-schema-key="cdf.section.amount_field"
              value={getValue('cdf.section.amount_field')}
              onChange={handleInputChange}
            />
          </div>

          {/* Example select field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Select Field</label>
            <select
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600"
              data-schema-key="cdf.section.select_field"
              value={getValue('cdf.section.select_field')}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>

          {/* Example checkbox */}
          <div className="mb-4">
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="checkbox"
                className="mr-2"
                data-schema-key="cdf.section.checkbox_field"
                checked={getValue('cdf.section.checkbox_field') === true}
                onChange={handleInputChange}
              />
              Checkbox Label
            </label>
          </div>
        </section>
      </section>
    </>
  );
}