import { Switch, Route } from 'wouter';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import PageLoader from './components/PageLoader';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      <PageLoader />
      <WhatsAppButton />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
