import React from 'react';
import { useOrderDataContext } from '../../contexts/OrderDataContext';

const BasicInfo: React.FC = () => {
  const { orderId, orderData, loading, saving, getValue, handleInputChange, handleSave } = useOrderDataContext();

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
                          value={getValue('closingDate') || ''}
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
                          value={getValue('cdfData.transaction_information.contract_date') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date Issued (CD)</label>
                      <div className="relative">
                        <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input
                          type="date"
                          name="dateIssued"
                          data-schema-key="cdfData.date_issued"
                          value={getValue('cdfData.date_issued') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Disbursement Date</label>
                      <div className="relative">
                        <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input
                          type="date"
                          name="disbursementDate"
                          data-schema-key="cdfData.disbursement_date"
                          value={getValue('cdfData.disbursement_date') || ''}
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
                          value={getValue('cdfData.transaction_information.purchase_price') || ''}
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
                          value={getValue('cdfData.loans.0.initial_loan_amount') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Earnest Money Deposit</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          name="deposit"
                          data-schema-key="cdfData.transaction_information.deposit"
                          value={getValue('cdfData.transaction_information.deposit') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Down Payment</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          name="downPayment"
                          data-schema-key="cdfData.transaction_information.down_payment"
                          value={(getValue('cdfData.transaction_information.purchase_price') || 0) - (getValue('cdfData.loans.0.initial_loan_amount') || 0)}
                          className="w-full pl-7 pr-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm"
                          readOnly
                          title="Automatically calculated from Purchase Price - Loan Amount"
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
                        checked={getValue('cdfData.loans.0.cash_only') || false}
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
                        checked={getValue('cdfData.loans.0.is_heloc') || false}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      HELOC
                    </label>
                  </div>
                </section>

                {/* Lender Information Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Lender Information</h3>
                  
                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Lender Name</label>
                      <input
                        type="text"
                        name="lenderName"
                        data-schema-key="cdfData.lender.name"
                        value={getValue('cdfData.lender.name') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Enter lender name"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Lender Address</label>
                      <input
                        type="text"
                        name="lenderAddress"
                        data-schema-key="cdfData.lender.address"
                        value={getValue('cdfData.lender.address') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Enter lender address"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.lender.city"
                        value={getValue('cdfData.lender.city') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.lender.state"
                        value={getValue('cdfData.lender.state') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="ST"
                        maxLength={2}
                      />
                    </div>
                    <div className="w-40">
                      <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.lender.zip"
                        value={getValue('cdfData.lender.zip') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="ZIP"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">NMLS ID</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.lender.nmls_id"
                        value={getValue('cdfData.lender.nmls_id') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="NMLS ID"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">State License ID</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.lender.state_license_id"
                        value={getValue('cdfData.lender.state_license_id') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="State License ID"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.lender.contact_name"
                        value={getValue('cdfData.lender.contact_name') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Contact person name"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                      <input
                        type="email"
                        data-schema-key="cdfData.lender.email"
                        value={getValue('cdfData.lender.email') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        data-schema-key="cdfData.lender.phone"
                        value={getValue('cdfData.lender.phone') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>
                </section>

                {/* Settlement Agent Information Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Settlement Agent Information</h3>
                  
                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.settlement_agent.name"
                        value={getValue('cdfData.settlement_agent.name') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Settlement company name"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.settlement_agent.address"
                        value={getValue('cdfData.settlement_agent.address') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Address"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.settlement_agent.city"
                        value={getValue('cdfData.settlement_agent.city') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.settlement_agent.state"
                        value={getValue('cdfData.settlement_agent.state') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="ST"
                        maxLength={2}
                      />
                    </div>
                    <div className="w-40">
                      <label className="block text-sm font-medium text-gray-300 mb-2">ZIP</label>
                      <input
                        type="text"
                        data-schema-key="cdfData.settlement_agent.zip"
                        value={getValue('cdfData.settlement_agent.zip') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="ZIP"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        data-schema-key="cdfData.settlement_agent.phone"
                        value={getValue('cdfData.settlement_agent.phone') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="(555) 555-5555"
                      />
                    </div>
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
                        value={getValue('cdfData.loans.0.loan_purpose') || 'Purchase'}
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
                        value={getValue('cdfData.transaction_information.representing') || 'buyer'}
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
                        value={getValue('propertiesData.properties.0.address') || ''}
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
                          value={getValue('propertiesData.properties.0.city') || ''}
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
                          value={getValue('propertiesData.properties.0.state') || ''}
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
                          value={getValue('contactsData.borrowers.0.first_name') || ''}
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
                          value={getValue('contactsData.borrowers.0.last_name') || ''}
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
                        value={getValue('contactsData.borrowers.0.email') || ''}
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