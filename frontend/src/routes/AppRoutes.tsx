import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import Dashboard from '../pages/Dashboard';
import OrderList from '../pages/OrderList';
import BasicInfo from '../components/orders/BasicInfo';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/orders/1/basic-info" replace />} />
      <Route path="/orders/:orderId" element={<AppShell />}>
        <Route path="basic-info" element={<BasicInfo />} />
        {/* Additional routes will be added here as components are created */}
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<OrderList />} />
    </Routes>
  );
};

export default AppRoutes;