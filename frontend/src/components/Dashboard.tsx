import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import type { Order } from '../services/orderService';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const totalSteps = 5;

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

  const showStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleNextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const newOrder = await orderService.createOrder({
          status: 'draft',
          cdfData: {},
          contactsData: {},
          propertiesData: {},
          payoffsData: {}
        });
        setIsModalOpen(false);
        setCurrentStep(1);
        await fetchOrders();
        navigate(`/orders/${newOrder.id}/basic-info`);
      } catch (err: any) {
        alert('Failed to create order: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Navigation Bar */}
      <header className="bg-gray-800 border-b border-gray-600 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
            <i className="fas fa-th-large"></i>
            <span className="font-semibold">Garden</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard" className="px-3 py-1 text-sm text-blue-400">
              Dashboard
            </Link>
            <Link to={orders.length > 0 ? `/orders/${orders[0].id}/basic-info` : "/orders"} className="px-3 py-1 text-sm hover:text-blue-400 transition-colors">
              Orders
            </Link>
            <Link to="/contacts" className="px-3 py-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Contacts
            </Link>
            <Link to="/reports" className="px-3 py-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Reports
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-search"></i>
          </button>
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-bell"></i>
          </button>
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-user-circle text-xl"></i>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
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
                onClick={() => setActiveTab('order-queue')}
                className={`px-6 py-4 ${activeTab === 'order-queue' ? 'bg-gray-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'} border-r border-gray-600 flex items-center gap-2`}
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
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2"
              >
                <i className="fas fa-plus text-sm"></i>
                Create Order
              </button>
            </div>
          </div>
        </section>

        {/* Orders Tab Content */}
        {activeTab === 'orders' && (
          <section className="p-6">
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
              {loading ? (
                <div className="text-center py-8 text-gray-400">
                  <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
                  <p>Loading orders...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <div className="text-red-500 mb-2">
                    <i className="fas fa-exclamation-triangle text-2xl"></i>
                  </div>
                  <p className="text-red-400">{error}</p>
                  <button 
                    onClick={fetchOrders}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Retry
                  </button>
                </div>
              ) : (
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
                      <th className="px-4 py-3 text-left text-white font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                          No orders found. Click "Create Order" to add a new order.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr 
                          key={order.id} 
                          className="border-b border-gray-600 hover:bg-gray-750 cursor-pointer"
                          onClick={() => navigate(`/orders/${order.id}/basic-info`)}
                        >
                          <td className="px-4 py-3 border-r border-gray-600">
                            {order.orderNumber}
                          </td>
                          <td className="px-4 py-3 border-r border-gray-600">
                            {order.propertyAddress || <span className="text-gray-500">-</span>}
                          </td>
                          <td className="px-4 py-3 border-r border-gray-600">
                            {order.contactsData?.borrower_name || <span className="text-gray-500">-</span>}
                          </td>
                          <td className="px-4 py-3 border-r border-gray-600">
                            {order.contactsData?.seller_name || <span className="text-gray-500">-</span>}
                          </td>
                          <td className="px-4 py-3 border-r border-gray-600">
                            {order.cdfData?.lender_name || <span className="text-gray-500">-</span>}
                          </td>
                          <td className="px-4 py-3 border-r border-gray-600">
                            {order.cdfData?.transaction_type || 'Purchase'}
                          </td>
                          <td className="px-4 py-3 border-r border-gray-600">
                            {order.closingDate 
                              ? new Date(order.closingDate).toLocaleDateString() 
                              : <span className="text-gray-500">-</span>}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === 'draft' ? 'bg-green-600' : 
                              order.status === 'closed' ? 'bg-gray-600' : 
                              'bg-yellow-600'
                            }`}>
                              {order.status || 'Draft'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
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
                <button className="px-3 py-2 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">2</button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">3</button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">4</button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">5</button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">6</button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">7</button>
                <span className="px-3 py-2 text-gray-400">...</span>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">276</button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">
                  <i className="fas fa-angle-right"></i>
                </button>
              </div>
            </div>
          </section>
        )}
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <i className="fas fa-comments text-gray-400"></i>
            Chat
          </h4>
          <div className="bg-gray-700 p-3 rounded text-sm text-gray-400">
            No recent messages
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <i className="fas fa-tasks text-gray-400"></i>
            Tasks
          </h4>
          <div className="bg-gray-700 p-3 rounded text-sm text-gray-400">
            No pending tasks
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <i className="fas fa-sticky-note text-gray-400"></i>
            Notes
          </h4>
          <div className="bg-gray-700 p-3 rounded text-sm text-gray-400">
            No notes added
          </div>
        </div>
      </section>

      {/* Create Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <h2 className="text-xl font-semibold text-white">Open a New Order</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Step Progress */}
            <div className="px-6 py-4 border-b border-gray-600">
              <p className="text-gray-300 mb-4">Please enter basic details about this order.</p>
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((step, index) => {
                  const labels = [
                    { icon: 'fa-edit', title: 'Add Basic Info', subtitle: 'Basic' },
                    { icon: 'fa-home', title: 'Add Properties', subtitle: 'Properties' },
                    { icon: 'fa-users', title: 'Add Order Contacts', subtitle: 'Contacts' },
                    { icon: 'fa-user-tie', title: 'Add Seller Info', subtitle: 'Seller' },
                    { icon: 'fa-check', title: 'Confirm & Create', subtitle: 'Confirm' }
                  ];
                  const isActive = step <= currentStep;
                  return (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 ${isActive ? 'bg-blue-600' : 'bg-gray-600'} rounded-full flex items-center justify-center ${isActive ? 'text-white' : 'text-gray-400'} text-sm mr-3`}>
                        <i className={`fas ${labels[index].icon}`}></i>
                      </div>
                      <div className="text-sm">
                        <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>{labels[index].title}</div>
                        <div className="text-gray-400 hidden sm:block">{labels[index].subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-white mb-4">Order Details</h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Type</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="transaction_type">
                          <option value="Purchase">Purchase</option>
                          <option value="Sale">Sale</option>
                          <option value="Refinance">Refinance</option>
                          <option value="HELOC">HELOC</option>
                          <option value="Short Sale">Short Sale</option>
                          <option value="Foreclosure">Foreclosure</option>
                          <option value="Commercial Purchase">Commercial Purchase</option>
                          <option value="Project File">Project File</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Settlement Agency</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="settlement_agency_id">
                          <option value="">Select one...</option>
                          <option value="t3eQskRbLNgkJzx5E">First National Title & Escrow</option>
                          <option value="4G9EQK5RidyiAwrWc">The Law Office of Stephen P. Patti, LLC</option>
                          <option value="dDeXkPqERweiMQvFg">First National Title Agency LLC</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="state">
                          <option value="">Select one...</option>
                          <option value="FL">Florida</option>
                          <option value="CA">California</option>
                          <option value="TX">Texas</option>
                          <option value="NY">New York</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Statement Type</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="settlement_statement_type">
                          <option value="cdf">CD</option>
                          <option value="hud1">HUD-1</option>
                          <option value="settlement_statement">Settlement Statement</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Source of Business</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="referred_by">
                          <option value="">Select one...</option>
                          <option value="borrower">Borrower</option>
                          <option value="lender">Lender</option>
                          <option value="listingAgent">Listing Agency</option>
                          <option value="sellingAgent">Selling Agency</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                        <div className="flex bg-gray-700 rounded">
                          <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-l">Open</button>
                          <button className="flex-1 py-2 px-4 text-gray-300 hover:bg-gray-600 rounded-r">Pre-open</button>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-medium text-white mb-4">Process & Workflow</h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Order Template</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="order_template">
                          <option value="">None</option>
                          <option value="YA6tgpHxgsgDA5gu2">AmTrust Workshare File</option>
                          <option value="HniXBAckX3AMws3n3">FNTE - Standard Purchase</option>
                          <option value="gxCjdq4yuuLWswaJF">FNTE - Standard Refinance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Workflow</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="workflow_id">
                          <option value="">Select one...</option>
                          <option value="NWKXG4kK2TX9is5fb">Purchase</option>
                          <option value="GfvyM4K6wqrwX2Z4x">Purchase - New in progress</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Underwriter</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="underwriter">
                          <option value="">Select one...</option>
                          <option value="first_american">First American</option>
                          <option value="chicago">Chicago Title</option>
                          <option value="stewart">Stewart</option>
                          <option value="old_republic">Old Republic</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-48">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIiByeD0iOCIvPgo8cGF0aCBkPSJNMTAwIDQwaDQwdjQwaC00MHoiIGZpbGw9IiM2Mzc0OEIiLz4KPHN0eWxlPi5zbWFsbCB7IGZvbnQ6IDEycHggc2Fucy1zZXJpZjsgZmlsbDogIzlDQTNBRjsgfTwvc3R5bGU+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0ic21hbGwiPk9yZGVyIEZvcm08L3RleHQ+Cjwvc3ZnPg==" alt="Order Form" className="w-full rounded" />
                    <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                      <i className="fas fa-copy"></i>
                      Import from existing
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Properties */}
              {currentStep === 2 && (
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Property #1</div>
                        <button className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded">
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                        <button className="bg-gray-600 text-gray-400 p-2 rounded cursor-not-allowed">
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <h4 className="text-lg font-medium text-white mb-4">Address</h4>
                    <div className="mb-6">
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                          <div className="relative">
                            <input type="text" placeholder="Search address..." className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 pl-10 text-white" data-schema-key="properties.0.address_1" />
                            <i className="fas fa-map-marker-alt absolute left-3 top-3 text-gray-400"></i>
                          </div>
                        </div>
                        <div className="w-48">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Apt, Suite, Etc.</label>
                          <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="properties.0.address_2" />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                          <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="properties.0.city" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">County</label>
                          <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="properties.0.county" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                          <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="properties.0.state">
                            <option value="">Select one...</option>
                            <option value="FL">FL</option>
                            <option value="CA">CA</option>
                            <option value="TX">TX</option>
                            <option value="NY">NY</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Zipcode</label>
                          <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="properties.0.zipcode" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-white">Parcel IDs</h4>
                      <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded flex items-center gap-2 text-sm">
                        <i className="fas fa-plus text-xs"></i>
                        Add Parcel ID
                      </button>
                    </div>
                    <div className="bg-gray-700 p-4 rounded text-gray-400 text-center">
                      No parcel IDs added.
                    </div>
                  </div>
                  <div className="w-48">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIiByeD0iOCIvPgo8cGF0aCBkPSJNNTAgNjBoMTAwdjMwSDE1MHoiIGZpbGw9IiM2Mzc0OEIiLz4KPHN0eWxlPi5zbWFsbCB7IGZvbnQ6IDEycHggc2Fucy1zZXJpZjsgZmlsbDogIzlDQTNBRjsgfTwvc3R5bGU+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0ic21hbGwiPkhvdXNlPC90ZXh0Pgo8L3N2Zz4=" alt="House" className="w-full rounded" />
                  </div>
                </div>
              )}

              {/* Step 3: Contacts */}
              {currentStep === 3 && (
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Borrower #1</div>
                        <button className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded">
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                        <button className="bg-gray-600 text-gray-400 p-2 rounded cursor-not-allowed">
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="relative">
                        <input type="text" placeholder="Search existing buyers..." className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 pl-10 text-white" data-schema-key="customerName" />
                        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                      </div>
                    </div>

                    <h4 className="text-lg font-medium text-white mb-4">Basic Info</h4>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Borrower is an 
                        <select className="inline bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white ml-1" data-schema-key="contacts.borrowers.0.type">
                          <option value="individual">Individual</option>
                          <option value="organization">Organization</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.borrowers.0.first_name" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Middle Name</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.borrowers.0.middle_name" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Suffix</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.borrowers.0.suffix" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.borrowers.0.last_name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input type="email" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.borrowers.0.email" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.borrowers.0.gender">
                          <option value="">Select one...</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Marital Status</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.borrowers.0.marital_status">
                          <option value="">Select one...</option>
                          <option value="Married">Married</option>
                          <option value="Unmarried">Unmarried</option>
                          <option value="Single">Single</option>
                          <option value="Reg. Dom. Partnership">Reg. Dom. Partnership</option>
                          <option value="Unknown">Unknown</option>
                          <option value="Widow">Widow</option>
                          <option value="Widower">Widower</option>
                        </select>
                      </div>
                    </div>

                    <h4 className="text-lg font-medium text-white mb-4">Spouse</h4>
                    <div className="bg-gray-700 p-4 rounded text-gray-400 text-center">
                      Borrower is not married.
                    </div>
                  </div>
                  <div className="w-48">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIiByeD0iOCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI2MCIgcj0iMjAiIGZpbGw9IiM2Mzc0OEIiLz4KPHBhdGggZD0iTTgwIDEwMGg0MHYyMEg4MHoiIGZpbGw9IiM2Mzc0OEIiLz4KPHN0eWxlPi5zbWFsbCB7IGZvbnQ6IDEycHggc2Fucy1zZXJpZjsgZmlsbDogIzlDQTNBRjsgfTwvc3R5bGU+Cjx0ZXh0IHg9IjEwMCIgeT0iMTM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0ic21hbGwiPkJvcnJvd2VyPC90ZXh0Pgo8L3N2Zz4=" alt="Borrower" className="w-full rounded" />
                  </div>
                </div>
              )}

              {/* Step 4: Seller Info */}
              {currentStep === 4 && (
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Seller #1</div>
                        <button className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded">
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                        <button className="bg-gray-600 text-gray-400 p-2 rounded cursor-not-allowed">
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="relative">
                        <input type="text" placeholder="Search existing sellers..." className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 pl-10 text-white" data-schema-key="customerName" />
                        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                      </div>
                    </div>

                    <h4 className="text-lg font-medium text-white mb-4">Basic Info</h4>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Seller is an 
                        <select className="inline bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white ml-1" data-schema-key="contacts.sellers.0.type">
                          <option value="individual">Individual</option>
                          <option value="organization">Organization</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.sellers.0.first_name" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Middle Name</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.sellers.0.middle_name" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Suffix</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.sellers.0.suffix" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.sellers.0.last_name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input type="email" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.sellers.0.email" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.sellers.0.gender">
                          <option value="">Select one...</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Marital Status</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" data-schema-key="contacts.sellers.0.marital_status">
                          <option value="">Select one...</option>
                          <option value="Married">Married</option>
                          <option value="Unmarried">Unmarried</option>
                          <option value="Single">Single</option>
                          <option value="Reg. Dom. Partnership">Reg. Dom. Partnership</option>
                          <option value="Unknown">Unknown</option>
                          <option value="Widow">Widow</option>
                          <option value="Widower">Widower</option>
                        </select>
                      </div>
                    </div>

                    <h4 className="text-lg font-medium text-white mb-4">Spouse</h4>
                    <div className="bg-gray-700 p-4 rounded text-gray-400 text-center">
                      Seller is not married.
                    </div>
                  </div>
                  <div className="w-48">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIiByeD0iOCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMTgiIGZpbGw9IiM2Mzc0OEIiLz4KPHBhdGggZD0iTTkwIDc1aDIwdjE1SDkweiIgZmlsbD0iIzYzNzQ4QiIvPgo8cGF0aCBkPSJNODAgMTAwaDQwdjEwSDgweiIgZmlsbD0iIzYzNzQ4QiIvPgo8cGF0aCBkPSJNNzUgMTEwaDUwdjVINzV6IiBmaWxsPSIjNjM3NDhCIi8+CjxzdHlsZT4uc21hbGwgeyBmb250OiAxMnB4IHNhbnMtc2VyaWY7IGZpbGw6ICM5Q0EzQUY7IH08L3N0eWxlPgo8dGV4dCB4PSIxMDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgY2xhc3M9InNtYWxsIj5TZWxsZXI8L3RleHQ+Cjwvc3ZnPg==" alt="Seller" className="w-full rounded" />
                  </div>
                </div>
              )}

              {/* Step 5: Review Order */}
              {currentStep === 5 && (
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-white mb-6">Order Details</h4>
                    
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Type</label>
                        <div className="bg-gray-700 p-3 rounded text-white">Purchase</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Statement Type</label>
                        <div className="bg-gray-700 p-3 rounded text-white">CD</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Order Template</label>
                        <div className="bg-gray-700 p-3 rounded text-white">None</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Workflow</label>
                        <div className="bg-gray-700 p-3 rounded text-gray-400">Not set</div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Property #1</div>
                      </div>
                      <div className="bg-gray-800 border border-gray-600 rounded p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                            <div className="text-gray-400">Not set</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Parcel IDs</label>
                            <div className="text-gray-400">Not set</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Borrower #1</div>
                      </div>
                      <div className="bg-gray-800 border border-gray-600 rounded p-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <div className="text-gray-400">Not set</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <div className="text-gray-400">Not set</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                            <div className="text-white">Individual</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Seller #1</div>
                      </div>
                      <div className="bg-gray-800 border border-gray-600 rounded p-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <div className="text-gray-400">Not set</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <div className="text-gray-400">Not set</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                            <div className="text-white">Individual</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-48">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIiByeD0iOCIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSIxNSIgZmlsbD0iIzYzNzQ4QiIvPgo8Y2lyY2xlIGN4PSIxMjAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiM2Mzc0OEIiLz4KPHBhdGggZD0iTTcwIDc1aDYwdjEwSDcweiIgZmlsbD0iIzYzNzQ4QiIvPgo8cGF0aCBkPSJNNjAgMTAwaDgwdjEwSDYweiIgZmlsbD0iIzYzNzQ4QiIvPgo8c3R5bGU+LnNtYWxsIHsgZm9udDogMTJweCBzYW5zLXNlcmlmOyBmaWxsOiAjOUNBM0FGOyB9PC9zdHlsZT4KPHR4dCB4PSIxMDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgY2xhc3M9InNtYWxsIj5QYXJ0bmVyczwvdGV4dD4KPC9zdmc+" alt="Partners" className="w-full rounded" />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-600">
              {currentStep === 1 && (
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded flex items-center gap-2">
                  <i className="fas fa-upload"></i>
                  Upload Purchase Agreement
                </button>
              )}
              {currentStep !== 1 && <div></div>}
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button onClick={handlePrevStep} className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded">
                    Previous
                  </button>
                )}
                <button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                  {currentStep === totalSteps ? 'Create Order' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;