import { lazy, Suspense } from 'react';
import { Switch, Route } from 'wouter';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PageLoader from './components/PageLoader';
import WhatsAppButton from './components/WhatsAppButton';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

export default function App() {
  return (
    <>
      <PageLoader />
      <WhatsAppButton />
      <Suspense fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold tracking-wider">Loading Dashboard...</span>
          </div>
        </div>
      }>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/admin" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
