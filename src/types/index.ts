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

export const NABLUS_AREAS: string[] = [
  'رفيديا، نابلس',
  'المخفية، نابلس',
  'البلدة القديمة، نابلس',
  'المعاجين، نابلس',
  'الجبل الشمالي، نابلس',
  'الجبل الجنوبي، نابلس',
  'شارع فيصل، نابلس',
  'شارع القدس، نابلس',
  'بيت وزن، نابلس',
  'زواتا، نابلس',
  'المساكن الشعبية، نابلس',
  'المنطقة الصناعية، نابلس',
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
