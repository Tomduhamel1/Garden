import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

interface EarnestCommissionsProps {}

const EarnestCommissions: React.FC<EarnestCommissionsProps> = () => {
  const { loading, saving, handleInputChange, getValue, handleSave } = useOrderData();

  const [earnestData, setEarnestData] = useState({
    earnest_amount: '',
    earnest_held_by: 'Settlement Agency',
    earnest_held_by_settlement_agency: '',
    disclose_earnest_to_seller_on_cd: false
  });

  const [listingCommission, setListingCommission] = useState({
    commission_base_amount: '',
    percentage: '',
    additional_amount: '',
    commission_amount: '',
    who_pays: 'seller'
  });

  const [sellingCommission, setSellingCommission] = useState({
    commission_base_amount: '',
    percentage: '',
    additional_amount: '',
    commission_amount: '',
    who_pays: 'seller'
  });

  const calculateCommission = (
    base: string,
    percentage: string,
    additional: string
  ): string => {
    const baseValue = parseFloat(base) || 0;
    const percentageValue = parseFloat(percentage) || 0;
    const additionalValue = parseFloat(additional) || 0;
    
    const calculated = (baseValue * percentageValue / 100) + additionalValue;
    return calculated.toFixed(2);
  };

  const handleListingInputChange = (field: string, value: string) => {
    const newCommission = { ...listingCommission, [field]: value };
    
    if (['commission_base_amount', 'percentage', 'additional_amount'].includes(field)) {
      newCommission.commission_amount = calculateCommission(
        newCommission.commission_base_amount,
        newCommission.percentage,
        newCommission.additional_amount
      );
    }
    
    setListingCommission(newCommission);
  };

  const handleSellingInputChange = (field: string, value: string) => {
    const newCommission = { ...sellingCommission, [field]: value };
    
    if (['commission_base_amount', 'percentage', 'additional_amount'].includes(field)) {
      newCommission.commission_amount = calculateCommission(
        newCommission.commission_base_amount,
        newCommission.percentage,
        newCommission.additional_amount
      );
    }
    
    setSellingCommission(newCommission);
  };

  const PaymentButton = ({ 
    label, 
    value, 
    currentValue, 
    onClick 
  }: { 
    label: string; 
    value: string; 
    currentValue: string; 
    onClick: (value: string) => void;
  }) => (
    <button
      type="button"
      className={`flex-1 px-4 py-2.5 text-sm font-medium ${
        currentValue === value
          ? 'bg-blue-600 text-white'
          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
      }`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-money text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Earnest & Commissions</h2>
          </div>
          <button
            onClick={handleSave}
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
            {/* Earnest Section */}
            <section>
              <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Earnest</h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Earnest</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    data-schema-key="earnest_amount"
                    value={getValue('earnest_amount') || earnestData.earnest_amount}
                    onChange={(e) => handleInputChange('earnest_amount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Earnest Held By</label>
                  <select 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    data-schema-key="earnest_held_by"
                    value={getValue('earnest_held_by') || earnestData.earnest_held_by}
                    onChange={(e) => handleInputChange('earnest_held_by', e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="Listing Agent">Listing Agent</option>
                    <option value="Returned to Buyer">Returned to Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Buyer's Attorney">Buyer's Attorney</option>
                    <option value="Seller's Attorney">Seller's Attorney</option>
                    <option value="Settlement Agency">Settlement Agency</option>
                    <option value="Selling Agent">Selling Agent</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Excess Earnest Section */}
            <section>
              <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Excess Earnest</h3>
              <div className="mb-5">
                <label className="block text-sm text-gray-300 mb-2">
                  Earnest Held By Settlement Agency
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="earnest_held_by_settlement_agency"
                  value={earnestData.earnest_held_by_settlement_agency}
                  onChange={(e) => setEarnestData({ ...earnestData, earnest_held_by_settlement_agency: e.target.value })}
                />
              </div>
              
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only"
                  data-schema-key="disclose_earnest_to_seller_on_cd"
                  checked={earnestData.disclose_earnest_to_seller_on_cd}
                  onChange={(e) => setEarnestData({ ...earnestData, disclose_earnest_to_seller_on_cd: e.target.checked })}
                />
                <div className="relative">
                  <div className={`block w-14 h-8 rounded-full ${earnestData.disclose_earnest_to_seller_on_cd ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
                  <div 
                    className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
                    style={{ 
                      transform: earnestData.disclose_earnest_to_seller_on_cd ? 'translateX(1.5rem)' : 'translateX(0)' 
                    }}
                  ></div>
                </div>
                <span className="ml-3 text-gray-300">Disclose Earnest To Seller On CD (Only If Sent Before Closing)</span>
              </label>
            </section>

            {/* Commission Sections */}
            <section className="grid grid-cols-2 gap-8">
              {/* Listing Agent Commission */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-5 py-3 text-center border-b border-gray-600">
                  <h4 className="text-base font-semibold text-white">Listing Agent Commission</h4>
                </div>
                
                <div className="p-5 space-y-5">
                  {/* Commission Base × Percentage */}
                  <div className="flex items-end gap-3">
                    <div className="flex items-center justify-center w-8 h-10 bg-gray-600 rounded text-gray-300 text-lg">×</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Commission Base</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="listing_commission_base_amount"
                        value={getValue('listing_commission_base_amount') || listingCommission.commission_base_amount}
                        onChange={(e) => handleInputChange('listing_commission_base_amount', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-center w-8 h-10 bg-gray-600 rounded text-gray-300 text-lg">×</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Commission (%)</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="listing_percentage"
                        value={getValue('listing_percentage') || listingCommission.percentage}
                        onChange={(e) => handleInputChange('listing_percentage', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* + Additional Amount */}
                  <div className="flex items-end gap-3">
                    <div className="flex items-center justify-center w-8 h-10 bg-gray-600 rounded text-gray-300 text-lg">+</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Additional Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="listing_additional_amount"
                        value={listingCommission.additional_amount}
                        onChange={(e) => handleListingInputChange('additional_amount', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* = Commission Amount */}
                  <div className="flex items-end gap-3">
                    <div className="flex items-center justify-center w-8 h-10 bg-green-600 rounded text-white text-lg">=</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Commission Amount</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-green-500 rounded text-white text-sm focus:outline-none focus:border-green-400"
                        data-schema-key="listing_commission_amount"
                        value={listingCommission.commission_amount}
                        onChange={(e) => handleListingInputChange('commission_amount', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Commission Paid By */}
                <div className="bg-gray-700 px-5 py-4 border-t border-gray-600">
                  <label className="block text-sm text-gray-300 mb-3">Commission Paid By</label>
                  <div className="flex bg-gray-600 border border-gray-500 rounded overflow-hidden">
                    <PaymentButton
                      label="Buyer"
                      value="borrower"
                      currentValue={listingCommission.who_pays}
                      onClick={(value) => handleListingInputChange('who_pays', value)}
                    />
                    <PaymentButton
                      label="Seller"
                      value="seller"
                      currentValue={listingCommission.who_pays}
                      onClick={(value) => handleListingInputChange('who_pays', value)}
                    />
                    <PaymentButton
                      label="Split"
                      value="split"
                      currentValue={listingCommission.who_pays}
                      onClick={(value) => handleListingInputChange('who_pays', value)}
                    />
                  </div>
                  <input 
                    type="hidden" 
                    data-schema-key="listing_commission_who_pays_parent" 
                    value={listingCommission.who_pays}
                  />
                </div>
              </div>

              {/* Selling Agent Commission */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-5 py-3 text-center border-b border-gray-600">
                  <h4 className="text-base font-semibold text-white">Selling Agent Commission</h4>
                </div>
                
                <div className="p-5 space-y-5">
                  {/* Commission Base × Percentage */}
                  <div className="flex items-end gap-3">
                    <div className="flex items-center justify-center w-8 h-10 bg-gray-600 rounded text-gray-300 text-lg">×</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Commission Base</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="selling_commission_base_amount"
                        value={sellingCommission.commission_base_amount}
                        onChange={(e) => handleSellingInputChange('commission_base_amount', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-center w-8 h-10 bg-gray-600 rounded text-gray-300 text-lg">×</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Commission (%)</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="selling_percentage"
                        value={sellingCommission.percentage}
                        onChange={(e) => handleSellingInputChange('percentage', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* + Additional Amount */}
                  <div className="flex items-end gap-3">
                    <div className="flex items-center justify-center w-8 h-10 bg-gray-600 rounded text-gray-300 text-lg">+</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Additional Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="selling_additional_amount"
                        value={sellingCommission.additional_amount}
                        onChange={(e) => handleSellingInputChange('additional_amount', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* = Commission Amount */}
                  <div className="flex items-end gap-3">
                    <div className="flex items-center justify-center w-8 h-10 bg-green-600 rounded text-white text-lg">=</div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-300 mb-2">Commission Amount</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-green-500 rounded text-white text-sm focus:outline-none focus:border-green-400"
                        data-schema-key="selling_commission_amount"
                        value={sellingCommission.commission_amount}
                        onChange={(e) => handleSellingInputChange('commission_amount', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Commission Paid By */}
                <div className="bg-gray-700 px-5 py-4 border-t border-gray-600">
                  <label className="block text-sm text-gray-300 mb-3">Commission Paid By</label>
                  <div className="flex bg-gray-600 border border-gray-500 rounded overflow-hidden">
                    <PaymentButton
                      label="Buyer"
                      value="borrower"
                      currentValue={sellingCommission.who_pays}
                      onClick={(value) => handleSellingInputChange('who_pays', value)}
                    />
                    <PaymentButton
                      label="Seller"
                      value="seller"
                      currentValue={sellingCommission.who_pays}
                      onClick={(value) => handleSellingInputChange('who_pays', value)}
                    />
                    <PaymentButton
                      label="Split"
                      value="split"
                      currentValue={sellingCommission.who_pays}
                      onClick={(value) => handleSellingInputChange('who_pays', value)}
                    />
                  </div>
                  <input 
                    type="hidden" 
                    data-schema-key="selling_commission_who_pays_parent" 
                    value={sellingCommission.who_pays}
                  />
                </div>
              </div>
            </section>
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

export default EarnestCommissions;