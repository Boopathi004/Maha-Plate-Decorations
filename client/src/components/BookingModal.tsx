import { useState } from 'react';
import { X, User, Mail, Phone, CalendarDays, Clock, Hash, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface BookingModalProps {
  onClose: () => void;
}

const initialFormData = {
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  eventType: '',
  eventDate: '',
  eventTime: '',
  plateCount: '',
  packageType: '',
  specialRequests: '',
};

const eventLabels: Record<string, string> = {
  seer_varisai: '💍 Wedding Seer Varisai',
  engagement: '💐 Engagement Ceremony',
  valaikappu: '🍼 Baby Shower (Valaikappu)',
  griha_pravesam: '🏠 Housewarming (Griha Pravesam)',
  pooja_thattu: '🪔 Temple Offerings (Pooja Thattu)',
  festival: '🎁 Navaratri & Festival Gifts',
  ring_presentation: '💒 Wedding Ring Presentation',
  bridal_shower: '🎂 Bridal Shower Gifts',
  church_wedding: '⛪ Church Wedding Items',
  nikah: '🌙 Nikah / Eid Gift Presentation',
  bridal_trousseau: '👰 Bridal Makeup & Jewellery',
  mehendi: '🌺 Mehendi Ceremony',
  coconut: '🥥 Coconut & Flower Arrangements',
  sweets_tray: '🍬 Sweets & Dry Fruits Tray',
};

const packages = [
  {
    value: 'basic',
    label: 'Basic',
    price: '₹100',
    unit: '/ plate',
    emoji: '🌸',
    bg: 'bg-emerald-50',
    border: 'border-emerald-400',
    text: 'text-emerald-700',
    desc: 'Simple & elegant',
  },
  {
    value: 'premium',
    label: 'Premium',
    price: '₹200–₹250',
    unit: '/ plate',
    emoji: '⭐',
    bg: 'bg-amber-50',
    border: 'border-amber-400',
    text: 'text-amber-700',
    desc: 'Most popular',
    popular: true,
  },
  {
    value: 'elite',
    label: 'Elite',
    price: '₹300–₹350',
    unit: '/ plate',
    emoji: '👑',
    bg: 'bg-purple-50',
    border: 'border-purple-400',
    text: 'text-purple-700',
    desc: 'Luxury bespoke',
  },
];

const WHATSAPP_NUMBER = '916369961564';

const inputClass =
  'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white placeholder-gray-400';

export default function BookingModal({ onClose }: BookingModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.clientName ||
      !formData.clientEmail ||
      !formData.clientPhone ||
      !formData.eventType ||
      !formData.eventDate ||
      !formData.plateCount ||
      !formData.packageType
    ) {
      toast.error('Please fill in all required fields (including Email)');
      return;
    }
    if (formData.clientPhone.length < 10) {
      toast.error('Phone number must be at least 10 digits');
      return;
    }
    if (parseInt(formData.plateCount) < 1) {
      toast.error('Plate count must be at least 1');
      return;
    }

    setIsSubmitting(true);

    // Build the WhatsApp message
    const pkgLabel = packages.find(p => p.value === formData.packageType)?.label || formData.packageType;
    const eventLabel = eventLabels[formData.eventType] || formData.eventType;

    const message = [
      `*New Booking Request - Maha Plate Designing*`,
      ``,
      `Name: ${formData.clientName}`,
      `Email: ${formData.clientEmail}`,
      `Phone: ${formData.clientPhone}`,
      ``,
      `Event Type: ${eventLabel}`,
      `Event Date: ${formData.eventDate}`,
      formData.eventTime ? `Event Time: ${formData.eventTime}` : '',
      `Number of Plates: ${formData.plateCount}`,
      `Package: ${pkgLabel}`,
      formData.specialRequests ? `Special Requests: ${formData.specialRequests}` : '',
      ``,
      `Please confirm availability and pricing. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    toast.success('Opening WhatsApp! 🎉');

    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        style={{ background: 'rgba(10,10,30,0.7)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
          style={{ background: '#fff' }}
        >
          {/* ── Colorful Header ── */}
          <div
            className="relative overflow-hidden rounded-t-3xl px-6 py-7"
            style={{
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 25%, #c2410c 55%, #9d174d 80%, #7c3aed 100%)',
            }}
          >
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="absolute top-4 right-12 text-2xl opacity-60">🪔</span>
            <span className="absolute bottom-3 right-6 text-xl opacity-50">🌺</span>
            <span className="absolute top-6 left-1/2 text-xl opacity-40">✨</span>

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {/* WhatsApp icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-80">
                    <path d="M12.031 2c-5.524 0-10 4.48-10 10 0 1.77.462 3.497 1.343 5.03l-1.43 5.228 5.344-1.4c1.488.813 3.162 1.24 4.887 1.24 5.524 0 10-4.48 10-10v-.002c-.001-5.518-4.477-9.998-10-9.998zm6.096 14.145c-.254.717-1.472 1.405-2.023 1.482-.552.077-1.077.29-3.527-.692-2.951-1.183-4.838-4.183-4.985-4.381-.148-.198-1.197-1.595-1.197-3.042 0-1.448.755-2.158 1.025-2.453.271-.295.59-.368.786-.368.197 0 .393.002.564.01.178.009.418-.068.656.505.242.583.829 2.025.9 2.172.072.148.12.32.02.52-.098.197-.148.32-.295.495-.148.175-.313.39-.446.52-.148.148-.303.31-.13.606.172.296.766 1.262 1.64 2.04.1.09.28.25.4.35.34.28.52.17.71-.05.19-.22.82-.96.93-1.29.11-.33.22-.27.37-.17.15.1.95.45 1.86.9.91.45 1.06.67 1.14.8.08.13.08.77-.18 1.49z"/>
                  </svg>
                  <span className="text-yellow-200 text-xs font-bold uppercase tracking-widest">Sends directly via WhatsApp</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Book Your Event 🎊
                </h2>
                <p className="text-amber-100/80 text-sm mt-1">
                  Fill in the details — we'll make it magical ✨
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
                aria-label="Close modal"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-6 space-y-7">

            {/* ── Personal Info ── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                  <User size={14} className="text-white" />
                </div>
                <h3 className="font-bold text-base text-gray-800">Personal Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="name" type="text" value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Your full name" required className={`${inputClass} pl-9`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="email" type="email" value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="your@email.com" required className={`${inputClass} pl-9`} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="phone" type="tel" value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+91 98765 43210" required className={`${inputClass} pl-9`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #fbbf24, #f97316, transparent)' }} />

            {/* ── Event Details ── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#ec4899,#f97316)' }}>
                  <CalendarDays size={14} className="text-white" />
                </div>
                <h3 className="font-bold text-base text-gray-800">Event Details</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label htmlFor="eventType" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Occasion Type <span className="text-rose-500">*</span>
                  </label>
                  <select id="eventType" value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    required className={inputClass}>
                    <option value="">🎉 Select your occasion...</option>
                    <option value="seer_varisai">💍 Wedding Seer Varisai</option>
                    <option value="engagement">💐 Engagement Ceremony</option>
                    <option value="valaikappu">🍼 Baby Shower (Valaikappu)</option>
                    <option value="griha_pravesam">🏠 Housewarming (Griha Pravesam)</option>
                    <option value="pooja_thattu">🪔 Temple Offerings (Pooja Thattu)</option>
                    <option value="festival">🎁 Navaratri & Festival Gifts</option>
                    <option value="ring_presentation">💒 Wedding Ring Presentation</option>
                    <option value="bridal_shower">🎂 Bridal Shower Gifts</option>
                    <option value="church_wedding">⛪ Church Wedding Items</option>
                    <option value="nikah">🌙 Nikah / Eid Gift Presentation</option>
                    <option value="bridal_trousseau">👰 Bridal Makeup & Jewellery</option>
                    <option value="mehendi">🌺 Mehendi Ceremony</option>
                    <option value="coconut">🥥 Coconut & Flower Arrangements</option>
                    <option value="sweets_tray">🍬 Sweets & Dry Fruits Tray</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Event Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="eventDate" type="date" value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      required min={new Date().toISOString().split('T')[0]} className={`${inputClass} pl-9`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="eventTime" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Event Time
                  </label>
                  <div className="relative">
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="eventTime" type="time" value={formData.eventTime}
                      onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                      className={`${inputClass} pl-9`} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="plateCount" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Number of Plates <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="plateCount" type="number" min="1" value={formData.plateCount}
                      onChange={(e) => setFormData({ ...formData, plateCount: e.target.value })}
                      placeholder="e.g. 100 plates" required className={`${inputClass} pl-9`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #a78bfa, #ec4899, transparent)' }} />

            {/* ── Package Selection ── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}>
                  <Sparkles size={14} className="text-white" />
                </div>
                <h3 className="font-bold text-base text-gray-800">
                  Choose Package <span className="text-rose-500">*</span>
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {packages.map((pkg) => {
                  const selected = formData.packageType === pkg.value;
                  return (
                    <button key={pkg.value} type="button"
                      onClick={() => setFormData({ ...formData, packageType: pkg.value })}
                      className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-200 hover:scale-105 ${
                        selected ? `${pkg.border} ${pkg.bg} shadow-lg scale-105` : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                      }`}>
                      {pkg.popular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
                          style={{ background: 'linear-gradient(90deg,#f59e0b,#ef4444)' }}>⭐ Popular</span>
                      )}
                      {selected && <CheckCircle2 size={14} className={`absolute top-2 right-2 ${pkg.text}`} />}
                      <div className="text-2xl mb-1">{pkg.emoji}</div>
                      <div className={`font-bold text-sm ${selected ? pkg.text : 'text-gray-700'}`}>{pkg.label}</div>
                      <div className={`text-sm font-black mt-0.5 ${selected ? pkg.text : 'text-gray-900'}`}>{pkg.price}</div>
                      <div className={`text-[10px] mt-0.5 ${selected ? pkg.text : 'text-gray-400'}`}>{pkg.unit}</div>
                      <div className={`text-[10px] mt-1 font-medium ${selected ? pkg.text : 'text-gray-400'}`}>{pkg.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Special Requests ── */}
            <div>
              <label htmlFor="requests" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Special Requests 💬
              </label>
              <textarea id="requests" value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Any special requirements, colour preferences, or occasion notes..."
                rows={3} className={`${inputClass} resize-none`} />
            </div>

            {/* ── WhatsApp notice ── */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                <path d="M12.031 2c-5.524 0-10 4.48-10 10 0 1.77.462 3.497 1.343 5.03l-1.43 5.228 5.344-1.4c1.488.813 3.162 1.24 4.887 1.24 5.524 0 10-4.48 10-10v-.002c-.001-5.518-4.477-9.998-10-9.998zm6.096 14.145c-.254.717-1.472 1.405-2.023 1.482-.552.077-1.077.29-3.527-.692-2.951-1.183-4.838-4.183-4.985-4.381-.148-.198-1.197-1.595-1.197-3.042 0-1.448.755-2.158 1.025-2.453.271-.295.59-.368.786-.368.197 0 .393.002.564.01.178.009.418-.068.656.505.242.583.829 2.025.9 2.172.072.148.12.32.02.52-.098.197-.148.32-.295.495-.148.175-.313.39-.446.52-.148.148-.303.31-.13.606.172.296.766 1.262 1.64 2.04.1.09.28.25.4.35.34.28.52.17.71-.05.19-.22.82-.96.93-1.29.11-.33.22-.27.37-.17.15.1.95.45 1.86.9.91.45 1.06.67 1.14.8.08.13.08.77-.18 1.49z"/>
              </svg>
              <p className="text-green-800 text-xs font-medium">
                Clicking <strong>Submit</strong> will open <strong>WhatsApp</strong> with your booking details pre-filled. Send the message to complete your booking!
              </p>
            </div>

            {/* ── Actions ── */}
            <div className="flex gap-3 justify-end pt-1 pb-2">
              <button type="button" onClick={onClose}
                className="px-5 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                Cancel
              </button>
              <motion.button type="submit" disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden px-7 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                  boxShadow: '0 6px 24px rgba(34,197,94,0.4)',
                }}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M12.031 2c-5.524 0-10 4.48-10 10 0 1.77.462 3.497 1.343 5.03l-1.43 5.228 5.344-1.4c1.488.813 3.162 1.24 4.887 1.24 5.524 0 10-4.48 10-10v-.002c-.001-5.518-4.477-9.998-10-9.998zm6.096 14.145c-.254.717-1.472 1.405-2.023 1.482-.552.077-1.077.29-3.527-.692-2.951-1.183-4.838-4.183-4.985-4.381-.148-.198-1.197-1.595-1.197-3.042 0-1.448.755-2.158 1.025-2.453.271-.295.59-.368.786-.368.197 0 .393.002.564.01.178.009.418-.068.656.505.242.583.829 2.025.9 2.172.072.148.12.32.02.52-.098.197-.148.32-.295.495-.148.175-.313.39-.446.52-.148.148-.303.31-.13.606.172.296.766 1.262 1.64 2.04.1.09.28.25.4.35.34.28.52.17.71-.05.19-.22.82-.96.93-1.29.11-.33.22-.27.37-.17.15.1.95.45 1.86.9.91.45 1.06.67 1.14.8.08.13.08.77-.18 1.49z"/>
                    </svg>
                    Send via WhatsApp 🎉
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
