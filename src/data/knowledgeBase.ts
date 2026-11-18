import { COMPANY_INFO, WORKING_HOURS, buildWhatsAppUrl } from './companyData';

export type AssistantActionType =
  | 'whatsapp'
  | 'call_primary'
  | 'call_secondary'
  | 'maps'
  | 'instagram'
  | 'snapchat'
  | 'navigate_portfolio'
  | 'navigate_services'
  | 'navigate_contact';

export interface AssistantAction {
  type: AssistantActionType;
  label: string;
  url?: string;
  targetSection?: string;
  portfolioCategory?: string;
}

export type QuestionTopic =
  | 'greeting'
  | 'company_overview'
  | 'services_all'
  | 'service_commercial'
  | 'service_design_execution'
  | 'service_interior'
  | 'service_bedrooms'
  | 'service_tv_walls'
  | 'service_gypsum'
  | 'service_paints'
  | 'service_wardrobes'
  | 'location'
  | 'working_hours'
  | 'friday_hours'
  | 'contact_numbers'
  | 'whatsapp'
  | 'social_media'
  | 'portfolio'
  | 'pricing'
  | 'work_steps'
  | 'why_funun'
  | 'fallback';

export interface KnowledgeBaseEntry {
  id: string;
  topic: QuestionTopic;
  title: string;
  priority: number;
  exactPhrases: string[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  answer: string;
  bulletPoints?: string[];
  actions: AssistantAction[];
}

export const ARABIC_SYNONYMS: Record<string, string[]> = {
  موقع: ['وين', 'فين', 'عنوان', 'مكان', 'لوكيشن', 'خريطه', 'خرائط', 'فرع', 'مقر', 'مدينه البناء', 'جيزان', 'جازان'],
  دوام: ['تفتحون', 'تسكرون', 'تقفلون', 'اوقات', 'ساعات', 'متى', 'عمل', 'مفتوح', 'فاتحين', 'مغلق', 'وقت'],
  الجمعه: ['جمعه', 'يوم الجمعه'],
  تواصل: ['اتصل', 'اتصال', 'ارقام', 'رقم', 'جوال', 'هاتف', 'تلفون', 'موبايل', 'كلمكم', 'اكلمكم'],
  واتساب: ['واتس', 'وتساب', 'وتس', 'whatsapp', 'مراسله'],
  خدمات: ['تقدمون', 'تسوون', 'تشتغلون', 'اعمال', 'شغلكم', 'مجال', 'تخصص', 'وش تسوون', 'ماذا تقدمون'],
  محلات: ['محل', 'تجاري', 'تجاريه', 'كافيه', 'مقهى', 'معرض', 'متجر', 'ديكور محلات', 'واجهات', 'كاونتر'],
  تصميم: ['تنفيذ', 'مخطط', 'افكار', 'اشراف', 'مقاولات'],
  داخلي: ['داخليه', 'صالات', 'صاله', 'مجلس', 'مجالس', 'معيشه', 'استقبال', 'طعام', 'مدخل', 'مداخل'],
  نوم: ['غرفه نوم', 'غرف نوم', 'سرير', 'خلفيه سرير', 'ماستر'],
  شاشات: ['شاشه', 'تلفزيون', 'تلفاز', 'تي في', 'tv', 'طاوله تلفزيون', 'وحده تلفزيون', 'جداريه تلفزيون'],
  جبس: ['جبسيه', 'اسقف', 'سقف', 'جبسمبورد', 'جبسنبورد', 'بيت نور', 'قبه', 'قبب', 'اناره مخفيه'],
  دهانات: ['دهان', 'بويه', 'صبغ', 'تشطيب', 'تشطيبات', 'بانوهات', 'فوم', 'بديل خشب', 'بديل رخام', 'شيبورد', 'مرايا'],
  خزائن: ['خزانه', 'دولاب', 'دواليب', 'كبت', 'ملابس', 'غرفه ملابس', 'غرف ملابس', 'دريسينج', 'ركنيه', 'زاويه'],
  معرض: ['اعمالكم', 'صور', 'اشوف', 'شغلكم', 'مشاريع', 'نماذج', 'كتالوج', 'سابقه اعمال'],
  سعر: ['اسعار', 'بكم', 'كم', 'تكلفه', 'تكاليف', 'متر', 'عرض سعر', 'تسعيره', 'قسط', 'ميزانيه'],
  خطوات: ['كيف تبداون', 'طريقه العمل', 'مراحل', 'اليه العمل', 'كيف اطلب'],
  حسابات: ['انستقرام', 'انستا', 'سناب', 'سناب شات', 'سوشيال', 'تواصل اجتماعي'],
};

export const SUGGESTED_QUESTIONS: string[] = [
  'ما الخدمات التي تقدمونها؟',
  'وين موقعكم؟',
  'متى تفتحون؟ وهل تعملون يوم الجمعة؟',
  'هل تنفذون خزائن ملابس وشاشات جدارية؟',
  'هل تعملون ديكورات للمحلات؟',
  'أريد أشوف أعمالكم',
  'كيف أتواصل معكم؟ وما رقم الهاتف؟',
  'كيف يتم تحديد الأسعار؟',
];

export const FALLBACK_MESSAGE =
  'يسعدنا مساعدتك، يمكنك التواصل مباشرة مع فريق فنون عبر واتساب للحصول على التفاصيل';

export const KNOWLEDGE_BASE: KnowledgeBaseEntry[] = [
  {
    id: 'kb-greeting',
    topic: 'greeting',
    title: 'الترحيب والتعريف',
    priority: 5,
    exactPhrases: ['مرحبا', 'السلام عليكم', 'اهلا', 'صباح الخير', 'مساء الخير', 'هلا', 'حياكم'],
    primaryKeywords: ['مرحبا', 'سلام', 'اهلا', 'هلا'],
    secondaryKeywords: ['مساعد', 'فنون'],
    answer:
      'أهلاً وسهلاً بك في فنون للديكور والمقاولات (FUNUN DECOR). يسعدني إجابتك عن جميع استفساراتك حول خدماتنا السبع، معرض أعمالنا، موقعنا في جيزان (مدينة البناء)، وأوقات العمل.',
    bulletPoints: [
      'استكشاف خدمات الديكور والتصميم الداخلي والمحلات التجارية',
      'معرفة أوقات الدوام الرسمي وموقعنا على خرائط Google',
      'التواصل المباشر عبر الاتصال أو واتساب',
    ],
    actions: [
      { type: 'navigate_services', label: 'استعرض خدماتنا', targetSection: 'services' },
      { type: 'navigate_portfolio', label: 'شاهد معرض الأعمال', targetSection: 'portfolio' },
      { type: 'whatsapp', label: 'تحدث معنا عبر واتساب', url: buildWhatsAppUrl() },
    ],
  },
  {
    id: 'kb-services-all',
    topic: 'services_all',
    title: 'الخدمات الرئيسية السبع',
    priority: 10,
    exactPhrases: [
      'ما الخدمات التي تقدمونها',
      'وش خدماتكم',
      'ايش تقدمون',
      'ما هي خدمات الشركة',
      'الخدمات المتوفرة',
    ],
    primaryKeywords: ['خدمات', 'خدماتكم', 'تقدمون', 'تقدمونها', 'مجالات'],
    secondaryKeywords: ['ديكور', 'اعمال', 'شركه', 'فنون'],
    answer:
      'نقدم في شركة فنون للديكور والمقاولات (FUNUN DECOR) باقة متكاملة من 7 خدمات رئيسية للمساحات السكنية والتجارية:',
    bulletPoints: [
      '1. ديكور محلات تجارية: تجهيز وتصميم المحلات والكافيهات والمعارض وكاونترات العرض.',
      '2. التصميم والتنفيذ: تحويل الأفكار والمخططات إلى واقع بدقة عالية وإشراف متكامل.',
      '3. الديكورات الداخلية: تصميم الصالات، المجالس، غرف النوم، والمداخل الفاخرة.',
      '4. الشاشات الجدارية: وحدات تلفاز عصرية بالحواف المنحنية والأرفف المضيئة والأدراج المعلقة.',
      '5. الأسقف الجبسية: أسقف حديثة وكلاسيكية مع بيوت نور وإضاءة مخفية.',
      '6. الدهانات والتشطيبات: دهانات داخلية راقية، مرايا ديكورية، بانوهات، وتكسيات حديثة.',
      '7. الخزائن المبتكرة: تفصيل خزائن ملابس وغرف ملابس بواجهات زجاجية وإضاءة داخلية.',
    ],
    actions: [
      { type: 'navigate_services', label: 'عرض قسم الخدمات بالتفصيل', targetSection: 'services' },
      { type: 'whatsapp', label: 'استفسر عبر واتساب', url: buildWhatsAppUrl() },
    ],
  },
  {
    id: 'kb-commercial',
    topic: 'service_commercial',
    title: 'ديكور المحلات التجارية',
    priority: 12,
    exactPhrases: [
      'هل تعملون ديكورات للمحلات',
      'ديكور محلات تجارية',
      'تصميم محل تجاري',
      'ديكور كافيه',
      'تجهيز محلات',
    ],
    primaryKeywords: ['محلات', 'محل', 'تجاريه', 'تجاري', 'كافيه', 'مقهى', 'معرض', 'كاونتر', 'واجهات'],
    secondaryKeywords: ['ديكور', 'تجهيز', 'تصميم', 'تنفذون', 'تعملون'],
    answer:
      'نعم بكل تأكيد، نقدم خدمة «ديكور محلات تجارية» متكاملة تشمل تصميم وتنفيذ المساحات التجارية والكافيهات والمعارض بأسلوب عصري يجذب العملاء ويعكس هوية مشروعك.',
    bulletPoints: [
      'تصميم وتنفيذ كاونترات الاستقبال ووحدات العرض الزجاجية المضيئة.',
      'توزيع مدروس للجلسات ومسارات الحركة داخل المحل.',
      'أقواس جدارية ديكورية وتكسيات خشبية مع إضاءة دافئة وموجهة.',
    ],
    actions: [
      {
        type: 'navigate_portfolio',
        label: 'مشاهدة أعمال المحلات التجارية',
        targetSection: 'portfolio',
        portfolioCategory: 'commercial',
      },
      {
        type: 'whatsapp',
        label: 'اطلب تصميم محلك عبر واتساب',
        url: buildWhatsAppUrl('مرحباً فنون للديكور، أرغب بالاستفسار عن خدمة ديكور المحلات التجارية.'),
      },
    ],
  },
  {
    id: 'kb-wardrobes',
    topic: 'service_wardrobes',
    title: 'الخزائن المبتكرة وغرف الملابس',
    priority: 12,
    exactPhrases: [
      'هل تنفذون خزائن ملابس',
      'خزائن مبتكرة',
      'تفصيل دواليب ملابس',
      'غرف ملابس',
      'خزانة زاوية',
    ],
    primaryKeywords: ['خزائن', 'خزانه', 'دولاب', 'دواليب', 'ملابس', 'كبت', 'دريسينج'],
    secondaryKeywords: ['زاويه', 'زجاج', 'تفصيل', 'تنفذون', 'غرفه'],
    answer:
      'نعم، نتخصص في تصميم وتنفيذ «الخزائن المبتكرة» وغرف الملابس (Dressing Rooms) بتصاميم عصرية تستثمر المساحة والزوايا بكفاءة عالية.',
    bulletPoints: [
      'خزائن زاوية (L-Shape) ومستقيمة بكامل ارتفاع الجدار.',
      'واجهات زجاجية شفافة أو مظللة بإطارات سوداء أنيقة أو تشطيبات خشبية دافئة.',
      'إضاءة LED داخلية مدمجة لكل رف مع تقسيمات ذكية للتعليق والأدراج والأحذية.',
    ],
    actions: [
      {
        type: 'navigate_portfolio',
        label: 'تصفح صور الخزائن المبتكرة',
        targetSection: 'portfolio',
        portfolioCategory: 'wardrobes',
      },
      {
        type: 'whatsapp',
        label: 'استفسر عن تفصيل خزانة عبر واتساب',
        url: buildWhatsAppUrl('مرحباً فنون للديكور، أرغب بالاستفسار عن تفصيل الخزائن المبتكرة وغرف الملابس.'),
      },
    ],
  },
  {
    id: 'kb-bedrooms',
    topic: 'service_bedrooms',
    title: 'تصميم غرف النوم',
    priority: 12,
    exactPhrases: [
      'اريد تصميم غرفة نوم',
      'تصميم غرف نوم',
      'ديكور غرفة نوم',
      'خلفيات سرير',
    ],
    primaryKeywords: ['نوم', 'سرير', 'ماستر'],
    secondaryKeywords: ['غرفه', 'غرف', 'تصميم', 'ديكور', 'خشب'],
    answer:
      'يسعدنا تصميم وتنفيذ ديكورات غرف النوم الرئيسية والفرعية بأسلوب يجمع بين الهدوء والفخامة والعملية.',
    bulletPoints: [
      'تصميم خلفيات الأسرة بالتكسيات الخشبية الدافئة والألواح المبطنة المنحنية.',
      'توزيع الإضاءات المخفية والمعلقات الجانبية الهادئة.',
      'دمج خزائن الملابس المبتكرة المضيئة بتناغم تام مع ديكور الغرفة.',
    ],
    actions: [
      {
        type: 'navigate_portfolio',
        label: 'مشاهدة أعمال غرف النوم',
        targetSection: 'portfolio',
        portfolioCategory: 'bedrooms',
      },
      {
        type: 'whatsapp',
        label: 'اطلب تصميم غرفة نوم عبر واتساب',
        url: buildWhatsAppUrl('مرحباً فنون للديكور، أرغب في تصميم وتنفيذ ديكور غرفة نوم.'),
      },
    ],
  },
  {
    id: 'kb-tv-walls',
    topic: 'service_tv_walls',
    title: 'الشاشات الجدارية ووحدات التلفاز',
    priority: 12,
    exactPhrases: [
      'الشاشات الجدارية',
      'ديكور شاشة تلفزيون',
      'خلفية تلفزيون',
      'طاولة تلفزيون معلقة',
      'هل تنفذون شاشات جدارية',
    ],
    primaryKeywords: ['شاشات', 'شاشه', 'تلفزيون', 'تلفاز', 'تي في', 'tv'],
    secondaryKeywords: ['جداريه', 'وحده', 'طاوله', 'ارفف', 'معلقه'],
    answer:
      'نعم، تعد خدمة «الشاشات الجدارية» من أبرز تخصصاتنا في فنون للديكور، حيث نصمم وننفذ وحدات تلفاز جدارية تضفي فخامة عصرية على صالات المعيشة والمجالس.',
    bulletPoints: [
      'تصاميم بالحواف المنحنية الناعمة والتكسيات الخشبية والعاجية.',
      'أرفف جانبية وخزائن عرض زجاجية مزودة بإضاءة LED دافئة.',
      'وحدات أدراج سفلية معلقة أو قواعد رخامية مع إخفاء كامل للأسلاك.',
    ],
    actions: [
      {
        type: 'navigate_portfolio',
        label: 'مشاهدة صور الشاشات الجدارية',
        targetSection: 'portfolio',
        portfolioCategory: 'tv-walls',
      },
      {
        type: 'whatsapp',
        label: 'اطلب شاشة جدارية عبر واتساب',
        url: buildWhatsAppUrl('مرحباً فنون للديكور، أرغب بالاستفسار عن تصميم وتنفيذ شاشة جدارية.'),
      },
    ],
  },
  {
    id: 'kb-gypsum',
    topic: 'service_gypsum',
    title: 'الأسقف الجبسية والإضاءة المخفية',
    priority: 12,
    exactPhrases: [
      'هل تعملون اسقف جبسية',
      'الاسقف الجبسية',
      'شغل جبس بورد',
      'اسقف مستعارة',
    ],
    primaryKeywords: ['جبس', 'جبسيه', 'اسقف', 'سقف', 'جبسمبورد', 'جبسنبورد', 'قبه'],
    secondaryKeywords: ['اناره', 'مخفيه', 'بيت نور', 'تعملون', 'تنفذون'],
    answer:
      'نعم، ننفذ كافة أعمال «الأسقف الجبسية» والديكورات الجبسية الجدارية سواء بالطابع العصري البسيط أو الكلاسيكي الفاخر.',
    bulletPoints: [
      'أسقف جبسية حديثة مع بيوت نور ومسارات إضاءة خطية (Magnetic Track).',
      'قباب وزخارف جبسية مذهبة للمجالس والصالات الكلاسيكية.',
      'تشكيلات جبسية جدارية منحنية مدمجة مع الخشب والإنارة المخفية.',
    ],
    actions: [
      {
        type: 'navigate_portfolio',
        label: 'مشاهدة أعمال الأسقف والتشطيبات',
        targetSection: 'portfolio',
        portfolioCategory: 'finishes',
      },
      {
        type: 'whatsapp',
        label: 'تواصل معنا عبر واتساب',
        url: buildWhatsAppUrl('مرحباً فنون للديكور، أرغب بالاستفسار عن تنفيذ الأسقف الجبسية.'),
      },
    ],
  },
  {
    id: 'kb-paints-finishes',
    topic: 'service_paints',
    title: 'الدهانات والتشطيبات الجدارية',
    priority: 11,
    exactPhrases: [
      'الدهانات والتشطيبات',
      'هل تعملون دهانات',
      'تشطيب شقق وفلل',
      'بديل الخشب والرخام',
    ],
    primaryKeywords: ['دهانات', 'دهان', 'بويه', 'صبغ', 'تشطيب', 'تشطيبات', 'بانوهات', 'مرايا', 'بديل'],
    secondaryKeywords: ['جدران', 'خشب', 'رخام', 'شيبورد', 'مداخل'],
    answer:
      'نقدم في خدمة «الدهانات والتشطيبات» حلولاً متكاملة لتشطيب الجدران والمداخل بأعلى درجات النظافة والإتقان.',
    bulletPoints: [
      'دهانات داخلية ناعمة بدرجات العاجي الدافئ والألوان العصرية الهادئة.',
      'تركيب بديل الخشب المضلع، بديل الرخام، والبانوهات الجدارية.',
      'تفصيل مرايا المداخل الديكورية المزودة بإنارة طولية وأرفف معلقة.',
    ],
    actions: [
      {
        type: 'navigate_portfolio',
        label: 'مشاهدة أعمال التشطيبات',
        targetSection: 'portfolio',
        portfolioCategory: 'finishes',
      },
      {
        type: 'whatsapp',
        label: 'استفسر عبر واتساب',
        url: buildWhatsAppUrl('مرحباً فنون للديكور، أرغب بالاستفسار عن أعمال الدهانات والتشطيبات.'),
      },
    ],
  },
  {
    id: 'kb-interior-design-execution',
    topic: 'service_interior',
    title: 'الديكورات الداخلية والتصميم والتنفيذ',
    priority: 10,
    exactPhrases: [
      'الديكورات الداخلية',
      'التصميم والتنفيذ',
      'تصميم صالات ومجالس',
      'ديكور مداخل',
    ],
    primaryKeywords: ['داخليه', 'داخلي', 'صالات', 'صاله', 'مجالس', 'مجلس', 'معيشه', 'استقبال', 'مداخل'],
    secondaryKeywords: ['تصميم', 'تنفيذ', 'ديكورات', 'فخمه'],
    answer:
      'نقدم خدمتي «الديكورات الداخلية» و«التصميم والتنفيذ» لتحويل المساحات السكنية والتجارية إلى تحف معمارية تجمع بين الأناقة والعملية.',
    bulletPoints: [
      'تصميم وتنفيذ صالات المعيشة، بهو الاستقبال، المجالس، وغرف الطعام.',
      'جداريات فنية ثلاثية الأبعاد وتكسيات خشبية ورخامية بإضاءة دافئة.',
      'إشراف متكامل من الفكرة والتخطيط وحتى التسليم النهائي.',
    ],
    actions: [
      {
        type: 'navigate_portfolio',
        label: 'مشاهدة الديكورات الداخلية',
        targetSection: 'portfolio',
        portfolioCategory: 'interior',
      },
      { type: 'whatsapp', label: 'تواصل معنا عبر واتساب', url: buildWhatsAppUrl() },
    ],
  },
  {
    id: 'kb-location',
    topic: 'location',
    title: 'الموقع الجغرافي والعنوان',
    priority: 14,
    exactPhrases: [
      'وين موقعكم',
      'فين موقعكم',
      'اين يقع مقر الشركة',
      'عنوانكم',
      'موقع الشركة',
      'وين مكانكم',
    ],
    primaryKeywords: ['موقعكم', 'موقع', 'وين', 'فين', 'عنوانكم', 'عنوان', 'مكانكم', 'مكان', 'لوكيشن', 'جيزان', 'جازان', 'مدينه البناء'],
    secondaryKeywords: ['خريطه', 'خرائط', 'فرع', 'مقر'],
    answer: `يقع مقر شركة فنون للديكور والمقاولات في:\n📍 ${COMPANY_INFO.locationText}\nيسعدنا تشريفكم لنا في المقر أو فتح الموقع مباشرة عبر خرائط Google:`,
    bulletPoints: [
      'المدينة: جيزان، المملكة العربية السعودية',
      'الموقع: مدينة البناء',
    ],
    actions: [
      { type: 'maps', label: 'فتح الموقع على خرائط Google', url: COMPANY_INFO.googleMapsUrl },
      { type: 'whatsapp', label: 'تواصل عبر واتساب', url: buildWhatsAppUrl() },
      { type: 'call_primary', label: 'اتصال: 0554058937', url: 'tel:+966554058937' },
    ],
  },
  {
    id: 'kb-friday-hours',
    topic: 'friday_hours',
    title: 'دوام يوم الجمعة',
    priority: 15,
    exactPhrases: [
      'هل تعملون يوم الجمعة',
      'دوام يوم الجمعة',
      'متى تفتحون يوم الجمعة',
      'فاتحين الجمعة',
    ],
    primaryKeywords: ['جمعه', 'الجمعه'],
    secondaryKeywords: ['تعملون', 'تفتحون', 'دوام', 'مفتوح', 'فاتحين', 'يوم'],
    answer:
      'نعم، نعمل يوم الجمعة في الفترة المسائية وفق المواعيد الرسمية التالية:\n• الجمعة: 4:30 مساءً – 10:30 مساءً.\nبينما بقية أيام الأسبوع (السبت إلى الخميس) من 9:00 صباحاً حتى 10:26 مساءً.',
    actions: [
      { type: 'maps', label: 'موقعنا على خرائط Google', url: COMPANY_INFO.googleMapsUrl },
      { type: 'whatsapp', label: 'راسلنا على واتساب', url: buildWhatsAppUrl() },
    ],
  },
  {
    id: 'kb-working-hours',
    topic: 'working_hours',
    title: 'أوقات العمل الرسمية',
    priority: 13,
    exactPhrases: [
      'متى تفتحون',
      'اوقات العمل',
      'ساعات العمل',
      'متى الدوام',
      'اوقات الدوام',
      'متى تسكرون',
    ],
    primaryKeywords: ['تفتحون', 'تسكرون', 'تقفلون', 'دوام', 'اوقات', 'ساعات', 'مواعيد', 'متى'],
    secondaryKeywords: ['عمل', 'اليوم', 'الاسبوع', 'مفتوح', 'فاتحين'],
    answer: 'أوقات العمل الرسمية في شركة فنون للديكور والمقاولات طوال أيام الأسبوع:',
    bulletPoints: WORKING_HOURS.map((w) => `${w.day}: ${w.hours}`),
    actions: [
      { type: 'maps', label: 'زيارتنا عبر خرائط Google', url: COMPANY_INFO.googleMapsUrl },
      { type: 'call_primary', label: 'اتصال: 0554058937', url: 'tel:+966554058937' },
    ],
  },
  {
    id: 'kb-whatsapp',
    topic: 'whatsapp',
    title: 'التواصل عبر واتساب',
    priority: 14,
    exactPhrases: ['عندكم واتساب', 'رقم الواتساب', 'واتساب الشركة', 'اريد التواصل واتساب'],
    primaryKeywords: ['واتساب', 'واتس', 'وتساب', 'وتس', 'whatsapp'],
    secondaryKeywords: ['رقم', 'عندكم', 'تواصل', 'مراسله'],
    answer: `نعم، يسعدنا تواصلك المباشر معنا عبر واتساب على الرقم الرسمي:\n📱 0554058937 (${COMPANY_INFO.whatsappInternational})\nاضغط على الزر أدناه لبدء المحادثة الفورية:`,
    actions: [
      { type: 'whatsapp', label: 'محادثة واتساب مباشرة (0554058937)', url: buildWhatsAppUrl() },
      { type: 'call_primary', label: 'اتصال مباشر: 0554058937', url: 'tel:+966554058937' },
    ],
  },
  {
    id: 'kb-contact-numbers',
    topic: 'contact_numbers',
    title: 'أرقام الهاتف وطرق التواصل',
    priority: 13,
    exactPhrases: [
      'كيف اتواصل معكم',
      'ما رقم الهاتف',
      'ارقام التواصل',
      'رقم الجوال',
      'كم رقمكم',
    ],
    primaryKeywords: ['تواصل', 'اتواصل', 'رقم', 'ارقام', 'هاتف', 'جوال', 'تلفون', 'اتصال', 'اكلمكم'],
    secondaryKeywords: ['معكم', 'فنون', 'شركه'],
    answer:
      'يمكنك التواصل معنا مباشرة عبر الاتصال الهاتفي أو واتساب أو زيارة حساباتنا الرسمية ومقرنا في جيزان – مدينة البناء:',
    bulletPoints: [
      'رقم الاتصال الأول والواتساب: 0554058937 (+966554058937)',
      'رقم الاتصال الثاني: 0535159041 (+966535159041)',
      'الموقع: السعودية، جيزان، مدينة البناء',
    ],
    actions: [
      { type: 'whatsapp', label: 'واتساب: 0554058937', url: buildWhatsAppUrl() },
      { type: 'call_primary', label: 'اتصال: 0554058937', url: 'tel:+966554058937' },
      { type: 'call_secondary', label: 'اتصال: 0535159041', url: 'tel:+966535159041' },
      { type: 'maps', label: 'خرائط Google', url: COMPANY_INFO.googleMapsUrl },
    ],
  },
  {
    id: 'kb-social-media',
    topic: 'social_media',
    title: 'حسابات التواصل الاجتماعي (Instagram & Snapchat)',
    priority: 12,
    exactPhrases: ['حساب انستقرام', 'حساب سناب شات', 'حسابات التواصل الاجتماعي'],
    primaryKeywords: ['انستقرام', 'انستا', 'سناب', 'سوشيال', 'instagram', 'snapchat'],
    secondaryKeywords: ['حساب', 'حسابات', 'رابط', 'تابعنا'],
    answer: 'يسعدنا متابعتك لحساباتنا الرسمية على منصات التواصل الاجتماعي لمشاهدة أحدث أعمالنا وتفاصيل التنفيذ:',
    bulletPoints: [
      `حساب Instagram: ${COMPANY_INFO.instagramHandle}`,
      `حساب Snapchat: ${COMPANY_INFO.snapchatHandle}`,
    ],
    actions: [
      { type: 'instagram', label: 'متابعة حساب Instagram', url: COMPANY_INFO.instagramUrl },
      { type: 'snapchat', label: 'إضافة حساب Snapchat', url: COMPANY_INFO.snapchatUrl },
      { type: 'whatsapp', label: 'تواصل عبر واتساب', url: buildWhatsAppUrl() },
    ],
  },
  {
    id: 'kb-portfolio',
    topic: 'portfolio',
    title: 'معرض الأعمال والصور',
    priority: 13,
    exactPhrases: [
      'اريد اشوف اعمالكم',
      'معرض الاعمال',
      'صور شغلكم',
      'نماذج من اعمالكم',
      'ابي اشوف شغلكم',
    ],
    primaryKeywords: ['اعمالكم', 'شغلكم', 'معرض', 'صور', 'اشوف', 'نماذج', 'مشاريعكم'],
    secondaryKeywords: ['اريد', 'ابي', 'ابغى', 'ديكور', 'اعمال'],
    answer:
      'يضم موقعنا معرض أعمال متكاملاً يعرض صوراً حقيقية لأعمالنا في الديكورات الداخلية، غرف النوم، الخزائن وغرف الملابس، الشاشات الجدارية، المحلات التجارية، والأسقف الجبسية والتشطيبات.',
    bulletPoints: [
      'يمكنك تصفية الصور حسب نوع العمل (الشاشات الجدارية، الخزائن، غرف النوم، المحلات...).',
      'اضغط على أي صورة لفتحها في نافذة عرض كبيرة (Lightbox) ومشاهدة أدق التفاصيل.',
    ],
    actions: [
      { type: 'navigate_portfolio', label: 'انتقل إلى معرض الأعمال الآن', targetSection: 'portfolio' },
      { type: 'instagram', label: 'شاهد المزيد على Instagram', url: COMPANY_INFO.instagramUrl },
    ],
  },
  {
    id: 'kb-pricing',
    topic: 'pricing',
    title: 'الأسعار والتكلفة',
    priority: 14,
    exactPhrases: [
      'كم الاسعار',
      'بكم المتر',
      'كم السعر',
      'كم تكلفة الديكور',
      'اسعاركم',
      'كيف يتم تحديد الاسعار',
    ],
    primaryKeywords: ['سعر', 'اسعار', 'اسعاركم', 'بكم', 'تكلفه', 'تكاليف', 'متر', 'تسعيره', 'ميزانيه'],
    secondaryKeywords: ['كم', 'شاشه', 'خزانه', 'جبس', 'تصميم', 'غرفه'],
    answer:
      'يعتمد السعر على نوع العمل ومتطلباته الفنية، مثل مساحة المكان وأبعاده، نوع الخامات المختارة (خشب، زجاج، بديل رخام، جبس، دهانات)، وتفاصيل التصميم والإضاءة.\n\nيسعدنا تقديم تسعيرة دقيقة ومناسبة لاحتياجك بعد معرفة تفاصيل المساحة عبر واتساب أو الاتصال المباشر.',
    bulletPoints: [
      'تحديد التكلفة بناءً على المساحة الفعلية ونوع الخدمة المطلوبة.',
      'خيارات متنوعة من الخامات والتصاميم تناسب مختلف المساحات والتطلعات.',
    ],
    actions: [
      {
        type: 'whatsapp',
        label: 'اطلب تسعيرة لمشروعك عبر واتساب',
        url: buildWhatsAppUrl('مرحباً فنون للديكور، أرغب بالاستفسار عن التكلفة التقديرية لتنفيذ عمل ديكور.'),
      },
      { type: 'call_primary', label: 'اتصال مباشر: 0554058937', url: 'tel:+966554058937' },
      { type: 'navigate_contact', label: 'تعبئة نموذج الطلب', targetSection: 'contact' },
    ],
  },
  {
    id: 'kb-work-steps',
    topic: 'work_steps',
    title: 'خطوات العمل ورحلة العميل',
    priority: 10,
    exactPhrases: ['ما هي خطوات العمل', 'كيف طريقة العمل', 'كيف اطلب خدمة'],
    primaryKeywords: ['خطوات', 'مراحل', 'طريقه العمل', 'اليه', 'نبدا'],
    secondaryKeywords: ['كيف', 'طلب', 'تعاقد', 'تسليم'],
    answer: 'تتم رحلة العميل في فنون للديكور والمقاولات عبر 5 خطوات واضحة ومنظمة:',
    bulletPoints: COMPANY_INFO.workSteps.map((s) => `${s.step}. ${s.title}: ${s.desc}`),
    actions: [
      { type: 'whatsapp', label: 'ابدأ الخطوة الأولى عبر واتساب', url: buildWhatsAppUrl() },
      { type: 'navigate_contact', label: 'أرسل تفاصيل طلبك', targetSection: 'contact' },
    ],
  },
  {
    id: 'kb-about-why',
    topic: 'company_overview',
    title: 'عن شركة فنون للديكور والمقاولات',
    priority: 9,
    exactPhrases: ['من انتم', 'عن شركة فنون', 'لماذا اختار فنون', 'ما يميز فنون للديكور'],
    primaryKeywords: ['من نحن', 'نبذه', 'فنون', 'يميزكم', 'مميزات', 'رؤيتكم'],
    secondaryKeywords: ['شركه', 'ديكور', 'مقاولات'],
    answer:
      'فنون للديكور والمقاولات (FUNUN DECOR) شركة متخصصة في أعمال التصميم والديكور الداخلي وتنفيذ الحلول الجمالية للمساحات السكنية والتجارية في جيزان – مدينة البناء.\n\nنؤمن بأن جمال المكان يبدأ من فكرة مدروسة، وأن التفاصيل الصغيرة هي ما يصنع الفرق الكبير، ونحرص على تقديم تصاميم تجمع بين الأناقة والعملية وجودة التنفيذ.',
    bulletPoints: COMPANY_INFO.about.features.map((f) => `${f.title}: ${f.desc}`),
    actions: [
      { type: 'navigate_portfolio', label: 'استكشف أعمالنا', targetSection: 'portfolio' },
      { type: 'whatsapp', label: 'تواصل معنا', url: buildWhatsAppUrl() },
    ],
  },
];
