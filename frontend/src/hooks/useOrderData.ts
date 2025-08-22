import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrder(orderId!);
      // Initialize with defaults if needed
      const initialized = initializeOrderDefaults(data as Partial<OrderData>);
      setOrderData(initialized);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Failed to load order data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const fieldPath = e.target.getAttribute('data-schema-key') || name;
    
    if (!orderData) return;
    
    const newOrderData = { ...orderData };
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : type === 'number' 
      ? parseFloat(value) || 0
      : value;
    
    setFieldValue(newOrderData, fieldPath, fieldValue);
    setOrderData(newOrderData);
  };

  const handleFieldChange = (fieldPath: string, value: any) => {
    if (!orderData) return;
    
    const newOrderData = { ...orderData };
    setFieldValue(newOrderData, fieldPath, value);
    setOrderData(newOrderData);
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