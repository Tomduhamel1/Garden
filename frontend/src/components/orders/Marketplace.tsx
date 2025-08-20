import React, { useState } from 'react';

interface MarketplaceProps {}

interface ServiceCard {
  id: number;
  title: string;
  subtitle: string;
  gradient: string;
  icon: string;
  badge?: string;
  orderDate?: string;
}

const Marketplace: React.FC<MarketplaceProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredServices: ServiceCard[] = [
    {
      id: 1,
      title: 'Full Search Plus',
      subtitle: 'Popular in Rhode Island',
      gradient: 'from-blue-600 to-purple-600',
      icon: 'fa-search'
    },
    {
      id: 2,
      title: 'Two-Owner Search Plus',
      subtitle: 'Popular in Rhode Island',
      gradient: 'from-green-600 to-teal-600',
      icon: 'fa-users'
    },
    {
      id: 3,
      title: 'Municipal Lien Search',
      subtitle: 'Used on purchases',
      gradient: 'from-orange-600 to-red-600',
      icon: 'fa-building'
    },
    {
      id: 4,
      title: 'Loan Purchase - Buyer',
      subtitle: 'Used on purchases',
      gradient: 'from-purple-600 to-pink-600',
      icon: 'fa-home'
    }
  ];

  const orderAgainServices: ServiceCard[] = [
    {
      id: 1,
      title: 'Full Search Plus',
      subtitle: 'CATIC',
      gradient: 'bg-gray-700',
      icon: 'fa-file-text-o',
      badge: 'Preferred',
      orderDate: '7/29'
    },
    {
      id: 2,
      title: 'Two-Owner Search Plus',
      subtitle: 'CATIC',
      gradient: 'bg-gray-700',
      icon: 'fa-file-text-o',
      badge: 'Preferred',
      orderDate: '7/28'
    },
    {
      id: 3,
      title: 'Title Search Plus Update',
      subtitle: 'CATIC',
      gradient: 'bg-gray-700',
      icon: 'fa-file-text-o',
      badge: 'Preferred',
      orderDate: '6/11'
    },
    {
      id: 4,
      title: 'Full Search Plus',
      subtitle: 'Pippin Title',
      gradient: 'bg-gray-700',
      icon: 'fa-file-text-o',
      orderDate: '5/30'
    }
  ];

  const categories = [
    {
      title: 'Title Services',
      buttonText: 'View Title Services',
      icon: 'fa-search'
    },
    {
      title: 'Payoffs',
      buttonText: 'View Release Tracking',
      icon: 'fa-calculator'
    },
    {
      title: 'Surveys',
      buttonText: 'View Property Surveys',
      icon: 'fa-map'
    },
    {
      title: 'Insurance',
      buttonText: 'View Title Insurance',
      icon: 'fa-shield'
    }
  ];

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600">
          <div className="flex items-center gap-4">
            <i className="fa fa-shopping-cart text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Marketplace</h2>
          </div>
        </section>

        {/* Search Section */}
        <section className="px-10 py-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Explore our marketplace of closing services</h3>
            <div className="max-w-md mx-auto relative">
              <input 
                type="text" 
                placeholder="Search vendors and products..."
                className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fa fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Featured Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="fa fa-star text-white"></i>
                </div>
                <h4 className="text-lg font-semibold text-white">Featured</h4>
              </div>
              <div className="flex gap-2">
                <button type="button" className="p-2 hover:bg-gray-700 rounded">
                  <i className="fa fa-chevron-left text-gray-400"></i>
                </button>
                <button type="button" className="p-2 hover:bg-gray-700 rounded">
                  <i className="fa fa-chevron-right text-gray-400"></i>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                {featuredServices.map((service) => (
                  <div key={service.id} className="w-64 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden hover:border-gray-500 cursor-pointer">
                    <div className={`h-32 bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                      <div className="w-16 h-16 bg-gray-800 bg-opacity-50 rounded-lg flex items-center justify-center">
                        <i className={`fa ${service.icon} text-white text-2xl`}></i>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="font-medium text-white mb-2">{service.title}</h5>
                      <p className="text-xs text-gray-400">{service.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Order Again Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="fa fa-history text-white"></i>
                </div>
                <h4 className="text-lg font-semibold text-white">Order Again</h4>
              </div>
              <div className="flex gap-2">
                <button type="button" className="p-2 hover:bg-gray-700 rounded">
                  <i className="fa fa-chevron-left text-gray-400"></i>
                </button>
                <button type="button" className="p-2 hover:bg-gray-700 rounded">
                  <i className="fa fa-chevron-right text-gray-400"></i>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                {orderAgainServices.map((service) => (
                  <div key={service.id} className="w-64 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden hover:border-gray-500 cursor-pointer">
                    <div className={`h-24 ${service.gradient} flex items-center justify-center border-b border-gray-600`}>
                      <i className={`fa ${service.icon} text-gray-400 text-2xl`}></i>
                    </div>
                    <div className="p-4">
                      <h5 className="font-medium text-white mb-1">{service.title}</h5>
                      <p className="text-sm text-gray-400 mb-2">{service.subtitle}</p>
                      {service.badge && (
                        <span className="inline-block px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded mr-2">{service.badge}</span>
                      )}
                      {service.orderDate && (
                        <p className="text-xs text-gray-500 mt-2">Ordered on {service.orderDate}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Browse All Link */}
          <div className="text-center mb-8">
            <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Browse All</a>
          </div>

          {/* Browse By Category Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <i className="fa fa-home text-white"></i>
              </div>
              <h4 className="text-lg font-semibold text-white">Browse By Category</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-6 hover:border-gray-500 cursor-pointer">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <i className={`fa ${category.icon} text-gray-400 text-2xl`}></i>
                    </div>
                    <h5 className="font-medium text-white">{category.title}</h5>
                  </div>
                  <button type="button" className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                    {category.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Chat</h4>
          <p className="text-gray-400 text-xs">Chat functionality</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Tasks</h4>
          <p className="text-gray-400 text-xs">No tasks assigned</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Notes</h4>
          <p className="text-gray-400 text-xs">No notes added</p>
        </section>
      </section>
    </>
  );
};

export default Marketplace;