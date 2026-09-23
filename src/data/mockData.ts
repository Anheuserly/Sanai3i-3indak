export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Worker {
  id: string;
  name: string;
  profession: string;
  area: string;
  rating: number;
  ratingCount: number;
  completedJobs: number;
  photo: string;
  rankBadge: string;
  experienceYears: number;
  description: string;
}

export interface TopCustomer {
  id: string;
  name: string;
  area: string;
  completedOrders: number;
  badge: string;
}

export interface ServiceRequest {
  id: string;
  customerName: string;
  profession: string;
  area: string;
  description: string;
  status: 'pending' | 'accepted' | 'worker_on_way' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  time: string;
  assignedWorkerName?: string;
}

export interface WorkerApplication {
  id: string;
  name: string;
  phone: string;
  profession: string;
  experienceYears: number;
  area: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FakeReport {
  id: string;
  workerName: string;
  customerName: string;
  requestId: string;
  reason: string;
  status: 'pending' | 'reviewed';
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
}

export const NABLUS_AREAS = [
  'رفيديا',
  'المخفية',
  'البلدة القديمة',
  'المعاجين',
  'الجبل الشمالي',
  'الجبل الجنوبي',
  'شارع فيصل',
  'شارع القدس',
  'بيت وزن',
  'زواتا',
  'المساكن الشعبية',
  'المنطقة الصناعية',
];

export const CATEGORIES_19: Category[] = [
  { id: '1', name: 'سبّاك', slug: 'plumber', icon: '🚰', description: 'صيانة شبكات المياه والمغاسل والتسريبات' },
  { id: '2', name: 'كهربائي', slug: 'electrician', icon: '⚡', description: 'تمديدات كهربائية وإصلاح الشورت واللوحات' },
  { id: '3', name: 'دهّان', slug: 'painter', icon: '🎨', description: 'دهانات داخلية وخارجية ومعجونة وعزل' },
  { id: '4', name: 'نجّار', slug: 'carpenter', icon: '🪚', description: 'فك وتركيب وصيانة الأثاث والمطابخ' },
  { id: '5', name: 'حدّاد', slug: 'blacksmith', icon: '🛠️', description: 'أبواب حديدية وحمايات ولحام متنقل' },
  { id: '6', name: 'بنّاء وترميم', slug: 'mason', icon: '🧱', description: 'أعمال باطون وبلاط وقصارة وترميمات' },
  { id: '7', name: 'فني تكييف وتبريد', slug: 'hvac', icon: '❄️', description: 'صيانة مكيفات وتعبئة فريون ونقل وحدات' },
  { id: '8', name: 'فني غاز وأفران', slug: 'gas-technician', icon: '🔥', description: 'شبكات الغاز وصيانة الأفران والغازات' },
  { id: '9', name: 'فني غسالات ونشافات', slug: 'washer-repair', icon: '🧺', description: 'صيانة الغسالات الأوتوماتيك والنشافات' },
  { id: '10', name: 'أقفال ومفاتيح', slug: 'locksmith', icon: '🔑', description: 'فتح الأبواب المغلقة ونسخ المفاتيح' },
  { id: '11', name: 'ألمنيوم وزجاج', slug: 'aluminum-glass', icon: '🪟', description: 'شبابيك ألمنيوم وزجاج مزدوج وشاورات' },
  { id: '12', name: 'أبواب وشبابيك', slug: 'doors-windows', icon: '🚪', description: 'صيانة وضبط الأبواب والستائر والمنجور' },
  { id: '13', name: 'مضخات وخزانات مياه', slug: 'pumps-tanks', icon: '💧', description: 'تنظيف الخزانات وتركيب مضخات الرفع' },
  { id: '14', name: 'صيانة أثاث', slug: 'furniture-repair', icon: '🛋️', description: 'تنجيد كنب وإصلاح مقاعد ومفروشات' },
  { id: '15', name: 'صيانة عامة', slug: 'general-maintenance', icon: '🔧', description: 'تصليحات منزلية متنوعة وسريعة' },
  { id: '16', name: 'ميكانيكي سيارات متنقل', slug: 'mobile-mechanic', icon: '🚗', description: 'إصلاح أعطال السيارات في موقع العطل' },
  { id: '17', name: 'كهربائي سيارات متنقل', slug: 'mobile-auto-electric', icon: '🔋', description: 'بطاريات ودينامو وحساسات متنقلة' },
  { id: '18', name: 'بنشر وإطارات متنقل', slug: 'mobile-tire', icon: '🛞', description: 'تبديل بناشر ونفخ وترقيع عجلات الموقع' },
  { id: '19', name: 'صيانة دراجات وسكوترات', slug: 'bike-scooter', icon: '🛵', description: 'صيانة دراجات وسكوترات التوصيل' },
];

export const TOP_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'الأسطى خليل النابلسي',
    profession: 'سبّاك',
    area: 'رفيديا، نابلس',
    rating: 4.98,
    ratingCount: 164,
    completedJobs: 164,
    photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200',
    rankBadge: '🥇 الأول على نابلس',
    experienceYears: 14,
    description: 'خبرة تزيد عن 14 عاماً في صيانة شبكات مياه عمارات وفلل رفيديا والمخفية.',
  },
  {
    id: 'w2',
    name: 'المعلم طارق المصري',
    profession: 'كهربائي',
    area: 'المخفية، نابلس',
    rating: 4.95,
    ratingCount: 142,
    completedJobs: 142,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rankBadge: '🥈 الثاني',
    experienceYears: 11,
    description: 'فني تمديدات منزلية وصيانة قواطع وشورت كهربائي بدقة وأمان.',
  },
  {
    id: 'w3',
    name: 'الأسطى عمر الشكعة',
    profession: 'نجّار',
    area: 'البلدة القديمة، نابلس',
    rating: 4.92,
    ratingCount: 128,
    completedJobs: 128,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    rankBadge: '🥉 الثالث',
    experienceYears: 16,
    description: 'أعمال فك وتركيب مطابخ وصيانة أبواب وغرف نوم خشبية.',
  },
  {
    id: 'w4',
    name: 'الأستاذ باسل القاسم',
    profession: 'فني تكييف وتبريد',
    area: 'المعاجين، نابلس',
    rating: 4.89,
    ratingCount: 115,
    completedJobs: 115,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    rankBadge: '⭐ الرابع',
    experienceYears: 8,
    description: 'صيانة أجهزة تكييف منزلية وتعبئة فريون وفحص دارات التبريد.',
  },
  {
    id: 'w5',
    name: 'المعلم رائد عاشور',
    profession: 'دهّان',
    area: 'شارع فيصل، نابلس',
    rating: 4.88,
    ratingCount: 104,
    completedJobs: 104,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    rankBadge: '⭐ الخامس',
    experienceYears: 10,
    description: 'أعمال دهان ناعم وديكور ومعجونة وعزل رطوبة الجدران الداخلية.',
  },
];

export const TOP_CUSTOMERS: TopCustomer[] = [
  { id: 'c1', name: 'د. إبراهيم طوقان', area: 'رفيديا، نابلس', completedOrders: 19, badge: '🥇 زبون ذهبي' },
  { id: 'c2', name: 'م. سامر عنبتاوي', area: 'المعاجين، نابلس', completedOrders: 14, badge: '🥈 زبون فضي' },
  { id: 'c3', name: 'أ. هبة خياط', area: 'المخفية، نابلس', completedOrders: 11, badge: '🥉 زبون برونزي' },
];

export const REQUEST_STATUS_LIST = [
  { key: 'pending', label: 'بانتظار صنايعي', icon: '⏳', desc: 'تم نشر الطلب ويجري إشعار الصنائعية في نابلس' },
  { key: 'accepted', label: 'تم قبول الطلب', icon: '🤝', desc: 'وافق صنايعي معتمد على الطلب وجاري التنسيق' },
  { key: 'worker_on_way', label: 'الصنايعي في الطريق', icon: '🛵', desc: 'الصنايعي تحرك متوجهاً لموقعك المحدد' },
  { key: 'in_progress', label: 'جاري العمل', icon: '🔧', desc: 'الفني وصل وبدأ في تشخيص وإصلاح المشكلة' },
  { key: 'completed', label: 'تم إنجاز الطلب', icon: '✅', desc: 'تم إتمام الخدمة بنجاح وسداد الأجرة نقداً' },
  { key: 'cancelled', label: 'ملغي', icon: '✕', desc: 'أُلغي الطلب' },
  { key: 'disputed', label: 'يوجد نزاع', icon: '⚠️', desc: 'تم تصعيد بلاغ للإدارة' },
];
