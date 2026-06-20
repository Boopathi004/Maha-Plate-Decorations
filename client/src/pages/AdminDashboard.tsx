import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { toast } from 'sonner';

import { trpc } from '../lib/trpc';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const utils = trpc.useUtils();

  // Queries
  const { data: bookings = [], isLoading: bookingsLoading } = trpc.bookings.getAll.useQuery();
  const { data: reviews = [], isLoading: reviewsLoading } = trpc.reviews.getAll.useQuery();

  // Mutations
  const updateBookingStatus = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      utils.bookings.getAll.invalidate();
    },
  });

  const updateReviewStatus = trpc.reviews.updateStatus.useMutation({
    onSuccess: () => {
      utils.reviews.getAll.invalidate();
    },
  });

  const handleBookingStatus = (id: number, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    updateBookingStatus.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Booking status updated to ${newStatus}`);
        },
        onError: (err) => {
          toast.error(`Failed to update booking: ${err.message}`);
        },
      }
    );
  };

  const handleReviewStatus = (id: number, isApproved: boolean) => {
    updateReviewStatus.mutate(
      { id, isApproved },
      {
        onSuccess: () => {
          toast.success(isApproved ? 'Review approved!' : 'Review unapproved/rejected');
        },
        onError: (err) => {
          toast.error(`Failed to update review: ${err.message}`);
        },
      }
    );
  };

  const getBookingAmount = (booking: any) => {
    if (booking.totalPrice) return `₹${Number(booking.totalPrice).toLocaleString()}`;
    const rate = booking.packageType === 'basic' ? 100 : booking.packageType === 'premium' ? 225 : 325;
    return `₹${(booking.plateCount * rate).toLocaleString()}`;
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'bookings', icon: CalendarDays, label: 'Bookings' },
    { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery Management' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay (Mobile) */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="font-bold text-gray-900">Admin Panel</span>
          </div>
          <button 
            className="lg:hidden text-gray-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} className={activeTab === item.id ? 'text-amber-600' : 'text-gray-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 shrink-0">
          <button 
            className="lg:hidden text-gray-500 mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Dashboard Overview Tab */}
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Bookings', value: bookings.length.toString(), color: 'bg-blue-50 text-blue-600' },
                    { label: 'Pending Requests', value: bookings.filter((b: any) => b.status === 'pending').length.toString(), color: 'bg-amber-50 text-amber-600' },
                    { 
                      label: 'Revenue (Est.)', 
                      value: `₹${bookings
                        .filter((b: any) => b.status === 'completed' || b.status === 'confirmed')
                        .reduce((sum: number, b: any) => sum + (b.totalPrice ? Number(b.totalPrice) : b.plateCount * (b.packageType === 'basic' ? 100 : b.packageType === 'premium' ? 225 : 325)), 0)
                        .toLocaleString()}`, 
                      color: 'bg-emerald-50 text-emerald-600' 
                    },
                    { label: 'New Reviews', value: reviews.filter((r: any) => !r.isApproved).length.toString(), color: 'bg-purple-50 text-purple-600' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                        <LayoutDashboard size={24} />
                      </div>
                      <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  {bookingsLoading ? (
                    <div className="text-center py-10 text-gray-500">Loading bookings...</div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">No bookings found in database.</div>
                  ) : (
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4">Client</th>
                          <th className="px-6 py-4">Event Details</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {bookings.map((booking: any) => (
                          <tr key={booking.id} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-medium">
                              <div>{booking.clientName}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{booking.clientPhone}</div>
                              <div className="text-[10px] text-gray-400">{booking.clientEmail}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="capitalize">{booking.eventType.replace('_', ' ')}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{new Date(booking.eventDate).toLocaleDateString()}</div>
                              <div className="text-[10px] text-amber-600 font-medium">{booking.plateCount} plates ({booking.packageType})</div>
                            </td>
                            <td className="px-6 py-4">{getBookingAmount(booking)}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {booking.status === 'pending' && <Clock size={12} />}
                                {booking.status === 'confirmed' && <CheckCircle2 size={12} />}
                                {booking.status === 'completed' && <CheckCircle2 size={12} />}
                                {booking.status === 'cancelled' && <XCircle size={12} />}
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {booking.status === 'pending' && (
                                  <button onClick={() => handleBookingStatus(booking.id, 'confirmed')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="Confirm Booking">
                                    <CheckCircle2 size={18} />
                                  </button>
                                )}
                                {booking.status === 'confirmed' && (
                                  <button onClick={() => handleBookingStatus(booking.id, 'completed')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Complete Booking">
                                    <CheckCircle2 size={18} className="text-emerald-600 fill-emerald-100" />
                                  </button>
                                )}
                                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                  <button onClick={() => handleBookingStatus(booking.id, 'cancelled')} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Cancel Booking">
                                    <XCircle size={18} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {reviewsLoading ? (
                  <div className="text-center py-10 text-gray-500">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">No reviews found in database.</div>
                ) : (
                  reviews.map((review: any) => (
                    <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-900">{review.clientName}</h4>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            review.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {review.isApproved ? 'Approved' : 'Pending Approval'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < review.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">"{review.reviewText}"</p>
                        {review.eventType && (
                          <div className="text-xs text-gray-400 mt-2 font-medium capitalize">
                            Event Occasion: {review.eventType.replace('_', ' ')}
                          </div>
                        )}
                        <div className="text-[10px] text-gray-400 mt-0.5">{review.clientEmail}</div>
                      </div>
                      <div className="flex gap-2">
                        {!review.isApproved ? (
                          <>
                            <button onClick={() => handleReviewStatus(review.id, true)} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-lg hover:bg-emerald-100 transition-colors">
                              Approve
                            </button>
                            <button onClick={() => handleReviewStatus(review.id, false)} className="px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors">
                              Reject
                            </button>
                          </>
                        ) : (
                          <button onClick={() => handleReviewStatus(review.id, false)} className="px-3 py-1.5 bg-amber-50 text-amber-600 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors">
                            Unapprove
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* Other tabs placeholder */}
            {['gallery', 'settings'].includes(activeTab) && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                <p className="text-gray-500">This module is under development.</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
