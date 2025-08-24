import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../../services/orderService';
// import type { Order } from '../../services/orderService';
import { type OrderData } from '../../types/schema';
import { getFieldValue, setFieldValue, initializeOrderDefaults } from '../../utils/schemaDefaults';

const BasicInfo = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrder(orderId!);
      console.log('Fetched order data:', data);
      // Initialize with defaults if needed
      const initialized = initializeOrderDefaults(data as Partial<OrderData>);
      console.log('Initialized order data:', initialized);
      setOrderData(initialized);
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldPath = e.target.getAttribute('data-schema-key') || name;
    
    if (!orderData) return;
    
    const newOrderData = { ...orderData };
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : type === 'number' 
      ? parseFloat(value) || 0
      : value;
    
    setFieldValue(newOrderData, fieldPath, fieldValue);
    setOrderData(newOrderData);
  };

  const handleSave = async () => {
    if (!orderId || !orderData) return;
    
    try {
      setSaving(true);
      await orderService.updateOrder(orderId, orderData);
      alert('Order saved successfully!');
    } catch (err) {
      console.error('Error saving order:', err);
      alert('Failed to save order');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto min-w-0">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-home text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Basic Info</h2>
            {orderId && <span className="text-gray-400">Order #{orderId}</span>}
          </div>
          {!loading && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded font-medium flex items-center gap-2"
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Save Changes
                </>
              )}
            </button>
          )}
        </section>

        {/* Loading State */}
        {loading || !orderData ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-400">Loading order data...</p>
            </div>
          </div>
        ) : (
          /* Form Container */
          <section className="p-10">
            <form className="grid grid-cols-2 gap-16 max-w-none">
              {/* Left Column */}
              <section className="space-y-8">
                {/* Dates Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Dates</h3>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Closing Date</label>
                      <div className="relative">
                        <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input
                          type="date"
                          name="closingDate"
                          data-schema-key="closingDate"
                          value={orderData.closingDate || ''}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contract Date</label>
                      <div className="relative">
                        <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input
                          type="date"
                          name="contractDate"
                          data-schema-key="cdfData.transaction_information.contract_date"
                          value={getFieldValue(orderData, 'cdfData.transaction_information.contract_date') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Amounts Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Amounts</h3>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Purchase Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          name="purchasePrice"
                          data-schema-key="cdfData.transaction_information.purchase_price"
                          value={getFieldValue(orderData, 'cdfData.transaction_information.purchase_price') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Loan Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          name="loanAmount"
                          data-schema-key="cdfData.loans.0.initial_loan_amount"
                          value={getFieldValue(orderData, 'cdfData.loans.0.initial_loan_amount') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        name="cashOnly"
                        data-schema-key="cdfData.loans.0.cash_only"
                        checked={getFieldValue(orderData, 'cdfData.loans.0.cash_only') || false}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      Cash Only
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        name="heloc"
                        data-schema-key="cdfData.loans.0.is_heloc"
                        checked={getFieldValue(orderData, 'cdfData.loans.0.is_heloc') || false}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      HELOC
                    </label>
                  </div>
                </section>

                {/* Type Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Type</h3>

                  <div className="flex gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Type</label>
                      <select
                        name="transactionType"
                        data-schema-key="cdfData.loans.0.loan_purpose"
                        value={getFieldValue(orderData, 'cdfData.loans.0.loan_purpose') || 'Purchase'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="Purchase">Purchase</option>
                        <option value="Refinance">Refinance</option>
                        <option value="Construction">Construction</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Representing</label>
                      <select
                        name="representing"
                        data-schema-key="cdfData.transaction_information.representing"
                        value={getFieldValue(orderData, 'cdfData.transaction_information.representing') || 'buyer'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </div>
                </section>
              </section>

              {/* Right Column */}
              <section className="space-y-8">
                {/* Property Information */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Property Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Property Address</label>
                      <input
                        type="text"
                        name="propertyAddress"
                        data-schema-key="propertiesData.properties.0.address"
                        value={getFieldValue(orderData, 'propertiesData.properties.0.address') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Property address"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                        <input
                          type="text"
                          name="propertyCity"
                          data-schema-key="propertiesData.properties.0.city"
                          value={getFieldValue(orderData, 'propertiesData.properties.0.city') || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                        <input
                          type="text"
                          name="propertyState"
                          data-schema-key="propertiesData.properties.0.state"
                          value={getFieldValue(orderData, 'propertiesData.properties.0.state') || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="State"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Primary Contact</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          name="borrowerFirstName"
                          data-schema-key="contactsData.borrowers.0.first_name"
                          value={getFieldValue(orderData, 'contactsData.borrowers.0.first_name') || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="borrowerLastName"
                          data-schema-key="contactsData.borrowers.0.last_name"
                          value={getFieldValue(orderData, 'contactsData.borrowers.0.last_name') || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="borrowerEmail"
                        data-schema-key="contactsData.borrowers.0.email"
                        value={getFieldValue(orderData, 'contactsData.borrowers.0.email') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </section>
              </section>
            </form>
          </section>
        )}
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 flex-shrink-0">
        {/* Chat Section */}
        <div className="p-4 border-b border-gray-600">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
            <i className="fa fa-comments text-gray-400"></i>
            Chat
          </h3>
          <div className="text-sm text-gray-400">Chat functionality would be here</div>
        </div>

        {/* Tasks Section */}
        <div className="p-4 border-b border-gray-600">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
            <i className="fa fa-check-square text-gray-400"></i>
            Tasks
            <span className="ml-auto bg-gray-600 text-white text-xs px-2 py-0.5 rounded">0 / 0</span>
          </h3>
          <div className="text-sm text-gray-400">You have not been assigned any tasks on this order</div>
        </div>

        {/* Notes Section */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
            <i className="fa fa-sticky-note text-gray-400"></i>
            Notes
          </h3>
          <div className="text-sm text-gray-400 mb-4">No notes have been added to this page</div>
          <button className="w-full py-2 px-4 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors">
            Add Note
          </button>
        </div>
      </section>
    </>
  );
};

export default BasicInfo;