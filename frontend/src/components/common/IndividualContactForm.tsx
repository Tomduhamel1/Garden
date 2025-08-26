import React, { useState, useEffect } from 'react';

interface IndividualContactData {
  id?: string;
  type: 'individual';
  category: string;
  individual_info: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    suffix?: string;
    gender?: string;
    marital_status?: string;
    ssn?: string;
    date_of_birth?: string;
    email?: string;
  };
  contact_info: {
    primary_email?: string;
    primary_phone?: string;
    secondary_phone?: string;
    fax?: string;
  };
  status: 'active' | 'inactive' | 'archived';
  tags: string[];
  notes?: string;
}

interface IndividualContactFormProps {
  contact?: Partial<IndividualContactData>;
  category: string;
  onSave: (contactData: IndividualContactData) => Promise<void>;
  onCancel: () => void;
  className?: string;
}

const IndividualContactForm: React.FC<IndividualContactFormProps> = ({
  contact,
  category,
  onSave,
  onCancel,
  className = ''
}) => {
  const [formData, setFormData] = useState<IndividualContactData>({
    type: 'individual',
    category,
    individual_info: {
      first_name: '',
      last_name: '',
      middle_name: '',
      suffix: '',
      gender: '',
      marital_status: '',
      ssn: '',
      date_of_birth: '',
      email: '',
    },
    contact_info: {
      primary_email: '',
      primary_phone: '',
      secondary_phone: '',
      fax: '',
    },
    status: 'active',
    tags: [],
    notes: '',
    ...contact
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when contact prop changes
  useEffect(() => {
    if (contact) {
      setFormData(prev => ({
        ...prev,
        ...contact,
        individual_info: {
          ...prev.individual_info,
          ...contact.individual_info
        },
        contact_info: {
          ...prev.contact_info,
          ...contact.contact_info
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

    if (!formData.individual_info.first_name?.trim()) {
      newErrors['individual_info.first_name'] = 'First name is required';
    }

    if (!formData.individual_info.last_name?.trim()) {
      newErrors['individual_info.last_name'] = 'Last name is required';
    }

    // Skip email and SSN validation for now to test basic functionality
    
    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submission triggered! Check console for details.');
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form data:', JSON.stringify(formData, null, 2));

    console.log('Validating form...');
    const isValid = validateForm();
    console.log('Validation result:', isValid);
    console.log('Validation errors:', errors);

    if (!isValid) {
      console.log('Validation failed, stopping submission');
      return;
    }

    console.log('Form is valid, proceeding with save...');
    setSaving(true);
    try {
      console.log('Calling onSave with data:', formData);
      await onSave(formData);
      console.log('onSave completed successfully');
    } catch (error) {
      console.error('Error saving contact:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      setErrors({ submit: 'Failed to save contact. Please try again.' });
    } finally {
      setSaving(false);
      console.log('=== FORM SUBMISSION ENDED ===');
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
            {contact?.id ? 'Edit Individual Contact' : 'New Individual Contact'}
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
              type="button"
              onClick={() => {
                alert('BUTTON CLICKED! Form working.');
                handleSubmit(new Event('submit') as any);
              }}
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

        {/* Basic Information */}
        <section>
          <h4 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600 text-white">Basic Information</h4>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">First Name *</label>
              <input
                type="text"
                value={formData.individual_info.first_name}
                onChange={(e) => handleInputChange('individual_info.first_name', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['individual_info.first_name'] ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {errors['individual_info.first_name'] && (
                <p className="text-red-400 text-xs mt-1">{errors['individual_info.first_name']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Middle Name</label>
              <input
                type="text"
                value={formData.individual_info.middle_name || ''}
                onChange={(e) => handleInputChange('individual_info.middle_name', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Last Name *</label>
              <input
                type="text"
                value={formData.individual_info.last_name}
                onChange={(e) => handleInputChange('individual_info.last_name', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['individual_info.last_name'] ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {errors['individual_info.last_name'] && (
                <p className="text-red-400 text-xs mt-1">{errors['individual_info.last_name']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Suffix</label>
              <input
                type="text"
                value={formData.individual_info.suffix || ''}
                onChange={(e) => handleInputChange('individual_info.suffix', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Jr, Sr, III, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Gender</label>
              <select
                value={formData.individual_info.gender || ''}
                onChange={(e) => handleInputChange('individual_info.gender', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Marital Status</label>
              <select
                value={formData.individual_info.marital_status || ''}
                onChange={(e) => handleInputChange('individual_info.marital_status', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="">Select...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">SSN</label>
              <input
                type="text"
                value={formData.individual_info.ssn || ''}
                onChange={(e) => handleInputChange('individual_info.ssn', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['individual_info.ssn'] ? 'border-red-500' : 'border-gray-500'
                }`}
                placeholder="123-45-6789"
              />
              {errors['individual_info.ssn'] && (
                <p className="text-red-400 text-xs mt-1">{errors['individual_info.ssn']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData.individual_info.date_of_birth || ''}
                onChange={(e) => handleInputChange('individual_info.date_of_birth', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
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
              <label className="block text-sm text-gray-300 mb-2">Personal Email</label>
              <input
                type="email"
                value={formData.individual_info.email || ''}
                onChange={(e) => handleInputChange('individual_info.email', e.target.value)}
                className={`w-full px-3 py-2.5 bg-gray-700 border rounded text-white text-sm focus:outline-none focus:border-blue-500 ${
                  errors['individual_info.email'] ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {errors['individual_info.email'] && (
                <p className="text-red-400 text-xs mt-1">{errors['individual_info.email']}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
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
            placeholder="Internal notes about this contact..."
          />
        </section>
      </form>
    </div>
  );
};

export default IndividualContactForm;