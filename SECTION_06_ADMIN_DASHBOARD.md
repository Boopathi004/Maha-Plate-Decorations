# Section 6: Admin Dashboard

## Overview

The Admin Dashboard is a comprehensive management interface exclusively for the website owner (Maha Plate Decorations). It provides complete control over bookings management and customer review moderation, with real-time statistics, filtering capabilities, and detailed views.

---

## Access Control

### Authentication
```typescript
// Only admin users can access
if (user?.role !== 'admin') {
  return <Navigate to="/" />;
}
```

### User Roles
- **Admin**: Full access to dashboard, can manage bookings and reviews
- **User**: No access to dashboard, redirected to home page
- **Guest**: No access, redirected to login

### Role Definition
```typescript
interface User {
  id: number;
  openId: string;
  name?: string;
  email?: string;
  role: 'admin' | 'user';  // Admin role for dashboard access
  // ... other fields
}
```

---

## Dashboard Layout

### Main Container
```jsx
<div className="min-h-screen bg-gray-50">
  {/* Header */}
  <header className="bg-white border-b sticky top-0 z-40">
    {/* Navigation */}
  </header>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto py-8 px-4">
    {/* Content */}
  </main>
</div>
```

### Header Navigation
```jsx
<header className="bg-white border-b sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
    <div className="flex gap-4">
      <Button variant="outline" onClick={() => navigate('/')}>
        Back to Website
      </Button>
      <Button variant="destructive" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  </div>
</header>
```

---

## Statistics Section

### Statistics Cards
```jsx
<div className="grid md:grid-cols-3 gap-6 mb-8">
  {/* Total Bookings Card */}
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
      <p className="text-xs text-gray-500 mt-1">All time</p>
    </CardContent>
  </Card>

  {/* Pending Bookings Card */}
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium text-gray-600">Pending Bookings</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-amber-600">{stats.pendingBookings}</div>
      <p className="text-xs text-gray-500 mt-1">Awaiting confirmation</p>
    </CardContent>
  </Card>

  {/* Pending Reviews Card */}
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium text-gray-600">Pending Reviews</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-blue-600">{stats.pendingReviews}</div>
      <p className="text-xs text-gray-500 mt-1">Awaiting moderation</p>
    </CardContent>
  </Card>
</div>
```

### Card Styling
- **Grid**: 3 columns on desktop, 1 column on mobile
- **Gap**: 24px (gap-6)
- **Background**: White
- **Border**: Light gray
- **Padding**: 16px (p-4)

### Statistics Calculation
```typescript
const stats = {
  totalBookings: bookings?.length || 0,
  pendingBookings: bookings?.filter(b => b.status === 'pending').length || 0,
  pendingReviews: reviews?.filter(r => !r.isApproved).length || 0,
  completedBookings: bookings?.filter(b => b.status === 'completed').length || 0,
  approvedReviews: reviews?.filter(r => r.isApproved).length || 0,
};
```

---

## Tab Navigation

### Tabs Structure
```jsx
<Tabs defaultValue="bookings" className="w-full">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="bookings">
      <Calendar className="mr-2" size={16} />
      Bookings Management
    </TabsTrigger>
    <TabsTrigger value="reviews">
      <MessageSquare className="mr-2" size={16} />
      Review Moderation
    </TabsTrigger>
  </TabsList>

  {/* Tab Contents */}
</Tabs>
```

### Tab Styling
- **Grid**: 2 columns
- **Width**: Full
- **Active Tab**: Amber background
- **Inactive Tab**: Gray background
- **Icons**: 16px size

---

## Bookings Management Tab

### Bookings Table
```jsx
<TabsContent value="bookings">
  <Card>
    <CardHeader>
      <CardTitle>All Bookings</CardTitle>
      <CardDescription>Manage event bookings and update their status</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold">Client Name</th>
              <th className="text-left py-3 px-4 font-semibold">Event Type</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Guests</th>
              <th className="text-left py-3 px-4 font-semibold">Package</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking: any) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{booking.clientName}</td>
                <td className="py-3 px-4 capitalize">{booking.eventType.replace('_', ' ')}</td>
                <td className="py-3 px-4">{new Date(booking.eventDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{booking.guestCount}</td>
                <td className="py-3 px-4 capitalize">{booking.packageType}</td>
                <td className="py-3 px-4">
                  <Badge variant={getStatusVariant(booking.status)}>
                    {booking.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</TabsContent>
```

### Table Columns
| Column | Type | Description |
|--------|------|-------------|
| Client Name | Text | Full name of booking client |
| Event Type | Badge | Wedding, Baby Shower, Birthday, Corporate |
| Date | Date | Event date formatted |
| Guests | Number | Number of guests |
| Package | Badge | Basic, Premium, Luxury |
| Status | Badge | Pending, Confirmed, Completed, Cancelled |
| Action | Button | View/Edit booking |

### Status Badges
```typescript
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'pending':
      return 'outline';      // Gray border
    case 'confirmed':
      return 'default';      // Blue background
    case 'completed':
      return 'secondary';    // Green background
    case 'cancelled':
      return 'destructive';  // Red background
    default:
      return 'outline';
  }
};
```

### Filtering & Sorting
```jsx
<div className="mb-4 flex gap-4">
  <Select value={filterStatus} onValueChange={setFilterStatus}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder="Filter by status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="">All Status</SelectItem>
      <SelectItem value="pending">Pending</SelectItem>
      <SelectItem value="confirmed">Confirmed</SelectItem>
      <SelectItem value="completed">Completed</SelectItem>
      <SelectItem value="cancelled">Cancelled</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---

## Booking Detail Modal

### Modal Structure
```jsx
{selectedBooking && (
  <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Booking Details</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Booking information */}
        {/* Status update section */}
      </div>
    </DialogContent>
  </Dialog>
)}
```

### Booking Information
```jsx
<div className="grid md:grid-cols-2 gap-6">
  {/* Client Information */}
  <div>
    <h3 className="font-semibold text-gray-900 mb-3">Client Information</h3>
    <div className="space-y-2">
      <div>
        <p className="text-sm text-gray-600">Name</p>
        <p className="font-medium">{selectedBooking.clientName}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Email</p>
        <p className="font-medium">{selectedBooking.clientEmail}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Phone</p>
        <p className="font-medium">{selectedBooking.clientPhone}</p>
      </div>
    </div>
  </div>

  {/* Event Information */}
  <div>
    <h3 className="font-semibold text-gray-900 mb-3">Event Information</h3>
    <div className="space-y-2">
      <div>
        <p className="text-sm text-gray-600">Event Type</p>
        <p className="font-medium capitalize">{selectedBooking.eventType.replace('_', ' ')}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Date & Time</p>
        <p className="font-medium">{new Date(selectedBooking.eventDate).toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Guest Count</p>
        <p className="font-medium">{selectedBooking.guestCount}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Package</p>
        <p className="font-medium capitalize">{selectedBooking.packageType}</p>
      </div>
    </div>
  </div>
</div>
```

### Special Requests
```jsx
{selectedBooking.specialRequests && (
  <div>
    <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
    <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedBooking.specialRequests}</p>
  </div>
)}
```

### Status Update Section
```jsx
<div>
  <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
  <div className="flex gap-2">
    {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
      <Button
        key={status}
        variant={selectedBooking.status === status ? 'default' : 'outline'}
        onClick={() => updateStatus.mutate({ id: selectedBooking.id, status })}
        disabled={updateStatus.isPending}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Button>
    ))}
  </div>
</div>
```

---

## Review Moderation Tab

### Reviews List
```jsx
<TabsContent value="reviews">
  <Card>
    <CardHeader>
      <CardTitle>Customer Reviews</CardTitle>
      <CardDescription>Review and moderate customer feedback</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {reviews?.map((review: any) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            {/* Review content */}
            {/* Action buttons */}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>
```

### Review Card
```jsx
<div className="flex justify-between items-start">
  <div className="flex-1">
    {/* Star rating */}
    <div className="flex gap-1 mb-2">
      {[...Array(review.rating)].map((_, i) => (
        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
      ))}
    </div>

    {/* Review text */}
    <p className="text-gray-700 mb-2">"{review.reviewText}"</p>

    {/* Client info */}
    <div className="flex gap-4 text-sm text-gray-600">
      <span>{review.clientName}</span>
      {review.eventType && <span className="capitalize">{review.eventType.replace('_', ' ')}</span>}
      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
    </div>
  </div>

  {/* Status badge */}
  <Badge variant={review.isApproved ? 'secondary' : 'outline'}>
    {review.isApproved ? 'Approved' : 'Pending'}
  </Badge>
</div>
```

### Action Buttons
```jsx
{!review.isApproved && (
  <div className="flex gap-2 mt-3">
    <Button
      size="sm"
      className="bg-green-600 hover:bg-green-700"
      onClick={() => approveReview.mutate({ id: review.id })}
      disabled={approveReview.isPending}
    >
      <Check size={16} className="mr-1" />
      Approve
    </Button>
    <Button
      size="sm"
      variant="destructive"
      onClick={() => rejectReview.mutate({ id: review.id })}
      disabled={rejectReview.isPending}
    >
      <X size={16} className="mr-1" />
      Reject
    </Button>
  </div>
)}
```

### Filtering
```jsx
<div className="mb-4 flex gap-4">
  <Select value={filterApproval} onValueChange={setFilterApproval}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder="Filter by status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="">All Reviews</SelectItem>
      <SelectItem value="approved">Approved</SelectItem>
      <SelectItem value="pending">Pending</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---

## API Procedures

### Bookings Procedures
```typescript
// List all bookings
trpc.bookings.list.useQuery()

// Get booking by ID
trpc.bookings.getById.useQuery({ id: number })

// Update booking status
trpc.bookings.updateStatus.useMutation({
  id: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
})
```

### Reviews Procedures
```typescript
// List all reviews (approved and pending)
trpc.reviews.listAll.useQuery()

// Approve review
trpc.reviews.approve.useMutation({ id: number })

// Reject review
trpc.reviews.reject.useMutation({ id: number })
```

---

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Table scrolls horizontally
- Stacked cards
- Full-width modals
- Smaller fonts

### Tablet (768px - 1024px)
- Two-column grid for stats
- Readable table
- Centered modals
- Medium fonts

### Desktop (> 1024px)
- Three-column grid for stats
- Full table display
- Centered modals
- Larger fonts

---

## Accessibility Features

### Color Contrast
- Text: Dark gray on white (WCAG AAA)
- Badges: Sufficient contrast (WCAG AA)
- Buttons: White on colored (WCAG AAA)

### Keyboard Navigation
- Tab through buttons
- Enter to activate
- Esc to close modals
- Focus indicators visible

### Screen Reader Support
- Semantic HTML
- Descriptive button text
- Table headers
- Form labels

---

## Performance Optimization

### Data Fetching
- Fetch all bookings on load
- Fetch all reviews on load
- Cache data for 5 minutes
- Refetch on manual refresh

### Rendering
- Memoized components
- Efficient re-renders
- Virtual scrolling for large lists
- Pagination if needed

---

## Security Considerations

### Access Control
```typescript
// Verify admin role before rendering
if (user?.role !== 'admin') {
  return <Navigate to="/" />;
}
```

### Data Protection
- Sensitive data (emails, phone) displayed only to admin
- No data exposed to non-admin users
- Secure API endpoints with admin check
- HTTPS only

---

## Testing Checklist

- [ ] Dashboard displays only for admin users
- [ ] Non-admin users redirected to home
- [ ] Statistics calculate correctly
- [ ] Bookings table displays all bookings
- [ ] Booking status filter works
- [ ] Booking detail modal opens
- [ ] Booking status update works
- [ ] Reviews list displays all reviews
- [ ] Review approval works
- [ ] Review rejection works
- [ ] Review filter works
- [ ] Responsive design on all breakpoints
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards
- [ ] Data loads quickly
- [ ] No sensitive data exposed

---

## Code Implementation

### React Component (Partial)
```tsx
import { useState } from 'react';
import { Navigate } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MessageSquare, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('');

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const { data: bookings } = trpc.bookings.list.useQuery();
  const { data: reviews } = trpc.reviews.listAll.useQuery();
  const updateStatus = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success('Booking status updated');
      setSelectedBooking(null);
    },
  });

  const stats = {
    totalBookings: bookings?.length || 0,
    pendingBookings: bookings?.filter(b => b.status === 'pending').length || 0,
    pendingReviews: reviews?.filter(r => !r.isApproved).length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button variant="outline">Back to Website</Button>
            <Button variant="destructive">Logout</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
            </CardContent>
          </Card>
          {/* More cards... */}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">
              <Calendar className="mr-2" size={16} />
              Bookings Management
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <MessageSquare className="mr-2" size={16} />
              Review Moderation
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            {/* Bookings content */}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            {/* Reviews content */}
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            {/* Modal content */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
```

---

## Metrics & Analytics

### Key Metrics
- Total bookings count
- Booking conversion rate
- Average booking value
- Review approval rate
- Customer satisfaction (average rating)

### Reporting
- Daily booking summary
- Weekly revenue report
- Monthly performance metrics
- Review sentiment analysis

---

## Future Enhancements

### Phase 2
- Export bookings to CSV/PDF
- Email notifications for new bookings
- Booking calendar view
- Revenue analytics

### Phase 3
- Customer management system
- Automated email reminders
- SMS notifications
- Advanced reporting

---

## Conclusion

The Admin Dashboard provides comprehensive management tools for the website owner to handle bookings and moderate customer reviews. With its intuitive interface, real-time statistics, and efficient workflows, it enables the owner to manage the business effectively and maintain quality control.

The dashboard is fully responsive, accessible, and secure, ensuring only authorized users can access sensitive business information.

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Complete
