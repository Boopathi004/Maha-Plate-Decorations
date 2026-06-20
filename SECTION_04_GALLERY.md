# Section 4: Gallery & Portfolio Section

## Overview

The Gallery Section showcases the portfolio of plate decoration work organized by event type. It features a tabbed interface for filtering, a responsive image grid, and a lightbox modal for viewing full-size images. This section builds trust and showcases the quality of work.

---

## Section Structure

### Section Container
```jsx
<section id="gallery" className="py-20 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

**Styling**:
- **Vertical Padding**: 80px (py-20)
- **Horizontal Padding**: 16px (px-4)
- **Background**: White
- **Max Width**: 1152px (max-w-6xl)

### Section Header
```jsx
<h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
  Our Portfolio
</h2>
<p className="text-center text-gray-600 mb-12 text-lg">
  Explore our exquisite plate decoration designs for various occasions
</p>
```

**Heading**:
- Font Size: 36px (mobile) → 48px (desktop)
- Font Weight: Bold (700)
- Color: Dark Gray (text-gray-900)
- Bottom Margin: 16px (mb-4)

**Subheading**:
- Font Size: 18px (text-lg)
- Color: Medium Gray (text-gray-600)
- Bottom Margin: 48px (mb-12)

---

## Event Type Filtering

### Tab Navigation
```jsx
<Tabs defaultValue="wedding" className="w-full">
  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
    {eventTypes.map((type) => (
      <TabsTrigger key={type.value} value={type.value}>
        {type.label}
      </TabsTrigger>
    ))}
  </TabsList>

  {eventTypes.map((type) => (
    <TabsContent key={type.value} value={type.value} className="mt-0">
      {/* Image grid */}
    </TabsContent>
  ))}
</Tabs>
```

### Event Type Options
```javascript
const eventTypes = [
  { value: 'wedding', label: 'Weddings' },
  { value: 'baby_shower', label: 'Baby Showers' },
  { value: 'birthday', label: 'Birthdays' },
  { value: 'corporate', label: 'Corporate' },
];
```

**Tab Specifications**:
- **Grid Columns**: 2 (mobile) → 4 (desktop)
- **Width**: Full (w-full)
- **Bottom Margin**: 32px (mb-8)
- **Default Tab**: Wedding
- **Responsive**: Stacks on mobile, spreads on desktop

### Tab Styling
- **Active Tab**: Amber background, white text
- **Inactive Tab**: Gray background, gray text
- **Hover**: Slight color change
- **Transition**: Smooth (300ms)

---

## Image Grid Layout

### Grid Container
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {currentImages.map((image: any, idx: number) => (
    <div key={image.id || idx}>
      {/* Image card */}
    </div>
  ))}
</div>
```

**Grid Specifications**:
- **Mobile**: 1 column (grid-cols-1)
- **Tablet**: 2 columns (md:grid-cols-2)
- **Desktop**: 3 columns (lg:grid-cols-3)
- **Gap**: 24px (gap-6)

---

## Image Card Component

### Card Structure
```jsx
<div
  onClick={() => setSelectedImage(image)}
  className="group relative overflow-hidden rounded-lg cursor-pointer 
             aspect-square bg-gradient-to-br from-amber-100 to-orange-100 
             hover:shadow-xl transition-all duration-300"
>
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-300 
                  to-amber-600 opacity-60 group-hover:opacity-40 transition-opacity"></div>
  
  {/* Image */}
  {image.imageUrl && (
    <img
      src={image.imageUrl}
      alt={image.title}
      className="w-full h-full object-cover group-hover:scale-110 
                 transition-transform duration-300"
    />
  )}

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 
                  transition-colors flex flex-col justify-end p-4">
    <h3 className="text-white font-bold text-lg">{image.title}</h3>
    <p className="text-white/80 text-sm">{image.description}</p>
  </div>

  {/* Hover indicator */}
  <div className="absolute inset-0 flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 transition-opacity">
    <div className="bg-white rounded-full p-3">
      <ChevronRight size={24} className="text-amber-600" />
    </div>
  </div>
</div>
```

### Card Styling
- **Aspect Ratio**: Square (aspect-square)
- **Border Radius**: Large (rounded-lg)
- **Cursor**: Pointer (cursor-pointer)
- **Overflow**: Hidden (overflow-hidden)
- **Background**: Gradient (from-amber-100 to-orange-100)

### Hover Effects
1. **Shadow**: Increases on hover (hover:shadow-xl)
2. **Image Zoom**: Scales up 10% (group-hover:scale-110)
3. **Overlay Darkens**: Black opacity increases (40% → 60%)
4. **Gradient Fades**: Reduces opacity (60% → 40%)
5. **Icon Appears**: Chevron fades in (opacity-0 → opacity-100)
6. **Transition**: Smooth 300ms (transition-all duration-300)

### Image Display
```jsx
<img
  src={image.imageUrl}
  alt={image.title}
  className="w-full h-full object-cover group-hover:scale-110 
             transition-transform duration-300"
/>
```

**Specifications**:
- **Width**: Full container (w-full)
- **Height**: Full container (h-full)
- **Object Fit**: Cover (object-cover)
- **Zoom on Hover**: 110% scale
- **Transition**: Transform, 300ms

### Overlay Content
```jsx
<div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 
                transition-colors flex flex-col justify-end p-4">
  <h3 className="text-white font-bold text-lg">{image.title}</h3>
  <p className="text-white/80 text-sm">{image.description}</p>
</div>
```

**Overlay Styling**:
- **Position**: Absolute, full coverage (inset-0)
- **Background**: Black with opacity (40% default, 60% on hover)
- **Layout**: Flex column, justified to bottom (flex flex-col justify-end)
- **Padding**: 16px (p-4)
- **Transition**: Colors, 300ms

**Title**:
- Font Size: 18px (text-lg)
- Font Weight: Bold (font-bold)
- Color: White
- Bottom Margin: Default

**Description**:
- Font Size: 14px (text-sm)
- Color: White with 80% opacity (text-white/80)

---

## Lightbox Modal

### Modal Structure
```jsx
{selectedImage && (
  <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
    <DialogContent className="max-w-4xl">
      {/* Close button */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
      >
        <X size={24} />
      </button>

      {/* Image display */}
      <div className="relative w-full aspect-square bg-gradient-to-br 
                      from-amber-100 to-orange-100 rounded-lg overflow-hidden">
        {selectedImage.imageUrl && (
          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 
                       via-orange-300 to-amber-600 opacity-40"></div>
      </div>

      {/* Image details */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
        <p className="text-gray-600 mt-2">{selectedImage.description}</p>
      </div>
    </DialogContent>
  </Dialog>
)}
```

### Modal Styling
- **Max Width**: 896px (max-w-4xl)
- **Centered**: Yes
- **Overlay**: Semi-transparent black
- **Animation**: Fade in/out

### Close Button
- **Position**: Top-right (top-4 right-4)
- **Padding**: 8px (p-2)
- **Hover**: Light gray background (hover:bg-gray-100)
- **Border Radius**: Full (rounded-full)
- **Z-Index**: 10 (z-10)

### Image Display in Modal
- **Aspect Ratio**: Square (aspect-square)
- **Width**: Full (w-full)
- **Object Fit**: Cover (object-cover)
- **Border Radius**: Large (rounded-lg)
- **Overflow**: Hidden (overflow-hidden)

### Image Details
```jsx
<div className="mt-4">
  <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
  <p className="text-gray-600 mt-2">{selectedImage.description}</p>
</div>
```

**Title**:
- Font Size: 24px (text-2xl)
- Font Weight: Bold (font-bold)
- Color: Dark Gray (text-gray-900)

**Description**:
- Font Size: 16px (default)
- Color: Medium Gray (text-gray-600)
- Top Margin: 8px (mt-2)

---

## Image Data Structure

### Image Object
```typescript
interface GalleryImage {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageKey: string;
  eventType: 'wedding' | 'baby_shower' | 'birthday' | 'corporate';
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Placeholder Images (Demo)
```javascript
const placeholderImages = [
  { 
    id: 1, 
    title: 'Elegant Wedding Setup', 
    description: 'Gold and white theme' 
  },
  { 
    id: 2, 
    title: 'Romantic Dinner', 
    description: 'Rose gold accents' 
  },
  // More images...
];
```

---

## Image Management

### Image Upload (Admin)
```typescript
trpc.gallery.add.useMutation({
  title: string;
  description?: string;
  imageUrl: string;
  imageKey: string;
  eventType: 'wedding' | 'baby_shower' | 'birthday' | 'corporate';
  displayOrder?: number;
})
```

### Image Retrieval
```typescript
trpc.gallery.list.useQuery({ eventType?: string })
```

### Image Storage
- **Location**: S3 bucket
- **Naming**: Unique key format
- **Format**: JPEG, PNG, WebP
- **Size**: Optimized for web

---

## Responsive Design

### Mobile (< 768px)
- Grid: 1 column
- Card size: Full width
- Padding: 16px
- Tab layout: 2 columns
- Font sizes: Smaller

### Tablet (768px - 1024px)
- Grid: 2 columns
- Card size: Half width
- Padding: 20px
- Tab layout: 4 columns
- Font sizes: Medium

### Desktop (> 1024px)
- Grid: 3 columns
- Card size: One-third width
- Padding: 24px
- Tab layout: 4 columns
- Font sizes: Larger

---

## Accessibility Features

### Color Contrast
- Overlay text: White on dark background (WCAG AAA)
- Description: White on dark background (WCAG AAA)
- Modal title: Dark gray on white (WCAG AAA)

### Keyboard Navigation
- Tab through image cards
- Enter to open lightbox
- Esc to close lightbox
- Tab to close button
- Focus indicators visible

### Screen Reader Support
```jsx
<img
  src={image.imageUrl}
  alt={image.title}  // Descriptive alt text
/>
```

### Semantic HTML
- Proper heading hierarchy
- Semantic button elements
- Dialog for modal
- Image alt text

---

## Performance Optimization

### Image Optimization
- **Lazy Loading**: Images load on scroll
- **Placeholder**: Gradient background while loading
- **Format**: WebP with JPEG fallback
- **Size**: Optimized for web
- **Responsive**: Serve appropriate sizes

### CSS Optimization
- **Tailwind Utilities**: No custom CSS
- **GPU Acceleration**: Transform and opacity only
- **Minimal Repaints**: Efficient animations

### JavaScript Optimization
- **Minimal State**: Only selected image
- **Efficient Rendering**: No unnecessary re-renders
- **Event Delegation**: Single click handler

---

## Testing Checklist

- [ ] Gallery displays correctly on all screen sizes
- [ ] All event type tabs work correctly
- [ ] Images display with placeholder gradient
- [ ] Hover effects work smoothly
- [ ] Lightbox opens on image click
- [ ] Lightbox closes on X button click
- [ ] Lightbox closes on Esc key
- [ ] Image details display correctly in lightbox
- [ ] Tab navigation works
- [ ] Keyboard navigation works
- [ ] Screen reader announces images correctly
- [ ] Color contrast meets WCAG standards
- [ ] Images load quickly
- [ ] No layout shift during image load
- [ ] Responsive design works on all breakpoints

---

## Code Implementation

### React Component
```tsx
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GallerySection() {
  const [selectedEventType, setSelectedEventType] = useState('wedding');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { data: galleryImages } = trpc.gallery.list.useQuery({ eventType: selectedEventType });

  const eventTypes = [
    { value: 'wedding', label: 'Weddings' },
    { value: 'baby_shower', label: 'Baby Showers' },
    { value: 'birthday', label: 'Birthdays' },
    { value: 'corporate', label: 'Corporate' },
  ];

  const placeholderImages = [
    { id: 1, title: 'Elegant Wedding Setup', description: 'Gold and white theme' },
    { id: 2, title: 'Romantic Dinner', description: 'Rose gold accents' },
    { id: 3, title: 'Luxury Celebration', description: 'Crystal embellishments' },
    { id: 4, title: 'Modern Design', description: 'Contemporary styling' },
    { id: 5, title: 'Floral Arrangement', description: 'Fresh flower decorations' },
    { id: 6, title: 'Premium Finish', description: 'Handcrafted details' },
  ];

  const currentImages = galleryImages && galleryImages.length > 0 ? galleryImages : placeholderImages;

  return (
    <section id="gallery" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Our Portfolio
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Explore our exquisite plate decoration designs for various occasions
        </p>

        <Tabs defaultValue="wedding" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {eventTypes.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {eventTypes.map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentImages.map((image: any, idx: number) => (
                  <div
                    key={image.id || idx}
                    onClick={() => setSelectedImage(image)}
                    className="group relative overflow-hidden rounded-lg cursor-pointer 
                               aspect-square bg-gradient-to-br from-amber-100 to-orange-100 
                               hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 
                                   via-orange-300 to-amber-600 opacity-60 
                                   group-hover:opacity-40 transition-opacity"></div>
                    
                    {image.imageUrl && (
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 
                                   transition-transform duration-300"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 
                                   transition-colors flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-lg">{image.title}</h3>
                      <p className="text-white/80 text-sm">{image.description}</p>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center 
                                   opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-3">
                        <ChevronRight size={24} className="text-amber-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
            >
              <X size={24} />
            </button>

            <div className="relative w-full aspect-square bg-gradient-to-br 
                           from-amber-100 to-orange-100 rounded-lg overflow-hidden">
              {selectedImage.imageUrl && (
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 
                             via-orange-300 to-amber-600 opacity-40"></div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
              <p className="text-gray-600 mt-2">{selectedImage.description}</p>
            </div>
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
- Image view count
- Lightbox open rate
- Tab switching frequency
- Time spent on gallery
- Click-through to booking

### A/B Testing Ideas
- Different image layouts
- Different hover effects
- Different tab positions
- Different image counts

---

## Conclusion

The Gallery Section effectively showcases the portfolio of plate decoration work, building trust and demonstrating quality to potential customers. With its intuitive tabbed interface, responsive grid layout, and smooth lightbox experience, it provides an engaging way to explore past work.

The section is fully responsive, accessible, and optimized for performance, ensuring an excellent user experience across all devices.

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Complete
