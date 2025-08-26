import React, { useState, useEffect } from 'react';
import IndividualContactForm from '../components/common/IndividualContactForm';
import BusinessContactForm from '../components/common/BusinessContactForm';

interface GlobalContact {
  id: string;
  type: 'individual' | 'business' | 'government';
  category: string;
  individualInfo?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  businessInfo?: {
    company_name?: string;
    license_number?: string;
  };
  governmentInfo?: {
    department_name?: string;
  };
  contactInfo?: {
    primary_email?: string;
    primary_phone?: string;
  };
  status: string;
  usageCount: number;
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

type ViewMode = 'list' | 'create-individual' | 'create-business' | 'create-government' | 'edit';
type FilterType = 'all' | 'individual' | 'business' | 'government';
type FilterCategory = 'all' | 'buyer' | 'seller' | 'lender' | 'mortgage_brokerage' | 'selling_agency' | 'listing_agency' | 'recording_office' | 'tax_authority' | 'title_abstractor' | 'surveying_firm' | 'other';

const GlobalContacts: React.FC = () => {
  const [contacts, setContacts] = useState<GlobalContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<GlobalContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedContact, setSelectedContact] = useState<GlobalContact | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'archived'>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const itemsPerPage = 20;

  // Category labels
  const categoryLabels: Record<string, string> = {
    buyer: 'Buyer',
    seller: 'Seller',
    lender: 'Lender',
    mortgage_brokerage: 'Mortgage Brokerage',
    selling_agency: 'Selling Agency',
    listing_agency: 'Listing Agency',
    recording_office: 'Recording Office',
    tax_authority: 'Tax Authority',
    title_abstractor: 'Title Abstractor',
    surveying_firm: 'Surveying Firm',
    other: 'Other'
  };

  // Load contacts
  const loadContacts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: itemsPerPage.toString(),
        offset: ((page - 1) * itemsPerPage).toString(),
        sortBy: 'updated_at',
        sortOrder: 'DESC'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/global-contacts?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load contacts');
      }

      const data = await response.json();
      setContacts(data.contacts);
      setFilteredContacts(data.contacts);
      setTotalContacts(data.total);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
      setContacts([]);
      setFilteredContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load contacts on component mount and filter changes
  useEffect(() => {
    loadContacts(1);
  }, [searchTerm, typeFilter, categoryFilter, statusFilter]);

  // Get display name for contact
  const getContactDisplayName = (contact: GlobalContact): string => {
    if (contact.type === 'individual') {
      const { first_name, last_name } = contact.individualInfo || {};
      return `${first_name || ''} ${last_name || ''}`.trim() || 'Unnamed Contact';
    } else if (contact.type === 'business') {
      return contact.businessInfo?.company_name || 'Unnamed Company';
    } else if (contact.type === 'government') {
      return contact.governmentInfo?.department_name || 'Unnamed Department';
    }
    return 'Unknown Contact';
  };

  // Get contact secondary info
  const getContactSecondaryInfo = (contact: GlobalContact): string => {
    const email = contact.individualInfo?.email || contact.contactInfo?.primary_email;
    const phone = contact.contactInfo?.primary_phone;
    const parts = [];
    if (email) parts.push(email);
    if (phone) parts.push(phone);
    return parts.join(' • ');
  };

  // Handle create contact
  const handleCreateContact = async (contactData: any) => {
    console.log('=== HANDLE CREATE CONTACT ===');
    console.log('Received contact data:', JSON.stringify(contactData, null, 2));
    
    try {
      const token = localStorage.getItem('token');
      console.log('Auth token exists:', !!token);
      console.log('Auth token preview:', token ? token.substring(0, 20) + '...' : 'null');
      
      console.log('Making API call to /api/global-contacts');
      const response = await fetch('/api/global-contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`Failed to create contact: ${response.status} ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Success response:', responseData);

      console.log('Reloading contacts and switching to list view');
      await loadContacts(currentPage);
      setViewMode('list');
      console.log('=== CREATE CONTACT SUCCESS ===');
    } catch (error) {
      console.log('=== CREATE CONTACT ERROR ===');
      console.error('Create contact error:', error);
      throw error; // Re-throw to let the form handle it
    }
  };

  // Handle edit contact
  const handleEditContact = async (contactData: any) => {
    if (!selectedContact) return;

    try {
      const response = await fetch(`/api/global-contacts/${selectedContact.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      await loadContacts(currentPage);
      setViewMode('list');
      setSelectedContact(null);
    } catch (error) {
      throw error; // Re-throw to let the form handle it
    }
  };

  // Handle delete contact
  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await fetch(`/api/global-contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete contact');
      }

      await loadContacts(currentPage);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete contact');
    }
  };

  // Handle archive contact
  const handleArchiveContact = async (contactId: string) => {
    try {
      const response = await fetch(`/api/global-contacts/${contactId}/archive`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to archive contact');
      }

      await loadContacts(currentPage);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to archive contact');
    }
  };

  // Reset and go back to list
  const handleCancel = () => {
    setViewMode('list');
    setSelectedContact(null);
  };

  // Render form based on view mode
  const renderForm = () => {
    const getCategory = () => {
      if (selectedContact) return selectedContact.category;
      return 'other'; // Default category for new contacts
    };

    switch (viewMode) {
      case 'create-individual':
        return (
          <IndividualContactForm
            category={getCategory()}
            onSave={handleCreateContact}
            onCancel={handleCancel}
          />
        );
      case 'create-business':
        return (
          <BusinessContactForm
            category={getCategory()}
            onSave={handleCreateContact}
            onCancel={handleCancel}
          />
        );
      case 'edit':
        if (!selectedContact) return null;
        if (selectedContact.type === 'individual') {
          return (
            <IndividualContactForm
              contact={selectedContact}
              category={selectedContact.category}
              onSave={handleEditContact}
              onCancel={handleCancel}
            />
          );
        } else if (selectedContact.type === 'business') {
          return (
            <BusinessContactForm
              contact={selectedContact}
              category={selectedContact.category}
              onSave={handleEditContact}
              onCancel={handleCancel}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  // Render list view
  const renderListView = () => (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <i className="fa fa-address-book text-gray-400 text-xl"></i>
          <h1 className="text-2xl font-semibold text-white">Global Contacts</h1>
          <span className="bg-blue-600 px-2 py-1 rounded text-xs font-medium text-white">
            {totalContacts}
          </span>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode('create-individual')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm flex items-center gap-2"
          >
            <i className="fa fa-user"></i>
            New Individual
          </button>
          <button
            onClick={() => setViewMode('create-business')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm flex items-center gap-2"
          >
            <i className="fa fa-building"></i>
            New Business
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <label className="block text-sm text-gray-300 mb-2">Search</label>
            <div className="relative">
              <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Search contacts..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as FilterType)}
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="government">Government</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)}
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="all">All Categories</option>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-900 border border-red-600 rounded text-red-200 text-sm mb-6">
          <i className="fa fa-exclamation-triangle mr-2"></i>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <i className="fa fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-400">Loading contacts...</p>
        </div>
      )}

      {/* Contacts Table */}
      {!loading && (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Contact Info</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Usage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Updated</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-700">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          {contact.type === 'individual' && <i className="fa fa-user text-gray-300 text-sm"></i>}
                          {contact.type === 'business' && <i className="fa fa-building text-gray-300 text-sm"></i>}
                          {contact.type === 'government' && <i className="fa fa-university text-gray-300 text-sm"></i>}
                        </div>
                        <div>
                          <div className="text-white font-medium">{getContactDisplayName(contact)}</div>
                          <div className="text-gray-400 text-sm">{contact.id.slice(-8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-700 text-gray-300 capitalize">
                        {contact.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {categoryLabels[contact.category] || contact.category}
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {getContactSecondaryInfo(contact) || 'No contact info'}
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {contact.usageCount > 0 ? `${contact.usageCount} times` : 'Never used'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs capitalize ${
                        contact.status === 'active' 
                          ? 'bg-green-900 text-green-300' 
                          : contact.status === 'inactive'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {new Date(contact.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setViewMode('edit');
                          }}
                          className="text-blue-400 hover:text-blue-300"
                          title="Edit"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        {contact.status !== 'archived' && (
                          <button
                            onClick={() => handleArchiveContact(contact.id)}
                            className="text-yellow-400 hover:text-yellow-300"
                            title="Archive"
                          >
                            <i className="fa fa-archive"></i>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-red-400 hover:text-red-300"
                          title="Delete"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {!loading && filteredContacts.length === 0 && (
              <div className="text-center py-12">
                <i className="fa fa-address-book text-4xl text-gray-600 mb-4"></i>
                <p className="text-gray-400 text-lg">No contacts found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search or filters, or create a new contact.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-700 px-4 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalContacts)} of {totalContacts} contacts
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => loadContacts(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 rounded text-white text-sm"
                >
                  Previous
                </button>
                
                <span className="px-3 py-1 text-gray-300 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => loadContacts(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 rounded text-white text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {viewMode === 'list' ? renderListView() : renderForm()}
    </div>
  );
};

export default GlobalContacts;