const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Page Header */}
      <div className="py-8 px-10 pb-5 border-b border-gray-200 flex items-center gap-4">
        <i className="fa fa-dashboard text-gray-500 text-xl"></i>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
      </div>

      {/* Content */}
      <div className="p-10">
        <div className="grid grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active Orders</span>
              <i className="fa fa-folder text-blue-500"></i>
            </div>
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-green-500 mt-2">+3 this week</div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Pending Tasks</span>
              <i className="fa fa-check-square text-yellow-500"></i>
            </div>
            <div className="text-3xl font-bold">8</div>
            <div className="text-sm text-yellow-500 mt-2">2 urgent</div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Closings This Week</span>
              <i className="fa fa-calendar text-green-500"></i>
            </div>
            <div className="text-3xl font-bold">5</div>
            <div className="text-sm text-gray-500 mt-2">Next: Tomorrow</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Order #</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Property</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Buyer</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Closing Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-sm">ORD-001</td>
                  <td className="p-4 text-sm">123 Main St</td>
                  <td className="p-4 text-sm">John Doe</td>
                  <td className="p-4">
                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                      In Progress
                    </span>
                  </td>
                  <td className="p-4 text-sm">Jan 20, 2025</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 text-sm">ORD-002</td>
                  <td className="p-4 text-sm">456 Oak Ave</td>
                  <td className="p-4 text-sm">Jane Smith</td>
                  <td className="p-4">
                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                      Pending
                    </span>
                  </td>
                  <td className="p-4 text-sm">Jan 22, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;