import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AppShell = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fa-dashboard' },
    { path: '/orders', label: 'Orders', icon: 'fa-folder' },
    { path: '/contacts', label: 'Contacts', icon: 'fa-users' },
    { path: '/documents', label: 'Documents', icon: 'fa-file-text' },
    { path: '/reports', label: 'Reports', icon: 'fa-bar-chart' },
    { path: '/settings', label: 'Settings', icon: 'fa-cog' },
  ];

  const orderSections = [
    { id: 'basic-info', label: 'Basic Info', icon: 'fa-home' },
    { id: 'contacts', label: 'Contacts', icon: 'fa-users' },
    { id: 'loan', label: 'Loan', icon: 'fa-money' },
    { id: 'loan-terms', label: 'Loan Terms', icon: 'fa-file-text-o' },
    { id: 'projected-payments', label: 'Projected Payments', icon: 'fa-calculator' },
    { id: 'closing-disclosure', label: 'Closing Disclosure', icon: 'fa-file-text' },
    { id: 'origination-charges', label: 'Origination Charges', icon: 'fa-credit-card' },
    { id: 'did-not-shop', label: 'Did Not Shop For', icon: 'fa-shopping-cart' },
    { id: 'did-shop', label: 'Did Shop For', icon: 'fa-shopping-basket' },
    { id: 'taxes-fees', label: 'Taxes & Government Fees', icon: 'fa-university' },
    { id: 'prepaids', label: 'Prepaids', icon: 'fa-calendar-check-o' },
    { id: 'escrow', label: 'Initial Escrow', icon: 'fa-shield' },
    { id: 'other', label: 'Other', icon: 'fa-ellipsis-h' },
    { id: 'loan-calculations', label: 'Loan Calculations', icon: 'fa-calculator' },
    { id: 'cash-to-close', label: 'Cash to Close', icon: 'fa-dollar' },
    { id: 'payoffs', label: 'Payoffs & Payments', icon: 'fa-exchange' },
    { id: 'proceeds-borrower', label: 'Proceeds (Borrower)', icon: 'fa-user' },
    { id: 'proceeds-seller', label: 'Proceeds (Seller)', icon: 'fa-home' },
    { id: 'documents', label: 'Documents', icon: 'fa-file' },
    { id: 'accounting', label: 'Accounting', icon: 'fa-book' },
  ];

  const isOrderDetailPage = location.pathname.startsWith('/orders/') && location.pathname !== '/orders';

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Left Sidebar */}
      <section className={`${isSidebarCollapsed ? 'w-16' : 'w-72'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo/Header */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Garden</h1>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className={`fa ${isSidebarCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {!isOrderDetailPage ? (
            // Main navigation
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    <i className={`fa ${item.icon} w-5`}></i>
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            // Order detail sections navigation
            <div>
              {!isSidebarCollapsed && (
                <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3">Order Sections</h3>
              )}
              <ul className="space-y-1">
                {orderSections.map(section => (
                  <li key={section.id}>
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <i className={`fa ${section.icon} w-5 text-xs`}></i>
                      {!isSidebarCollapsed && <span className="text-sm">{section.label}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fa fa-user text-sm"></i>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1">
                <div className="text-sm font-medium">User Name</div>
                <div className="text-xs text-gray-500">user@example.com</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </section>

      {/* Right Rail */}
      {isOrderDetailPage && (
        <section className="w-64 bg-white border-l border-gray-200">
          {/* Chat Section */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <i className="fa fa-comments text-gray-500"></i>
              Chat
            </h3>
            <div className="text-sm text-gray-500">No messages</div>
          </div>

          {/* Tasks Section */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <i className="fa fa-check-square text-gray-500"></i>
              Tasks
            </h3>
            <div className="text-sm text-gray-500">No tasks</div>
          </div>

          {/* Notes Section */}
          <div className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <i className="fa fa-sticky-note text-gray-500"></i>
              Notes
            </h3>
            <textarea
              className="w-full h-32 bg-gray-50 border border-gray-300 rounded p-2 text-sm resize-none focus:outline-none focus:border-blue-500"
              placeholder="Add notes..."
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default AppShell;