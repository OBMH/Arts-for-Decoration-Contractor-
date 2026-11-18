export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  coverImage: string;
  galleryImages: string[];
  portfolioCategory: PortfolioCategoryId;
}

export type PortfolioCategoryId =
  | 'all'
  | 'interior'
  | 'bedrooms'
  | 'wardrobes'
  | 'tv-walls'
  | 'commercial'
  | 'finishes';

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
}

export interface PortfolioItem {
  id: string;
  image: string;
  category: PortfolioCategoryId;
  categoryLabel: string;
  serviceId: string;
  serviceLabel: string;
  title: string;
  description: string;
  tags: string[];
}

export interface WorkingDay {
  day: string;
  hours: string;
  isFriday?: boolean;
  open24hFormat: { start: string; end: string };
  dayIndex: number; // 0 = Sunday, 6 = Saturday
}

export const COMPANY_INFO = {
  nameAr: 'فنون للديكور والمقاولات',
  nameEn: 'FUNUN DECOR',
  logo: '/assets/aistudio/logo_c3257717.png',
  heroImage: '/assets/aistudio/IMG-20261118-WA0030_d75ac8cd.jpg',
  aboutImage: '/assets/aistudio/IMG-20261118-WA0032_f1d6d46a.jpg',
  aboutSecondaryImage: '/assets/aistudio/IMG-20261118-WA0014_7af506b0.jpg',
  locationText: 'السعودية، جيزان، مدينة البناء.',
  locationShort: 'جيزان – مدينة البناء',
  googleMapsUrl: 'https://maps.app.goo.gl/bvDxyqAx4v4JxVzu6?g_st=awb',
  instagramUrl: 'https://www.instagram.com/fnwn055?gwpx=MXZ4b3JhYmloNTlhMg==',
  instagramHandle: '@fnwn055',
  snapchatUrl: 'https://www.snapchat.com/add/bdlrb.22?share_id=aIHD9iGy-p0&locale=ar-YE',
  snapchatHandle: 'bdlrb.22',
  phones: [
    {
      display: '0554058937',
      international: '+966554058937',
      telLink: 'tel:+966554058937',
      label: 'الرقم الرسمي الأول والواتساب',
      isPrimary: true,
    },
    {
      display: '0535159041',
      international: '+966535159041',
      telLink: 'tel:+966535159041',
      label: 'الرقم الرسمي الثاني للتواصل',
      isPrimary: false,
    },
  ],
  whatsappNumber: '0554058937',
  whatsappInternational: '+966554058937',
  whatsappBaseUrl: 'https://wa.me/966554058937',
  whatsappDefaultMessage:
    'مرحباً فنون للديكور والمقاولات، أرغب بالاستفسار عن خدماتكم ومعرفة المزيد من التفاصيل.',
  hero: {
    headline: 'نصنع من المساحات العادية تصاميم استثنائية',
    description:
      'في فنون للديكور والمقاولات، نحول أفكارك إلى واقع يجمع بين جمال التصميم ودقة التنفيذ، لنمنح كل مساحة طابعاً خاصاً يعكس ذوقك وطموحك.',
  },
  about: {
    title: 'من نحن',
    subtitle: 'فكرة مدروسة، وتفاصيل تصنع الفرق الكبير',
    paragraphs: [
      'فنون للديكور والمقاولات شركة متخصصة في أعمال التصميم والديكور الداخلي وتنفيذ الحلول الجمالية للمساحات السكنية والتجارية. نؤمن بأن جمال المكان يبدأ من فكرة مدروسة، وأن التفاصيل الصغيرة هي ما يصنع الفرق الكبير.',
      'نعمل على تقديم تصاميم تجمع بين الأناقة والعملية، مع الاهتمام باختيار الخامات والتفاصيل وجودة التنفيذ، لنساعد عملاءنا على تحويل تطلعاتهم إلى مساحات تعكس شخصيتهم واحتياجاتهم.',
    ],
    features: [
      {
        title: 'اهتمام بالتفاصيل',
        desc: 'عناية فائقة بتناسق الخطوط والإضاءة المخفية واللمسات الجمالية في كل زاوية.',
      },
      {
        title: 'تصاميم تجمع الجمال والعملية',
        desc: 'نوازن بين المظهر الفاخر والاستغلال الذكي للمساحة لراحة يومية مستدامة.',
      },
      {
        title: 'حلول تناسب مختلف المساحات',
        desc: 'ابتكار حلول مخصصة للمنازل والفلل والشقق والمحلات التجارية بمختلف أبعادها.',
      },
      {
        title: 'عناية بجودة التنفيذ',
        desc: 'إشراف متقن على تركيب الخامات الخشبية والبدائل والجبس والدهانات بدقة عالية.',
      },
      {
        title: 'تنوع في أعمال الديكور والتشطيب',
        desc: 'تغطية شاملة من التخطيط المبدئي وحتى التسليم النهائي المتكامل.',
      },
    ],
  },
  whyChooseUs: {
    title: 'لماذا تختار فنون للديكور؟',
    description:
      'لأن المكان الذي تعيش أو تعمل فيه يستحق عناية خاصة، نحرص في فنون على الاهتمام بكل تفصيلة من الفكرة الأولى حتى ظهور النتيجة النهائية.',
    vision:
      'رؤيتنا أن نكون من الأسماء المميزة في عالم الديكور والتصميم الداخلي في المملكة العربية السعودية.',
    items: [
      {
        number: '01',
        title: 'تنوع خدمات الديكور والتصميم',
        desc: 'نجمع كافة تخصصات الديكور الداخلي من الأسقف والشاشات الجدارية إلى الخزائن المبتكرة والتشطيبات تحت سقف واحد.',
      },
      {
        number: '02',
        title: 'الاهتمام بجمال التفاصيل',
        desc: 'نعتني بدقة الفواصل، وتوزيع الإضاءة الدافئة، وتناغم الألوان الخشبية والعاجية لإبراز فخامة المكان.',
      },
      {
        number: '03',
        title: 'حلول تناسب المساحات المختلفة',
        desc: 'سواء كانت مساحتك غرفة معيشة عائلية، مدخل استقبال، أو محلاً تجارياً، نصمم حلولاً تستثمر كل متر مربع.',
      },
      {
        number: '04',
        title: 'الجمع بين الجانب الجمالي والوظيفي',
        desc: 'نصمم وحدات تخزين وخزائن وشاشات جدارية توفر سعة عملية وتخفي التمديدات بمظهر انسيابي أنيق.',
      },
      {
        number: '05',
        title: 'الاهتمام بالتشطيب وجودة المظهر النهائي',
        desc: 'نحرص على نظافة العمل ودقة التركيب واستخدام خامات متناسقة تمنح المساحة مظهراً متقناً يدوم طويلاً.',
      },
    ],
  },
  workSteps: [
    {
      step: '01',
      title: 'التواصل معنا',
      desc: 'أخبرنا بفكرتك واحتياجاتك عبر الاتصال المباشر أو واتساب أو زيارة مقرنا في جيزان – مدينة البناء.',
    },
    {
      step: '02',
      title: 'فهم المتطلبات',
      desc: 'نحدد طبيعة المساحة والتصميم المطلوب ونستمع لتفضيلاتك في الألوان والخامات وتوزيع الإضاءة.',
    },
    {
      step: '03',
      title: 'التصميم والتخطيط',
      desc: 'نعمل على تصور يناسب احتياجاتك ويستثمر المساحة بأفضل شكل يجمع بين الأناقة والوظيفة.',
    },
    {
      step: '04',
      title: 'التنفيذ',
      desc: 'تحويل التصميم إلى واقع على يد فنيين متخصصين مع العناية بجودة التركيب والتشطيب الدقيق.',
    },
    {
      step: '05',
      title: 'التسليم',
      desc: 'تقديم النتيجة النهائية للعميل بعد مراجعة كافة التفاصيل والتأكد من جاهزية المساحة بأبهى صورة.',
    },
  ],
};

export const WORKING_HOURS: WorkingDay[] = [
  {
    day: 'الأربعاء',
    hours: '9:00 صباحاً – 10:26 مساءً',
    open24hFormat: { start: '09:00', end: '22:26' },
    dayIndex: 3,
  },
  {
    day: 'الخميس',
    hours: '9:00 صباحاً – 10:26 مساءً',
    open24hFormat: { start: '09:00', end: '22:26' },
    dayIndex: 4,
  },
  {
    day: 'الجمعة',
    hours: '4:30 مساءً – 10:30 مساءً',
    isFriday: true,
    open24hFormat: { start: '16:30', end: '22:30' },
    dayIndex: 5,
  },
  {
    day: 'السبت',
    hours: '9:00 صباحاً – 10:26 مساءً',
    open24hFormat: { start: '09:00', end: '22:26' },
    dayIndex: 6,
  },
  {
    day: 'الأحد',
    hours: '9:00 صباحاً – 10:26 مساءً',
    open24hFormat: { start: '09:00', end: '22:26' },
    dayIndex: 0,
  },
  {
    day: 'الاثنين',
    hours: '9:00 صباحاً – 10:26 مساءً',
    open24hFormat: { start: '09:00', end: '22:26' },
    dayIndex: 1,
  },
  {
    day: 'الثلاثاء',
    hours: '9:00 صباحاً – 10:26 مساءً',
    open24hFormat: { start: '09:00', end: '22:26' },
    dayIndex: 2,
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'commercial-decor',
    number: '01',
    title: 'ديكور محلات تجارية',
    shortDesc:
      'تصميم وتجهيز واجهات ومساحات المحلات التجارية والكافيهات والمعارض بأسلوب يجذب العملاء ويعكس هوية مشروعك.',
    fullDesc:
      'نبتكر بيئات تجارية متكاملة تمنح عملاءك تجربة بصرية مريحة ومحفزة. نعتني بتوزيع كاونترات العرض والخدمة، مسارات الحركة، الأقواس الجدارية، الإضاءة الموجهة لإبراز المنتجات، وتنسيق جلسات الزوار بما يرفع من جاذبية علامتك التجارية.',
    highlights: [
      'تصميم وتنفيذ كاونترات الاستقبال ووحدات العرض الزجاجية المضيئة',
      'توزيع مدروس للجلسات ومسارات حركة الزوار داخل المحل',
      'تكسيات جدارية وأقواس ديكورية مع إضاءات جدارية وسقفية دافئة',
    ],
    coverImage: '/assets/aistudio/IMG-20261118-WA0028_5fccac0e.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261118-WA0028_5fccac0e.jpg',
      '/assets/aistudio/IMG-20261118-WA0010_92c8e67b.jpg',
    ],
    portfolioCategory: 'commercial',
  },
  {
    id: 'design-execution',
    number: '02',
    title: 'التصميم والتنفيذ',
    shortDesc:
      'تحويل الأفكار والمخططات إلى واقع ملموس بدقة عالية، بدءاً من دراسة المساحة واختيار الخامات وحتى التسليم المتكامل.',
    fullDesc:
      'نرافقك في رحلة متكاملة تبدأ من قراءة أبعاد المساحة وتحليل احتياجاتك، مروراً بوضع التصور التصميمي المتناسق، وصولاً إلى التنفيذ الميداني المتقن. نحرص على تطابق النتيجة الواقعية مع الرؤية الجمالية من خلال إشراف مباشر وعناية بأدق التفاصيل.',
    highlights: [
      'تخطيط متكامل للمداخل، الصالات، والمجالس الفاخرة',
      'تنسيق متناغم بين بدائل الخشب، الرخام، المرايا، والإضاءة المخفية',
      'إدارة دقيقة لمراحل التنفيذ والتركيب لضمان جودة المظهر النهائي',
    ],
    coverImage: '/assets/aistudio/IMG-20261118-WA0030_d75ac8cd.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261118-WA0030_d75ac8cd.jpg',
      '/assets/aistudio/IMG-20261118-WA0032_f1d6d46a.jpg',
      '/assets/aistudio/IMG-20261118-WA0031_58168dce.jpg',
      '/assets/aistudio/IMG-20261118-WA0010_92c8e67b.jpg',
    ],
    portfolioCategory: 'interior',
  },
  {
    id: 'interior-decor',
    number: '03',
    title: 'الديكورات الداخلية',
    shortDesc:
      'حلول جمالية راقية لغرف المعيشة، المجالس، غرف النوم، وصالات الطعام تجمع بين الدفء والفخامة العصرية.',
    fullDesc:
      'نصمم المساحات الداخلية لتكون ملاذاً يومياً يجمع بين الراحة والفخامة. نستخدم الألواح الخشبية الدافئة، الجداريات البارزة ثلاثية الأبعاد، البانوهات الكلاسيكية والنيوكلاسيك، وتنسيقات الإضاءة المعمارية التي تمنح كل غرفة شخصية متفردة.',
    highlights: [
      'ديكورات متكاملة لغرف المعيشة، صالات الاستقبال، وغرف الطعام',
      'تصاميم غرف نوم هادئة بخلفيات أسرة مبطنة وتكسيات خشبية',
      'جداريات فنية بارزة وتكسيات تجمع بين الأصالة والحداثة',
    ],
    coverImage: '/assets/aistudio/IMG-20261118-WA0014_7af506b0.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261118-WA0014_7af506b0.jpg',
      '/assets/aistudio/IMG-20261118-WA0011_f7727f75.jpg',
      '/assets/aistudio/IMG-20261118-WA0033_b8bd5ef8.jpg',
      '/assets/aistudio/IMG-20261118-WA0026_19792d45.jpg',
      '/assets/aistudio/IMG-20261118-WA0006_c266c093.jpg',
    ],
    portfolioCategory: 'interior',
  },
  {
    id: 'tv-wall-units',
    number: '04',
    title: 'الشاشات الجدارية',
    shortDesc:
      'وحدات تلفاز جدارية مبتكرة بانحناءات عصرية، أرفف مضيئة، وخزائن معلقة تخفي الأسلاك وتجعل جدار المعيشة تحفة بصرية.',
    fullDesc:
      'تمثل الشاشة الجدارية القلب البصري لغرفة المعيشة؛ لذلك نصمم وننفذ وحدات تلفاز مخصصة تجمع بين الحواف المنحنية الناعمة، الأرفف الزجاجية والخشبية المزودة بإضاءة LED دافئة، والأدراج السفلية المعلقة التي توفر مساحة تخزين عملية مع إخفاء كامل للتمديدات الكهربائية.',
    highlights: [
      'تصاميم بالحواف المنحنية العصرية والألوان العاجية والخشبية المتناسقة',
      'أرفف عرض جانبية وزجاجية مزودة بإضاءة مخفية هادئة',
      'وحدات أدراج معلقة وتأسيس متقن لمآخذ الكهرباء والشاشة',
    ],
    coverImage: '/assets/aistudio/IMG-20261118-WA0017_f3140637.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261118-WA0017_f3140637.jpg',
      '/assets/aistudio/IMG-20261118-WA0027_e2ce0c60.jpg',
      '/assets/aistudio/IMG-20261118-WA0004_bb69c056.jpg',
      '/assets/aistudio/IMG-20261118-WA0020_fdd4d3a8.jpg',
      '/assets/aistudio/IMG-20261118-WA0037_ad835ca0.jpg',
      '/assets/aistudio/IMG-20261118-WA0035_8f610ba0.jpg',
    ],
    portfolioCategory: 'tv-walls',
  },
  {
    id: 'gypsum-ceilings',
    number: '05',
    title: 'الأسقف الجبسية',
    shortDesc:
      'تنفيذ أسقف جبسية عصرية وكلاسيكية مع بيوت نور وإضاءات مخفية وتجاويف انسيابية تمنح المكان اتساعاً وفخامة.',
    fullDesc:
      'نبدع في تشكيل الأسقف الجبسية والديكورات الجبسية الجدارية سواء بالطابع العصري البسيط ذي الخطوط الضوئية الغائرة (Magnetic Track & Cove Lighting) أو القباب الزخرفية الفاخرة للمجالس الكبيرة، مع توزيع هندسي متوازن للإنارة يبرز جمال الأثاث والجدران.',
    highlights: [
      'أسقف جبسية معلقة ببيوت نور وإضاءة مخفية متجانسة',
      'قباب وزخارف جبسية مذهبة للمجالس والصالات الكلاسيكية',
      'تشكيلات جبسية جدارية منحنية مدمجة مع الخشب والإنارة غير المباشرة',
    ],
    coverImage: '/assets/aistudio/IMG-20261118-WA0029_5ebed9fc.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261118-WA0029_5ebed9fc.jpg',
      '/assets/aistudio/IMG-20261118-WA0018_f267829d.jpg',
      '/assets/aistudio/IMG-20261118-WA0030_d75ac8cd.jpg',
    ],
    portfolioCategory: 'finishes',
  },
  {
    id: 'paints-finishes',
    number: '06',
    title: 'الدهانات والتشطيبات',
    shortDesc:
      'أعمال دهانات داخلية متقنة وتشطيبات جدارية تجمع بين نعومة الأسطح، المرايا الديكورية، والبانوهات، والتكسيات الحديثة.',
    fullDesc:
      'اللمسة النهائية هي سر فخامة أي تصميم؛ لذلك نولي عناية فائقة لأعمال الدهانات الداخلية بدرجاتها العاجية والدافئة، مع دمجها بالتكسيات المضلعة (شيبورد وبديل الخشب)، المرايا الطولية المزودة بإنارة، والألواح الجدارية المزخرفة لتسليم مساحة متكاملة التشطيب.',
    highlights: [
      'دهانات داخلية ناعمة بدرجات العاجي الدافئ والبيج المتناغم مع الأثاث',
      'مداخل ومغاسل ومرايا ديكورية مدمجة مع ألواح مضلعة وإنارة طولية',
      'تشطيبات جدارية تجمع بين الأسطح الملساء والزخارف البارزة بدقة عالية',
    ],
    coverImage: '/assets/aistudio/IMG-20261118-WA0008_01b1d737.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261118-WA0008_01b1d737.jpg',
      '/assets/aistudio/IMG-20261118-WA0039_260f645b.jpg',
      '/assets/aistudio/IMG-20261118-WA0022_1e5c04f1.jpg',
      '/assets/aistudio/IMG-20261118-WA0021_8db3b81e.jpg',
      '/assets/aistudio/IMG-20261118-WA0009_002b5a8d.jpg',
    ],
    portfolioCategory: 'finishes',
  },
  {
    id: 'innovative-wardrobes',
    number: '07',
    title: 'الخزائن المبتكرة',
    shortDesc:
      'تفصيل خزائن ملابس وغرف ملابس (Dressing Rooms) بواجهات زجاجية مؤطرة وإضاءة داخلية ذكية وتقسيمات عملية.',
    fullDesc:
      'نصمم وننفذ خزائن الملابس الزاوية والمستقيمة وغرف الملابس بأسلوب عصري يستغل كامل ارتفاع الجدار. نعتمد الواجهات الزجاجية الشفافة أو المظللة بإطارات سوداء أنيقة، مع إضاءة LED داخلية دافئة وتقسيمات مدروسة للتعليق، الأدراج، وأرفف الأحذية والحقائب.',
    highlights: [
      'خزائن زاوية (L-Shape) بواجهات زجاجية وإطارات معدنية سوداء فاخرة',
      'إضاءة داخلية مدمجة لكل رف ووحدة تعليق لسهولة الاستخدام ومظهر راقٍ',
      'تقسيمات ذكية تشمل وحدات الأدراج، أرفف الأحذية، وخزائن التخزين العلوية',
    ],
    coverImage: '/assets/aistudio/IMG-20261118-WA0019_773b7855.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261118-WA0019_773b7855.jpg',
      '/assets/aistudio/IMG-20261118-WA0013_a90d8ae2.jpg',
      '/assets/aistudio/IMG-20261118-WA0025_73bc98cf.jpg',
      '/assets/aistudio/IMG-20261118-WA0023_76def539.jpg',
      '/assets/aistudio/IMG-20261118-WA0016_853c9cc4.jpg',
      '/assets/aistudio/IMG-20261118-WA0005_8981ed16.jpg',
    ],
    portfolioCategory: 'wardrobes',
  },
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: 'all', label: 'جميع الأعمال' },
  { id: 'interior', label: 'الديكورات الداخلية' },
  { id: 'bedrooms', label: 'غرف النوم' },
  { id: 'wardrobes', label: 'الخزائن وغرف الملابس' },
  { id: 'tv-walls', label: 'الشاشات الجدارية' },
  { id: 'commercial', label: 'المحلات التجارية' },
  { id: 'finishes', label: 'التشطيبات والديكورات الأخرى' },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. Hero / Luxury Entrance
  {
    id: 'work-30',
    image: '/assets/aistudio/IMG-20261118-WA0030_d75ac8cd.jpg',
    category: 'interior',
    categoryLabel: 'الديكورات الداخلية',
    serviceId: 'design-execution',
    serviceLabel: 'التصميم والتنفيذ',
    title: 'مدخل استقبال فاخر بالمرايا والخشب والرخام المضيء',
    description:
      'تكامل متقن بين بديل الخشب المضلع والرخام ذي الإضاءة الخلفية مع كونسول معلق وسقف جبسي بإنارة مخفية.',
    tags: ['مداخل فاخرة', 'التصميم والتنفيذ', 'أسقف جبسية'],
  },
  // 2. Commercial Cafe/Bakery
  {
    id: 'work-28',
    image: '/assets/aistudio/IMG-20261118-WA0028_5fccac0e.jpg',
    category: 'commercial',
    categoryLabel: 'المحلات التجارية',
    serviceId: 'commercial-decor',
    serviceLabel: 'ديكور محلات تجارية',
    title: 'تصميم وتنفيذ ديكور محل تجاري وكافيه متكامل',
    description:
      'تجهيز متكامل يشمل كاونترات عرض زجاجية بتكسيات مضلعة مضيئة، أقواس جدارية، وجلسات جانبية متناسقة.',
    tags: ['ديكور محلات تجارية', 'كاونترات عرض', 'إضاءة ديكورية'],
  },
  // 3. Wardrobes - L-shaped dark glass
  {
    id: 'work-19',
    image: '/assets/aistudio/IMG-20261118-WA0019_773b7855.jpg',
    category: 'wardrobes',
    categoryLabel: 'الخزائن وغرف الملابس',
    serviceId: 'innovative-wardrobes',
    serviceLabel: 'الخزائن المبتكرة',
    title: 'خزانة ملابس زاوية بواجهات زجاجية وإضاءة داخلية',
    description:
      'خزانة ملابس ركنية بأبواب زجاجية مؤطرة بالأسود وإضاءة دافئة لكل رف مع تقسيمات تعليق وأدراج سفلية.',
    tags: ['الخزائن المبتكرة', 'غرف ملابس', 'واجهات زجاجية'],
  },
  // 4. TV Wall - Mounted screen with curved panels
  {
    id: 'work-17',
    image: '/assets/aistudio/IMG-20261118-WA0017_f3140637.jpg',
    category: 'tv-walls',
    categoryLabel: 'الشاشات الجدارية',
    serviceId: 'tv-wall-units',
    serviceLabel: 'الشاشات الجدارية',
    title: 'شاشة جدارية منحنية بأرفف مضيئة ووحدة خشبية معلقة',
    description:
      'تصميم عصري لوحدة التلفاز يجمع بين الانحناءات العاجية الناعمة والأرفف الجانبية المضيئة مع خزانة سفلية ممتدة.',
    tags: ['الشاشات الجدارية', 'وحدات تلفاز', 'إضاءة مخفية'],
  },
  // 5. Bedroom - Brown wood headboard wall
  {
    id: 'work-06',
    image: '/assets/aistudio/IMG-20261118-WA0006_c266c093.jpg',
    category: 'bedrooms',
    categoryLabel: 'غرف النوم',
    serviceId: 'interior-decor',
    serviceLabel: 'الديكورات الداخلية',
    title: 'تصميم غرفة نوم رئيسية بخلفية خشبية وإضاءات معلقة',
    description:
      'تناغم بين الجدار الخشبي البني الدافئ وخلفية السرير العاجية المنحنية مع إنارة سقفية ومعلقة هادئة.',
    tags: ['غرف النوم', 'الديكورات الداخلية', 'تكسيات خشبية'],
  },
  // 6. Living room - Sculpted wave wall & branch chandelier
  {
    id: 'work-32',
    image: '/assets/aistudio/IMG-20261118-WA0032_f1d6d46a.jpg',
    category: 'interior',
    categoryLabel: 'الديكورات الداخلية',
    serviceId: 'design-execution',
    serviceLabel: 'التصميم والتنفيذ',
    title: 'صالة استقبال فاخرة بجدارية متموجة وتكسيات خشبية',
    description:
      'تصميم داخلي رحب يرتكز على جدارية فنية متموجة محاطة بتكسيات خشبية ورخامية وإضاءة جدارية دافئة.',
    tags: ['الديكورات الداخلية', 'التصميم والتنفيذ', 'صالات استقبال'],
  },
  // 7. Wardrobe + Bedroom open wood closet
  {
    id: 'work-13',
    image: '/assets/aistudio/IMG-20261118-WA0013_a90d8ae2.jpg',
    category: 'wardrobes',
    categoryLabel: 'الخزائن وغرف الملابس',
    serviceId: 'innovative-wardrobes',
    serviceLabel: 'الخزائن المبتكرة',
    title: 'خزانة غرفة نوم خشبية بتقسيمات مفتوحة ومغلقة',
    description:
      'خزانة ملابس مصممة بلون الخشب الدافئ تجمع بين قسم التعليق المفتوح المضيء، الأدراج، وأرفف الأحذية الجانبية.',
    tags: ['الخزائن المبتكرة', 'غرف النوم', 'خشب طبيعي'],
  },
  // 8. TV Wall - Dark wood with fireplace marble base
  {
    id: 'work-27',
    image: '/assets/aistudio/IMG-20261118-WA0027_e2ce0c60.jpg',
    category: 'tv-walls',
    categoryLabel: 'الشاشات الجدارية',
    serviceId: 'tv-wall-units',
    serviceLabel: 'الشاشات الجدارية',
    title: 'وحدة شاشة جدارية خشبية بالحواف المنحنية وقاعدة رخامية',
    description:
      'تكسيات خشبية بنية بحواف دائرية انسيابية مع أرفف عرض زجاجية مضيئة وقاعدة سفلية بالرخام الفاخر.',
    tags: ['الشاشات الجدارية', 'تكسيات خشبية', 'تصميم عصري'],
  },
  // 9. Gypsum Ceiling - Ornate Gold & White Dome
  {
    id: 'work-29',
    image: '/assets/aistudio/IMG-20261118-WA0029_5ebed9fc.jpg',
    category: 'finishes',
    categoryLabel: 'التشطيبات والديكورات الأخرى',
    serviceId: 'gypsum-ceilings',
    serviceLabel: 'الأسقف الجبسية',
    title: 'سقف جبسي كلاسيكي بقبة زخرفية مذهبة وإضاءة مخفية',
    description:
      'تنفيذ أعمال الجبس المزخرف بنقوش ذهبية كلاسيكية وبيوت نور دائرية تمنح المجلس فخامة استثنائية.',
    tags: ['الأسقف الجبسية', 'مجالس عربية', 'زخارف جبسية'],
  },
  // 10. Finishes - Organic curved wall with wood slats
  {
    id: 'work-18',
    image: '/assets/aistudio/IMG-20261118-WA0018_f267829d.jpg',
    category: 'finishes',
    categoryLabel: 'التشطيبات والديكورات الأخرى',
    serviceId: 'gypsum-ceilings',
    serviceLabel: 'الأسقف الجبسية',
    title: 'ديكور جداري منحني بإضاءة مخفية وشرائح خشبية',
    description:
      'تشكيل جداري انسيابي مع إضاءة محيطية دافئة ورف خشبي عائم يتناغم مع شرائح بديل الخشب الطولية.',
    tags: ['الأسقف الجبسية', 'الدهانات والتشطيبات', 'مداخل'],
  },
  // 11. Interior - Living room with vertical wood & marble backlit panels
  {
    id: 'work-11',
    image: '/assets/aistudio/IMG-20261118-WA0011_f7727f75.jpg',
    category: 'interior',
    categoryLabel: 'الديكورات الداخلية',
    serviceId: 'interior-decor',
    serviceLabel: 'الديكورات الداخلية',
    title: 'ديكور جدار معيشة بألواح الخشب والرخام والإضاءة الدافئة',
    description:
      'توزيع متناوب بين الألواح الخشبية المزودة بإنارة خلفية والخلفيات الرخامية العاجية خلف جلسة المعيشة.',
    tags: ['الديكورات الداخلية', 'غرف معيشة', 'بديل الخشب والرخام'],
  },
  // 12. Commercial / Office Reception Lounge
  {
    id: 'work-10',
    image: '/assets/aistudio/IMG-20261118-WA0010_92c8e67b.jpg',
    category: 'commercial',
    categoryLabel: 'المحلات التجارية',
    serviceId: 'commercial-decor',
    serviceLabel: 'ديكور محلات تجارية',
    title: 'تصميم صالة استقبال ومكاتب بتكسيات خشبية شاملة',
    description:
      'بيئة استقبال احترافية تعتمد التكسيات الجدارية البنية والشرائح الطولية المضيئة مع سقف جبسي بإنارة محيطية.',
    tags: ['ديكور محلات تجارية', 'التصميم والتنفيذ', 'صالات استقبال'],
  },
  // 13. TV Wall - Curved beige & vertical shelf
  {
    id: 'work-04',
    image: '/assets/aistudio/IMG-20261118-WA0004_bb69c056.jpg',
    category: 'tv-walls',
    categoryLabel: 'الشاشات الجدارية',
    serviceId: 'tv-wall-units',
    serviceLabel: 'الشاشات الجدارية',
    title: 'وحدة تلفاز جدارية بحواف دائرية وخزانة عرض عمودية',
    description:
      'تصميم متكامل للشاشة الجدارية باللون العاجي مع تجويف عرض رأسي مضاء بالخشب الدافئ ووحدة سفلية أنيقة.',
    tags: ['الشاشات الجدارية', 'خزائن عرض', 'تصميم داخلي'],
  },
  // 14. TV Wall - Beige curved with floating wood drawer unit
  {
    id: 'work-20',
    image: '/assets/aistudio/IMG-20261118-WA0020_fdd4d3a8.jpg',
    category: 'tv-walls',
    categoryLabel: 'الشاشات الجدارية',
    serviceId: 'tv-wall-units',
    serviceLabel: 'الشاشات الجدارية',
    title: 'شاشة جدارية عصرية مع أرفف خشبية وأدراج معلقة',
    description:
      'وحدة شاشة بتشطيب عاجي ناعم وأرفف جانبية بارزة مع كونسول خشبي معلق يمتد أسفل كامل الجدار.',
    tags: ['الشاشات الجدارية', 'أدراج معلقة', 'صالات معيشة'],
  },
  // 15. Finishes - Minimalist curved wood and white wall
  {
    id: 'work-08',
    image: '/assets/aistudio/IMG-20261118-WA0008_01b1d737.jpg',
    category: 'finishes',
    categoryLabel: 'التشطيبات والديكورات الأخرى',
    serviceId: 'paints-finishes',
    serviceLabel: 'الدهانات والتشطيبات',
    title: 'تشطيب جداري عصري يجمع بين الدهان الناعم والخشب المنحني',
    description:
      'زاوية معمارية هادئة بتشطيبات دهان فائقة النعومة مع تكسية خشبية مقوسة وإضاءة خطية غائرة.',
    tags: ['الدهانات والتشطيبات', 'مداخل وممرات', 'إضاءة خطية'],
  },
  // 16. Wardrobe - Tall glass corner wardrobe
  {
    id: 'work-05',
    image: '/assets/aistudio/IMG-20261118-WA0005_8981ed16.jpg',
    category: 'wardrobes',
    categoryLabel: 'الخزائن وغرف الملابس',
    serviceId: 'innovative-wardrobes',
    serviceLabel: 'الخزائن المبتكرة',
    title: 'خزانة زاوية بكامل الارتفاع بواجهات زجاجية وإضاءة ذهبية',
    description:
      'تفصيل خزانة ملابس ركنية بأبواب زجاجية مؤطرة بالأسود وأرفف متعددة مع إضاءة داخلية دافئة.',
    tags: ['الخزائن المبتكرة', 'خزائن زاوية', 'واجهات زجاجية'],
  },
  // 17. Wardrobe - Wood and black glass sliding/hinged
  {
    id: 'work-23',
    image: '/assets/aistudio/IMG-20261118-WA0023_76def539.jpg',
    category: 'wardrobes',
    categoryLabel: 'الخزائن وغرف الملابس',
    serviceId: 'innovative-wardrobes',
    serviceLabel: 'الخزائن المبتكرة',
    title: 'خزانة ملابس خشبية بواجهات زجاجية وخزائن علوية',
    description:
      'تصميم يدمج دفء العروق الخشبية مع الأبواب الزجاجية الداكنة ووحدات التخزين العلوية والأدراج الداخلية.',
    tags: ['الخزائن المبتكرة', 'غرف النوم', 'تفصيل خزائن'],
  },
  // 18. Finishes - Mirror wall with white fluted slats
  {
    id: 'work-22',
    image: '/assets/aistudio/IMG-20261118-WA0022_1e5c04f1.jpg',
    category: 'finishes',
    categoryLabel: 'التشطيبات والديكورات الأخرى',
    serviceId: 'paints-finishes',
    serviceLabel: 'الدهانات والتشطيبات',
    title: 'ديكور مدخل بمرآة طولية وشرائح مضلعة ورف معلق',
    description:
      'تنسيق أنيق للمدخل يجمع بين المرآة الممتدة، الألواح المضلعة البيضاء، الإنارة الطولية، والدهان الرخامي الدافئ.',
    tags: ['الدهانات والتشطيبات', 'ديكورات مداخل', 'مرايا ديكورية'],
  },
  // 19. Finishes - Mirror console with pendant lights
  {
    id: 'work-21',
    image: '/assets/aistudio/IMG-20261118-WA0021_8db3b81e.jpg',
    category: 'finishes',
    categoryLabel: 'التشطيبات والديكورات الأخرى',
    serviceId: 'paints-finishes',
    serviceLabel: 'الدهانات والتشطيبات',
    title: 'جدارية مرايا مشطوفة مع تكسيات مضلعة وكونسول عائم',
    description:
      'تصميم جداري للمداخل والممرات يضم مرايا مقسمة هندسياً مع تكسيات جانبية مضلعة وإضاءات معلقة.',
    tags: ['الدهانات والتشطيبات', 'مرايا جدارية', 'كونسول مدخل'],
  },
  // 20. Interior - Living room with 3D sculpted wave artwork
  {
    id: 'work-14',
    image: '/assets/aistudio/IMG-20261118-WA0014_7af506b0.jpg',
    category: 'interior',
    categoryLabel: 'الديكورات الداخلية',
    serviceId: 'interior-decor',
    serviceLabel: 'الديكورات الداخلية',
    title: 'صالة معيشة عصرية بجدارية بارزة وأعمدة مكسوة بالخشب',
    description:
      'تصميم داخلي متكامل يبرز جمال الجدارية النحتية المضاءة وتكسيات الأعمدة ذات الحواف المنحنية.',
    tags: ['الديكورات الداخلية', 'غرف معيشة', 'جداريات ثلاثية الأبعاد'],
  },
  // 21. Interior - Neoclassical dining & reception hall
  {
    id: 'work-26',
    image: '/assets/aistudio/IMG-20261118-WA0026_19792d45.jpg',
    category: 'interior',
    categoryLabel: 'الديكورات الداخلية',
    serviceId: 'interior-decor',
    serviceLabel: 'الديكورات الداخلية',
    title: 'صالة طعام واستقبال بطابع نيوكلاسيك وبانوهات جدارية',
    description:
      'تناغم كلاسيكي حديث يظهر في البانوهات الجدارية المتقنة، الأسقف الجبسية ذات الخطوط الضوئية، والثريا الفاخرة.',
    tags: ['الديكورات الداخلية', 'بانوهات جدارية', 'صالات طعام'],
  },
  // 22. Wardrobe - Light frame with black glass doors & drawers
  {
    id: 'work-16',
    image: '/assets/aistudio/IMG-20261118-WA0016_853c9cc4.jpg',
    category: 'wardrobes',
    categoryLabel: 'الخزائن وغرف الملابس',
    serviceId: 'innovative-wardrobes',
    serviceLabel: 'الخزائن المبتكرة',
    title: 'خزانة ملابس زاوية بأدراج سفلية متناسقة وواجهات زجاجية',
    description:
      'تفصيل عملي يجمع بين وحدات التعليق العلوية المضاءة ووحدات الأدراج السفلية المتعددة ضمن إطار عصري.',
    tags: ['الخزائن المبتكرة', 'غرف النوم', 'تنظيم الملابس'],
  },
  // 23. Interior - Neoclassical foyer with round centerpiece table
  {
    id: 'work-31',
    image: '/assets/aistudio/IMG-20261118-WA0031_58168dce.jpg',
    category: 'interior',
    categoryLabel: 'الديكورات الداخلية',
    serviceId: 'design-execution',
    serviceLabel: 'التصميم والتنفيذ',
    title: 'بهو استقبال كلاسيكي حديث بإطارات جدارية وإنارة دافئة',
    description:
      'تصميم بهو داخلي فخم يعتمد تناسق البانوهات الجدارية والإنارة الجدارية والسقفية لإبراز فخامة المكان.',
    tags: ['التصميم والتنفيذ', 'الديكورات الداخلية', 'بهو استقبال'],
  },
  // 24. Interior - Living room with botanical relief wall
  {
    id: 'work-33',
    image: '/assets/aistudio/IMG-20261118-WA0033_b8bd5ef8.jpg',
    category: 'interior',
    categoryLabel: 'الديكورات الداخلية',
    serviceId: 'interior-decor',
    serviceLabel: 'الديكورات الداخلية',
    title: 'غرفة معيشة بجدارية نقوش نباتية بارزة وسقف جبسي متدرج',
    description:
      'تصميم يجمع بين هدوء الألوان العاجية وجمال الجدارية المحفورة مع تجاويف جدارية مضيئة وسقف جبسي أنيق.',
    tags: ['الديكورات الداخلية', 'الأسقف الجبسية', 'جداريات فنية'],
  },
  // 25. Wardrobe - Walnut wood L-shaped glass wardrobe
  {
    id: 'work-25',
    image: '/assets/aistudio/IMG-20261118-WA0025_73bc98cf.jpg',
    category: 'wardrobes',
    categoryLabel: 'الخزائن وغرف الملابس',
    serviceId: 'innovative-wardrobes',
    serviceLabel: 'الخزائن المبتكرة',
    title: 'خزانة زاوية بخشب الجوز الدافئ وأبواب زجاجية سوداء',
    description:
      'غرفة ملابس ركنية بتشطيب خشبي فاخر وأبواب زجاجية شفافة مع خطوط إضاءة LED داخلية متكاملة.',
    tags: ['الخزائن المبتكرة', 'غرف ملابس', 'خشب فاخر'],
  },
  // 26. TV Wall - Real on-site execution with side glass towers
  {
    id: 'work-37',
    image: '/assets/aistudio/IMG-20261118-WA0037_ad835ca0.jpg',
    category: 'tv-walls',
    categoryLabel: 'الشاشات الجدارية',
    serviceId: 'tv-wall-units',
    serviceLabel: 'الشاشات الجدارية',
    title: 'تنفيذ واقعي لوحدة شاشة جدارية مع خزائن عرض زجاجية جانبية',
    description:
      'صورة من أرض الواقع لتنفيذ شاشة جدارية بتجويف مركزي مؤطر وخزانتين جانبيتين مضاءتين ووحدة أدراج معلقة.',
    tags: ['الشاشات الجدارية', 'التصميم والتنفيذ', 'تنفيذ ميداني'],
  },
  // 27. Finishes - Real on-site execution of decorative wall cladding
  {
    id: 'work-39',
    image: '/assets/aistudio/IMG-20261118-WA0039_260f645b.jpg',
    category: 'finishes',
    categoryLabel: 'التشطيبات والديكورات الأخرى',
    serviceId: 'paints-finishes',
    serviceLabel: 'الدهانات والتشطيبات',
    title: 'تنفيذ واقعي لتكسيات جدارية مع نقوش بارزة وإضاءة مخفية',
    description:
      'تنفيذ ميداني متقن لجدار داخلي يجمع بين الألواح العاجية الملساء والبانوهات المزخرفة المزودة بإنارة جانبية.',
    tags: ['الدهانات والتشطيبات', 'تكسيات جدارية', 'تنفيذ ميداني'],
  },
  // 28. TV Wall - Real on-site execution of curved beige & black TV wall
  {
    id: 'work-35',
    image: '/assets/aistudio/IMG-20261118-WA0035_8f610ba0.jpg',
    category: 'tv-walls',
    categoryLabel: 'الشاشات الجدارية',
    serviceId: 'tv-wall-units',
    serviceLabel: 'الشاشات الجدارية',
    title: 'تنفيذ واقعي لشاشة جدارية منحنية مع زجاج أسود وأرفف',
    description:
      'تنفيذ فعلي لوحدة شاشة جدارية تجمع بين الانحناءات العاجية والزجاج الأسود اللامع مع خزانة خشبية سفلية.',
    tags: ['الشاشات الجدارية', 'التصميم والتنفيذ', 'تنفيذ ميداني'],
  },
  // 29. Finishes - 3D Floral Sculpted Wall
  {
    id: 'work-09',
    image: '/assets/aistudio/IMG-20261118-WA0009_002b5a8d.jpg',
    category: 'finishes',
    categoryLabel: 'التشطيبات والديكورات الأخرى',
    serviceId: 'paints-finishes',
    serviceLabel: 'الدهانات والتشطيبات',
    title: 'جدارية ديكورية ثلاثية الأبعاد مع شرائح خشبية وإنارة موجهة',
    description:
      'تصميم جداري فني بارز محاط بتكسيات طولية وإضاءة سقفية تبرز تفاصيل النقوش الجدارية.',
    tags: ['التشطيبات والديكورات الأخرى', 'جداريات ثلاثية الأبعاد', 'ديكور داخلي'],
  },
];

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || COMPANY_INFO.whatsappDefaultMessage);
  return `${COMPANY_INFO.whatsappBaseUrl}?text=${text}`;
}
