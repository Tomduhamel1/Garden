import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import Dashboard from '../pages/Dashboard';
import OrderList from '../pages/OrderList';
import BasicInfo from '../components/orders/BasicInfo';
import Contacts from '../components/orders/Contacts';
import Loan from '../components/orders/Loan';
import OriginationCharges from '../components/orders/OriginationCharges';
import DidShopFor from '../components/orders/DidShopFor';
import DidNotShopFor from '../components/orders/DidNotShopFor';
import OtherCharges from '../components/orders/OtherCharges';
import TaxesAndFees from '../components/orders/TaxesAndFees';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/orders/1/basic-info" replace />} />
      <Route path="/orders/:orderId" element={<AppShell />}>
        <Route path="basic-info" element={<BasicInfo />} />
        <Route path="contacts" element={<Contacts orderId="1" />} />
        <Route path="loan" element={<Loan orderId="1" />} />
        <Route path="origination-charges" element={<OriginationCharges />} />
        <Route path="did-shop-for" element={<DidShopFor />} />
        <Route path="did-not-shop-for" element={<DidNotShopFor />} />
        <Route path="other-charges" element={<OtherCharges />} />
        <Route path="taxes-and-fees" element={<TaxesAndFees />} />
        {/* Additional routes will be added here as components are created */}
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<OrderList />} />
    </Routes>
  );
};

export default AppRoutes;