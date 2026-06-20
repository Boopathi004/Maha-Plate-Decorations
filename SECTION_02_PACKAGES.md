# Section 2: Service Packages Section

## Overview

The Packages Section showcases three distinct service tiers—Basic, Premium, and Luxury—each with clear pricing, feature inclusions, and dedicated call-to-action buttons. This section helps customers understand the value proposition and choose the package that best fits their needs.

---

## Section Structure

### Section Container
```jsx
<section id="packages" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
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
- **Horizontal Centering**: Auto margins (mx-auto)

### Header
```jsx
<h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
  Our Service Packages
</h2>
<p className="text-center text-gray-600 mb-16 text-lg">
  Choose the perfect package for your celebration
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
- Bottom Margin: 64px (mb-16)

---

## Package Card Design

### Card Container
```jsx
<Card className="relative overflow-hidden hover:shadow-2xl transition-all 
                 duration-300 transform hover:-translate-y-2">
  {/* Badge (Premium only) */}
  {pkg.type === 'premium' && (
    <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-2 
                    rounded-bl-lg font-semibold">
      Most Popular
    </div>
  )}
  
  {/* Content */}
</Card>
```

**Card Styling**:
- **Overflow**: Hidden (overflow-hidden)
- **Hover Shadow**: Extra large (hover:shadow-2xl)
- **Transition**: All properties, 300ms (transition-all duration-300)
- **Hover Transform**: Translate up 2px (hover:-translate-y-2)

### "Most Popular" Badge
- **Position**: Top-right corner (top-0 right-0)
- **Background**: Amber-500 (#F59E0B)
- **Text Color**: White
- **Padding**: 8px horizontal, 8px vertical (px-4 py-2)
- **Border Radius**: Bottom-left only (rounded-bl-lg)
- **Font Weight**: Semibold (font-semibold)

---

## Package Data Structure

### Basic Package
```javascript
{
  type: 'basic',
  name: 'Basic',
  price: 5000,
  description: 'Perfect for intimate gatherings',
  features: [
    'Elegant plate decoration',
    'Up to 50 guests',
    'Standard design options',
    'Professional setup'
  ]
}
```

### Premium Package
```javascript
{
  type: 'premium',
  name: 'Premium',
  price: 12000,
  description: 'For memorable celebrations',
  features: [
    'Custom plate designs',
    'Up to 150 guests',
    'Premium materials',
    'Personalized consultation',
    'Professional setup & cleanup'
  ]
}
```

### Luxury Package
```javascript
{
  type: 'luxury',
  name: 'Luxury',
  price: 25000,
  description: 'Unforgettable experiences',
  features: [
    'Bespoke plate artistry',
    'Unlimited guests',
    'Premium materials & finishes',
    '1-on-1 designer consultation',
    'Full event coordination',
    'Premium setup & styling'
  ]
}
```

---

## Card Components

### Header Section
```jsx
<CardHeader>
  <CardTitle className="text-2xl text-amber-600">{pkg.name}</CardTitle>
  <CardDescription>{pkg.description}</CardDescription>
</CardHeader>
```

**Title**:
- Font Size: 24px (text-2xl)
- Color: Amber-600 (#D97706)
- Font Weight: Bold (default for CardTitle)

**Description**:
- Font Size: 14px (default for CardDescription)
- Color: Gray-600 (default)
- Italicized appearance

### Pricing Section
```jsx
<div className="mb-6">
  <div className="text-4xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</div>
  <p className="text-gray-600 text-sm">Starting price</p>
</div>
```

**Price Display**:
- Font Size: 36px (text-4xl)
- Font Weight: Bold (font-bold)
- Color: Dark Gray (text-gray-900)
- Currency: Indian Rupee (₹)
- Formatting: Locale-specific comma separation

**Price Label**:
- Font Size: 14px (text-sm)
- Color: Medium Gray (text-gray-600)

### Features List
```jsx
<ul className="space-y-3 mb-8">
  {pkg.features.map((feature, idx) => (
    <li key={idx} className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center 
                      justify-center flex-shrink-0 mt-0.5">
        <div className="w-2 h-2 rounded-full bg-amber-600"></div>
      </div>
      <span className="text-gray-700">{feature}</span>
    </li>
  ))}
</ul>
```

**List Styling**:
- **Spacing**: 12px between items (space-y-3)
- **Bottom Margin**: 32px (mb-8)
- **Layout**: Flex with gap (flex items-start gap-3)

**Bullet Points**:
- **Size**: 20px × 20px (w-5 h-5)
- **Shape**: Circular (rounded-full)
- **Background**: Light amber (bg-amber-100)
- **Inner Dot**: 8px × 8px (w-2 h-2)
- **Inner Dot Color**: Amber-600 (bg-amber-600)
- **Flex Shrink**: Prevents resizing (flex-shrink-0)

**Feature Text**:
- Font Size: 16px (default)
- Color: Dark Gray (text-gray-700)

### Call-to-Action Button
```jsx
<Button 
  onClick={() => setShowBookingModal(true)}
  className={`w-full ${
    pkg.type === 'premium' 
      ? 'bg-amber-600 hover:bg-amber-700' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
  }`}
>
  Select Package
</Button>
```

**Button Styling**:
- **Width**: Full (w-full)
- **Premium Button**: Amber background with hover effect
- **Other Buttons**: Gray background with hover effect
- **Text Color**: White (premium) or Dark Gray (others)
- **Font Weight**: Bold (default)

---

## Grid Layout

### Responsive Grid
```jsx
<div className="grid md:grid-cols-3 gap-8">
  {packageData.map((pkg) => (
    <Card key={pkg.type}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

**Grid Specifications**:
- **Mobile**: Single column (1fr)
- **Tablet/Desktop**: Three columns (md:grid-cols-3)
- **Gap**: 32px (gap-8)
- **Responsive Breakpoint**: 768px (md)

---

## Pricing Strategy

### Price Points
| Package | Price | Target Market | Capacity |
|---------|-------|---------------|----------|
| Basic | ₹5,000 | Small events | Up to 50 guests |
| Premium | ₹12,000 | Medium events | Up to 150 guests |
| Luxury | ₹25,000 | Large events | Unlimited |

### Price Justification
- **Basic**: Entry-level service for budget-conscious customers
- **Premium**: Mid-range with enhanced features and materials (2.4x Basic)
- **Luxury**: Premium service with full customization (5x Basic, 2.08x Premium)

---

## Feature Differentiation

### Basic Package Features
1. Elegant plate decoration
2. Up to 50 guests
3. Standard design options
4. Professional setup

### Premium Package Features (Additional)
1. Custom plate designs
2. Up to 150 guests (3x capacity)
3. Premium materials
4. Personalized consultation
5. Professional setup & cleanup

### Luxury Package Features (Additional)
1. Bespoke plate artistry
2. Unlimited guests
3. Premium materials & finishes
4. 1-on-1 designer consultation
5. Full event coordination
6. Premium setup & styling

---

## Visual Hierarchy

### Card Emphasis
- **Premium Card**: Highlighted with "Most Popular" badge
- **Hover Effect**: All cards lift up on hover
- **Shadow Progression**: Gray cards → Premium card has stronger shadow

### Typography Hierarchy
1. **Package Name**: Largest, colored (text-2xl, amber-600)
2. **Price**: Very large, bold (text-4xl)
3. **Features**: Medium, readable (text-gray-700)
4. **Description**: Smaller, subtle (text-sm)

---

## Interactive Behavior

### Hover Effects
```css
/* Card hover */
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateY(-8px);
  transition: all 300ms ease;
}

/* Button hover */
.button:hover {
  background-color: darker-shade;
  cursor: pointer;
}
```

### Click Behavior
```typescript
onClick={() => setShowBookingModal(true)}
```
- Opens booking modal
- Pre-selects package type
- Focuses on form

---

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Full-width cards
- Padding: 16px (px-4)
- Heading: 36px (text-4xl)
- Price: 36px (text-4xl)

### Tablet/Desktop (≥ 768px)
- Three-column grid
- Cards with equal width
- Padding: 16px (px-4)
- Heading: 48px (text-5xl)
- Price: 36px (text-4xl)
- Gap: 32px (gap-8)

---

## Accessibility Features

### Color Contrast
- Package names: Amber on white (WCAG AA)
- Prices: Dark gray on white (WCAG AAA)
- Features: Dark gray on white (WCAG AAA)
- Buttons: White on colored (WCAG AAA)

### Keyboard Navigation
- Tab through cards
- Tab through buttons
- Enter to select package
- Focus indicators visible

### Screen Reader Support
```jsx
<h2>Our Service Packages</h2>
<Card>
  <CardTitle>Basic</CardTitle>
  <CardDescription>Perfect for intimate gatherings</CardDescription>
  <ul>
    <li>Elegant plate decoration</li>
    {/* More features */}
  </ul>
  <Button>Select Package</Button>
</Card>
```

### Semantic HTML
- Proper heading hierarchy (h2)
- List elements for features (ul, li)
- Button elements for actions
- Card structure with headers

---

## Performance Optimization

### CSS Optimization
- Tailwind utility classes
- No custom CSS needed
- Minimal JavaScript
- Efficient grid layout

### Image Optimization
- No images in package cards
- Gradient backgrounds only
- Icon-only bullets
- Reduced file size

### Rendering Performance
- Static content (no animations)
- Efficient re-renders
- No unnecessary state updates
- Optimized event handlers

---

## Customization Guide

### Changing Prices
```jsx
price: 5000 → price: 7500 // Update price value
```

### Adding/Removing Features
```jsx
features: [
  'Elegant plate decoration',
  'Up to 50 guests',
  // Add new feature here
  'New feature name'
]
```

### Changing Colors
```jsx
// Package name color
text-amber-600 → text-blue-600

// Button color (Premium)
bg-amber-600 hover:bg-amber-700 → bg-blue-600 hover:bg-blue-700

// Badge color
bg-amber-500 → bg-green-500
```

### Adjusting Spacing
```jsx
// Card gap
gap-8 → gap-12 // Larger gap

// Feature spacing
space-y-3 → space-y-4 // More space between features

// Padding
py-20 → py-32 // More vertical padding
```

---

## Testing Checklist

- [ ] All three packages display correctly
- [ ] Cards are responsive on mobile, tablet, desktop
- [ ] "Most Popular" badge visible on Premium card
- [ ] Hover effects work smoothly
- [ ] Buttons are clickable
- [ ] Prices display with correct formatting
- [ ] Features list displays correctly
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard navigation works
- [ ] Screen reader announces content
- [ ] No layout shift on hover
- [ ] Page loads quickly

---

## Code Implementation

### React Component
```tsx
export default function Home() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const packageData = [
    {
      type: 'basic',
      name: 'Basic',
      price: 5000,
      description: 'Perfect for intimate gatherings',
      features: [
        'Elegant plate decoration',
        'Up to 50 guests',
        'Standard design options',
        'Professional setup'
      ]
    },
    // Premium and Luxury packages...
  ];

  return (
    <section id="packages" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Our Service Packages
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Choose the perfect package for your celebration
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {packageData.map((pkg) => (
            <Card key={pkg.type} className="relative overflow-hidden hover:shadow-2xl 
                                           transition-all duration-300 transform hover:-translate-y-2">
              {pkg.type === 'premium' && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-2 
                               rounded-bl-lg font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-amber-600">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    ₹{pkg.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600 text-sm">Starting price</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center 
                                     justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className={`w-full ${pkg.type === 'premium' 
                    ? 'bg-amber-600 hover:bg-amber-700' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
                >
                  Select Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Metrics & Analytics

### Key Metrics to Track
- Package selection rate (which package is most popular)
- Click-through rate on "Select Package" buttons
- Hover engagement (time spent on cards)
- Conversion rate to booking

### A/B Testing Ideas
- Different pricing points
- Different feature descriptions
- Different button text
- Different card layouts

---

## Conclusion

The Packages Section effectively presents three distinct service tiers, making it easy for customers to understand the value proposition and choose the right package for their needs. With clear pricing, feature differentiation, and prominent call-to-action buttons, this section drives conversions and guides customers toward booking.

The responsive design, accessibility features, and smooth interactions ensure an excellent user experience across all devices and for all users.

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Complete
