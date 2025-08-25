import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import orderService from '../services/orderService';
import type { Order } from '../services/orderService';

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Page Header */}
      <div className="py-8 px-10 pb-5 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <i className="fa fa-folder text-gray-500 text-xl"></i>
          <h2 className="text-2xl font-semibold text-gray-900">Orders</h2>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium text-white transition-colors">
          <i className="fa fa-plus mr-2"></i>
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="px-10 py-6 border-b border-gray-200">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="flex-1 max-w-md px-4 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          />
          <select className="px-4 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-10">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-sm font-medium text-gray-600">Order Number</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Property Address</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Buyer</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Closing Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">Loading orders...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-red-500">{error}</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">No orders found</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 text-sm font-medium">{order.orderNumber}</td>
                    <td className="p-4 text-sm">{order.propertyAddress || 'Not specified'}</td>
                    <td className="p-4 text-sm">
                      {order.contactsData?.borrowers?.[0]?.name || 
                       order.cdfData?.borrower_info?.borrowers?.[0]?.name || 
                       'Not specified'}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        order.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'in_review' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'closing' ? 'bg-purple-500/20 text-purple-400' :
                        order.status === 'closed' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {order.closingDate ? new Date(order.closingDate).toLocaleDateString() : 'Not set'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/orders/${order.id}/basic-info`)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        <i className="fa fa-edit mr-1"></i>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;