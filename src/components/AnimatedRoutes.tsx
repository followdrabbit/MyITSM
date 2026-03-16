import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from '@/pages/Dashboard';
import Catalog from '@/pages/Catalog';
import CategoryDetail from '@/pages/CategoryDetail';
import NewTicket from '@/pages/NewTicket';
import TicketDetail from '@/pages/TicketDetail';
import TicketList from '@/pages/TicketList';
import AdminPanel from '@/pages/AdminPanel';
import NotFound from '@/pages/NotFound';

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:categoryId" element={<CategoryDetail />} />
        <Route path="/catalog/:categoryId/new" element={<NewTicket />} />
        <Route path="/catalog/:categoryId/new/:requestTypeId" element={<NewTicket />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/tickets/:ticketId" element={<TicketDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
