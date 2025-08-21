import React from 'react';
import { useParams } from 'react-router-dom';

const ApTable: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <>
      {/* Main Content */>
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <div className="p-6 border-b border-gray-600">
          <h2 className="text-2xl font-semibold flex items-center">
            <i className="fas fa-file-contract mr-3 text-blue-400"></i>
            Adjustable Payment (AP) Table
          </h2>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="bg-gray-800 border border-gray-600 rounded-md p-12 text-center">
            <i className="fas fa-percentage text-5xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-300 mb-4">
              This order does not include Adjustable Payments (AP) as a loan feature.
            </h3>
            <div className="my-6 border-t border-gray-600"></div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors">
              Add AP Table
            </button>
          </div>
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 overflow-y-auto">
        {/* Chat Section */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Chat</h4>
            <i className="fas fa-chevron-down text-gray-400"></i>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <i className="fas fa-volume-mute text-gray-400"></i>
              <i className="fas fa-bars text-gray-400"></i>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded"
              />
              <i className="fas fa-plus text-gray-400"></i>
            </div>
            <div className="text-xs">
              <div className="flex space-x-4 mb-2">
                <span className="text-blue-400 border-b border-blue-400 pb-1">All</span>
                <span className="text-gray-400">Messages</span>
                <span className="text-gray-400">Channels</span>
              </div>
              <div className="space-y-1">
                <div className="text-gray-300 font-medium mb-1">Direct Messages</div>
                {/* Online Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Tom Duhamel</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Nicole Micciche</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Amber Wurm</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Brittany M. Arrington</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Karina Gomez</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Tiffany L Savoy</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                {/* Idle Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Elizabeth McColeman</span>
                  <span className="text-gray-400 text-xs">Idle 11m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">John Furtado</span>
                  <span className="text-gray-400 text-xs">Idle 16m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Leigh Ann Hafner</span>
                  <span className="text-gray-400 text-xs">Idle 31m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Alexander Joyal</span>
                  <span className="text-gray-400 text-xs">Idle 16m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Cindy Bescher</span>
                  <span className="text-gray-400 text-xs">Idle 8m</span>
                </div>
                {/* Offline Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300">Steve Patti</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300">Brian M. Estus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300">John C Scungio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Tasks</h4>
            <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">0 / 0</span>
          </div>
          <div className="bg-gray-700 p-3 rounded text-center text-sm text-gray-300">
            You have not been <a href="#" className="text-blue-400">assigned any tasks</a> on this order
          </div>
        </div>

        {/* Notes Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Notes</h4>
            <i className="fas fa-chevron-up text-gray-400"></i>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded text-center text-sm text-gray-300">
              No notes have been added to this page
            </div>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded transition-colors">
              Add Note
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApTable;