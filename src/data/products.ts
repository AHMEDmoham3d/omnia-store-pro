import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'Palo Santo',
    name: 'Palo Santo',
    description: `
It is a sacred wood that has been used for centuries in purification and meditation rituals in South America.
Spiritual healers have used it for thousands of years to cleanse energy during ceremonies. 
Its scent is warm and woody with a light touch of sweetness and citrus
  `,
    price: 300,
    image: '/incense1.jpeg,/incense2.jpeg,/incense3.jpeg',
    category: 'incense',
  },
  {
    id: 'Sage incense',
    name: 'Sage',
    description: 
    
    `
    Sage has been used for centuries in purification rituals and energy cleansing. Its scent is strong, herbal, and refreshing, helping to release heavy energies and restore balance to the space and the aura.
  `,
    price: 400,
    image: '/Sageincense2.jpeg,/Sageincense1.jpeg',
    category: 'incense',
  },
//   {
//     id: 'Sacred Rose Oil',
//     name: 'Sacred Rose Oil',
//     description: `Pure rose essential oil for love and healing rituals. Premium quality with divine fragrance. Perfect for spiritual ceremonies.

// الاستخدامات:
// • Love and healing rituals
//   مثالي لطقوس الحب وجلب الطاقة الإيجابية
// • Meditation and daily routine
//   يمكن استخدامه يومياً مع التأمل
// • Aromatherapy
//   علاج بالروائح لتحسين المزاج والطاقة
// • Gives aura a divine fragrance
//   يمنح رائحة والجمال الروحاني`,
//     price: 34.99,
//     image: '/oil1.jpg',
//     category: 'oils',
//   },
//   {
//     id: 'oils-2',
//     name: 'Spiritual Lavender Oil',
//     description: `Calming lavender oil for meditation and relaxation. 100% natural and therapeutic grade. Perfect for spiritual practices.

// الاستخدامات:
// • Meditation and relaxation
//   مثالي لجلسات التأمل والاسترخاء العميق
// • Relieving tension and anxiety
//   يساعد في تخفيف التوتر والقلق اليومي
// • Improving sleep quality
//   يمكن استخدامه قبل النوم لتحسين النوم
// • Aromatherapy
//   علاج بالروائح للشفاء العاطفي`,
//     price: 28.99,
//     image: '/oil2.jpg',
//     category: 'oils',
//   },
//   {
//     id: 'oils-3',
//     name: 'Mystic Patchouli Oil',
//     description: `Earthy patchouli oil for grounding and abundance rituals. Deep, rich aroma. Perfect for spiritual grounding.

// الاستخدامات:
// • Rituals for attracting wealth and abundance
//   مثالي لطقوس جلب الرزق والثروة
// • Spiritual grounding
//   يساعد في التأريض وتوازن الطاقة الأرضية
// • Energy balance
//   يستعيد توازن الطاقة في الجسم والبيئة
// • Deep and rich fragrance
//   رائحة عميقة وغنية تدوم طويلاً`,
//     price: 29.99,
//     image: '/oil3.webp',
//     category: 'oils',
//   },
  {
    id: 'أوركل أسماء الله الحسن',
    name: 'أوركل أسماء الله الحسنى',
    description: `
• مش مجرد كروت … 
• هى أداه ذكر وتجربه روحانيه هتعيشها مع كل أسم من أسماء الله الحسنى هتساعدك على إعاده التوازن الداخلى والسكينه.

• المجموعه تحتوى على:
• 🕯️99 كارت  + شرح لمعنى كل اسم + عدد مقترح لترديد الاسم + كيفيه أستخدام الكروت

• ✨🎁 مناسبة جدا ل :

• جلسات التأمل
• رسائل كونيه فى موقف صعب او تحدى بتمر به
• كهدية روحانية ذات معنى لشخص عزيز عليك   
• 💫يوجد عدد ٢ تصميم مختلفين تقدر تختار المناسب لك   

`,

    price: 1500,
    image: '/card9.jpeg,/card8.jpeg,/card5.jpeg,/card3.jpeg,/card2.jpeg,/card1.jpeg',
    category: 'cards',
  },
  {
    id: 'Game تشافي',
    name: 'Game تشافي',
    description: `
• يشمل ٥٦ كارت به اسأله للتاءمل عن نفسك و طفولتك و عيلتك و الأدوار الي بتلعبها في حياتك.
• مناسبه ليك لو عايز تتعرف على نفسك بشكل اعمق.
• مناسبه للكوتش يستخدمها في جلساته و الورش الي بيعملها .
• مناسبه للأصحاب يلعبوها في قعده وعي.`,


    price: 780,
    image: '/Game1.jpeg,/Game2.jpeg,/Game3.jpeg',
    category: 'cards',
  },
  {
    id: 'Jar تشافي',
    name: 'Jar تشافي',
    description: `
• يشمل ٧٣ كارت به توكيدات و تمارين شفاءيه للتوازن النفسي و شفاء الطفل بداخلنا نعملها لمده ٤٠ يوم.
• مناسبه لكل شخص عايز يشتغل على نفسه و طفولته و يتصالح معاها.`,


    price: 1000,
    image: '/Jar1.jpeg,/Jar2.jpeg,/Jar3.jpeg,/Jar4.jpeg',
    category: 'cards',
  },
  {
    id: 'Jar Family Constellation',
    name: 'تشافي بتوكيدات الفاميلي كونستليشن',
    description: `
• تشمل ٥٥ تحدي ، ١٦٥ توكيد في ٥٥ كارت، و معاهم رسم للنظام العيله بهدف التشافي من الصدمات المنقوله عبر الأجيال. 

• مناسبه لكل شخص عايز يشتغل على التحديات الي مبتدتش معاه و اتنقلتله من عيلته واعي بيها او معندوش فكره عنها.

• مناسبه لكل ممارس الفاميلي كونستليشن في جلساته و مع الكلاينتس بتوعه.
`,


    price: 1500,
    image: '/conf1.jpeg,/conf2.jpeg,/conf3.jpeg,/con4.jpeg',
    category: 'cards',
  },
//   {
//     id: 'carpets-1',
//     name: 'Meditation Prayer Rug',
//     description: `Luxurious prayer rug with sacred geometry patterns. Soft, comfortable, and spiritually designed. High quality materials.

// المواصفات:
// • Unique sacred geometric design
//   تصميم فريد مستوحى من الهندسة المقدسة
// • Soft and comfortable to use
//   سطح ناعم ومريح للجلسات الطويلة
// • Specially designed for meditation and prayer
//   مصممة خصيصًا لجلسات التأمل
// • High quality that lasts long
//   جودة عالية تصمد مع الاستخدام`,
//     price: 89.99,
//     image: '/carpet1.jpg',
//     category: 'carpets',
//   },
//   {
//     id: 'carpets-2',
//     name: 'Mandala Spiritual Mat',
//     description: `Beautiful mandala design carpet for yoga and meditation practices. Non-slip backing. High quality materials.

// المواصفات:
// • Stunning mandala design
//   تصميم مندالا الجميل والمذهل
// • Non-slip surface
//   سطح آمن يمنع الانزلاق أثناء الاستخدام
// • Perfect for yoga and meditation
//   مثالية لممارسة اليوغا والتأمل
// • Easy to clean and maintain
//   سهلة التنظيف والحفاظ عليها`,
//     price: 79.99,
//     image: '/carpet2.jpg',
//     category: 'carpets',
//   },
//   {
//     id: 'carpets-3',
//     name: 'Lotus Flower Prayer Carpet',
//     description: `Elegant lotus design for spiritual practice. High-quality materials with intricate embroidery. Perfect for meditation and prayer.

// المواصفات:
// • Elegant lotus flower design
//   تصميم أنيق مستوحى من زهرة اللوتس
// • High-quality materials
//   مواد فاخرة ومتينه عالية الجودة
// • Intricate embroidery
//   تطريز مفصل باليد
// • Perfect for spiritual practice
//   مثالية لجلسات التأمل والصلاة`,
//     price: 94.99,
//     image: '/carpet3.jpg',
//     category: 'carpets',
//   },
];


