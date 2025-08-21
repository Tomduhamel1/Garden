import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderService, { Order } from '../../services/orderService';

const BasicInfo = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    estimatedClosingDate: '',
    contractDate: '',
    fundingDate: '',
    disbursementDate: '',
    purchasePrice: '',
    loanAmount: '',
    cashOnly: false,
    heloc: false,
    constructionLoan: false,
    transactionType: 'Purchase',
    representing: 'buyer',
    sourceOfBusiness: '',
    statusSummary: '',
    eligible1099: false,
    settlementAgency: 't3eQskRbLNgkJzx5E',
    escrowOfficer: '',
    orderOpener: '',
    assistant: '',
    closingManager: '',
    funding: '',
    postClosing: '',
    salesRep: '',
    authorizedSignatory: '',
    fnteAttorney: '',
    closingAddress: '',
    closingApt: '',
    closingCity: '',
    closingCounty: '',
    closingState: 'RI',
    closingZipcode: '',
  });

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrder(orderId!);
      setOrder(data);
      
      // Update form data with order data
      if (data.cdfData) {
        setFormData(prev => ({
          ...prev,
          ...data.cdfData
        }));
      }
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    if (!orderId || !order) return;
    
    try {
      setSaving(true);
      await orderService.updateOrder(orderId, {
        cdfData: { ...order.cdfData, ...formData }
      });
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
        {loading ? (
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
                        type="text"
                        name="estimatedClosingDate"
                        value={formData.estimatedClosingDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contract Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        name="contractDate"
                        value={formData.contractDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Funding Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        name="fundingDate"
                        value={formData.fundingDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Disbursement Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        name="disbursementDate"
                        value={formData.disbursementDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-9 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                      <i className="fa fa-times absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </section>

              {/* Closings Section */}
              <section>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-base font-semibold text-white pb-2 border-b border-gray-600 flex-1">Closings</h3>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-500 rounded bg-transparent text-gray-400 text-xs opacity-50 cursor-not-allowed ml-4"
                    disabled
                  >
                    Schedule Closing
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-gray-800 border border-gray-600 rounded p-5">
                    <h4 className="text-sm font-medium text-white mb-3">Buyer's Closing</h4>
                    <p className="text-sm text-gray-400 italic">Not Set</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-600 rounded p-5">
                    <h4 className="text-sm font-medium text-white mb-3">Seller's Closing</h4>
                    <p className="text-sm text-gray-400 italic">Not Set</p>
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
                        type="text"
                        name="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleInputChange}
                        className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Loan Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="text"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleInputChange}
                        className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      name="cashOnly"
                      checked={formData.cashOnly}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    Cash Only
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      name="heloc"
                      checked={formData.heloc}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    HELOC
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      name="constructionLoan"
                      checked={formData.constructionLoan}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    Construction Loan
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
                      value={formData.transactionType}
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
                      value={formData.representing}
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

              {/* Configuration Section */}
              <section>
                <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Configuration</h3>

                <div className="flex flex-col gap-3">
                  <button className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-500 rounded text-sm hover:bg-gray-600 transition-colors flex justify-between items-center">
                    <span>Configure Order</span>
                    <i className="fa fa-chevron-right text-xs"></i>
                  </button>
                  <button className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-500 rounded text-sm hover:bg-gray-600 transition-colors flex justify-between items-center">
                    <span>Configure Proceeds</span>
                    <i className="fa fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </section>
            </section>

            {/* Right Column */}
            <section className="space-y-8">
              {/* Reporting Section */}
              <section>
                <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Reporting</h3>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Source of Business</label>
                  <select
                    name="sourceOfBusiness"
                    value={formData.sourceOfBusiness}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select one...</option>
                    <option value="referral">Referral</option>
                    <option value="website">Website</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status Summary</label>
                  <input
                    type="text"
                    name="statusSummary"
                    value={formData.statusSummary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Brief summary of the order's status"
                  />
                </div>
              </section>

              {/* Taxes Section */}
              <section>
                <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Taxes</h3>

                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    name="eligible1099"
                    checked={formData.eligible1099}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  1099 Eligible
                </label>
              </section>

              {/* Settlement Team Section */}
              <section>
                <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Settlement Team</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Settlement Agency</label>
                      <div className="relative">
                        <input
                          type="text"
                          readOnly
                          value="First National Title & Esc"
                          className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm cursor-not-allowed"
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Escrow Officer</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="escrowOfficer"
                          value={formData.escrowOfficer}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Order Opener</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="orderOpener"
                          value={formData.orderOpener}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Assistant</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="assistant"
                          value={formData.assistant}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Closing Manager</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="closingManager"
                          value={formData.closingManager}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Funding</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="funding"
                          value={formData.funding}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Post-Closing</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="postClosing"
                          value={formData.postClosing}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Sales Rep</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="salesRep"
                          value={formData.salesRep}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Authorized Signatory</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="authorizedSignatory"
                          value={formData.authorizedSignatory}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">FNTE Attorney</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fnteAttorney"
                          value={formData.fnteAttorney}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search..."
                        />
                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Place of Closing Section */}
              <section>
                <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Place of Closing</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Closing Address</label>
                    <input
                      type="text"
                      name="closingAddress"
                      value={formData.closingAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Apt, Suite, etc. (optional)</label>
                    <input
                      type="text"
                      name="closingApt"
                      value={formData.closingApt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        name="closingCity"
                        value={formData.closingCity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">County</label>
                      <input
                        type="text"
                        name="closingCounty"
                        value={formData.closingCounty}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="County"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                      <select
                        name="closingState"
                        value={formData.closingState}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="RI">RI</option>
                        <option value="MA">MA</option>
                        <option value="CT">CT</option>
                        <option value="NY">NY</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Zip Code</label>
                      <input
                        type="text"
                        name="closingZipcode"
                        value={formData.closingZipcode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Zip code"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </form>
        </section>
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
        )}
      </section>
    </>
  );
};

export default BasicInfo;