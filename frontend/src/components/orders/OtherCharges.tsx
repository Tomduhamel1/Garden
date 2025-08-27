import React, { useState } from 'react';
import { useOrderDataContext } from '../../contexts/OrderDataContext';
import { FeeAutocomplete } from '../common/FeeAutocomplete';

interface PaymentType {
  value: string;
  label: string;
}

const OtherCharges: React.FC = () => {
  const { loading, saving, getValue, handleInputChange, handleFieldChange, handleSave } = useOrderDataContext();
  
  // Log to verify we're using the shared context
  React.useEffect(() => {
    console.log('🎯 OtherCharges - line_01 description:', getValue('cdfData.other_charges.line_01.description'));
    console.log('🎯 OtherCharges - line_01 borrower_amount:', getValue('cdfData.other_charges.line_01.borrower_amount'));
  }, [getValue('cdfData.other_charges.line_01.description')]);
  const [taxableToggle, setTaxableToggle] = useState(false);
  const [activePaymentType, setActivePaymentType] = useState('check');

  const paymentTypes: PaymentType[] = [
    { value: 'check', label: 'Check' },
    { value: 'wire', label: 'Wire' },
    { value: 'net-funded', label: 'Net Funded' },
    { value: 'aggregate', label: 'Aggregate' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'holdback', label: 'Holdback' },
  ];

  const renderTableRow = (lineNumber: number) => {
    const paddedLine = lineNumber.toString().padStart(2, '0');
    const lineKey = `line_${paddedLine}`; // Use line_01, line_02 format

    return (
      <tr 
        key={lineNumber}
        className="border-b border-gray-700 hover:bg-gray-750 focus-within:bg-gray-750"
      >
        <td className="py-2 px-3">
          <FeeAutocomplete
            value={getValue(`cdfData.other_charges.${lineKey}.description`) || ''}
            onChange={(value) => {
              handleFieldChange(`cdfData.other_charges.${lineKey}.description`, value);
            }}
            placeholder="Enter description..."
            className="!bg-gray-700 !border-gray-600 text-sm"
            data-schema-key={`cdfData.other_charges.${lineKey}.description`}
          />
        </td>
        <td className="py-2 px-3">
          <input 
            type="text" 
            value={getValue(`cdfData.other_charges.${lineKey}.payee_name`) || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Payee name"
            data-schema-key={`cdfData.other_charges.${lineKey}.payee_name`}
          />
        </td>
        <td className="py-2 px-3">
          <input 
            type="text" 
            inputMode="decimal"
            value={getValue(`cdfData.other_charges.${lineKey}.borrower_amount`) || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            data-schema-key={`cdfData.other_charges.${lineKey}.borrower_amount`}
          />
        </td>
        <td className="py-2 px-3">
          <input 
            type="text" 
            inputMode="decimal"
            value={getValue(`cdfData.other_charges.${lineKey}.borrower_poc_amount`) || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            data-schema-key={`cdfData.other_charges.${lineKey}.borrower_poc_amount`}
          />
        </td>
        <td className="py-2 px-3">
          <input 
            type="text" 
            inputMode="decimal"
            value={getValue(`cdfData.other_charges.${lineKey}.seller_amount`) || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            data-schema-key={`cdfData.other_charges.${lineKey}.seller_amount`}
          />
        </td>
        <td className="py-2 px-3">
          <input 
            type="text" 
            inputMode="decimal"
            value={getValue(`cdfData.other_charges.${lineKey}.seller_poc_amount`) || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            data-schema-key={`cdfData.other_charges.${lineKey}.seller_poc_amount`}
          />
        </td>
        <td className="py-2 px-3">
          <input 
            type="text" 
            inputMode="decimal"
            value={getValue(`cdfData.other_charges.${lineKey}.other_amount`) || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            data-schema-key={`cdfData.other_charges.${lineKey}.other_amount`}
          />
        </td>
      </tr>
    );
  };

  const renderPaymentContent = () => {
    switch (activePaymentType) {
      case 'check':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Memo</label>
              <textarea 
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Check memo"
                data-schema-key="cdf.other_charges_payment.check.memo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mailing Address</label>
              <textarea 
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Mailing address"
                data-schema-key="cdf.other_charges_payment.check.mailing_address"
              />
            </div>
          </div>
        );

      case 'wire':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Memo</label>
              <textarea 
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Wire memo"
                data-schema-key="cdf.other_charges_payment.wire.memo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Wire Instructions</label>
              <textarea 
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={6}
                placeholder="Wire instructions"
                data-schema-key="cdf.other_charges_payment.wire.instructions"
              />
            </div>
          </div>
        );

      case 'net-funded':
        return null;

      case 'aggregate':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Payee (Global Payment)</label>
              <select 
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                data-schema-key="cdf.other_charges_payment.aggregate.global_payee"
              >
                <option value="">Select global payee</option>
                <option value="title-company">Title Company</option>
                <option value="escrow-company">Escrow Company</option>
                <option value="attorney">Attorney</option>
                <option value="settlement-agent">Settlement Agent</option>
              </select>
            </div>
          </div>
        );

      case 'transfer':
        return (
          <div className="bg-gray-750 rounded-lg p-4">
            <h3 className="text-md font-medium text-white mb-4">Order Transfer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Transfer Type</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-schema-key="cdf.other_charges_payment.transfer.type"
                >
                  <option value="">Select transfer type</option>
                  <option value="wire">Wire Transfer</option>
                  <option value="ach">ACH Transfer</option>
                  <option value="check">Cashier's Check</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Processing Fee</label>
                <input 
                  type="text" 
                  inputMode="decimal"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  data-schema-key="cdf.other_charges_payment.transfer.processing_fee"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Transfer Instructions</label>
                <textarea 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Transfer instructions"
                  data-schema-key="cdf.other_charges_payment.transfer.instructions"
                />
              </div>
            </div>
          </div>
        );

      case 'holdback':
        return (
          <div className="bg-gray-750 rounded-lg p-4">
            <h3 className="text-md font-medium text-white mb-4">Escrow Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Holdback Reason</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-schema-key="cdf.other_charges_payment.holdback.reason"
                >
                  <option value="">Select reason</option>
                  <option value="repairs">Repairs</option>
                  <option value="title-issues">Title Issues</option>
                  <option value="survey">Survey</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Release Date</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-schema-key="cdf.other_charges_payment.holdback.release_date"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Release Conditions</label>
                <textarea 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Conditions for release of holdback funds"
                  data-schema-key="cdf.other_charges_payment.holdback.release_conditions"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <header className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Other Charges</h1>
              <button
                onClick={handleSave}
                disabled={loading || saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
              >
                {saving && <i className="fa fa-spinner fa-spin"></i>}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </header>
            
            {loading && (
              <div className="flex items-center justify-center py-8">
                <i className="fa fa-spinner fa-spin text-2xl text-gray-400"></i>
                <span className="ml-3 text-gray-400">Loading...</span>
              </div>
            )}
            
            {!loading && (
            <>
            {/* Line Items Section */}
            <section className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Line Items</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Add Line Item
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-3 text-gray-300 font-medium text-sm">Description</th>
                      <th className="text-left py-3 px-3 text-gray-300 font-medium text-sm">Payee Name</th>
                      <th className="text-center py-3 px-3 text-gray-300 font-medium text-sm" style={{minWidth: '110px'}}>Borrower<br/>At Closing</th>
                      <th className="text-center py-3 px-3 text-gray-300 font-medium text-sm" style={{minWidth: '110px'}}>Borrower<br/>Before Closing</th>
                      <th className="text-center py-3 px-3 text-gray-300 font-medium text-sm" style={{minWidth: '110px'}}>Seller<br/>At Closing</th>
                      <th className="text-center py-3 px-3 text-gray-300 font-medium text-sm" style={{minWidth: '110px'}}>Seller<br/>Before Closing</th>
                      <th className="text-center py-3 px-3 text-gray-300 font-medium text-sm" style={{minWidth: '110px'}}>By Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(lineNumber => renderTableRow(lineNumber))}
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* Settings Section */}
            <section className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
              
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={taxableToggle}
                    onChange={(e) => setTaxableToggle(e.target.checked)}
                    data-schema-key="cdf.other_charges_settings.line_is_taxable"
                  />
                  <div className="relative">
                    <div className={`block w-14 h-8 rounded-full ${taxableToggle ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
                    <div 
                      className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"
                      style={{ transform: taxableToggle ? 'translateX(1.5rem)' : 'translateX(0)' }}
                    />
                  </div>
                  <span className="ml-3 text-gray-300">Line is Taxable</span>
                </label>
              </div>
            </section>
            
            {/* Payment Section */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Payment - Listing Agent Commission</h2>
              
              {/* Payment Type Tabs */}
              <div className="border-b border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {paymentTypes.map(type => (
                    <button 
                      key={type.value}
                      type="button" 
                      className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activePaymentType === type.value 
                          ? 'border-blue-500 text-blue-400' 
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                      }`}
                      onClick={() => setActivePaymentType(type.value)}
                    >
                      {type.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Standard Payment Fields (shown for most payment types) */}
              {activePaymentType !== 'aggregate' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                    <input 
                      type="text" 
                      inputMode="decimal"
                      value={getValue('cdf.other_charges_payment.amount')}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      data-schema-key="cdf.other_charges_payment.amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Payee</label>
                    <select 
                      value={getValue('cdf.other_charges_payment.payee')}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="cdf.other_charges_payment.payee"
                    >
                      <option value="">Select payee</option>
                      <option value="listing-agent">Listing Agent</option>
                      <option value="selling-agent">Selling Agent</option>
                      <option value="title-company">Title Company</option>
                      <option value="lender">Lender</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="cdf.other_charges_payment.date"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Reference Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Reference number"
                      data-schema-key="cdf.other_charges_payment.reference_number"
                    />
                  </div>
                </div>
              )}
              
              {/* Payment Type Specific Content */}
              {renderPaymentContent()}
            </section>
            </>
          )}
          </div>
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Chat</h4>
          <p className="text-gray-400 text-xs">Chat functionality</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Tasks</h4>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">0 / 0</span>
          </div>
          <p className="text-gray-400 text-xs mt-2">You have not been assigned any tasks on this order</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Notes</h4>
          <p className="text-gray-400 text-xs mb-3">No notes have been added to this page</p>
          <button className="w-full px-3 py-2 bg-transparent border border-gray-500 rounded text-gray-300 text-xs hover:bg-gray-600">
            Add Note
          </button>
        </section>
      </section>
    </>
  );
};

export default OtherCharges;