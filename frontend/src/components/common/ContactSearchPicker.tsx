import React, { useState, useEffect, useRef } from 'react';

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
}

interface ContactSearchPickerProps {
  contactType: 'buyers' | 'sellers' | 'lenders' | 'mortgageBrokerages' | 'sellingAgencies' | 'listingAgencies' | 'recordingOffices' | 'taxAuthorities' | 'titleAbstractors' | 'surveyingFirms' | 'otherContacts';
  placeholder?: string;
  onContactSelect?: (contact: GlobalContact) => void;
  onCreateNew?: () => void;
  className?: string;
}

const ContactSearchPicker: React.FC<ContactSearchPickerProps> = ({
  contactType,
  placeholder = 'Search existing contacts...',
  onContactSelect,
  onCreateNew,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState<GlobalContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Map contact types to categories
  const categoryMapping = {
    buyers: 'buyer',
    sellers: 'seller', 
    lenders: 'lender',
    mortgageBrokerages: 'mortgage_brokerage',
    sellingAgencies: 'selling_agency',
    listingAgencies: 'listing_agency',
    recordingOffices: 'recording_office',
    taxAuthorities: 'tax_authority',
    titleAbstractors: 'title_abstractor',
    surveyingFirms: 'surveying_firm',
    otherContacts: 'other'
  };

  // Search contacts
  const searchContacts = async (query: string) => {
    if (!query.trim()) {
      setContacts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Remove category filter - allow any contact to be used in any role
      const response = await fetch(`/api/global-contacts/search?q=${encodeURIComponent(query)}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to search contacts');
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchContacts(searchTerm);
      } else {
        setContacts([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, contactType]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
  };

  // Handle contact selection
  const handleContactSelect = (contact: GlobalContact) => {
    console.log('ContactSearchPicker: Contact selected:', contact);
    setSearchTerm(''); // Clear search instead of setting display name
    setIsOpen(false);
    onContactSelect?.(contact);
  };

  // Handle create new
  const handleCreateNew = () => {
    setIsOpen(false);
    onCreateNew?.();
  };

  // Handle focus
  const handleFocus = () => {
    setIsOpen(true);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input 
          type="text" 
          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        {loading && (
          <i className="fa fa-spinner fa-spin absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {/* Create New Option */}
          <button
            onClick={handleCreateNew}
            className="w-full px-4 py-3 text-left hover:bg-gray-700 border-b border-gray-600 flex items-center gap-3"
          >
            <i className="fa fa-plus text-blue-400"></i>
            <div>
              <div className="text-sm font-medium text-blue-400">Create New Contact</div>
              <div className="text-xs text-gray-400">Add a new {contactType.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
            </div>
          </button>

          {/* Search Results */}
          {error && (
            <div className="px-4 py-3 text-sm text-red-400">
              <i className="fa fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}

          {loading && (
            <div className="px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
              <i className="fa fa-spinner fa-spin"></i>
              Searching...
            </div>
          )}

          {!loading && !error && searchTerm && contacts.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-400">
              <i className="fa fa-search mr-2"></i>
              No contacts found for "{searchTerm}"
            </div>
          )}

          {!loading && contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              className="w-full px-4 py-3 text-left hover:bg-gray-700 flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                {contact.type === 'individual' && <i className="fa fa-user text-gray-300"></i>}
                {contact.type === 'business' && <i className="fa fa-building text-gray-300"></i>}
                {contact.type === 'government' && <i className="fa fa-university text-gray-300"></i>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {getContactDisplayName(contact)}
                </div>
                {getContactSecondaryInfo(contact) && (
                  <div className="text-xs text-gray-400 truncate">
                    {getContactSecondaryInfo(contact)}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-700 text-gray-300">
                    {contact.type}
                  </span>
                  {contact.usageCount > 0 && (
                    <span className="text-xs text-gray-500">
                      Used {contact.usageCount} time{contact.usageCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactSearchPicker;