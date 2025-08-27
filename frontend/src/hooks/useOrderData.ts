import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import type { OrderData } from '../types/schema';
import { getFieldValue, setFieldValue, initializeOrderDefaults } from '../utils/schemaDefaults';

const isValidUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

export const useOrderData = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Local input values for immediate display updates
  const [localInputs, setLocalInputs] = useState<Record<string, any>>({});
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use refs to get fresh values in async callbacks
  const orderDataRef = useRef<OrderData | null>(null);
  const orderIdRef = useRef<string | undefined>(undefined);
  
  // Keep refs in sync with state
  orderDataRef.current = orderData;
  orderIdRef.current = orderId;

  useEffect(() => {
    if (orderId) {
      // Validate UUID format before making API call
      if (!isValidUUID(orderId)) {
        setError('Invalid order ID format. Please use a valid order ID.');
        setLoading(false);
        // Redirect to orders list after a short delay
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
        return;
      }
      fetchOrder();
    }
  }, [orderId, navigate]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Set up periodic data refresh for bidirectional sync
  // This ensures data stays in sync when navigating between pages
  useEffect(() => {
    if (orderId && orderData && !saving) {
      // Refresh data every 2 seconds to sync changes from other tabs/components
      refreshIntervalRef.current = setInterval(async () => {
        try {
          const freshData = await orderService.getOrder(orderId);
          const initialized = initializeOrderDefaults(freshData as Partial<OrderData>);
          
          // Only update if data has actually changed
          if (JSON.stringify(initialized) !== JSON.stringify(orderData)) {
            console.log('🔄 Detected remote changes, syncing data...');
            setOrderData(initialized);
            // Clear local inputs since we have fresh database data
            setLocalInputs({});
          }
        } catch (err) {
          console.error('Failed to refresh data for sync:', err);
        }
      }, 2000); // 2 second refresh interval for better responsiveness
      
      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [orderId, orderData, saving]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrder(orderId!);
      // Initialize with defaults if needed
      const initialized = initializeOrderDefaults(data as Partial<OrderData>);
      setOrderData(initialized);
      // Clear local inputs when fresh data is loaded
      setLocalInputs({});
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Failed to load order data');
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to update orderData and auto-save
  const debouncedUpdateOrderData = useCallback((fieldPath: string, value: any) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    updateTimeoutRef.current = setTimeout(async () => {
      // Get fresh values from refs at execution time
      const currentOrderData = orderDataRef.current;
      const currentOrderId = orderIdRef.current;
      
      if (!currentOrderData || !currentOrderId) {
        console.warn('Skipping auto-save: missing data or orderId', { 
          hasOrderData: !!currentOrderData, 
          hasOrderId: !!currentOrderId 
        });
        return;
      }
      
      const newOrderData = { ...currentOrderData };
      setFieldValue(newOrderData, fieldPath, value);
      setOrderData(newOrderData);
      
      // Auto-save changes to maintain bidirectional sync
      try {
        setSaving(true);
        await orderService.updateOrder(currentOrderId, newOrderData);
        console.log(`✅ Auto-saved field: ${fieldPath} = ${value}`);
      } catch (err) {
        console.error('❌ Auto-save failed:', err);
        setError('Failed to auto-save changes');
      } finally {
        setSaving(false);
      }
    }, 300); // Increased to 300ms for better batching
  }, []); // Empty dependency array - we'll get fresh values inside the timeout

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const fieldPath = e.target.getAttribute('data-schema-key') || name;
    
    console.log('🎯 handleInputChange called:', { fieldPath, value, type });
    
    if (!orderData) {
      console.warn('❌ No orderData, skipping input change');
      return;
    }
    
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : type === 'number' 
      ? parseFloat(value) || 0
      : value;
    
    console.log('📝 Updating field:', { fieldPath, fieldValue });
    
    // Update local inputs immediately for responsive typing
    setLocalInputs(prev => ({
      ...prev,
      [fieldPath]: fieldValue
    }));
    
    // Update orderData with debouncing
    debouncedUpdateOrderData(fieldPath, fieldValue);
  };

  const handleFieldChange = (fieldPath: string, value: any) => {
    console.log('🔄 handleFieldChange called:', { fieldPath, value });
    
    if (!orderData) {
      console.warn('❌ No orderData, skipping field change');
      return;
    }
    
    // Update local inputs immediately
    setLocalInputs(prev => ({
      ...prev,
      [fieldPath]: value
    }));
    
    // Update orderData with debouncing
    debouncedUpdateOrderData(fieldPath, value);
  };

  const handleSave = async () => {
    if (!orderData || !orderId) return;
    
    try {
      setSaving(true);
      setError(null);
      await orderService.updateOrder(orderId, orderData);
    } catch (err) {
      console.error('Error saving order:', err);
      setError('Failed to save order data');
    } finally {
      setSaving(false);
    }
  };

  const getValue = (fieldPath: string) => {
    // Check local inputs first for immediate responsiveness
    if (localInputs.hasOwnProperty(fieldPath)) {
      return localInputs[fieldPath];
    }
    
    if (!orderData) return '';
    return getFieldValue(orderData, fieldPath);
  };

  return {
    orderId,
    orderData,
    loading,
    saving,
    error,
    handleInputChange,
    handleFieldChange,
    handleSave,
    getValue,
    fetchOrder
  };
};