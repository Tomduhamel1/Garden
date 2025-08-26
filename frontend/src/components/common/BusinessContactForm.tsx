import React, { useState, useEffect } from 'react';

interface BusinessContactData {
  id?: string;
  type: 'business';
  category: string;
  business_info: {
    company_name: string;
    dba_name?: string;
    license_number?: string;
    tax_id?: string;
    industry?: string;
    website?: string;
    established_year?: string;
    contact_person_name?: string;
    contact_person_title?: string;
    contact_person_email?: string;
  };
  contact_info: {
    primary_email?: string;
    primary_phone?: string;
    secondary_phone?: string;
    fax?: string;
    address?: {
      street?: string;
      unit?: string;
      city?: string;
      state?: string;
      zipcode?: string;
    };
  };
  status: 'active' | 'inactive' | 'archived';
  tags: string[];
  notes?: string;
}

interface BusinessContactFormProps {
  contact?: Partial<BusinessContactData>;
  category: string;
  onSave: (contactData: BusinessContactData) => Promise<void>;
  onCancel: () => void;
  className?: string;
}

const BusinessContactForm: React.FC<BusinessContactFormProps> = ({
  contact,
  category,
  onSave,
  onCancel,
  className = ''
}) => {
  const [formData, setFormData] = useState<BusinessContactData>({
    type: 'business',
    category,
    business_info: {
      company_name: '',
      dba_name: '',
      license_number: '',
      tax_id: '',
      industry: '',
      website: '',
      established_year: '',
      contact_person_name: '',
      contact_person_title: '',
      contact_person_email: '',
    },
    contact_info: {
      primary_email: '',
      primary_phone: '',
      secondary_phone: '',
      fax: '',
      address: {
        street: '',
        unit: '',
        city: '',
        state: '',
        zipcode: '',
      }
    },
    status: 'active',
    tags: [],
    notes: '',
    ...contact
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // US States for dropdown
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
  ];

  // Industry options
  const industries = [
    'Real Estate', 'Banking & Finance', 'Insurance', 'Legal Services', 'Title Services', 
    'Mortgage Banking', 'Property Management', 'Construction', 'Surveying', 'Appraisal',
    'Government', 'Non-profit', 'Technology', 'Healthcare', 'Education', 'Other'
  ];

  // Update form data when contact prop changes
  useEffect(() => {
    if (contact) {
      setFormData(prev => ({
        ...prev,
        ...contact,
        business_info: {
          ...prev.business_info,
          ...contact.business_info
        },
        contact_info: {
          ...prev.contact_info,
          ...contact.contact_info,
          address: {
            ...prev.contact_info.address,
            ...contact.contact_info?.address
          }
        }
      }));
    }
  }, [contact]);

  // Handle input changes
  const handleInputChange = (field: string, value: string | string[]) => {
    const keys = field.split('.');
    
    setFormData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.business_info.company_name.trim()) {
      newErrors['business_info.company_name'] = 'Company name is required';
    }

    const email = formData.business_info.contact_person_email || formData.contact_info.primary_email;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const fieldName = formData.business_info.contact_person_email ? 'business_info.contact_person_email' : 'contact_info.primary_email';
      newErrors[fieldName] = 'Please enter a valid email address';
    }

    if (formData.business_info.website && !formData.business_info.website.match(/^https?:\/\/.+/)) {
      newErrors['business_info.website'] = 'Please enter a valid website URL (including http:// or https://)';
    }

    if (formData.business_info.tax_id && !/^\d{2}-?\d{7}$/.test(formData.business_info.tax_id)) {
      newErrors['business_info.tax_id'] = 'Please enter a valid Tax ID format (12-3456789)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving contact:', error);
      setErrors({ submit: 'Failed to save contact. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Handle tag input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const newTag = target.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        handleInputChange('tags', [...formData.tags, newTag]);
        target.value = '';
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-600 pb-4">
          <h3 className="text-lg font-semibold text-white">
            {contact?.id ? 'Edit Business Contact' : 'New Business Contact'}
          </h3>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-white text-sm flex items-center gap-2"
            >
              {saving && <i className="fa fa-spinner fa-spin"></i>}
              {saving ? 'Saving...' : 'Save Contact'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-900 border border-red-600 rounded text-red-200 text-sm">
            <i className="fa fa-exclamation-triangle mr-2"></i>
            {errors.submit}
          </div>
        )}

        {/* Business Information */}
        <section>
          <h4 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600 text-white">Business Information</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Company Name *</label>
              <input
                type="text"
                value={formData.business_info.company_name}
                onChange={(e) => handleInputChange('business_info.company_name', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['business_info.company_name'] ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {errors['business_info.company_name'] && (
                <p className="text-red-400 text-xs mt-1">{errors['business_info.company_name']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">DBA Name</label>
              <input
                type="text"
                value={formData.business_info.dba_name || ''}
                onChange={(e) => handleInputChange('business_info.dba_name', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Doing Business As"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">License Number</label>
              <input
                type="text"
                value={formData.business_info.license_number || ''}
                onChange={(e) => handleInputChange('business_info.license_number', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Tax ID / EIN</label>
              <input
                type="text"
                value={formData.business_info.tax_id || ''}
                onChange={(e) => handleInputChange('business_info.tax_id', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['business_info.tax_id'] ? 'border-red-500' : 'border-gray-500'
                }`}
                placeholder="12-3456789"
              />
              {errors['business_info.tax_id'] && (
                <p className="text-red-400 text-xs mt-1">{errors['business_info.tax_id']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Established Year</label>
              <input
                type="text"
                value={formData.business_info.established_year || ''}
                onChange={(e) => handleInputChange('business_info.established_year', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="2020"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Industry</label>
              <select
                value={formData.business_info.industry || ''}
                onChange={(e) => handleInputChange('business_info.industry', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="">Select...</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Website</label>
              <input
                type="url"
                value={formData.business_info.website || ''}
                onChange={(e) => handleInputChange('business_info.website', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['business_info.website'] ? 'border-red-500' : 'border-gray-500'
                }`}
                placeholder="https://example.com"
              />
              {errors['business_info.website'] && (
                <p className="text-red-400 text-xs mt-1">{errors['business_info.website']}</p>
              )}
            </div>
          </div>
        </section>

        {/* Primary Contact Person */}
        <section>
          <h4 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600 text-white">Primary Contact Person</h4>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Contact Person Name</label>
              <input
                type="text"
                value={formData.business_info.contact_person_name || ''}
                onChange={(e) => handleInputChange('business_info.contact_person_name', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.business_info.contact_person_title || ''}
                onChange={(e) => handleInputChange('business_info.contact_person_title', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Manager, Owner, etc."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Contact Person Email</label>
              <input
                type="email"
                value={formData.business_info.contact_person_email || ''}
                onChange={(e) => handleInputChange('business_info.contact_person_email', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['business_info.contact_person_email'] ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {errors['business_info.contact_person_email'] && (
                <p className="text-red-400 text-xs mt-1">{errors['business_info.contact_person_email']}</p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h4 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600 text-white">Contact Information</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Primary Email</label>
              <input
                type="email"
                value={formData.contact_info.primary_email || ''}
                onChange={(e) => handleInputChange('contact_info.primary_email', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['contact_info.primary_email'] ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {errors['contact_info.primary_email'] && (
                <p className="text-red-400 text-xs mt-1">{errors['contact_info.primary_email']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Primary Phone</label>
              <input
                type="tel"
                value={formData.contact_info.primary_phone || ''}
                onChange={(e) => handleInputChange('contact_info.primary_phone', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Secondary Phone</label>
              <input
                type="tel"
                value={formData.contact_info.secondary_phone || ''}
                onChange={(e) => handleInputChange('contact_info.secondary_phone', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Fax</label>
              <input
                type="tel"
                value={formData.contact_info.fax || ''}
                onChange={(e) => handleInputChange('contact_info.fax', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </section>

        {/* Business Address */}
        <section>
          <h4 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600 text-white">Business Address</h4>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-300 mb-2">Street Address</label>
              <input
                type="text"
                value={formData.contact_info.address?.street || ''}
                onChange={(e) => handleInputChange('contact_info.address.street', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Suite/Unit</label>
              <input
                type="text"
                value={formData.contact_info.address?.unit || ''}
                onChange={(e) => handleInputChange('contact_info.address.unit', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">City</label>
              <input
                type="text"
                value={formData.contact_info.address?.city || ''}
                onChange={(e) => handleInputChange('contact_info.address.city', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">State</label>
              <select
                value={formData.contact_info.address?.state || ''}
                onChange={(e) => handleInputChange('contact_info.address.state', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="">Select...</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">ZIP Code</label>
              <input
                type="text"
                value={formData.contact_info.address?.zipcode || ''}
                onChange={(e) => handleInputChange('contact_info.address.zipcode', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Tags and Status */}
        <section>
          <h4 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600 text-white">Organization</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive' | 'archived')}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Tags</label>
              <input
                type="text"
                onKeyDown={handleTagInput}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Add tags (press Enter or comma to add)"
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-300"
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Notes */}
        <section>
          <h4 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600 text-white">Notes</h4>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 h-24"
            placeholder="Internal notes about this business..."
          />
        </section>
      </form>
    </div>
  );
};

export default BusinessContactForm;