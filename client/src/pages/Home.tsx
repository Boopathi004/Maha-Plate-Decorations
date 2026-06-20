import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Phone, Mail, ChevronRight, Heart, Award, Clock, Sparkles, MessageCircle } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import GallerySection from '../components/GallerySection';
import ReviewsSection from '../components/ReviewsSection';

const heroShowcase = [
  { src: '/images/seervarisai_plate.webp', alt: 'Seervarisai' },
  { src: '/images/pooja_thattu.webp', alt: 'Pooja Thattu' },
  { src: '/images/wedding_ring_plate.webp', alt: 'Ring Ceremony' },
  { src: '/images/nikah_plate.webp', alt: 'Nikah Tray' },
];

const packageData = [
  {
    type: 'basic',
    name: 'Basic',
    priceLabel: '₹100',
    priceUnit: '/ plate',
    description: 'Simple & elegant plate decoration',
    highlight: '',
    features: [
      'Standard floral arrangement',
      'Fresh flowers & leaves',
      'Turmeric & kumkum placement',
      'Basic colour coordination',
      'Fruits & coconut arrangement',
      'Suitable for all ceremonies',
    ],
  },
  {
    type: 'premium',
    name: 'Premium',
    priceLabel: '₹200 – ₹250',
    priceUnit: '/ plate',
    description: 'Rich & detailed decoration design',
    highlight: '⭐ Most Popular',
    features: [
      'Designer floral patterns',
      'Premium silk & fabric accents',
      'Layered colour themes',
      'Decorative items & fillers',
      'Custom arrangement per event',
      'Beads, stones & accessories',
      'Sweets & dry fruits display',
    ],
  },
  {
    type: 'elite',
    name: 'Elite',
    priceLabel: '₹300 – ₹350',
    priceUnit: '/ plate',
    description: 'Bespoke luxury artisan work',
    highlight: '',
    features: [
      'Hand-crafted bespoke designs',
      'Premium zari & gold fabric',
      'Exclusive floral sculptures',
      'Multi-layer themed styling',
      'Precious stone & bead inlay',
      'Personalised design consultation',
      'Premium gift & jewellery display',
      'Photography-ready presentation',
    ],
  },
];

const navLinks = ['Home', 'Services', 'Packages', 'Gallery', 'Reviews', 'Contact'];

export default function Home() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        // Delay scroll slightly to allow mobile menu collapse animation to complete
        // and prevent mobile browsers from aborting the smooth scroll.
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 font-sans relative">
      {/* ── PERSISTENT BACKGROUND ANIMATION (FULL SITE) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating gradient lights */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-amber-200/25 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 80, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-orange-200/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 30, -50, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute bottom-[15%] left-[5%] w-[450px] h-[450px] bg-yellow-200/25 rounded-full filter blur-3xl"
        />

        {/* Themed drifting floating elements (Lotus, Betel Leaf, Sparkles, Star, Heart) */}
        {[
          // Lotus flowers
          {
            svg: (
              <svg className="w-10 h-10 fill-pink-500/15 stroke-pink-400/25" viewBox="0 0 24 24">
                <path d="M12 21c-2-2.5-5-3-5-6 0-3 3-5 5-9 2 4 5 6 5 9 0 3-3 3.5-5 6z"/>
                <path d="M12 21c-4-1-7-3-7-6 0-3 3-4 7-6 4 2 7 3 7 6 0 3-3 5-7 6z" opacity="0.4"/>
              </svg>
            ),
            duration: 32,
            scale: 1.2
          },
          {
            svg: (
              <svg className="w-7 h-7 fill-pink-600/10 stroke-pink-500/20" viewBox="0 0 24 24">
                <path d="M12 21c-2-2.5-5-3-5-6 0-3 3-5 5-9 2 4 5 6 5 9 0 3-3 3.5-5 6z"/>
              </svg>
            ),
            duration: 26,
            scale: 0.9
          },
          // Mango / Betel Leaves
          {
            svg: (
              <svg className="w-10 h-10 fill-emerald-600/15 stroke-emerald-500/20" viewBox="0 0 24 24">
                <path d="M12 3C7 6 5 12 5 17c0 3 2 5 7 5s7-2 7-5c0-5-2-11-7-14z"/>
              </svg>
            ),
            duration: 38,
            scale: 1.3
          },
          {
            svg: (
              <svg className="w-6 h-6 fill-green-600/10 stroke-green-500/15" viewBox="0 0 24 24">
                <path d="M12 3C7 6 5 12 5 17c0 3 2 5 7 5s7-2 7-5c0-5-2-11-7-14z"/>
              </svg>
            ),
            duration: 30,
            scale: 0.8
          },
          // Sparkles
          {
            svg: (
              <svg className="w-8 h-8 fill-amber-400/20 stroke-amber-300/30" viewBox="0 0 24 24">
                <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>
              </svg>
            ),
            duration: 22,
            scale: 1.0
          },
          {
            svg: (
              <svg className="w-5 h-5 fill-yellow-400/15 stroke-yellow-300/20" viewBox="0 0 24 24">
                <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>
              </svg>
            ),
            duration: 18,
            scale: 0.7
          },
          {
            svg: (
              <svg className="w-7 h-7 fill-amber-500/20 stroke-amber-400/25" viewBox="0 0 24 24">
                <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>
              </svg>
            ),
            duration: 28,
            scale: 1.1
          },
          // Star motif
          {
            svg: (
              <svg className="w-8 h-8 fill-yellow-500/20 stroke-yellow-400/30" viewBox="0 0 24 24">
                <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>
              </svg>
            ),
            duration: 24,
            scale: 1.0
          },
          // Heart motif
          {
            svg: (
              <svg className="w-8 h-8 fill-pink-500/20 stroke-pink-400/30" viewBox="0 0 24 24">
                <path d="M12 21c-1.5-1.3-3-2.5-4.5-3.7-1.2-1-2.4-2-3.6-3-.5-.4-1-.8-1.5-1.2-.3-.2-.6-.5-.9-.8C2 12 2 11 2 10c0-2 2-4 4-4 1.5 0 2.9 1 3.9 2.5C12 5 13.5 4 15 4c2 0 4 2 4 4 0 1-.7 2-1.5 2.8-.3.3-.6.6-.9.8-.5.4-1 .8-1.5 1.2-1.2 1-2.4 2-3.6 3-1.5 1.2-3 2.4-4.5 3.7z"/>
              </svg>
            ),
            duration: 26,
            scale: 1.1
          },
        ].filter((_, idx) => !isMobile || idx % 3 === 0).map((item, idx) => {
          const startX = (idx * 13) + 6;
          return (
            <motion.div
              key={idx}
              initial={{
                x: `${startX}%`,
                y: "-15vh",
                rotate: 0,
              }}
              animate={{
                y: "115vh",
                x: [`${startX}%`, `${startX + (idx % 2 === 0 ? 4 : -4)}%`, `${startX}%`],
                rotate: 360,
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
                delay: idx * -3.5,
              }}
              style={{ scale: item.scale }}
              className="absolute"
            >
              {item.svg}
            </motion.div>
          );
        })}
      </div>
      {/* ── NAVIGATION ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('Home')}>
              <img
                src="/images/logo.webp"
                alt="Maha Plate Designing Logo"
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-500 shadow-md group-hover:scale-105 transition-transform duration-300 animate-pulse"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-base md:text-lg leading-tight tracking-tight bg-gradient-to-r from-emerald-800 via-amber-600 to-teal-900 bg-clip-text text-transparent font-serif group-hover:bg-gradient-to-r group-hover:from-teal-900 group-hover:to-emerald-800 transition-all duration-300">
                  Maha Plate
                </span>
                <span className="text-[9px] text-teal-800 font-extrabold tracking-widest uppercase mt-0.5 leading-none">
                  Designing
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors text-sm"
                >
                  {link}
                </button>
              ))}
            </nav>

            {/* Contact Info & Book Now Button */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href="https://wa.me/916369961564"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 font-semibold transition-colors text-sm"
                title="Chat on WhatsApp"
              >
                <svg className="w-5 h-5 fill-current text-green-500 hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12.031 2c-5.524 0-10 4.48-10 10 0 1.77.462 3.497 1.343 5.03l-1.43 5.228 5.344-1.4c1.488.813 3.162 1.24 4.887 1.24 5.524 0 10-4.48 10-10v-.002c-.001-5.518-4.477-9.998-10-9.998zm6.096 14.145c-.254.717-1.472 1.405-2.023 1.482-.552.077-1.077.29-3.527-.692-2.951-1.183-4.838-4.183-4.985-4.381-.148-.198-1.197-1.595-1.197-3.042 0-1.448.755-2.158 1.025-2.453.271-.295.59-.368.786-.368.197 0 .393.002.564.01.178.009.418-.068.656.505.242.583.829 2.025.9 2.172.072.148.12.32.02.52-.098.197-.148.32-.295.495-.148.175-.313.39-.446.52-.148.148-.303.31-.13.606.172.296.766 1.262 1.64 2.04.1.09.28.25.4.35.34.28.52.17.71-.05.19-.22.82-.96.93-1.29.11-.33.22-.27.37-.17.15.1.95.45 1.86.9.91.45 1.06.67 1.14.8.08.13.08.77-.18 1.49z"/>
                </svg>
                <span>6369961564</span>
              </a>
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-5 py-2 bg-amber-600 text-white rounded-full font-semibold text-sm hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-lg"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link)}
                    className="text-left text-gray-700 hover:text-amber-600 font-medium py-2 border-b border-gray-50"
                  >
                    {link}
                  </button>
                ))}
                <a
                  href="https://wa.me/916369961564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-5 py-3 bg-green-600 text-white rounded-full font-semibold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  💬 WhatsApp: 6369961564
                </a>
                <button
                  onClick={() => { setShowBookingModal(true); setMobileMenuOpen(false); }}
                  className="px-5 py-3 bg-amber-600 text-white rounded-full font-semibold text-sm hover:bg-amber-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO SECTION ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-orange-50 to-white">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:2s]" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:4s]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 bg-amber-100/80 text-amber-800 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase">
              Tradition • Elegance • Blessings
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none">
              <span className="block text-gray-900 text-3xl md:text-4xl font-serif font-medium mb-3 italic">Welcome to</span>
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm font-serif">
                Maha Plate Designing
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-sans">
              Transform your traditional ceremonies with exquisite handcrafted plate decorations.
              From Seervarisai to Pooja Thattu, we bring beauty, color, and elegance to every occasion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Premium Book Your Event Button */}
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowBookingModal(true)}
                className="group relative overflow-hidden px-9 py-4 rounded-full font-bold text-lg text-white shadow-2xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 40%, #f59e0b 70%, #d97706 100%)',
                  backgroundSize: '200% 200%',
                  boxShadow: '0 8px 32px rgba(217,119,6,0.45), 0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmerSweep 2.5s ease-in-out infinite',
                  }}
                />
                {/* Glow ring on hover */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.15)' }}
                />
                <span className="relative flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-200" />
                  Book Your Event
                </span>
                <style>{`
                  @keyframes shimmerSweep {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                  }
                `}</style>
              </motion.button>

              {/* Explore Packages Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection('packages')}
                className="group relative px-9 py-4 border-2 border-amber-600 text-amber-700 rounded-full font-bold text-lg transition-all duration-300 hover:border-amber-500 hover:text-amber-800 bg-white/70 backdrop-blur-sm hover:bg-amber-50"
                style={{ boxShadow: '0 4px 20px rgba(217,119,6,0.12)' }}
              >
                <span className="flex items-center gap-2">
                  Explore Packages
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { num: '500+', label: 'Events Done' },
              { num: '4.9★', label: 'Avg Rating' },
              { num: '100%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-amber-600">{stat.num}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Hero Image Showcase */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {heroShowcase.map((img, idx) => {
              const duration = 4 + (idx % 2) * 1.5;
              const delay = idx * 0.3;
              return (
                <motion.div
                  key={img.alt}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1,
                    y: [0, -15, 0],
                  }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 20px 30px -5px rgba(217, 119, 6, 0.35)",
                  }}
                  transition={{
                    y: {
                      duration: duration,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: delay,
                    },
                    opacity: { duration: 0.6, delay: 0.1 },
                    scale: { duration: 0.25 },
                  }}
                  className="relative rounded-2xl overflow-hidden shadow-xl aspect-square cursor-pointer border border-amber-100/50"
                  onClick={() => setShowBookingModal(true)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold drop-shadow-md text-center">
                    {img.alt}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-amber-600" size={32} />
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block mb-3 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              Why Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Maha Plate</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We bring passion, precision, and premium quality to every plate decoration</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Handcrafted with Love', desc: 'Every decoration is meticulously handcrafted by our skilled artisans with attention to detail.' },
              { icon: Award, title: '500+ Events Served', desc: 'Trusted by hundreds of families across the region for weddings, engagements & ceremonies.' },
              { icon: Clock, title: 'Same Day Service', desc: 'Need last-minute decorations? We offer express same-day services for urgent requirements.' },
              { icon: Sparkles, title: 'Premium Materials', desc: 'We use only the finest silks, fresh flowers, and high-quality materials for lasting impressions.' },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 text-center border border-amber-100/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-amber-600" size={26} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section id="services" className="py-24 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block mb-3 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Beautiful plate decorations for every occasion — weddings, ceremonies, baby showers, festivals & more
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: '💍', title: 'Wedding Seer Varisai', desc: 'Traditional Seer Varisai presentation with fruits, sweets, coconuts, silk & flowers' },
              { emoji: '💐', title: 'Engagement Ceremonies', desc: 'Elegant engagement gift trays & ring presentation plates for all traditions' },
              { emoji: '🍼', title: 'Baby Shower (Valaikappu)', desc: 'Valaikappu plate decoration with bangles, betel leaves, fruits, flowers & coconut' },
              { emoji: '🏠', title: 'Housewarming (Griha Pravesam)', desc: 'Griha Pravesam pooja plate with turmeric, kumkum, coconut, lamp & offerings' },
              { emoji: '🪔', title: 'Temple Offerings (Pooja Thattu)', desc: 'Sacred Pooja Thattu arranged with flowers, fruits, agarbatti, diyas & sacred items' },
              { emoji: '🎁', title: 'Navaratri & Festival Gifts', desc: 'Festive gift trays for Navaratri, Diwali, Christmas, Easter & Eid celebrations' },
              { emoji: '💒', title: 'Wedding Ring Presentation', desc: 'Bridal ring ceremony plate with flowers, candles, Bible, rings & ceremonial items' },
              { emoji: '🎂', title: 'Bridal Shower Gifts', desc: 'Decorated trays presenting cakes, flowers, candles, gifts & celebration items' },
              { emoji: '⛪', title: 'Church Wedding Items', desc: 'Church ceremony plates with candles, flowers, Bible & sacred ceremonial décor' },
              { emoji: '🌙', title: 'Nikah Gift Presentation', desc: 'Nikah & Eid trays with dates, sweets, fruits, perfumes & garment presentations' },
              { emoji: '👰', title: 'Bridal Makeup & Jewellery', desc: 'Bridal trousseau tray with jewellery, makeup essentials, perfume & accessories' },
              { emoji: '🌺', title: 'Mehendi Ceremony Decorations', desc: 'Mehendi plate with henna, flower garlands, turmeric & colourful décor items' },
              { emoji: '🥥', title: 'Coconut & Flower Arrangements', desc: 'Decorated coconuts, banana leaf arrangements, fresh flowers for all ceremonies' },
              { emoji: '🍬', title: 'Sweets & Dry Fruits Trays', desc: 'Premium presentation of sweets, dry fruits, chocolates & gift items for events' },
            ].map(({ emoji, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 12px 20px -8px rgba(217, 119, 6, 0.15)" }}
                className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-amber-300 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl border border-amber-100">
                  {emoji}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={() => {
                const el = document.getElementById('packages');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-lg hover:shadow-amber-200"
            >
              View Packages & Pricing
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES SECTION ── */}
      <section id="packages" className="py-24 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-3 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              Our Offerings
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Service Packages
            </h2>
            <p className="text-gray-500 text-lg">Choose the perfect package for your celebration</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packageData.map((pkg, idx) => {
              const isHighlighted = !!pkg.highlight;
              return (
                <motion.div
                  key={pkg.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-gradient-to-b from-amber-500 to-orange-600 text-white ring-4 ring-amber-300'
                      : 'bg-white border border-gray-100'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-amber-600 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                      {pkg.highlight}
                    </div>
                  )}

                  <h3 className={`text-2xl font-bold mb-1 ${isHighlighted ? 'text-white' : 'text-amber-600'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm mb-6 ${isHighlighted ? 'text-amber-100' : 'text-gray-500'}`}>
                    {pkg.description}
                  </p>

                  {/* Per-plate price */}
                  <div className="mb-1">
                    <span className={`text-3xl font-bold ${isHighlighted ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.priceLabel}
                    </span>
                    <span className={`text-sm ml-1 ${isHighlighted ? 'text-amber-100' : 'text-gray-400'}`}>
                      {pkg.priceUnit}
                    </span>
                  </div>
                  <p className={`text-xs mb-6 italic ${isHighlighted ? 'text-amber-200' : 'text-gray-400'}`}>
                    Price varies by decoration complexity
                  </p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isHighlighted ? 'bg-white/20' : 'bg-amber-100'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${isHighlighted ? 'bg-white' : 'bg-amber-600'}`} />
                        </div>
                        <span className={`text-sm ${isHighlighted ? 'text-amber-50' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setShowBookingModal(true)}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      isHighlighted
                        ? 'bg-white text-amber-600 hover:bg-amber-50'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    Get a Quote
                  </button>
                </motion.div>
              );
            })}
          </div>
          </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <GallerySection />

      {/* ── REVIEWS SECTION ── */}
      <ReviewsSection />

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-24 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-3 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-500 text-lg">Have questions? We'd love to hear from you!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: 'Phone Call',
                value: '+91 63699 61564',
                sub: 'Call us for urgent bookings',
                href: 'tel:+916369961564',
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp Chat',
                value: '+91 63699 61564',
                sub: 'Chat with us for catalogs',
                href: 'https://wa.me/916369961564',
              },
              {
                icon: Mail,
                title: 'Email',
                value: 'info@mahaplatedesigning.com',
                sub: 'Get in touch via email',
                href: 'mailto:info@mahaplatedesigning.com',
              },
            ].map(({ icon: Icon, title, value, sub, href }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-amber-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <a href={href} className="text-amber-600 hover:text-amber-700 font-medium block">
                  {value}
                </a>
                <p className="text-sm text-gray-500 mt-1">{sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Operating Hours */}
          <div className="max-w-md mx-auto bg-amber-50 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Operating Hours</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Monday – Friday</p>
                <p className="text-amber-700 font-semibold">9:00 AM – 9:00 PM</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Saturday – Sunday</p>
                <p className="text-amber-700 font-semibold">10:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/logo.webp"
                  alt="Maha Plate Designing Logo"
                  className="w-12 h-12 rounded-full object-cover border border-amber-500/30 shadow-md"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-lg bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent font-serif">
                    Maha Plate
                  </span>
                  <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase mt-1">
                    Designing
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Premium plate decoration services for all occasions. Call/WhatsApp: +91 63699 61564.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/maha_platings?igsh=MXhtODNxZmo3b3lmdA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                  title="Follow us on Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/916369961564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:bg-green-600"
                  title="Chat on WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12.031 2c-5.524 0-10 4.48-10 10 0 1.77.462 3.497 1.343 5.03l-1.43 5.228 5.344-1.4c1.488.813 3.162 1.24 4.887 1.24 5.524 0 10-4.48 10-10v-.002c-.001-5.518-4.477-9.998-10-9.998zm6.096 14.145c-.254.717-1.472 1.405-2.023 1.482-.552.077-1.077.29-3.527-.692-2.951-1.183-4.838-4.183-4.985-4.381-.148-.198-1.197-1.595-1.197-3.042 0-1.448.755-2.158 1.025-2.453.271-.295.59-.368.786-.368.197 0 .393.002.564.01.178.009.418-.068.656.505.242.583.829 2.025.9 2.172.072.148.12.32.02.52-.098.197-.148.32-.295.495-.148.175-.313.39-.446.52-.148.148-.303.31-.13.606.172.296.766 1.262 1.64 2.04.1.09.28.25.4.35.34.28.52.17.71-.05.19-.22.82-.96.93-1.29.11-.33.22-.27.37-.17.15.1.95.45 1.86.9.91.45 1.06.67 1.14.8.08.13.08.77-.18 1.49z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-amber-400">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link)}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-amber-400">Our Services</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-400">
                <li>💍 Wedding Seer Varisai</li>
                <li>💐 Engagement Ceremonies</li>
                <li>🍼 Baby Shower (Valaikappu)</li>
                <li>🏠 Housewarming (Griha Pravesam)</li>
                <li>🪔 Temple Offerings (Pooja Thattu)</li>
                <li>🎁 Navaratri &amp; Festival Gifts</li>
                <li>💒 Wedding Ring Presentation</li>
                <li>🎂 Bridal Shower Gifts</li>
                <li>⛪ Church Wedding Items</li>
                <li>🌙 Nikah Gift Presentation</li>
                <li>👰 Bridal Makeup &amp; Jewellery</li>
                <li>🌺 Mehendi Ceremony</li>
                <li>🥥 Coconut &amp; Flower Arrangements</li>
                <li>🍬 Sweets &amp; Dry Fruits Trays</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
            <p>© 2026 Maha Plate Designing. All rights reserved.</p>
            <a
              href="https://www.instagram.com/maha_platings?igsh=MXhtODNxZmo3b3lmdA=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-xs font-medium">@maha_platings</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  );
}
