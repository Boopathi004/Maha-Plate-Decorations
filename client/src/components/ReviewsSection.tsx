import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquarePlus, X } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '../lib/trpc';

const staticReviews = [
  {
    id: 1,
    clientName: 'Priya Ramesh',
    rating: 5,
    reviewText:
      'Maha Plate Designing exceeded all our expectations! The plate setup for our wedding was absolutely breathtaking. Every guest was talking about it. Highly recommend!',
    eventType: 'Wedding',
    date: 'March 2024',
    initials: 'PR',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 2,
    clientName: 'Karthik Subramani',
    rating: 5,
    reviewText:
      'The baby shower decoration for my wife was beyond beautiful. The team was professional, punctual, and extremely creative. Will definitely book again!',
    eventType: 'Baby Shower',
    date: 'February 2024',
    initials: 'KS',
    color: 'from-sky-400 to-blue-500',
  },
  {
    id: 3,
    clientName: 'Anitha Venkatesh',
    rating: 5,
    reviewText:
      'What a stunning birthday setup for my daughter! The luxury package was worth every rupee. The attention to detail was incredible. Perfect in every way.',
    eventType: 'Birthday',
    date: 'January 2024',
    initials: 'AV',
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 4,
    clientName: 'Senthil Kumar',
    rating: 4,
    reviewText:
      'Great corporate event decoration. Professional service and timely delivery. The premium package was excellent value. Would recommend for business events.',
    eventType: 'Corporate',
    date: 'December 2023',
    initials: 'SK',
    color: 'from-slate-400 to-gray-600',
  },
  {
    id: 5,
    clientName: 'Divya Mohan',
    rating: 5,
    reviewText:
      'Absolutely magical! The plates were decorated so beautifully for our reception dinner. Guests were amazed. Maha Plate is the best in the business!',
    eventType: 'Wedding',
    date: 'November 2023',
    initials: 'DM',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 6,
    clientName: 'Rajesh Pillai',
    rating: 5,
    reviewText:
      'Outstanding service! The team listened to every requirement and executed it flawlessly. The decoration brought tears of joy. Truly premium quality work.',
    eventType: 'Birthday',
    date: 'October 2023',
    initials: 'RP',
    color: 'from-violet-400 to-purple-500',
  },
];

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
        />
      ))}
    </div>
  );
}

function InteractiveStarRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            size={28}
            className={star <= (hover || value) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    clientName: '',
    clientEmail: '',
    rating: 0,
    reviewText: '',
    eventType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const utils = trpc.useUtils();

  // Query reviews
  const { data: reviews = [] } = trpc.reviews.getAll.useQuery();
  const approvedReviews = reviews.filter((r: any) => r.isApproved);

  // Format database reviews to match standard structure
  const formattedReviews = approvedReviews.map((r: any) => {
    const initials = r.clientName
      ? r.clientName
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'U';
    const colors = [
      'from-amber-400 to-orange-500',
      'from-sky-400 to-blue-500',
      'from-rose-400 to-pink-500',
      'from-emerald-400 to-teal-500',
      'from-violet-400 to-purple-500',
    ];
    const color = colors[r.id % colors.length];

    return {
      id: `db-${r.id}`,
      clientName: r.clientName,
      rating: r.rating,
      reviewText: r.reviewText,
      eventType: r.eventType ? r.eventType.replace('_', ' ') : 'Ceremony',
      date: new Date(r.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
      initials,
      color,
    };
  });

  const displayReviews = [...formattedReviews, ...staticReviews];

  // Calculate average rating
  const allReviewsWithRatings = [...approvedReviews, ...staticReviews];
  const avgRating = allReviewsWithRatings.length > 0 
    ? (allReviewsWithRatings.reduce((sum, r) => sum + r.rating, 0) / allReviewsWithRatings.length).toFixed(1)
    : '4.9';

  const createReview = trpc.reviews.create.useMutation({
    onSuccess: () => {
      toast.success('Review submitted! It will appear after admin approval.');
      setShowForm(false);
      setReviewForm({ clientName: '', clientEmail: '', rating: 0, reviewText: '', eventType: '' });
      setIsSubmitting(false);
      utils.reviews.getAll.invalidate();
    },
    onError: (err) => {
      toast.error(`Submission failed: ${err.message}`);
      setIsSubmitting(false);
    },
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewForm.rating === 0) {
      toast.error('Please select a star rating');
      return;
    }
    if (!reviewForm.clientEmail) {
      toast.error('Please enter your email');
      return;
    }
    if (!reviewForm.reviewText.trim()) {
      toast.error('Please write your review');
      return;
    }
    setIsSubmitting(true);

    createReview.mutate({
      clientName: reviewForm.clientName,
      clientEmail: reviewForm.clientEmail,
      rating: reviewForm.rating,
      reviewText: reviewForm.reviewText,
      eventType: reviewForm.eventType || undefined,
    });
  };

  return (
    <section id="reviews" className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block mb-3 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-500 text-lg">Real experiences from real celebrations</p>
        </motion.div>

        {/* Average Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="text-center">
            <div className="text-5xl font-bold text-amber-600 mb-1">{avgRating}</div>
            <StarRow rating={Math.round(Number(avgRating))} size={20} />
            <p className="text-sm text-gray-400 mt-1">Based on {allReviewsWithRatings.length} reviews</p>
          </div>
        </motion.div>
 
        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-50"
            >
              {/* Top */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{review.initials}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{review.clientName}</h4>
                  <p className="text-xs text-gray-400">{review.eventType} · {review.date}</p>
                </div>
              </div>
 
              {/* Stars */}
              <StarRow rating={review.rating} />
 
              {/* Review Text */}
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">"{review.reviewText}"</p>
            </motion.div>
          ))}
        </div>

        {/* Write Review Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-lg hover:shadow-amber-200"
          >
            <MessageSquarePlus size={20} />
            Write a Review
          </motion.button>
        </div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Share Your Experience</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="px-6 py-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewForm.clientName}
                      onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                      placeholder="Full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={reviewForm.clientEmail}
                      onChange={(e) => setReviewForm({ ...reviewForm, clientEmail: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <InteractiveStarRow
                    value={reviewForm.rating}
                    onChange={(v) => setReviewForm({ ...reviewForm, rating: v })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select
                    value={reviewForm.eventType}
                    onChange={(e) => setReviewForm({ ...reviewForm, eventType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="baby_shower">Baby Shower</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={reviewForm.reviewText}
                    onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-amber-600 text-white rounded-xl font-medium text-sm hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
