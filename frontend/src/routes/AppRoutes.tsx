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
import Prepaids from '../components/orders/Prepaids';
import Escrow from '../components/orders/Escrow';
import Payoffs from '../components/orders/Payoffs';
import ProceedsBorrower from '../components/orders/ProceedsBorrower';
import ProceedsSeller from '../components/orders/ProceedsSeller';
import CashToClose from '../components/orders/CashToClose';
import LoanTerms from '../components/orders/LoanTerms';
import ProjectedPayments from '../components/orders/ProjectedPayments';
import LoanCalculations from '../components/orders/LoanCalculations';
import LoanDisclosures from '../components/orders/LoanDisclosures';
import { ClosingDisclosure } from '../components/orders/ClosingDisclosure';
import SettlementStatement from '../components/orders/SettlementStatement';
import DebitsCredits from '../components/orders/DebitsCredits';
import Documents from '../components/orders/Documents';
import Accounting from '../components/orders/Accounting';
import Properties from '../components/orders/Properties';
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
        <Route path="prepaids" element={<Prepaids />} />
        <Route path="escrow" element={<Escrow />} />
        <Route path="payoffs" element={<Payoffs />} />
        <Route path="proceeds-borrower" element={<ProceedsBorrower />} />
        <Route path="proceeds-seller" element={<ProceedsSeller />} />
        <Route path="cash-to-close" element={<CashToClose />} />
        <Route path="loan-terms" element={<LoanTerms />} />
        <Route path="projected-payments" element={<ProjectedPayments />} />
        <Route path="loan-calculations" element={<LoanCalculations />} />
        <Route path="loan-disclosures" element={<LoanDisclosures />} />
        <Route path="closing-disclosure" element={<ClosingDisclosure />} />
        <Route path="settlement-statement" element={<SettlementStatement />} />
        <Route path="debits-credits" element={<DebitsCredits />} />
        <Route path="documents" element={<Documents />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="properties" element={<Properties />} />
        {/* Additional routes will be added here as components are created */}
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<OrderList />} />
    </Routes>
  );
};

export default AppRoutes;