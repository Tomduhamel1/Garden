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
      <Route path="/orders/:id/basic-info" element={<BasicInfo />} />
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<OrderList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;