import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { useOrderData } from '../../hooks/useOrderData';
import { generateClosingDisclosure, generateSettlementStatement } from '../../services/pdfGenerator';
import type { OrderData } from '../../types/schema';

interface DocumentPreviewProps {
  orderId?: string;
  documentType: 'closing-disclosure' | 'settlement-statement' | 'all';
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ orderId, documentType = 'all' }) => {
  const { orderData, loading } = useOrderData();
  const [selectedDocument, setSelectedDocument] = useState<'closing-disclosure' | 'settlement-statement'>('closing-disclosure');
  const [showPreview, setShowPreview] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <i className="fa fa-spinner fa-spin text-2xl text-gray-400"></i>
        <span className="ml-3 text-gray-400">Loading order data...</span>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="bg-yellow-900 border border-yellow-700 text-yellow-300 px-4 py-3 rounded">
        <i className="fa fa-exclamation-triangle mr-2"></i>
        No order data available. Please save order information first.
      </div>
    );
  }

  const getDocument = () => {
    switch (selectedDocument) {
      case 'closing-disclosure':
        return generateClosingDisclosure(orderData);
      case 'settlement-statement':
        return generateSettlementStatement(orderData);
      default:
        return generateClosingDisclosure(orderData);
    }
  };

  const getFileName = () => {
    const orderNumber = orderData.order_number || 'order';
    const date = new Date().toISOString().split('T')[0];
    switch (selectedDocument) {
      case 'closing-disclosure':
        return `closing-disclosure-${orderNumber}-${date}.pdf`;
      case 'settlement-statement':
        return `settlement-statement-${orderNumber}-${date}.pdf`;
      default:
        return `document-${orderNumber}-${date}.pdf`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Selection */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Select Document Type</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedDocument('closing-disclosure')}
            className={`px-4 py-2 rounded ${
              selectedDocument === 'closing-disclosure'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <i className="fa fa-file-contract mr-2"></i>
            Closing Disclosure
          </button>
          <button
            onClick={() => setSelectedDocument('settlement-statement')}
            className={`px-4 py-2 rounded ${
              selectedDocument === 'settlement-statement'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <i className="fa fa-file-invoice-dollar mr-2"></i>
            Settlement Statement (HUD-1)
          </button>
        </div>
      </div>

      {/* Document Actions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Document Actions</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <i className={`fa fa-${showPreview ? 'eye-slash' : 'eye'}`}></i>
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>

          <BlobProvider document={getDocument()}>
            {({ blob, url, loading: pdfLoading, error }) => {
              if (pdfLoading) {
                return (
                  <button disabled className="bg-gray-600 text-gray-400 px-4 py-2 rounded flex items-center gap-2">
                    <i className="fa fa-spinner fa-spin"></i>
                    Generating PDF...
                  </button>
                );
              }
              if (error) {
                return (
                  <button disabled className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <i className="fa fa-exclamation-triangle"></i>
                    Error generating PDF
                  </button>
                );
              }
              return (
                <a
                  href={url || '#'}
                  download={getFileName()}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <i className="fa fa-download"></i>
                  Download PDF
                </a>
              );
            }}
          </BlobProvider>

          <button
            onClick={() => window.print()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <i className="fa fa-print"></i>
            Print
          </button>

          <BlobProvider document={getDocument()}>
            {({ blob, url, loading: pdfLoading }) => {
              if (pdfLoading || !url) return null;
              return (
                <button
                  onClick={() => {
                    // Create email with PDF attachment link
                    const subject = encodeURIComponent(`${getFileName()} - ${orderData.order_number || 'Order'}`);
                    const body = encodeURIComponent(`Please find the attached ${selectedDocument.replace('-', ' ')} document.\n\nOrder: ${orderData.order_number || 'N/A'}\nProperty: ${orderData.properties_data?.address_1 || 'N/A'}`);
                    window.location.href = `mailto:?subject=${subject}&body=${body}`;
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <i className="fa fa-envelope"></i>
                  Email
                </button>
              );
            }}
          </BlobProvider>
        </div>
      </div>

      {/* Document Preview */}
      {showPreview && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Preview: {selectedDocument === 'closing-disclosure' ? 'Closing Disclosure' : 'Settlement Statement'}
          </h3>
          <div className="bg-white rounded" style={{ height: '800px' }}>
            <PDFViewer width="100%" height="100%" showToolbar={true}>
              {getDocument()}
            </PDFViewer>
          </div>
        </div>
      )}

      {/* Document Information */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Document Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Order Number:</span>
            <span className="text-white">{orderData.order_number || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Property Address:</span>
            <span className="text-white">{orderData.properties_data?.address_1 || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Closing Date:</span>
            <span className="text-white">{orderData.cdf_data?.closing_information?.closing_date || 'TBD'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Loan Amount:</span>
            <span className="text-white">
              ${parseFloat(orderData.cdf_data?.loans?.[0]?.initial_loan_amount || '0').toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Document Type:</span>
            <span className="text-white">
              {selectedDocument === 'closing-disclosure' ? 'TRID Closing Disclosure' : 'HUD-1 Settlement Statement'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Generated:</span>
            <span className="text-white">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-yellow-900 border border-yellow-700 text-yellow-300 px-4 py-3 rounded text-sm">
        <i className="fa fa-info-circle mr-2"></i>
        <strong>Important:</strong> These documents are generated based on the current order data. 
        Please ensure all information is accurate and complete before distributing. 
        The Closing Disclosure must be provided to the borrower at least 3 business days before closing.
      </div>
    </div>
  );
};

export default DocumentPreview;