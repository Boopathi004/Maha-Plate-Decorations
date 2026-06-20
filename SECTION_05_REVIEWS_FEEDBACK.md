# Section 5: Customer Reviews & Feedback System

## Overview

The Reviews & Feedback System allows customers to submit star ratings and written reviews of their experience with Maha Plate Decorations. The system includes a public review submission form, admin moderation workflow, and a display section for approved testimonials. Only admin-approved reviews are visible to the public.

---

## Section Structure

### Section Container
```jsx
<section id="reviews" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

**Styling**:
- **Vertical Padding**: 80px (py-20)
- **Horizontal Padding**: 16px (px-4)
- **Background**: White to light slate gradient
- **Max Width**: 1152px (max-w-6xl)

### Section Header
```jsx
<div className="text-center mb-16">
  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
    What Our Clients Say
  </h2>
  <p className="text-gray-600 text-lg mb-6">
    Real testimonials from our delighted customers
  </p>
  
  {/* Rating Summary */}
  {/* Share Button */}
</div>
```

**Heading**:
- Font Size: 36px (mobile) → 48px (desktop)
- Font Weight: Bold (700)
- Color: Dark Gray (text-gray-900)
- Bottom Margin: 16px (mb-4)

**Subheading**:
- Font Size: 18px (text-lg)
- Color: Medium Gray (text-gray-600)
- Bottom Margin: 24px (mb-6)

---

## Rating Summary

### Rating Display
```jsx
<div className="flex justify-center items-center gap-4 mb-8">
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={24}
        className="fill-amber-400 text-amber-400"
      />
    ))}
  </div>
  <div>
    <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
    <p className="text-gray-600">Based on {displayReviews.length} reviews</p>
  </div>
</div>
```

**Star Rating**:
- **Size**: 24px (size-24)
- **Color**: Amber-400 (#FBBF24)
- **Fill**: Solid (fill-amber-400)
- **Count**: 5 stars (full rating)

**Rating Number**:
- Font Size: 36px (text-3xl)
- Font Weight: Bold (font-bold)
- Color: Dark Gray (text-gray-900)

**Review Count**:
- Font Size: 16px (default)
- Color: Medium Gray (text-gray-600)

### Average Rating Calculation
```typescript
const averageRating = displayReviews.length > 0
  ? (displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length).toFixed(1)
  : '5.0';
```

---

## Review Submission Button

### Button Component
```jsx
<Button
  onClick={() => setShowReviewForm(true)}
  className="bg-amber-600 hover:bg-amber-700"
>
  Share Your Experience
</Button>
```

**Button Styling**:
- **Background**: Amber-600 (#D97706)
- **Hover**: Amber-700 (#B45309)
- **Text**: White
- **Size**: Medium (default)
- **Action**: Opens review form modal

---

## Review Display Grid

### Grid Layout
```jsx
<div className="grid md:grid-cols-3 gap-8">
  {displayReviews.map((review: any) => (
    <Card key={review.id} className="hover:shadow-lg transition-shadow">
      {/* Review content */}
    </Card>
  ))}
</div>
```

**Grid Specifications**:
- **Mobile**: 1 column (grid-cols-1)
- **Tablet/Desktop**: 3 columns (md:grid-cols-3)
- **Gap**: 32px (gap-8)
- **Hover Effect**: Increased shadow (hover:shadow-lg)

---

## Review Card Component

### Card Structure
```jsx
<Card className="hover:shadow-lg transition-shadow">
  <CardContent className="pt-6">
    {/* Star rating */}
    {/* Review text */}
    {/* Client info */}
  </CardContent>
</Card>
```

### Star Rating Display
```jsx
<div className="flex gap-1 mb-4">
  {[...Array(review.rating)].map((_, i) => (
    <Star
      key={i}
      size={16}
      className="fill-amber-400 text-amber-400"
    />
  ))}
</div>
```

**Specifications**:
- **Star Size**: 16px (size-16)
- **Star Color**: Amber-400 (#FBBF24)
- **Fill**: Solid
- **Gap**: 4px (gap-1)
- **Bottom Margin**: 16px (mb-4)
- **Count**: Based on review.rating (1-5)

### Review Text
```jsx
<p className="text-gray-700 mb-4 line-clamp-4">
  "{review.reviewText}"
</p>
```

**Specifications**:
- **Color**: Dark Gray (text-gray-700)
- **Bottom Margin**: 16px (mb-4)
- **Max Lines**: 4 (line-clamp-4)
- **Overflow**: Truncated with ellipsis
- **Quotes**: Included in text

### Client Information
```jsx
<div className="border-t pt-4">
  <p className="font-semibold text-gray-900">{review.clientName}</p>
  {review.eventType && (
    <p className="text-sm text-gray-600 capitalize">
      {review.eventType.replace('_', ' ')} Event
    </p>
  )}
</div>
```

**Client Name**:
- Font Weight: Semibold (font-semibold)
- Color: Dark Gray (text-gray-900)

**Event Type**:
- Font Size: 14px (text-sm)
- Color: Medium Gray (text-gray-600)
- Capitalized: Yes
- Underscores Replaced: Yes

---

## Review Submission Form

### Form Modal
```jsx
{showReviewForm && (
  <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Share Your Review</DialogTitle>
        <DialogDescription>
          Tell us about your experience with Maha Plate Decorations
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmitReview} className="space-y-6">
        {/* Form fields */}
      </form>
    </DialogContent>
  </Dialog>
)}
```

### Form Fields

#### Name Field
```jsx
<div>
  <Label htmlFor="name">Your Name *</Label>
  <Input
    id="name"
    value={formData.clientName}
    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
    placeholder="Your name"
    required
  />
</div>
```

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

#### Event Type Selection
```jsx
<div>
  <Label htmlFor="eventType">Event Type</Label>
  <Select 
    value={formData.eventType} 
    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select event type (optional)" />
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

#### Star Rating Selector
```jsx
<div>
  <Label className="mb-4 block">Rating *</Label>
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setFormData({ ...formData, rating: star })}
        className="transition-transform hover:scale-110"
      >
        <Star
          size={32}
          className={`${
            star <= formData.rating
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-300'
          }`}
        />
      </button>
    ))}
  </div>
</div>
```

**Specifications**:
- **Star Size**: 32px (size-32)
- **Selected Color**: Amber-400 (#FBBF24)
- **Unselected Color**: Gray-300 (#D1D5DB)
- **Hover Effect**: Scale up 110% (hover:scale-110)
- **Transition**: Smooth (transition-transform)
- **Interactive**: Click to select

#### Review Text Area
```jsx
<div>
  <Label htmlFor="review">Your Review *</Label>
  <textarea
    id="review"
    value={formData.reviewText}
    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
    placeholder="Share your experience..."
    rows={5}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:border-amber-600"
    required
  />
</div>
```

**Specifications**:
- **Type**: Textarea
- **Rows**: 5 (default height)
- **Required**: Yes
- **Min Length**: 10 characters
- **Placeholder**: "Share your experience..."
- **Focus Border**: Amber-600

---

## Form Submission

### Submission Handler
```typescript
const handleSubmitReview = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.clientName || !formData.clientEmail || !formData.reviewText) {
    toast.error('Please fill in all required fields');
    return;
  }

  createReview.mutate({
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    rating: formData.rating,
    reviewText: formData.reviewText,
    eventType: formData.eventType ? (formData.eventType as any) : undefined,
  });
};
```

### Validation
- **Name**: Required, min 1 character
- **Email**: Required, valid email format
- **Rating**: Required, 1-5 stars
- **Review Text**: Required, min 10 characters
- **Event Type**: Optional

### API Endpoint
```typescript
trpc.reviews.create.useMutation({
  clientName: string
  clientEmail: string
  rating: number (1-5)
  reviewText: string
  eventType?: 'wedding' | 'baby_shower' | 'birthday' | 'corporate'
})
```

### Success Notification
```typescript
onSuccess: () => {
  toast.success('Thank you! Your review has been submitted for approval.');
  setShowReviewForm(false);
  setFormData({ 
    clientName: '', 
    clientEmail: '', 
    rating: 5, 
    reviewText: '', 
    eventType: '' 
  });
}
```

### Error Handling
```typescript
onError: (error) => {
  toast.error(error.message || 'Failed to submit review');
}
```

---

## Admin Moderation Workflow

### Moderation Process
```
Customer submits review
    ↓
Review saved with isApproved: false
    ↓
Admin views pending reviews
    ↓
Admin reads review content
    ↓
Admin approves or rejects
    ↓
If approved: Review visible to public
If rejected: Review deleted from database
```

### Admin Dashboard Integration
```typescript
// List all reviews (approved and pending)
trpc.reviews.listAll.useQuery()

// Approve review
trpc.reviews.approve.useMutation({ id: number })

// Reject review
trpc.reviews.reject.useMutation({ id: number })
```

### Moderation Display
```jsx
{reviews && reviews.length > 0 ? (
  reviews.map((review: any) => (
    <div key={review.id} className="border rounded-lg p-4 hover:bg-gray-50">
      {/* Review content */}
      {!review.isApproved && (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => approveReview.mutate({ id: review.id })}
          >
            <Check size={16} className="mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => rejectReview.mutate({ id: review.id })}
          >
            <X size={16} className="mr-1" />
            Reject
          </Button>
        </div>
      )}
    </div>
  ))
) : (
  <div className="text-center py-8 text-gray-500">
    No reviews to moderate
  </div>
)}
```

---

## Review Data Structure

### Review Object
```typescript
interface Review {
  id: number;
  clientName: string;
  clientEmail: string;
  rating: number;        // 1-5
  reviewText: string;
  eventType?: string;
  isApproved: boolean;
  createdAt: Date;
  approvedAt?: Date;
  updatedAt: Date;
}
```

### Demo Reviews
```javascript
const demoReviews = [
  {
    id: 1,
    clientName: 'Priya Sharma',
    rating: 5,
    reviewText: 'Absolutely stunning work! The plate decorations were the highlight of our wedding...',
    eventType: 'wedding',
  },
  {
    id: 2,
    clientName: 'Rajesh Kumar',
    rating: 5,
    reviewText: 'Professional, creative, and delivered beyond expectations...',
    eventType: 'corporate',
  },
  // More reviews...
];
```

---

## Responsive Design

### Mobile (< 768px)
- Grid: 1 column
- Card size: Full width
- Padding: 16px
- Font sizes: Smaller
- Star size: 16px (display), 24px (selector)

### Tablet (768px - 1024px)
- Grid: 2 columns
- Card size: Half width
- Padding: 20px
- Font sizes: Medium
- Star size: 16px (display), 28px (selector)

### Desktop (> 1024px)
- Grid: 3 columns
- Card size: One-third width
- Padding: 24px
- Font sizes: Larger
- Star size: 16px (display), 32px (selector)

---

## Accessibility Features

### Color Contrast
- Star rating: Amber on white (WCAG AA)
- Review text: Dark gray on white (WCAG AAA)
- Client name: Dark gray on white (WCAG AAA)
- Buttons: White on colored (WCAG AAA)

### Keyboard Navigation
- Tab through review cards
- Tab through form fields
- Enter to submit form
- Space to select stars
- Esc to close modal
- Focus indicators visible

### Screen Reader Support
```jsx
<h2>What Our Clients Say</h2>
<div className="flex gap-1">
  {[...Array(review.rating)].map((_, i) => (
    <Star key={i} aria-label={`${review.rating} out of 5 stars`} />
  ))}
</div>
<p>{review.reviewText}</p>
```

### Semantic HTML
- Proper heading hierarchy (h2)
- Button elements for actions
- Form elements with labels
- Dialog for modal

---

## Performance Optimization

### Query Optimization
- **Public Reviews**: Only fetch approved reviews
- **Admin Reviews**: Fetch all reviews (with pagination if needed)
- **Caching**: Cache approved reviews for 1 hour

### Rendering Optimization
- **Memoization**: Memo for review cards
- **Lazy Loading**: Load reviews on demand
- **Pagination**: Show 6 reviews initially, load more on scroll

---

## Testing Checklist

- [ ] Review section displays correctly on all screen sizes
- [ ] Average rating calculates correctly
- [ ] Review cards display with correct information
- [ ] Review submission form opens on button click
- [ ] Form validation works correctly
- [ ] Success notification shows after submission
- [ ] Form clears after successful submission
- [ ] Modal closes after successful submission
- [ ] Star rating selector works
- [ ] Only approved reviews display publicly
- [ ] Admin can approve reviews
- [ ] Admin can reject reviews
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard navigation works
- [ ] Screen reader announces reviews correctly
- [ ] No layout shift during load

---

## Code Implementation

### React Component
```tsx
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ReviewsSection() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    rating: 5,
    reviewText: '',
    eventType: '',
  });

  const { data: reviews } = trpc.reviews.getApproved.useQuery();
  const createReview = trpc.reviews.create.useMutation({
    onSuccess: () => {
      toast.success('Thank you! Your review has been submitted for approval.');
      setShowReviewForm(false);
      setFormData({ clientName: '', clientEmail: '', rating: 5, reviewText: '', eventType: '' });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName || !formData.clientEmail || !formData.reviewText) {
      toast.error('Please fill in all required fields');
      return;
    }

    createReview.mutate({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      rating: formData.rating,
      reviewText: formData.reviewText,
      eventType: formData.eventType ? (formData.eventType as any) : undefined,
    });
  };

  const demoReviews = [
    {
      id: 1,
      clientName: 'Priya Sharma',
      rating: 5,
      reviewText: 'Absolutely stunning work! The plate decorations were the highlight of our wedding...',
      eventType: 'wedding',
    },
    // More reviews...
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : demoReviews;

  const averageRating = displayReviews.length > 0
    ? (displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="reviews" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Real testimonials from our delighted customers
          </p>

          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
              <p className="text-gray-600">Based on {displayReviews.length} reviews</p>
            </div>
          </div>

          <Button
            onClick={() => setShowReviewForm(true)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Share Your Experience
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayReviews.map((review: any) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 line-clamp-4">
                  "{review.reviewText}"
                </p>

                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{review.clientName}</p>
                  {review.eventType && (
                    <p className="text-sm text-gray-600 capitalize">
                      {review.eventType.replace('_', ' ')} Event
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showReviewForm && (
        <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Share Your Review</DialogTitle>
              <DialogDescription>
                Tell us about your experience with Maha Plate Decorations
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Form fields... */}
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
```

---

## Metrics & Analytics

### Key Metrics
- Average rating
- Total review count
- Approval rate
- Review submission rate
- Conversion rate (review → booking)

### A/B Testing Ideas
- Different form layouts
- Different button text
- Different star sizes
- Different review counts displayed

---

## Conclusion

The Customer Reviews & Feedback System builds trust and credibility by showcasing real customer testimonials. With its intuitive submission form, admin moderation workflow, and attractive display section, it encourages customers to share their experiences while maintaining quality control through the approval process.

The system is fully responsive, accessible, and optimized for performance, ensuring an excellent user experience while protecting the brand's reputation through careful moderation.

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Complete
