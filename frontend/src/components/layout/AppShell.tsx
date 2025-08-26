import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
  label: string;
  path?: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  hasError?: boolean;
}

interface NavSection {
  title: string;
  isExpanded: boolean;
  items: NavItem[];
}

export default function AppShell() {
  const location = useLocation();
  const orderId = location.pathname.split('/')[2] || 'b09b0775-9318-454a-ada9-77f0c2147e18';
  const { user, logout } = useAuth();
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    general: true,
    title: true,
    charges: true,
    disclosures: true,
    proceeds: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path: string) => location.pathname === path;

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
            <Link to="/dashboard" className="px-3 py-1 text-sm hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <Link to="/orders/b09b0775-9318-454a-ada9-77f0c2147e18/basic-info" className="px-3 py-1 text-sm hover:text-blue-400 transition-colors">
              Orders
            </Link>
            <Link to="/global-contacts" className="px-3 py-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
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
          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <i className="fas fa-user-circle text-xl"></i>
              <span className="text-sm">{user?.firstName || 'User'}</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-600 rounded shadow-lg hidden group-hover:block">
              <div className="p-3 border-b border-gray-600">
                <div className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <section className="w-72 bg-gray-800 border-r border-gray-600 overflow-y-auto">
          {/* Dashboard Header */}
          <section className="p-5 border-b border-gray-600 bg-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa fa-map-marker text-gray-400 text-base"></i>
            <div>
              <h3 className="text-sm font-semibold mb-1">123 TEST TOM FILE CD</h3>
              <div className="text-xs text-gray-400">TomTestCD</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex flex-col items-center p-2 bg-gray-600 rounded text-xs text-center">
              <i className="fa fa-sticky-note text-sm mb-1 text-gray-400"></i>
              <div className="mb-0.5 text-gray-400">Notes</div>
              <div className="font-semibold text-white">0</div>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-600 rounded text-xs text-center">
              <i className="fa fa-tasks text-sm mb-1 text-gray-400"></i>
              <div className="mb-0.5 text-gray-400">Tasks</div>
              <div className="font-semibold text-white">0 / 42</div>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-600 rounded text-xs text-center">
              <i className="fa fa-cogs text-sm mb-1 text-gray-400"></i>
              <div className="mb-0.5 text-gray-400">Automations</div>
              <div className="font-semibold text-white">3 / 88</div>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-600 rounded text-xs text-center">
              <i className="fa fa-rss text-sm mb-1 text-gray-400"></i>
              <div className="mb-0.5 text-gray-400">Activity</div>
              <div className="font-semibold text-white">11</div>
            </div>
          </div>
          
          <button className="w-full p-2 bg-transparent border border-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors">
            Send Message
          </button>
        </section>

        {/* ORDER Section */}
        <section className="py-4 px-5 pb-2 border-t border-gray-600 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
          ORDER
        </section>
        
        {/* General Section */}
        <section className="border-b border-gray-600">
          <div 
            className="flex justify-between items-center py-4 px-5 bg-blue-600 cursor-pointer font-semibold text-sm"
            onClick={() => toggleSection('general')}
          >
            General
            <i className={`fa fa-chevron-down text-xs transition-transform ${expandedSections.general ? 'rotate-180' : ''}`}></i>
          </div>
          {expandedSections.general && (
            <div className="bg-gray-800">
              <Link 
                to={`/orders/${orderId}/basic-info`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/basic-info`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Basic Info
              </Link>
              <Link 
                to={`/orders/${orderId}/properties`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/properties`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Properties
              </Link>
              <Link 
                to={`/orders/${orderId}/contacts`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/contacts`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Contacts
              </Link>
              <Link 
                to={`/orders/${orderId}/loan`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/loan`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Loan
              </Link>
              <Link 
                to={`/orders/${orderId}/earnest-commissions`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/earnest-commissions`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Earnest & Commissions
              </Link>
              <Link 
                to={`/orders/${orderId}/taxes-prorations`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/taxes-prorations`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Taxes & Prorations
              </Link>
              <Link 
                to={`/orders/${orderId}/payoffs`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/payoffs`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Payoffs
              </Link>
            </div>
          )}
        </section>

        {/* Title Section */}
        <section className="border-b border-gray-600">
          <div 
            className="flex justify-between items-center py-4 px-5 bg-blue-600 cursor-pointer font-semibold text-sm"
            onClick={() => toggleSection('title')}
          >
            Title
            <i className={`fa fa-chevron-down text-xs transition-transform ${expandedSections.title ? 'rotate-180' : ''}`}></i>
          </div>
          {expandedSections.title && (
            <div className="bg-gray-800">
              <Link 
                to={`/orders/${orderId}/cpl`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/cpl`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                CPL
              </Link>
              <Link 
                to={`/orders/${orderId}/policy-info-rates`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/policy-info-rates`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Policy Info & Rates
                <i className="fa fa-exclamation-circle text-red-500 text-sm"></i>
              </Link>
              <Link 
                to={`/orders/${orderId}/commitment`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/commitment`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Commitment
              </Link>
              <Link 
                to={`/orders/${orderId}/final-policy`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/final-policy`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Final Policy
              </Link>
            </div>
          )}
        </section>

        {/* CLOSING Section Header */}
        <section className="py-4 px-5 pb-2 border-t border-gray-600 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
          CLOSING
        </section>

        {/* Charges Section */}
        <section className="border-b border-gray-600">
          <div 
            className="flex justify-between items-center py-4 px-5 bg-blue-600 cursor-pointer font-semibold text-sm"
            onClick={() => toggleSection('charges')}
          >
            Charges
            <i className={`fa fa-chevron-down text-xs transition-transform ${expandedSections.charges ? 'rotate-180' : ''}`}></i>
          </div>
          {expandedSections.charges && (
            <div className="bg-gray-800">
              <Link 
                to={`/orders/${orderId}/origination-charges`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/origination-charges`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Origination Charges
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">A</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/did-not-shop-for`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/did-not-shop-for`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Did Not Shop For
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">B</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/did-shop-for`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/did-shop-for`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Did Shop For
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">C</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/taxes-and-fees`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/taxes-and-fees`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Taxes & Fees
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">E</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/prepaids`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/prepaids`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Prepaids
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">F</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/escrow`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/escrow`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Escrow
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">G</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/other-charges`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/other-charges`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Other Charges
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">H</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/lender-credits`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/lender-credits`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Lender Credits
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">J</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/debits-credits-km`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/debits-credits-km`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Debits/Credits
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">K/M</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/debits-credits-ln`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/debits-credits-ln`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Debits/Credits
                <span className="bg-gray-500 text-white min-w-[20px] h-5 rounded text-xs font-semibold inline-flex items-center justify-center">L/N</span>
              </Link>
            </div>
          )}
        </section>

        {/* Disclosures Section */}
        <section className="border-b border-gray-600">
          <div 
            className="flex justify-between items-center py-4 px-5 bg-blue-600 cursor-pointer font-semibold text-sm"
            onClick={() => toggleSection('disclosures')}
          >
            Disclosures
            <i className={`fa fa-chevron-down text-xs transition-transform ${expandedSections.disclosures ? 'rotate-180' : ''}`}></i>
          </div>
          {expandedSections.disclosures && (
            <div className="bg-gray-800">
              <Link 
                to={`/orders/${orderId}/loan-terms`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/loan-terms`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Loan Terms
                <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">1</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/projected-payments`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/projected-payments`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Projected Payments
                <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">1</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/cash-to-close`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/cash-to-close`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Cash to Close
                <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">3</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/loan-disclosures`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/loan-disclosures`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Loan Disclosures
                <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">4</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/ap-table`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/ap-table`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                AP Table
                <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">4</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/air-table`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/air-table`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                AIR Table
                <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">4</span>
              </Link>
              <Link 
                to={`/orders/${orderId}/loan-calculations`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/loan-calculations`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Loan Calculations
                <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">5</span>
              </Link>
            </div>
          )}
        </section>

        {/* Proceeds Section */}
        <section className="border-b border-gray-600">
          <div 
            className="flex justify-between items-center py-4 px-5 bg-blue-600 cursor-pointer font-semibold text-sm"
            onClick={() => toggleSection('proceeds')}
          >
            Proceeds
            <i className={`fa fa-chevron-down text-xs transition-transform ${expandedSections.proceeds ? 'rotate-180' : ''}`}></i>
          </div>
          {expandedSections.proceeds && (
            <div className="bg-gray-800">
              <Link 
                to={`/orders/${orderId}/proceeds-borrower`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/proceeds-borrower`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Borrower
              </Link>
              <Link 
                to={`/orders/${orderId}/proceeds-seller`}
                className={`flex items-center justify-between py-3 pl-8 pr-5 text-xs transition-all ${
                  isActive(`/orders/${orderId}/proceeds-seller`) 
                    ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                    : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
                }`}
              >
                Seller
              </Link>
            </div>
          )}
        </section>

        {/* TASKS Section Header */}
        <section className="py-4 px-5 pb-2 border-t border-gray-600 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
          TASKS
        </section>
        
        <section className="border-b border-gray-600">
          <Link 
            to={`/orders/${orderId}/documents`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/documents`) 
                ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-file-text mr-3 text-base w-5 text-center"></i>Documents</span>
          </Link>
          <Link 
            to={`/orders/${orderId}/accounting`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/accounting`) 
                ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-balance-scale mr-3 text-base w-5 text-center"></i>Accounting</span>
            <i className="fa fa-exclamation-circle text-red-500 text-sm"></i>
          </Link>
          <Link 
            to={`/orders/${orderId}/marketplace`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/marketplace`) 
                ? 'text-white bg-green-600 border-l-4 border-l-green-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-shopping-cart mr-3 text-base w-5 text-center"></i>Marketplace</span>
          </Link>
        </section>

        {/* INTEGRATIONS Section Header */}
        <section className="py-4 px-5 pb-2 border-t border-gray-600 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
          INTEGRATIONS
        </section>
        
        <section className="border-b border-gray-600">
          <Link 
            to={`/orders/${orderId}/envelopes-shipping`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/envelopes-shipping`) 
                ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-envelope mr-3 text-base w-5 text-center"></i>Envelopes & Shipping</span>
          </Link>
          <Link 
            to={`/orders/${orderId}/recording`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/recording`) 
                ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-university mr-3 text-base w-5 text-center"></i>Recording</span>
          </Link>
          <Link 
            to={`/orders/${orderId}/schema-inspector`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/schema-inspector`) 
                ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-code mr-3 text-base w-5 text-center"></i>Schema Inspector</span>
            <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">DEV</span>
          </Link>
        </section>

        {/* PREVIEW Section Header */}
        <section className="py-4 px-5 pb-2 border-t border-gray-600 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
          PREVIEW
        </section>
        
        <section className="border-b border-gray-600">
          <Link 
            to={`/orders/${orderId}/closing-disclosure`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/closing-disclosure`) 
                ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-eye mr-3 text-base w-5 text-center"></i>Closing Disclosure</span>
          </Link>
          <Link 
            to={`/orders/${orderId}/settlement-statement`}
            className={`flex items-center justify-between py-4 px-5 text-xs transition-all ${
              isActive(`/orders/${orderId}/settlement-statement`) 
                ? 'text-white bg-blue-600 border-l-4 border-l-blue-400' 
                : 'text-gray-300 border-l-4 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span><i className="fa fa-file mr-3 text-base w-5 text-center"></i>Settlement Statement</span>
          </Link>
        </section>
      </section>

      {/* Main Content Area + Right Rail (handled by child components) */}
      <Outlet />
    </div>
  </div>
  );
}