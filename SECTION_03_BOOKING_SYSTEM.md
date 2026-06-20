# Section 3: Online Booking System

## Overview

The Online Booking System is a comprehensive form-based interface that allows customers to reserve plate decoration services for their events. It captures essential information, validates input, and submits bookings to the database for admin review.

---

## System Architecture

### Booking Flow
```
User clicks "Book Now" 
    ↓
Booking Modal Opens
    ↓
User fills form
    ↓
Client-side validation
    ↓
Submit to server (tRPC)
    ↓
Server-side validation
    ↓
Database insertion
    ↓
Success notification
    ↓
Modal closes
```

---

## Booking Modal Component

### Modal Structure
```jsx
<Dialog open={true} onOpenChange={onClose}>
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl">Book Your Event</DialogTitle>
      <DialogDescription>
        Fill in the details below to reserve your plate decoration service
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form sections */}
    </form>
  </DialogContent>
</Dialog>
```

**Modal Styling**:
- **Max Width**: 896px (max-w-2xl)
- **Max Height**: 90% viewport height
- **Overflow**: Auto scroll (overflow-y-auto)
- **Title Size**: 24px (text-2xl)
- **Form Spacing**: 24px between sections (space-y-6)

---

## Form Sections

### 1. Personal Information Section

#### Section Header
```jsx
<div>
  <h3 className="font-semibold text-lg mb-4 text-gray-900">Personal Information</h3>
  <div className="grid md:grid-cols-2 gap-4">
    {/* Form fields */}
  </div>
</div>
```

#### Full Name Field
```jsx
<div>
  <Label htmlFor="name">Full Name *</Label>
  <Input
    id="name"
    value={formData.clientName}
    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
    placeholder="Your name"
    required
  />
</div>
```

**Specifications**:
- **Label**: "Full Name" with asterisk (required)
- **Input Type**: Text
- **Placeholder**: "Your name"
- **Required**: Yes
- **Validation**: Min 1 character

#### Email Field
```jsx
<div>
  <Label htmlFor="email">Email Address *</Label>
  <Input
    id="email"
    type="email"
    value={formData.clientEmail}
    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
    placeholder="your@email.com"
    required
  />
</div>
```

**Specifications**:
- **Label**: "Email Address" with asterisk
- **Input Type**: Email
- **Placeholder**: "your@email.com"
- **Required**: Yes
- **Validation**: Valid email format

#### Phone Number Field
```jsx
<div>
  <Label htmlFor="phone">Phone Number *</Label>
  <Input
    id="phone"
    value={formData.clientPhone}
    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
    placeholder="+91 98765 43210"
    required
  />
</div>
```

**Specifications**:
- **Label**: "Phone Number" with asterisk
- **Input Type**: Text (or tel)
- **Placeholder**: "+91 98765 43210"
- **Required**: Yes
- **Validation**: Min 10 characters

### 2. Event Details Section

#### Event Type Selection
```jsx
<div>
  <Label htmlFor="eventType">Event Type *</Label>
  <Select 
    value={formData.eventType} 
    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select event type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="wedding">Wedding</SelectItem>
      <SelectItem value="baby_shower">Baby Shower</SelectItem>
      <SelectItem value="birthday">Birthday</SelectItem>
      <SelectItem value="corporate">Corporate Event</SelectItem>
    </SelectContent>
  </Select>
</div>
```

**Event Types**:
1. **Wedding**: Formal, elegant events
2. **Baby Shower**: Celebration for expecting parents
3. **Birthday**: Age celebration events
4. **Corporate**: Business events and galas

**Specifications**:
- **Required**: Yes
- **Default**: None (placeholder shown)
- **Searchable**: Yes (in dropdown)

#### Event Date Field
```jsx
<div>
  <Label htmlFor="eventDate">Event Date *</Label>
  <Input
    id="eventDate"
    type="date"
    value={formData.eventDate}
    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
    required
  />
</div>
```

**Specifications**:
- **Input Type**: Date picker
- **Format**: YYYY-MM-DD
- **Required**: Yes
- **Min Date**: Today
- **Max Date**: 2 years from today

#### Event Time Field
```jsx
<div>
  <Label htmlFor="eventTime">Event Time</Label>
  <Input
    id="eventTime"
    type="time"
    value={formData.eventTime}
    onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
  />
</div>
```

**Specifications**:
- **Input Type**: Time picker
- **Format**: HH:MM (24-hour)
- **Required**: No (optional)
- **Default**: 12:00 if not provided

#### Guest Count Field
```jsx
<div>
  <Label htmlFor="guestCount">Number of Guests *</Label>
  <Input
    id="guestCount"
    type="number"
    min="1"
    value={formData.guestCount}
    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
    placeholder="50"
    required
  />
</div>
```

**Specifications**:
- **Input Type**: Number
- **Min Value**: 1
- **Max Value**: Unlimited (for Luxury package)
- **Required**: Yes
- **Placeholder**: "50"

### 3. Package Selection Section

```jsx
<div>
  <h3 className="font-semibold text-lg mb-4 text-gray-900">Service Package *</h3>
  <Select 
    value={formData.packageType} 
    onValueChange={(value) => setFormData({ ...formData, packageType: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select package" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="basic">Basic - ₹5,000</SelectItem>
      <SelectItem value="premium">Premium - ₹12,000</SelectItem>
      <SelectItem value="luxury">Luxury - ₹25,000</SelectItem>
    </SelectContent>
  </Select>
</div>
```

**Package Options**:
- **Basic**: ₹5,000
- **Premium**: ₹12,000 (Most Popular)
- **Luxury**: ₹25,000

**Specifications**:
- **Required**: Yes
- **Default**: None (placeholder shown)
- **Pricing Visible**: Yes (in dropdown)

### 4. Special Requests Section

```jsx
<div>
  <Label htmlFor="requests">Special Requests</Label>
  <textarea
    id="requests"
    value={formData.specialRequests}
    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
    placeholder="Any special requirements or preferences?"
    rows={4}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:border-amber-600"
  />
</div>
```

**Specifications**:
- **Input Type**: Textarea
- **Rows**: 4 (default height)
- **Required**: No (optional)
- **Max Length**: No limit
- **Placeholder**: "Any special requirements or preferences?"

---

## Form Data Structure

### State Management
```typescript
const [formData, setFormData] = useState({
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  eventType: '',
  eventDate: '',
  eventTime: '',
  guestCount: '',
  packageType: '',
  specialRequests: '',
});
```

### Form Data Types
```typescript
interface BookingFormData {
  clientName: string;        // Required
  clientEmail: string;       // Required, valid email
  clientPhone: string;       // Required, min 10 chars
  eventType: string;         // Required, enum
  eventDate: string;         // Required, date format
  eventTime: string;         // Optional, time format
  guestCount: string;        // Required, positive number
  packageType: string;       // Required, enum
  specialRequests: string;   // Optional, any text
}
```

---

## Validation Rules

### Client-Side Validation
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Check all required fields
  if (!formData.clientName || !formData.clientEmail || !formData.clientPhone || 
      !formData.eventType || !formData.eventDate || !formData.guestCount || 
      !formData.packageType) {
    toast.error('Please fill in all required fields');
    return;
  }
  
  // Additional validations
  if (formData.clientPhone.length < 10) {
    toast.error('Phone number must be at least 10 digits');
    return;
  }
  
  if (parseInt(formData.guestCount) < 1) {
    toast.error('Guest count must be at least 1');
    return;
  }
  
  // Submit if all validations pass
  submitBooking();
};
```

### Validation Rules
| Field | Rule | Error Message |
|-------|------|---------------|
| Name | Min 1 char | Required |
| Email | Valid email format | Invalid email |
| Phone | Min 10 chars | Invalid phone |
| Event Type | Must select | Required |
| Date | Valid date | Required |
| Time | Optional | - |
| Guests | Min 1 | Min 1 guest |
| Package | Must select | Required |
| Requests | Optional | - |

### Server-Side Validation (tRPC)
```typescript
trpc.bookings.create.useMutation({
  input: z.object({
    clientName: z.string().min(1),
    clientEmail: z.string().email(),
    clientPhone: z.string().min(10),
    eventType: z.enum(['wedding', 'baby_shower', 'birthday', 'corporate']),
    eventDate: z.date(),
    guestCount: z.number().int().positive(),
    packageType: z.enum(['basic', 'premium', 'luxury']),
    specialRequests: z.string().optional(),
  })
})
```

---

## Form Submission

### Submission Process
```typescript
const createBooking = trpc.bookings.create.useMutation({
  onSuccess: () => {
    toast.success('Booking submitted successfully! We will contact you soon.');
    onClose();
  },
  onError: (error) => {
    toast.error(error.message || 'Failed to submit booking');
  },
});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validation...
  
  const eventDateTime = new Date(`${formData.eventDate}T${formData.eventTime || '12:00'}`);
  
  createBooking.mutate({
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    clientPhone: formData.clientPhone,
    eventType: formData.eventType as any,
    eventDate: eventDateTime,
    guestCount: parseInt(formData.guestCount),
    packageType: formData.packageType as any,
    specialRequests: formData.specialRequests || undefined,
  });
};
```

### API Endpoint
```typescript
// Backend tRPC procedure
trpc.bookings.create.useMutation({
  clientName: string
  clientEmail: string
  clientPhone: string
  eventType: 'wedding' | 'baby_shower' | 'birthday' | 'corporate'
  eventDate: Date
  guestCount: number
  packageType: 'basic' | 'premium' | 'luxury'
  specialRequests?: string
})
```

### Database Insertion
```sql
INSERT INTO bookings (
  clientName,
  clientEmail,
  clientPhone,
  eventType,
  eventDate,
  guestCount,
  packageType,
  specialRequests,
  status,
  createdAt,
  updatedAt
) VALUES (
  'John Doe',
  'john@example.com',
  '+91 98765 43210',
  'wedding',
  '2024-12-15 18:00:00',
  150,
  'premium',
  'Prefer gold and white theme',
  'pending',
  NOW(),
  NOW()
);
```

---

## Action Buttons

### Cancel Button
```jsx
<Button type="button" variant="outline" onClick={onClose}>
  Cancel
</Button>
```

**Specifications**:
- **Type**: Button (not submit)
- **Variant**: Outline (gray border, transparent background)
- **Action**: Close modal without submission
- **Keyboard**: Esc key also closes

### Submit Button
```jsx
<Button 
  type="submit" 
  className="bg-amber-600 hover:bg-amber-700"
  disabled={createBooking.isPending}
>
  {createBooking.isPending ? 'Submitting...' : 'Submit Booking'}
</Button>
```

**Specifications**:
- **Type**: Submit (submits form)
- **Background**: Amber-600 (#D97706)
- **Hover**: Amber-700 (#B45309)
- **Disabled State**: While submitting
- **Loading Text**: "Submitting..."
- **Normal Text**: "Submit Booking"

---

## User Feedback

### Success Notification
```typescript
toast.success('Booking submitted successfully! We will contact you soon.');
```

**Specifications**:
- **Type**: Success toast
- **Duration**: 3-5 seconds
- **Position**: Bottom right
- **Icon**: Checkmark

### Error Notifications
```typescript
// Missing fields
toast.error('Please fill in all required fields');

// Invalid data
toast.error('Phone number must be at least 10 digits');

// Server error
toast.error(error.message || 'Failed to submit booking');
```

**Specifications**:
- **Type**: Error toast
- **Duration**: 5-7 seconds
- **Position**: Bottom right
- **Icon**: X mark
- **Dismissible**: Yes

### Loading State
```jsx
<Button disabled={createBooking.isPending}>
  {createBooking.isPending ? 'Submitting...' : 'Submit Booking'}
</Button>
```

---

## Responsive Design

### Mobile (< 640px)
- Single column layout
- Full-width form fields
- Stacked buttons
- Modal full screen
- Padding: 16px

### Tablet (640px - 1024px)
- Two-column grid for some sections
- Full-width form fields
- Side-by-side buttons
- Modal centered
- Padding: 20px

### Desktop (> 1024px)
- Two-column grid where appropriate
- Full-width form fields
- Side-by-side buttons
- Modal centered
- Padding: 24px

---

## Accessibility Features

### Form Labels
- All inputs have associated labels
- Label `htmlFor` matches input `id`
- Required fields marked with asterisk (*)

### Keyboard Navigation
- Tab through form fields in order
- Tab to buttons
- Enter submits form
- Esc closes modal
- Focus indicators visible

### Screen Reader Support
```jsx
<Label htmlFor="name">Full Name *</Label>
<Input id="name" aria-required="true" />
```

### Color Contrast
- Labels: Dark gray on white (WCAG AAA)
- Input text: Black on white (WCAG AAA)
- Buttons: White on colored (WCAG AAA)
- Required asterisk: Red on white (WCAG AA)

---

## Performance Optimization

### Form Optimization
- Minimal re-renders (React.memo for components)
- Efficient state updates
- Debounced validation
- Lazy loading of modal

### API Optimization
- Single API call on submit
- No real-time validation calls
- Optimistic updates (optional)
- Error retry logic

---

## Testing Checklist

- [ ] Form displays correctly on all screen sizes
- [ ] All required fields are marked with asterisk
- [ ] Form validation works correctly
- [ ] Error messages display appropriately
- [ ] Success notification shows after submission
- [ ] Modal closes after successful submission
- [ ] Cancel button closes modal without submission
- [ ] Submit button is disabled while loading
- [ ] All form fields accept input correctly
- [ ] Date picker works on all browsers
- [ ] Time picker works on all browsers
- [ ] Dropdown selections work correctly
- [ ] Keyboard navigation works
- [ ] Screen reader announces form correctly
- [ ] Form data is submitted to database
- [ ] Booking status is set to "pending"
- [ ] Admin receives notification of new booking

---

## Code Implementation

### React Component
```tsx
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface BookingModalProps {
  onClose: () => void;
}

export default function BookingModal({ onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    packageType: '',
    specialRequests: '',
  });

  const createBooking = trpc.bookings.create.useMutation({
    onSuccess: () => {
      toast.success('Booking submitted successfully! We will contact you soon.');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit booking');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone || 
        !formData.eventType || !formData.eventDate || !formData.guestCount || !formData.packageType) {
      toast.error('Please fill in all required fields');
      return;
    }

    const eventDateTime = new Date(`${formData.eventDate}T${formData.eventTime || '12:00'}`);
    
    createBooking.mutate({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      eventType: formData.eventType as any,
      eventDate: eventDateTime,
      guestCount: parseInt(formData.guestCount),
      packageType: formData.packageType as any,
      specialRequests: formData.specialRequests || undefined,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Your Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to reserve your plate decoration service
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Event Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select value={formData.eventType} onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="baby_shower">Baby Shower</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventTime">Event Time</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="guestCount">Number of Guests *</Label>
                <Input
                  id="guestCount"
                  type="number"
                  min="1"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  placeholder="50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Package Selection */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Service Package *</h3>
            <Select value={formData.packageType} onValueChange={(value) => setFormData({ ...formData, packageType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic - ₹5,000</SelectItem>
                <SelectItem value="premium">Premium - ₹12,000</SelectItem>
                <SelectItem value="luxury">Luxury - ₹25,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="requests">Special Requests</Label>
            <textarea
              id="requests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Any special requirements or preferences?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-amber-600 hover:bg-amber-700"
              disabled={createBooking.isPending}
            >
              {createBooking.isPending ? 'Submitting...' : 'Submit Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Conclusion

The Online Booking System provides a user-friendly interface for customers to reserve plate decoration services. With comprehensive form validation, clear field organization, and responsive design, it ensures a smooth booking experience across all devices.

The system captures all necessary information, validates data both client-side and server-side, and provides clear feedback to users throughout the process. Integration with the admin dashboard allows the owner to review and manage all bookings efficiently.

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Complete
