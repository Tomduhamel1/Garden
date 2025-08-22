import React, { useState, useEffect } from 'react';
import { useOrderData } from '../../hooks/useOrderData';
import { calculateTaxProration, formatCurrency, parseCurrency } from '../../utils/calculations';

interface TaxesProrationsProps {}

const TaxesProrations: React.FC<TaxesProrationsProps> = () => {
  const { loading, saving, handleInputChange, getValue, handleSave } = useOrderData();
  const [activeTab, setActiveTab] = useState(0);
  const [cityTaxProration, setCityTaxProration] = useState<any>(null);
  const [countyTaxProration, setCountyTaxProration] = useState<any>(null);
  
  // City/Town Taxes State
  const [cityTaxData, setCityTaxData] = useState({
    annual_amount: '',
    parcel_id: 'Not yet entered.',
    paid_thru: '',
    next_due: '',
    payment_schedule: 'Annual',
    proration_start: '',
    proration_end: '',
    proration_days: '',
    proration_amount: '',
    escrow_months: '',
    payment_borrower: '',
    payment_seller: '',
    payment_paid_outside: ''
  });

  // County Taxes State
  const [countyTaxData, setCountyTaxData] = useState({
    annual_amount: '',
    parcel_id: 'Not yet entered.',
    paid_thru: '',
    next_due: '',
    payment_schedule: 'Annual',
    proration_start: '',
    proration_end: '',
    proration_days: '',
    proration_amount: '',
    escrow_months: '',
    payment_borrower: '',
    payment_seller: '',
    payment_paid_outside: ''
  });

  // Assessments State  
  const [assessmentData, setAssessmentData] = useState({
    annual_amount: '',
    parcel_id: 'Not yet entered.',
    paid_thru: '',
    next_due: '',
    payment_schedule: 'Annual',
    proration_start: '',
    proration_end: '',
    proration_days: '',
    proration_amount: '',
    escrow_months: '',
    payment_borrower: '',
    payment_seller: '',
    payment_paid_outside: ''
  });

  // Calculate city tax proration when inputs change
  useEffect(() => {
    const annualAmount = parseCurrency(cityTaxData.annual_amount || '0');
    const closingDate = getValue('cdf.closing_information.closing_date');
    
    if (annualAmount > 0 && closingDate) {
      const proration = calculateTaxProration(
        annualAmount,
        new Date(closingDate),
        new Date().getFullYear(),
        cityTaxData.paid_thru ? new Date(cityTaxData.paid_thru) : undefined
      );
      setCityTaxProration(proration);
      
      // Update the form data with calculated values
      setCityTaxData(prev => ({
        ...prev,
        proration_days: String(proration.daysOwed),
        proration_amount: formatCurrency(proration.prorationAmount),
        payment_borrower: formatCurrency(proration.buyerDebit),
        payment_seller: formatCurrency(proration.sellerCredit)
      }));
    }
  }, [cityTaxData.annual_amount, cityTaxData.paid_thru, getValue]);

  // Calculate county tax proration when inputs change
  useEffect(() => {
    const annualAmount = parseCurrency(countyTaxData.annual_amount || '0');
    const closingDate = getValue('cdf.closing_information.closing_date');
    
    if (annualAmount > 0 && closingDate) {
      const proration = calculateTaxProration(
        annualAmount,
        new Date(closingDate),
        new Date().getFullYear(),
        countyTaxData.paid_thru ? new Date(countyTaxData.paid_thru) : undefined
      );
      setCountyTaxProration(proration);
      
      // Update the form data with calculated values
      setCountyTaxData(prev => ({
        ...prev,
        proration_days: String(proration.daysOwed),
        proration_amount: formatCurrency(proration.prorationAmount),
        payment_borrower: formatCurrency(proration.buyerDebit),
        payment_seller: formatCurrency(proration.sellerCredit)
      }));
    }
  }, [countyTaxData.annual_amount, countyTaxData.paid_thru, getValue]);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleLocalInputChange = (section: 'city' | 'county' | 'assessment', field: string, value: string) => {
    const setters = {
      city: setCityTaxData,
      county: setCountyTaxData,
      assessment: setAssessmentData
    };
    
    const setter = setters[section];
    setter(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 0: return cityTaxData;
      case 1: return countyTaxData;
      case 2: return assessmentData;
      default: return cityTaxData;
    }
  };

  const getCurrentSetter = () => {
    switch (activeTab) {
      case 0: return (field: string, value: string) => handleLocalInputChange('city', field, value);
      case 1: return (field: string, value: string) => handleLocalInputChange('county', field, value);
      case 2: return (field: string, value: string) => handleLocalInputChange('assessment', field, value);
      default: return (field: string, value: string) => handleLocalInputChange('city', field, value);
    }
  };

  const data = getCurrentData();
  const handleChange = getCurrentSetter();

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-calculator text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Taxes & Prorations</h2>
          </div>
          <div className="flex gap-2">
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
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500" title="Settings">
              <i className="fa fa-cog mr-1"></i>
              Settings
            </button>
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-gray-400 text-sm opacity-50 cursor-not-allowed" title="Remove">
              <i className="fa fa-minus mr-1"></i>
              Remove
            </button>
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500" title="Add">
              <i className="fa fa-plus mr-1"></i>
              Add
            </button>
          </div>
        </section>

        {/* Tab Container */}
        <section className="px-10">
          {/* Tab Menu */}
          <div className="flex border-b-2 border-gray-600 mb-8">
            <button 
              className={`px-5 py-4 bg-transparent border-none text-sm cursor-pointer border-b-3 ${
                activeTab === 0 
                  ? 'text-blue-400 border-b-blue-400 bg-gray-800' 
                  : 'text-gray-400 border-b-transparent hover:text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => handleTabClick(0)}
            >
              City/Town Taxes
            </button>
            <button 
              className={`px-5 py-4 bg-transparent border-none text-sm cursor-pointer border-b-3 ${
                activeTab === 1
                  ? 'text-blue-400 border-b-blue-400 bg-gray-800' 
                  : 'text-gray-400 border-b-transparent hover:text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => handleTabClick(1)}
            >
              County Taxes
            </button>
            <button 
              className={`px-5 py-4 bg-transparent border-none text-sm cursor-pointer border-b-3 ${
                activeTab === 2
                  ? 'text-blue-400 border-b-blue-400 bg-gray-800' 
                  : 'text-gray-400 border-b-transparent hover:text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => handleTabClick(2)}
            >
              Assessments
            </button>
          </div>

          {/* Tab Content */}
          <section className="tab-content pb-10">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
            <form className="space-y-8">
              <div className="grid grid-cols-2 gap-10">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Tax Info Section */}
                  <section>
                    <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Tax Info</h3>
                    <div className="grid grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Annual Amount</label>
                        <input 
                          type="text" 
                          inputMode="decimal" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key={`properties.0.tax_information.${activeTab}.annual_amount`}
                          value={getValue(`properties.0.tax_information.${activeTab}.annual_amount`) || data.annual_amount}
                          onChange={(e) => handleInputChange(`properties.0.tax_information.${activeTab}.annual_amount`, e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                          Parcel ID
                          <a href="#" className="text-blue-400 hover:underline text-xs">Add Parcel ID</a>
                        </label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm cursor-not-allowed" 
                          value="Not yet entered." 
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-5 mb-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                          Paid Thru
                          <i className="fa fa-question-circle text-gray-400 cursor-help" title="End Date of the Last Paid Installment"></i>
                        </label>
                        <div className="relative">
                          <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          <input 
                            type="text" 
                            inputMode="numeric" 
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key={`properties.0.tax_information.${activeTab}.paid_thru`}
                            value={getValue(`properties.0.tax_information.${activeTab}.paid_thru`) || data.paid_thru}
                            onChange={(e) => handleInputChange(`properties.0.tax_information.${activeTab}.paid_thru`, e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Next Due</label>
                        <div className="relative">
                          <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          <input 
                            type="text" 
                            inputMode="numeric" 
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key={`properties.0.tax_information.${activeTab}.next_due`}
                            value={data.next_due}
                            onChange={(e) => handleChange('next_due', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Payment Schedule</label>
                        <select 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                          data-schema-key={`properties.0.tax_information.${activeTab}.payment_schedule`}
                          value={data.payment_schedule}
                          onChange={(e) => handleChange('payment_schedule', e.target.value)}
                        >
                          <option value="annual">Annual</option>
                          <option value="semi_annual">Semi-Annual</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="monthly">Monthly</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Payment Schedule Table */}
                    <div className="bg-gray-800 border border-gray-600 rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-700 border-b border-gray-600">
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">Payment Number</th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">Payment Date</th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">Payment Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4].map((num, index) => (
                            <tr key={num} className={index < 3 ? "border-b border-gray-600" : ""}>
                              <td className="py-3 px-4 text-center text-sm text-white">{num}</td>
                              <td className="py-3 px-4">
                                <div className="relative">
                                  <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                  <input 
                                    type="text" 
                                    inputMode="numeric" 
                                    className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                                    data-schema-key={`properties.0.tax_information.${activeTab}.payment_dates.${index}`}
                                  />
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <input 
                                  type="text" 
                                  inputMode="decimal" 
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                                  data-schema-key={`properties.0.tax_information.${activeTab}.payment_amounts.${index}`}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Proration Section */}
                  <section>
                    <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Proration</h3>
                    
                    <div className="grid grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Installment Amount</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 pr-8 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key={`properties.0.tax_information.${activeTab}.installment_amount`}
                            value={data.proration_amount}
                            onChange={(e) => handleChange('proration_amount', e.target.value)}
                          />
                          <i className="fa fa-times absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" title="Clear override"></i>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Installment Start Date</label>
                        <div className="relative">
                          <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          <input 
                            type="text" 
                            inputMode="numeric" 
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key={`properties.0.tax_information.${activeTab}.installment_from_date`}
                            value={data.proration_start}
                            onChange={(e) => handleChange('proration_start', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Proration Date</label>
                        <div className="relative">
                          <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          <input 
                            type="text" 
                            inputMode="numeric" 
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key={`properties.0.tax_information.${activeTab}.proration_date`}
                            value={data.proration_end}
                            onChange={(e) => handleChange('proration_end', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Installment End Date</label>
                        <div className="relative">
                          <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          <input 
                            type="text" 
                            inputMode="numeric" 
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key={`properties.0.tax_information.${activeTab}.installment_to_date`}
                            value={data.proration_days}
                            onChange={(e) => handleChange('proration_days', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary Section */}
                    <div className="bg-gray-700 border border-gray-600 rounded-md p-5">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Prorated Amount</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-600 border border-green-500 rounded text-green-400 text-sm focus:outline-none focus:border-green-400 font-semibold"
                            data-schema-key={`properties.0.tax_information.${activeTab}.prorated_amount`}
                            value={data.payment_borrower}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Debited Party</label>
                          <div className="flex bg-gray-600 border border-gray-500 rounded overflow-hidden">
                            <button 
                              type="button" 
                              className={`flex-1 px-3 py-2.5 text-sm font-medium ${
                                data.payment_seller === 'borrower' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                              }`}
                              onClick={() => handleChange('payment_seller', 'borrower')}
                            >
                              Buyer Owes Seller
                            </button>
                            <button 
                              type="button" 
                              className={`flex-1 px-3 py-2.5 text-sm font-medium ${
                                data.payment_seller === 'seller' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                              }`}
                              onClick={() => handleChange('payment_seller', 'seller')}
                            >
                              Seller Owes Buyer
                            </button>
                          </div>
                          <input 
                            type="hidden" 
                            data-schema-key={`properties.0.tax_information.${activeTab}.proration_who_pays`} 
                            value={data.payment_seller}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </form>
            )}
          </section>
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

export default TaxesProrations;