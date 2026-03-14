import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'Palo Santo',
    name: 'Palo Santo',
    description: `خشب مقدس يُستخدم منذ قرون في طقوس التطهير والتأمل في أمريكا الجنوبية. الشافون الروحانيون استخدموه لآلاف السنين لتنقية الطاقة في الطقوس. رائحته دافئة خشبية بلمسة حلاوة وحمضيات.

يستخدم فى:
  رائحة دافئة خشبية مع لمسة حمضيات
  لتنقية الطاقة في الطقوس
  مثالي للتأمل والتطهير الروحاني
  أداة الشافين الروحانيين من آلاف السنين`,
    price: 300,
    image: '/incense1.jpeg,/incense2.jpeg,/incense3.jpeg',
    category: 'incense',
  },
  {
    id: 'Sage incense',
    name: 'Sage Sandalwood',
    description: `السايج يُستخدم منذ قرون في طقوس التطهير وتنقية الطاقة. رائحته قوية عشبية منعشة تساعد في تحرير الطاقات الثقيلة واستعادة التوازن للمكان والهالة.

يستخدم فى:
  رائحة عشبية قوية منعشة تنقي الجو
  تحرير الطاقات السلبية من المكان
  استعادة التوازن للمكان والهالة
  مثالي لطقوس التطهير الروحاني`,
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
    description: `أوراكل أسماء الله الحسنى - أداة ذكر وتجربة روحانية عميقة. 99 بطاقة تجمع الروحانية وعلم الأرقام مع شرح كامل ودليل استخدام.

المحتوى:
  99 بطاقة أسماء الله الحسنى
  شرح مفصل معنى كل اسم
  عدد الترديد المقترح لكل اسم
  دليل شامل للتأمل والاستخدام

المناسب لـ:
  جلسات التأمل اليومية
  رسائل إلهية في المواقف الصعبة
  هدية روحانية راقية`,
    price: 1500,
    image: '/card9.jpeg,/card8.jpeg,/card5.jpeg,/card3.jpeg,/card2.jpeg,/card1.jpeg',
    category: 'cards',
  },
  {
    id: 'Game تشافي',
    name: 'Game تشافي',
    description: `لعبة تشافي - 56 كارت أسئلة تأمل عميق عن الذات، الطفولة، العائلة والأدوار الحياتية.

💥 مناسب لـ:
• التعمق في معرفة الذات
  للي عايز يتعرف على نفسه أكتر
• الكوتش في الجلسات والورش
  أداة قوية للكوتش والمعالجين
• الأصحاب في جلسات وعي
  لعب جماعي للقعدات الواعية`,
    price: 780,
    image: '/Game1.jpeg,/Game2.jpeg,/Game3.jpeg',
    category: 'cards',
  },
  {
    id: 'Jar تشافي',
    name: 'Jar تشافي',
    description: `جر تشافي - 73 كارت توكيدات وتمارين شفاء للتوازن النفسي وشفاء الطفل الداخلي. برنامج 40 يوم.

💥 مناسب لـ:
• عمل على الذات والطفولة
  كل اللي عايز يتصالح مع طفولته
• الشفاء النفسي والتوازن
  توكيدات يومية للشفاء العاطفي`,
    price: 1000,
    image: '/Jar1.jpeg,/Jar2.jpeg,/Jar3.jpeg,/Jar4.jpeg',
    category: 'cards',
  },
  {
    id: 'Jar Family Constellation',
    name: 'تشافي بتوكيدات الفاميلي كونستليشن',
    description: `تشافي توكيدات الفاميلي كونستليشن - 55 تحدي، 165 توكيد في 55 كارت + رسم نظام العائلة. شفاء الصدمات الوراثية.

♡ مناسب لـ:
• التحديات العائلية الوراثية
  اللي عايز يشفي صدمات العائلة
• ممارسي الفاميلي كونستليشن
  أداة للمعالجين والكلاينتس`,
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


