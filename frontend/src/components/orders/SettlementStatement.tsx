import React, { useState, useEffect } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const styles = `
  .document-viewer {
    background: #374151;
    min-height: 100vh;
    padding: 20px 0;
  }
  
  .document-page {
    background: white;
    color: #000;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin: 20px auto;
    width: 8.5in;
    min-height: 11in;
    padding: 0.5in;
    font-size: 11px;
    line-height: 1.4;
    position: relative;
    font-family: Arial, sans-serif;
    border-radius: 4px;
  }
  
  .document-page * {
    color: #000;
  }
  
  .page-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }
  
  .page-header h1 {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    margin: 0;
  }
  
  .file-overview {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
    font-size: 10px;
  }
  
  .file-overview p {
    margin: 5px 0;
  }
  
  .file-overview .label {
    font-weight: bold;
    display: inline-block;
    min-width: 80px;
  }
  
  .settlement-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 10px;
  }
  
  .settlement-table th,
  .settlement-table td {
    border: 1px solid #000;
    padding: 4px 6px;
    vertical-align: top;
  }
  
  .settlement-table thead tr:first-child th {
    background-color: #e0e0e0;
    height: 15px;
  }
  
  .settlement-table thead tr:nth-child(2) th {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: center;
  }
  
  .settlement-table thead tr:nth-child(3) th {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: center;
    font-size: 9px;
  }
  
  .settlement-table .header-row td {
    background-color: #f0f0f0;
    font-weight: bold;
    text-align: center;
  }
  
  .settlement-table .totals-row td {
    background-color: #f8f8f8;
    font-weight: bold;
  }
  
  .settlement-table .final-totals-row td {
    background-color: #e0e0e0;
    font-weight: bold;
  }
  
  .amount {
    text-align: right;
  }
  
  .signature-block {
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #000;
  }
  
  .signature-block h3 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .signature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin: 20px 0;
  }
  
  .signature-line {
    border-bottom: 1px solid #000;
    height: 30px;
    margin-bottom: 5px;
  }
  
  .signature-text {
    font-size: 9px;
    text-align: center;
  }
  
  .document-footer {
    position: absolute;
    bottom: 0.3in;
    left: 0.5in;
    right: 0.5in;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 8px;
    border-top: 1px solid #000;
    padding-top: 5px;
  }
  
  .document-footer .left {
    text-align: left;
  }
  
  .document-footer .center {
    text-align: center;
  }
  
  .document-footer .right {
    text-align: right;
  }
  
  @media print {
    .document-viewer {
      background: white;
      padding: 0;
    }
    .document-page {
      box-shadow: none;
      margin: 0;
      page-break-after: always;
    }
    .document-page:last-child {
      page-break-after: auto;
    }
  }
`;

const SettlementStatement: React.FC = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const [statementType, setStatementType] = useState('standard');
  const [viewType, setViewType] = useState('combined');
  const [acknowledgementType, setAcknowledgementType] = useState('with_ack');
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const toggleFullscreen = () => {
    const elem = document.querySelector('.document-viewer');
    if (elem) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        elem.requestFullscreen();
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    // Inject styles
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    // Update page counter based on scroll
    const handleScroll = () => {
      const documentPages = document.querySelectorAll('.document-page');
      const viewportHeight = window.innerHeight;
      
      documentPages.forEach((page, index) => {
        const rect = page.getBoundingClientRect();
        const pageCenter = rect.top + (rect.height / 2);
        
        if (pageCenter >= 0 && pageCenter <= viewportHeight) {
          setCurrentPage(index + 1);
        }
      });
    };

    const scrollContainer = document.querySelector('.document-viewer')?.parentElement;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-6 px-8 pb-4 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="fa fa-file-text text-gray-400 text-xl"></i>
              <div>
                <div className="flex items-center gap-2">
                  <select 
                    className="bg-gray-700 text-white px-3 py-1 rounded text-sm border border-gray-600"
                    value={statementType}
                    onChange={(e) => setStatementType(e.target.value)}
                  >
                    <option value="standard">Standard</option>
                    <option value="estimated">Estimated</option>
                    <option value="final">Final</option>
                  </select>
                  <select 
                    className="bg-gray-700 text-white px-3 py-1 rounded text-sm border border-gray-600"
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                  >
                    <option value="combined">Combined Settlement Statement</option>
                    <option value="buyer">Buyer's Settlement Statement</option>
                    <option value="seller">Seller's Settlement Statement</option>
                  </select>
                  <select 
                    className="bg-gray-700 text-white px-3 py-1 rounded text-sm border border-gray-600"
                    value={acknowledgementType}
                    onChange={(e) => setAcknowledgementType(e.target.value)}
                  >
                    <option value="with_ack">with Acknowledgement</option>
                    <option value="without_ack">without Acknowledgement</option>
                  </select>
                  <span className="text-sm text-gray-400">
                    Page <span className="text-white">{currentPage}</span> of <span className="text-white">2</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={saveOrderData}
                disabled={saving}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title="Save Data"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <i className="fa fa-save"></i>
                )}
              </button>
              <button 
                type="button" 
                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded" 
                title="Print"
                onClick={handlePrint}
              >
                <i className="fa fa-print"></i>
              </button>
              <button type="button" className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded" title="Save to Documents">
                <i className="fa fa-save"></i>
              </button>
              <button type="button" className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded" title="Download">
                <i className="fa fa-download"></i>
              </button>
              <button 
                type="button" 
                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded" 
                title="Fullscreen"
                onClick={toggleFullscreen}
              >
                <i className="fa fa-expand"></i>
              </button>
              <button 
                type="button" 
                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded" 
                title="Zoom In"
                onClick={zoomIn}
              >
                <i className="fa fa-plus"></i>
              </button>
              <button 
                type="button" 
                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded" 
                title="Zoom Out"
                onClick={zoomOut}
              >
                <i className="fa fa-minus"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Document Viewer */}
        <section className="document-viewer">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
          <>
          {/* Page 1 */}
          <div className="document-page" data-page="1" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', marginBottom: `${20 * zoomLevel}px` }}>
            {/* Page Header */}
            <div className="page-header">
              <div>
                <p><strong>First National Title & Escrow</strong></p>
                <p>ALTA Universal ID:</p>
                <p>501 Centerville Road<br />Suite 102<br />Warwick, RI 02886</p>
                <p>(401) 847-3080</p>
              </div>
              <div>
                <h1>ALTA Combined<br />Settlement Statement</h1>
              </div>
            </div>

            {/* File Overview */}
            <div className="file-overview">
              <div>
                <p><span className="label">File #:</span> TomTestCD</p>
                <p><span className="label">Print Date & Time:</span> 07/31/2025 at 07:27 PM PDT</p>
                <p><span className="label">Escrow Officer:</span><br /></p>
                <p><span className="label">Settlement Location:</span> 501 Centerville Road<br />Suite 102<br />Warwick, RI, 02886</p>
              </div>
              <div>
                <p><span className="label">Property</span><br />123 TEST TOM FILE CD<br />Warwick, RI 02886</p>
                <p><span className="label">Buyer</span><br />Tom TEST TOM TEST<br />120 Fraser Ave<br />Santa Monica, CA 90405</p>
                <p><span className="label">Seller</span><br /></p>
                <p><span className="label">Lender</span><br /></p>
              </div>
              <div>
                <p><span className="label">Settlement Date</span><br />03/21/2025</p>
                <p><span className="label">Disbursement Date</span><br /></p>
              </div>
            </div>

            {/* Settlement Table */}
            <table className="settlement-table">
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '52%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan={5}></th>
                </tr>
                <tr>
                  <th colSpan={2}>Seller</th>
                  <th></th>
                  <th colSpan={2}>Buyer</th>
                </tr>
                <tr>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th></th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                {/* Financial Section */}
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Financial</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td className="amount">$500,000.00</td>
                  <td>Sale Price of Property</td>
                  <td className="amount">$500,000.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Lender Credit</td>
                  <td></td>
                  <td className="amount">$500.00</td>
                </tr>

                {/* Prorations/Adjustments Section */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Prorations/Adjustments</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="amount">$44.44</td>
                  <td></td>
                  <td>City/Town Taxes 03/20/2025 to 03/21/2025</td>
                  <td></td>
                  <td className="amount">$44.44</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="amount">$1,033.00</td>
                  <td>Title Policy Adjustment</td>
                  <td className="amount">$1,033.00</td>
                  <td></td>
                </tr>

                {/* Loan Charges Section */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Loan Charges</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Closing Protection Letter to First National Title & Escrow</td>
                  <td className="amount">$50.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Courier Fee to First National Title & Escrow</td>
                  <td className="amount">$50.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Municipal Lien Certificate to First National Title & Escrow</td>
                  <td className="amount">$25.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Settlement or Closing Fee to First National Title & Escrow</td>
                  <td className="amount">$550.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Wire Verification Fee to First National Title & Escrow</td>
                  <td className="amount">$25.00</td>
                  <td></td>
                </tr>

                {/* Impounds Section */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Impounds</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Aggregate adjustment</td>
                  <td></td>
                  <td className="amount">$500.00</td>
                </tr>

                {/* Government Recording and Transfer Charges Section */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Government Recording and Transfer Charges</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="amount">$230.00</td>
                  <td></td>
                  <td>State Transfer Taxes (Deed) to City of Warwick</td>
                  <td></td>
                  <td></td>
                </tr>

                {/* Commission Section */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Commission</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="amount">$10,000.00</td>
                  <td></td>
                  <td>Listing Agent Commission</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="amount">$10,000.00</td>
                  <td></td>
                  <td>Selling Agent Commission</td>
                  <td></td>
                  <td></td>
                </tr>

                {/* Title Charges & Escrow / Settlement Charges Section */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Title Charges & Escrow / Settlement Charges</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Title Search Fee to First National Title & Escrow</td>
                  <td className="amount">$350.00</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Title - Owner's Title Policy to CATIC</td>
                  <td className="amount">$1,008.00</td>
                  <td></td>
                </tr>

                {/* Miscellaneous Section */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="header-row">
                  <td></td>
                  <td></td>
                  <td>Miscellaneous</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="amount">$500.00</td>
                  <td></td>
                  <td>Sewer Charges to First National Title & Escrow</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="amount">$500.00</td>
                  <td></td>
                  <td>Water Charges to First National Title & Escrow</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="amount">$25.00</td>
                  <td></td>
                  <td>Wire Verification Fee to First National Title & Escrow</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            {/* Document Footer */}
            <div className="document-footer">
              <div className="left">
                Produced by First National Title & Escrow<br />
                Using Qualia
              </div>
              <div className="center">
                Page <span>1</span> of <span>2</span>
              </div>
              <div className="right">
                File # TomTestCD<br />
                Printed on 07/31/2025 at 07:27 PM PDT
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div className="document-page" data-page="2" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', marginBottom: `${20 * zoomLevel}px` }}>
            {/* Totals Table */}
            <table className="settlement-table">
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '52%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan={5}></th>
                </tr>
                <tr>
                  <th colSpan={2}>Seller</th>
                  <th></th>
                  <th colSpan={2}>Buyer</th>
                </tr>
                <tr>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th></th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="totals-row">
                  <td className="amount">$21,299.44</td>
                  <td className="amount">$501,033.00</td>
                  <td>Subtotals</td>
                  <td className="amount">$503,091.00</td>
                  <td className="amount">$1,044.44</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Due from Buyer</td>
                  <td></td>
                  <td className="amount"><strong>$502,046.56</strong></td>
                </tr>
                <tr>
                  <td className="amount"><strong>$479,733.56</strong></td>
                  <td></td>
                  <td>Due to Seller</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="final-totals-row">
                  <td className="amount">$501,033.00</td>
                  <td className="amount">$501,033.00</td>
                  <td>Totals</td>
                  <td className="amount">$503,091.00</td>
                  <td className="amount">$503,091.00</td>
                </tr>
              </tbody>
            </table>

            {/* Signature Block */}
            <div className="signature-block">
              <h3>Acknowledgement</h3>
              <p>We/I have carefully reviewed the Settlement Statement and find it to be a true and accurate statement of all receipts and disbursements made on my account or by me in this transaction and further certify that I have received a copy of the Settlement Statement.</p>
              <p>We/I authorize <u>First National Title & Escrow</u> to cause the funds to be disbursed in accordance with this statement.</p>
              
              <div className="signature-grid">
                <div>
                  <div className="signature-line"></div>
                  <div className="signature-text">Date</div>
                  <div className="signature-text">Tom TEST TOM TEST</div>
                </div>
                <div>
                  <div className="signature-line"></div>
                  <div className="signature-text">Date</div>
                  <div className="signature-text">&nbsp;</div>
                </div>
              </div>

              <div className="signature-grid">
                <div>
                  <div className="signature-line"></div>
                  <div className="signature-text">Date</div>
                  <div className="signature-text">Settlement Agent</div>
                </div>
                <div></div>
              </div>
            </div>

            <div className="document-footer">
              <div className="left">
                Produced by First National Title & Escrow<br />
                Using Qualia
              </div>
              <div className="center">
                Page <span>2</span> of <span>2</span>
              </div>
              <div className="right">
                File # TomTestCD<br />
                Printed on 07/31/2025 at 07:27 PM PDT
              </div>
            </div>
          </div>
          </>
          )}
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        {/* Chat */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-down text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Chat</h4>
          </div>
          <div className="text-xs text-gray-400">Chat functionality...</div>
        </section>

        {/* Tasks */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-right text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Tasks</h4>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">0 / 0</span>
          </div>
          <div className="text-xs text-gray-400 p-3 bg-gray-700 rounded">
            You have not been assigned any tasks on this order
          </div>
        </section>

        {/* Notes */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-right text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Notes</h4>
          </div>
          <div className="text-xs text-gray-400 p-3 bg-gray-700 rounded mb-3">
            No notes have been added to this page
          </div>
          <button type="button" className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded">
            Add Note
          </button>
        </section>
      </section>
    </>
  );
};

export default SettlementStatement;