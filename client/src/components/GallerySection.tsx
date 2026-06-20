import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const filterTabs = [
  { value: 'all',        label: '✨ All' },
  { value: 'wedding',    label: '💍 Wedding' },
  { value: 'engagement', label: '💐 Engagement' },
  { value: 'baby',       label: '🍼 Baby Shower' },
  { value: 'pooja',      label: '🪔 Pooja & Temple' },
  { value: 'ceremony',   label: '🌺 Ceremony' },
  { value: 'festival',   label: '🎁 Festival Gifts' },
];

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  items: string;
  src: string;
  tag: string;
}

const allImages: GalleryImage[] = [
  {
    id: 1,
    title: 'Seervarisai Presentation',
    description: 'Wedding Seer Varisai with fruits, silk & flowers',
    items: 'Fruits · Silk · Flowers · Sweets · Coconut',
    src: '/images/seervarisai_plate.png',
    tag: 'wedding',
  },
  {
    id: 2,
    title: 'Aarthi Plate',
    description: 'Wedding aarthi plate with diyas & kumkum',
    items: 'Diyas · Kumkum · Turmeric · Rose Petals',
    src: '/images/aarthi_plate.png',
    tag: 'wedding',
  },
  {
    id: 3,
    title: 'Decorated Coconut',
    description: 'Hand-painted coconut with beads & gold fabric',
    items: 'Coconut · Beads · Gold Fabric · Flowers',
    src: '/images/coconut_decoration.png',
    tag: 'ceremony',
  },
  {
    id: 4,
    title: 'Engagement Gift Tray',
    description: 'Premium engagement & ring presentation tray',
    items: 'Sweets · Dry Fruits · Flowers · Gifts',
    src: '/images/wedding_tray.png',
    tag: 'engagement',
  },
  {
    id: 5,
    title: 'Mehendi Ceremony Plate',
    description: 'Mehendi plate with henna & flower garlands',
    items: 'Henna · Flower Garlands · Turmeric · Bangles',
    src: '/images/mehendi_plate.png',
    tag: 'ceremony',
  },
  {
    id: 6,
    title: 'Haldi Ceremony Tray',
    description: 'Haldi tray with turmeric & floral decor',
    items: 'Turmeric · Flowers · Silk · Kumkum',
    src: '/images/haldi_plate.png',
    tag: 'ceremony',
  },
  {
    id: 7,
    title: 'Pooja Thattu',
    description: 'Temple offering plate with sacred items',
    items: 'Banana Leaf · Agarbatti · Coconut · Fruits · Lamp',
    src: '/images/pooja_thattu.png',
    tag: 'pooja',
  },
  {
    id: 8,
    title: 'Valaikappu / Baby Shower',
    description: 'Baby shower plate with bangles & blessings',
    items: 'Bangles · Flowers · Betel Leaves · Fruits · Coconut',
    src: '/images/valaikappu.png',
    tag: 'baby',
  },
  {
    id: 9,
    title: 'Wedding Ring Presentation',
    description: 'Bridal ring & ceremonial tray decoration',
    items: 'Flowers · Candles · Rings · Gifts',
    src: '/images/wedding_ring_plate.png',
    tag: 'wedding',
  },
  {
    id: 10,
    title: 'Nikah / Eid Gift Tray',
    description: 'Gift presentation tray for Nikah & Eid',
    items: 'Dates · Sweets · Perfume · Flowers · Garments',
    src: '/images/nikah_plate.png',
    tag: 'festival',
  },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filtered =
    activeTab === 'all' ? allImages : allImages.filter((img) => img.tag === activeTab);

  return (
    <section id="gallery" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-3 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Exquisite plate decorations for weddings, engagements, pooja, baby showers, festivals & every celebration
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                activeTab === tab.value
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">{image.title}</h3>
                  <p className="text-white/75 text-xs mt-0.5">{image.description}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <ZoomIn size={16} className="text-amber-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No images in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              <div className="relative w-full aspect-square">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{selectedImage.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {selectedImage.items.split(' · ').map((item) => (
                        <span key={item} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-100">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0 ml-3"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
