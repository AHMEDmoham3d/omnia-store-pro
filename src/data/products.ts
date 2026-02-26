import { Product } from '../types';

// استخدم window.location.origin لضمان مسار كامل على الاستضافة
const basePath = window.location.origin;

export const products: Product[] = [
  {
    id: 'incense-1',
    name: 'Sacred Frankincense',
    description:
      'Premium frankincense resin for spiritual cleansing and meditation. Hand-selected from the finest sources.',
    price: 24.99,
    image: `${basePath}/بخور1.jpg`,
    category: 'incense',
  },
  {
    id: 'incense-2',
    name: 'Mystical Sandalwood',
    description:
      'Pure sandalwood incense sticks for relaxation and spiritual practices. Creates a calming atmosphere.',
    price: 19.99,
    image: `${basePath}/بخور2.jpg`,
    category: 'incense',
  },
  {
    id: 'incense-3',
    name: 'Dragon Blood Incense',
    description:
      'Powerful protection incense made from natural resin. Perfect for rituals and energy work.',
    price: 22.99,
    image: `${basePath}/بخور3.jpg`,
    category: 'incense',
  },
  {
    id: 'oils-1',
    name: 'Sacred Rose Oil',
    description:
      'Pure rose essential oil for love and healing rituals. Premium quality with divine fragrance.',
    price: 34.99,
    image: `${basePath}/زيت1.jpg`,
    category: 'oils',
  },
  {
    id: 'oils-2',
    name: 'Spiritual Lavender Oil',
    description:
      'Calming lavender oil for meditation and relaxation. 100% natural and therapeutic grade.',
    price: 28.99,
    image: `${basePath}/زيت2.jpg`,
    category: 'oils',
  },
  {
    id: 'oils-3',
    name: 'Mystic Patchouli Oil',
    description:
      'Earthy patchouli oil for grounding and abundance rituals. Deep, rich aroma.',
    price: 29.99,
    image: `${basePath}/زيت3.webp`,
    category: 'oils',
  },
  {
    id: 'cards-1',
    name: 'Angel Guidance Cards',
    description:
      'Beautiful angel oracle cards for divine guidance. 44 cards with guidebook included.',
    price: 32.99,
    image: `${basePath}/كرت1.webp`,
    category: 'cards',
  },
  {
    id: 'cards-2',
    name: 'Spiritual Wisdom Deck',
    description:
      'Mystical tarot-style cards for spiritual insight and meditation. Gold-gilded edges.',
    price: 38.99,
    image: `${basePath}/كرت2.webp`,
    category: 'cards',
  },
  {
    id: 'cards-3',
    name: 'Chakra Healing Cards',
    description:
      'Energy healing cards focused on chakra balance and alignment. Vibrant artwork.',
    price: 29.99,
    image: `${basePath}/كرت3.webp`,
    category: 'cards',
  },
  {
    id: 'carpets-1',
    name: 'Meditation Prayer Rug',
    description:
      'Luxurious prayer rug with sacred geometry patterns. Soft, comfortable, and spiritually designed.',
    price: 89.99,
    image: `${basePath}/سجاد1.jpg`,
    category: 'carpets',
  },
  {
    id: 'carpets-2',
    name: 'Mandala Spiritual Mat',
    description:
      'Beautiful mandala design carpet for yoga and meditation practices. Non-slip backing.',
    price: 79.99,
    image: `${basePath}/سجاد2.jpg`,
    category: 'carpets',
  },
  {
    id: 'carpets-3',
    name: 'Lotus Flower Prayer Carpet',
    description:
      'Elegant lotus design for spiritual practice. High-quality materials with intricate embroidery.',
    price: 94.99,
    image: `${basePath}/سجاد3.jpg`,
    category: 'carpets',
  },
];