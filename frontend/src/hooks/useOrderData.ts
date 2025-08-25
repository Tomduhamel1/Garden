import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../services/orderService';
import type { OrderData } from '../types/schema';
import { getFieldValue, setFieldValue, initializeOrderDefaults } from '../utils/schemaDefaults';

export const useOrderData = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Local input values for immediate display updates
  const [localInputs, setLocalInputs] = useState<Record<string, any>>({});
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

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

  // Debounced function to update orderData
  const debouncedUpdateOrderData = useCallback((fieldPath: string, value: any) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    updateTimeoutRef.current = setTimeout(() => {
      if (!orderData) return;
      
      const newOrderData = { ...orderData };
      setFieldValue(newOrderData, fieldPath, value);
      setOrderData(newOrderData);
    }, 150); // 150ms delay
  }, [orderData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const fieldPath = e.target.getAttribute('data-schema-key') || name;
    
    if (!orderData) return;
    
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : type === 'number' 
      ? parseFloat(value) || 0
      : value;
    
    // Update local inputs immediately for responsive typing
    setLocalInputs(prev => ({
      ...prev,
      [fieldPath]: fieldValue
    }));
    
    // Update orderData with debouncing
    debouncedUpdateOrderData(fieldPath, fieldValue);
  };

  const handleFieldChange = (fieldPath: string, value: any) => {
    if (!orderData) return;
    
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