import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const navigate = useNavigate();

  const orders = [
    { id: '1', orderNumber: 'ORD-001', property: '123 Main St', buyer: 'John Doe', status: 'active', closingDate: '2025-01-20' },
    { id: '2', orderNumber: 'ORD-002', property: '456 Oak Ave', buyer: 'Jane Smith', status: 'pending', closingDate: '2025-01-22' },
    { id: '3', orderNumber: 'ORD-003', property: '789 Pine Rd', buyer: 'Bob Johnson', status: 'completed', closingDate: '2025-01-10' },
  ];

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
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium">{order.orderNumber}</td>
                  <td className="p-4 text-sm">{order.property}</td>
                  <td className="p-4 text-sm">{order.buyer}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      order.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{order.closingDate}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;