import { useState } from 'react';

const BasicInfo = () => {
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

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Left Sidebar */}
      <section className="w-72 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-5 text-gray-500 text-center border-b border-gray-200">
          <div className="text-xs">Navigation Sidebar</div>
          <div className="text-xs mt-1">Basic Info is active</div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 bg-gray-50 overflow-y-auto min-w-0">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-200 flex items-center gap-4">
          <i className="fa fa-home text-gray-500 text-xl"></i>
          <h2 className="text-2xl font-semibold text-gray-900">Basic Info</h2>
        </section>

        {/* Form Container */}
        <section className="p-10">
          <form className="grid grid-cols-2 gap-16 max-w-none">
            {/* Left Column */}
            <section className="space-y-8">
              {/* Dates Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Dates</h3>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Closing Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        name="estimatedClosingDate"
                        value={formData.estimatedClosingDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contract Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        name="contractDate"
                        value={formData.contractDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Funding Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        name="fundingDate"
                        value={formData.fundingDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Disbursement Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input
                        type="text"
                        name="disbursementDate"
                        value={formData.disbursementDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                      />
                      <i className="fa fa-times absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </section>

              {/* Closings Section */}
              <section>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-200 flex-1">Closings</h3>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded bg-transparent text-gray-500 text-xs opacity-50 cursor-not-allowed ml-4"
                    disabled
                  >
                    Schedule Closing
                  </button>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-md p-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Buyer's Closing</label>
                      <div className="text-gray-500 italic text-sm">Not Set</div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Seller's Closing</label>
                      <div className="text-gray-500 italic text-sm">Not Set</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Amounts Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Amounts</h3>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
                    <input
                      type="text"
                      name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                      placeholder="$0.00"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                    <input
                      type="text"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                      placeholder="$0.00"
                    />
                  </div>
                </div>

                <div className="flex gap-8 mb-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="cash_only"
                      name="cashOnly"
                      checked={formData.cashOnly}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="cash_only" className="text-sm text-gray-700 cursor-pointer">Cash Only</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="heloc"
                      name="heloc"
                      checked={formData.heloc}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="heloc" className="text-sm text-gray-700 cursor-pointer">HELOC</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="construction"
                      name="constructionLoan"
                      checked={formData.constructionLoan}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="construction" className="text-sm text-gray-700 cursor-pointer">Construction Loan</label>
                  </div>
                </div>
              </section>

              {/* Type Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Type</h3>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                    <select
                      name="transactionType"
                      value={formData.transactionType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="Purchase">Purchase</option>
                      <option value="Sale">Sale</option>
                      <option value="Refinance">Refinance</option>
                      <option value="HELOC">HELOC</option>
                      <option value="Short Sale">Short Sale</option>
                      <option value="Foreclosure">Foreclosure</option>
                      <option value="Commercial Purchase">Commercial Purchase</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Representing</label>
                    <select
                      name="representing"
                      value={formData.representing}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="lender">Lender</option>
                      <option value="buyer_and_lender">Buyer and Lender</option>
                      <option value="buyer_and_seller">Buyer and Seller</option>
                      <option value="">N/A</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Configuration Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Configuration</h3>

                <div className="bg-gray-100 border border-gray-300 rounded-md p-5">
                  <div className="grid grid-cols-2 gap-8 mb-5">
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-300">
                      <div>
                        <div className="text-sm text-gray-700">Order #</div>
                        <div className="text-sm text-gray-900 font-medium">TomTestCD</div>
                      </div>
                      <a href="#" className="text-blue-500 text-xs hover:underline">Change</a>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-gray-300">
                      <div>
                        <div className="text-sm text-gray-700">Settlement Statement</div>
                        <div className="text-sm text-gray-900 font-medium">CD</div>
                      </div>
                      <a href="#" className="text-blue-500 text-xs hover:underline">Switch</a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <div>
                      <div className="text-sm text-gray-700">Workflow</div>
                      <div className="text-sm text-gray-900 font-medium">Purchase</div>
                    </div>
                    <a href="#" className="text-blue-500 text-xs hover:underline">Change</a>
                  </div>
                </div>
              </section>
            </section>

            {/* Right Column */}
            <section className="space-y-8">
              {/* Reporting Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Reporting</h3>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source of Business</label>
                  <select
                    name="sourceOfBusiness"
                    value={formData.sourceOfBusiness}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">Select one...</option>
                    <option value="borrower">Buyer</option>
                    <option value="borrowerAttorney">Buyer's Attorney</option>
                    <option value="builder">Builder</option>
                    <option value="settlementAgency">External Settlement Agency</option>
                    <option value="lender">Lender</option>
                    <option value="listingAgent">Listing Agency</option>
                    <option value="mortgageBroker">Mortgage Broker</option>
                    <option value="seller">Seller</option>
                    <option value="sellerAttorney">Seller's Attorney</option>
                    <option value="sellingAgent">Selling Agency</option>
                    <option value="titleAgency">Title Company</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status Summary</label>
                  <input
                    type="text"
                    name="statusSummary"
                    value={formData.statusSummary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Brief summary of the order's status"
                  />
                </div>
              </section>

              {/* Taxes Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Taxes</h3>

                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="eligible_1099"
                    name="eligible1099"
                    checked={formData.eligible1099}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="eligible_1099" className="text-sm text-gray-700 cursor-pointer">1099 Eligible</label>
                </div>
              </section>

              {/* Settlement Team Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Settlement Team</h3>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Settlement Agency</label>
                    <select
                      name="settlementAgency"
                      value={formData.settlementAgency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="t3eQskRbLNgkJzx5E">First National Title & Escrow</option>
                      <option value="4G9EQK5RidyiAwrWc">The Law Office of Stephen P. Patti, LLC</option>
                      <option value="dDeXkPqERweiMQvFg">First National Title Agency LLC</option>
                      <option value="E5ArN9ynynZxAjKMd">First National Title Experts, LLC</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Escrow Officer</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="escrowOfficer"
                        value={formData.escrowOfficer}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Opener</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="orderOpener"
                        value={formData.orderOpener}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assistant</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="assistant"
                        value={formData.assistant}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Closing Manager</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="closingManager"
                        value={formData.closingManager}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Funding</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="funding"
                        value={formData.funding}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Post-Closing</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="postClosing"
                        value={formData.postClosing}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sales Rep</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="salesRep"
                        value={formData.salesRep}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authorized Signatory</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="authorizedSignatory"
                        value={formData.authorizedSignatory}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">FNTE Attorney</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="fnteAttorney"
                        value={formData.fnteAttorney}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Place of Closing Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">Place of Closing</h3>

                <div className="flex gap-5 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="closingAddress"
                        value={formData.closingAddress}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Search address..."
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apt, Suite, Etc.</label>
                    <input
                      type="text"
                      name="closingApt"
                      value={formData.closingApt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex gap-5 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="closingCity"
                      value={formData.closingCity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
                    <input
                      type="text"
                      name="closingCounty"
                      value={formData.closingCounty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select
                      name="closingState"
                      value={formData.closingState}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="RI">RI</option>
                      <option value="CA">CA</option>
                      <option value="NY">NY</option>
                      <option value="TX">TX</option>
                      <option value="FL">FL</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zipcode</label>
                    <input
                      type="text"
                      name="closingZipcode"
                      value={formData.closingZipcode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </section>
            </section>
          </form>
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-white border-l border-gray-200 p-5 flex-shrink-0">
        {/* Chat Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center py-2.5 border-b border-gray-200 mb-4 cursor-pointer">
            <h4 className="text-sm text-gray-900 font-semibold">Chat</h4>
            <i className="fa fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="bg-gray-100 border border-gray-300 rounded p-4 text-gray-500 text-sm text-center">
            Chat functionality would be here
          </div>
        </section>

        {/* Tasks Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center py-2.5 border-b border-gray-200 mb-4 cursor-pointer">
            <h4 className="text-sm text-gray-900 font-semibold">Tasks <span className="bg-gray-300 px-2 py-0.5 rounded-full text-xs ml-1">0 / 0</span></h4>
            <i className="fa fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="bg-gray-100 border border-gray-300 rounded p-4 text-gray-500 text-sm text-center">
            You have not been assigned any tasks on this order
          </div>
        </section>

        {/* Notes Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center py-2.5 border-b border-gray-200 mb-4 cursor-pointer">
            <h4 className="text-sm text-gray-900 font-semibold">Notes</h4>
            <i className="fa fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-gray-500 text-sm text-center">
              No notes have been added to this page
            </div>
            <button className="w-full p-2.5 bg-transparent border border-gray-400 rounded text-gray-700 text-sm hover:bg-gray-100">
              Add Note
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default BasicInfo;