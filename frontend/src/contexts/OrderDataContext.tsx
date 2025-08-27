import React, { createContext, useContext, ReactNode } from 'react';
import { useOrderData } from '../hooks/useOrderData';

// Create context for order data
const OrderDataContext = createContext<ReturnType<typeof useOrderData> | undefined>(undefined);

// Provider component
export const OrderDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const orderData = useOrderData();
  
  return (
    <OrderDataContext.Provider value={orderData}>
      {children}
    </OrderDataContext.Provider>
  );
};

// Hook to use the order data context
export const useOrderDataContext = () => {
  const context = useContext(OrderDataContext);
  if (context === undefined) {
    throw new Error('useOrderDataContext must be used within an OrderDataProvider');
  }
  return context;
};