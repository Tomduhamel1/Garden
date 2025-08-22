import React, { useState } from 'react';
import CalculationSummary from '../components/widgets/CalculationSummary';

interface Order {
  id: string;
  orderNumber: string;
  address: string;
  buyer: string;
  seller: string;
  lender: string;
  transactionType: string;
  closingDate: string;
  activeMilestone: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'queue' | 'tasks' | 'notifications'>('orders');

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'deb test train',
      address: '108 Virginia Drive, Sumter, SC',
      buyer: 'deb & jamie test',
      seller: 'john doe',
      lender: 'Allied First',
      transactionType: 'Purchase',
      closingDate: 'Oct 27, 2022',
      activeMilestone: 'Order Opening'
    },
    {
      id: '2',
      orderNumber: 'WickedSmtNotary',
      address: '-',
      buyer: '-',
      seller: '-',
      lender: '-',
      transactionType: 'Project File',
      closingDate: '-',
      activeMilestone: '-'
    },
    {
      id: '3',
      orderNumber: 'Reconveyance',
      address: '123 main street te, Newport, RI',
      buyer: '-',
      seller: '-',
      lender: 'Shoreham Bank',
      transactionType: 'Title-1 Trustee',
      closingDate: '-',
      activeMilestone: 'Post-Closing'
    },
    {
      id: '4',
      orderNumber: 'Pre-40-FL',
      address: '4100 West Firewood Loop, Citrus Springs, FL',
      buyer: 'TBD',
      seller: '-',
      lender: 'TBD',
      transactionType: 'Refinance',
      closingDate: '-',
      activeMilestone: 'Order Opening'
    },
    {
      id: '5',
      orderNumber: 'Pre-39-FL',
      address: '3577 North Pine Valley Loop, Lecanto, FL',
      buyer: 'tbd tbd',
      seller: 'Jose Ramirez',
      lender: '-',
      transactionType: 'Purchase',
      closingDate: 'Mar 7, 2025',
      activeMilestone: 'Order Opening'
    }
  ];

  const handleCreateOrder = () => {
    // Handle create order functionality
    console.log('Create new order');
  };

  return (
    <div className="flex-1 bg-gray-900 overflow-y-auto">
      {/* Dashboard Tabs */}
      <section className="border-b border-gray-600">
        <div className="flex justify-between">
          <div className="flex">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 ${activeTab === 'orders' ? 'bg-gray-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'} border-r border-gray-600 flex items-center gap-2`}
            >
              <i className="fas fa-search text-sm"></i>
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-6 py-4 ${activeTab === 'queue' ? 'bg-gray-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'} border-r border-gray-600 flex items-center gap-2`}
            >
              <i className="fas fa-file text-sm"></i>
              <span>Order Queue</span>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-6 py-4 ${activeTab === 'tasks' ? 'bg-gray-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'} border-r border-gray-600 flex items-center gap-2`}
            >
              <i className="fas fa-tasks text-sm"></i>
              <span>Tasks</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 ${activeTab === 'notifications' ? 'bg-gray-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'} flex items-center gap-2`}
            >
              <i className="fas fa-bell text-sm"></i>
              <span>Notifications</span>
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">0</span>
            </button>
          </div>
          <div className="px-6 py-4">
            <button 
              onClick={handleCreateOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2"
            >
              <i className="fas fa-plus text-sm"></i>
              Create Order
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <section className="p-6">
          {/* Calculation Summary Widget */}
          <div className="mb-6">
            <CalculationSummary compact={true} />
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Orders</h3>
            <div className="hidden bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded text-sm">
              <span className="message"></span>
              <span className="result-count"></span>
              <button className="ml-3 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs">
                Clear all filters
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 border border-gray-600 rounded">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <th className="px-4 py-3 text-left text-white font-medium border-r border-gray-600">
                    <div className="flex items-center gap-2 cursor-pointer">
                      Order #
                      <i className="fas fa-sort-down text-xs"></i>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-white font-medium border-r border-gray-600">Address</th>
                  <th className="px-4 py-3 text-left text-white font-medium border-r border-gray-600">Buyer</th>
                  <th className="px-4 py-3 text-left text-white font-medium border-r border-gray-600">Seller</th>
                  <th className="px-4 py-3 text-left text-white font-medium border-r border-gray-600">Lender</th>
                  <th className="px-4 py-3 text-left text-white font-medium border-r border-gray-600">Transaction Type</th>
                  <th className="px-4 py-3 text-left text-white font-medium border-r border-gray-600">Closing Date</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Active Milestone</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-600 hover:bg-gray-750 cursor-pointer">
                    <td className="px-4 py-3 border-r border-gray-600 text-white font-medium">{order.orderNumber}</td>
                    <td className={`px-4 py-3 border-r border-gray-600 ${order.address === '-' ? 'text-gray-500' : 'text-white'}`}>
                      {order.address}
                    </td>
                    <td className={`px-4 py-3 border-r border-gray-600 ${order.buyer === '-' ? 'text-gray-500' : 'text-white'}`}>
                      {order.buyer}
                    </td>
                    <td className={`px-4 py-3 border-r border-gray-600 ${order.seller === '-' ? 'text-gray-500' : 'text-white'}`}>
                      {order.seller}
                    </td>
                    <td className={`px-4 py-3 border-r border-gray-600 ${order.lender === '-' ? 'text-gray-500' : 'text-white'}`}>
                      {order.lender}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-600 text-white">{order.transactionType}</td>
                    <td className={`px-4 py-3 border-r border-gray-600 ${order.closingDate === '-' ? 'text-gray-500' : 'text-white'}`}>
                      {order.closingDate}
                    </td>
                    <td className={`px-4 py-3 ${order.activeMilestone === '-' ? 'text-gray-500' : 'text-white'}`}>
                      {order.activeMilestone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Page 1 of 276
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-gray-700 text-gray-500 rounded cursor-not-allowed" disabled>
                <i className="fas fa-angle-left"></i>
              </button>
              <button className="px-3 py-2 bg-gray-700 text-white rounded">
                1
              </button>
              <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-gray-300 rounded">
                2
              </button>
              <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-gray-300 rounded">
                3
              </button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-gray-300 rounded">
                276
              </button>
              <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-gray-300 rounded">
                <i className="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Order Queue Tab */}
      {activeTab === 'queue' && (
        <section className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Order Queue</h3>
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-file text-4xl mb-4"></i>
            <p>No orders in queue</p>
          </div>
        </section>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <section className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Tasks</h3>
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-tasks text-4xl mb-4"></i>
            <p>No tasks assigned</p>
          </div>
        </section>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <section className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Notifications</h3>
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-bell text-4xl mb-4"></i>
            <p>No new notifications</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;