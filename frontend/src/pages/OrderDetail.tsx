import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BasicInfo from '../components/orders/BasicInfo';

const OrderDetail = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('basic-info');

  const renderSection = () => {
    switch (activeSection) {
      case 'basic-info':
        return <BasicInfo />;
      default:
        return (
          <div className="p-10">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <p className="text-gray-600">Section "{activeSection}" coming soon...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Order Header */}
      <div className="py-6 px-10 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Order #{id}</h1>
            <p className="text-sm text-gray-600 mt-1">123 Main Street, Anytown, ST 12345</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400">
              In Progress
            </span>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
              <i className="fa fa-save mr-2"></i>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Section Content */}
      {renderSection()}
    </div>
  );
};

export default OrderDetail;