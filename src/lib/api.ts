import {
  Category,
  Worker,
  TopCustomer,
  ServiceRequest,
  WorkerApplication,
  FakeReport,
  AuditLog,
} from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4050';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'ak_live_sanai3i_7c9f82e14a5d892';
const PROJECT_SCOPE = process.env.NEXT_PUBLIC_PROJECT_SCOPE || 'sanai3i_3indak';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': API_KEY,
  'X-Project-Scope': PROJECT_SCOPE,
};

// --- HEALTH CHECK ---
export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: 'no-store' });
    return res.ok;
  } catch (err) {
    console.warn('[Sanai3i API] Health check failed:', err);
    return false;
  }
}

// --- CATEGORIES ---
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/v1/categories`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  const json = await res.json();
  return (json.data || []).map((row: any) => ({
    id: row.id,
    name: row.title || row.name,
    slug: row.slug || '',
    icon: row.icon || '🔧',
    description: row.description || '',
    activeWorkersCount: row.activeWorkersCount || 0,
  }));
}

// --- WORKERS ---
export async function fetchWorkers(): Promise<Worker[]> {
  const res = await fetch(`${API_BASE}/api/v1/workers`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch workers: ${res.status}`);
  const json = await res.json();
  const badges = ['🥇 الأول على نابلس', '🥈 الثاني', '🥉 الثالث', '⭐ الرابع', '⭐ الخامس', '⭐ سادس'];
  const defaultPhotos = [
    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  ];

  return (json.data || []).map((row: any, idx: number) => ({
    id: row.id,
    name: row.name,
    profession: row.profession,
    area: row.area,
    rating: parseFloat(row.rating) || 5.0,
    ratingCount: row.reviewsCount || 100,
    completedJobs: row.completedJobs || 150,
    photo: defaultPhotos[idx % defaultPhotos.length],
    rankBadge: badges[idx] || '⭐ فني معتمد',
    experienceYears: 10 + (idx % 5),
    description: `فني معتمد ومحترف في نابلس، تقييم عالي مع ${row.completedJobs || 150} مهمة صيانة منجزة.`,
  }));
}

// --- TOP CUSTOMERS ---
export async function fetchCustomers(): Promise<TopCustomer[]> {
  const res = await fetch(`${API_BASE}/api/v1/customers`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch customers: ${res.status}`);
  const json = await res.json();
  const badges = ['🥇 زبون ذهبي', '🥈 زبون فضي', '🥉 زبون برونزي', '⭐ زبون مميز'];
  return (json.data || []).map((row: any, idx: number) => ({
    id: row.id,
    name: row.name,
    area: row.area,
    completedOrders: row.completedOrders || 10,
    badge: badges[idx] || '⭐ زبون موثوق',
  }));
}

// --- ORDERS / REQUESTS ---
export async function fetchOrders(): Promise<ServiceRequest[]> {
  const res = await fetch(`${API_BASE}/api/v1/orders`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
  const json = await res.json();
  return (json.data || []).map((row: any) => ({
    id: row.id,
    customerName: row.customerName,
    profession: row.category,
    area: row.area,
    description: row.description,
    status: row.status,
    time: row.date || 'الآن',
    assignedWorkerName: row.workerName || undefined,
  }));
}

export async function createOrder(data: {
  category: string;
  description: string;
  area: string;
  customerName?: string;
  customerPhone?: string;
}): Promise<ServiceRequest> {
  const res = await fetch(`${API_BASE}/api/v1/orders`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create order: ${res.status}`);
  const json = await res.json();
  const row = json.data;
  return {
    id: row.id,
    customerName: row.customerName,
    profession: row.category,
    area: row.area,
    description: row.description,
    status: row.status,
    time: row.date || 'الآن',
    assignedWorkerName: row.workerName || undefined,
  };
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  workerName?: string
): Promise<ServiceRequest> {
  const res = await fetch(`${API_BASE}/api/v1/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify({ status, workerName }),
  });
  if (!res.ok) throw new Error(`Failed to update order: ${res.status}`);
  const json = await res.json();
  const row = json.data;
  return {
    id: row.id,
    customerName: row.customerName,
    profession: row.category,
    area: row.area,
    description: row.description,
    status: row.status,
    time: row.date || 'الآن',
    assignedWorkerName: row.workerName || undefined,
  };
}

// --- WORKER APPLICATIONS ---
export async function fetchApplications(): Promise<WorkerApplication[]> {
  const res = await fetch(`${API_BASE}/api/v1/applications`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch applications: ${res.status}`);
  const json = await res.json();
  return (json.data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    profession: row.profession,
    experienceYears: row.experienceYears || 0,
    area: row.area,
    description: row.description || '',
    status: row.status || 'pending',
  }));
}

export async function createApplication(data: {
  name: string;
  phone: string;
  profession: string;
  experienceYears: number;
  area: string;
  description?: string;
}): Promise<WorkerApplication> {
  const res = await fetch(`${API_BASE}/api/v1/applications`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create application: ${res.status}`);
  const json = await res.json();
  const row = json.data;
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    profession: row.profession,
    experienceYears: row.experienceYears || 0,
    area: row.area,
    description: row.description || '',
    status: row.status || 'pending',
  };
}

export async function updateApplicationStatus(id: string, status: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/v1/applications/${id}/status`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify({ status }),
  });
  return res.ok;
}

// --- FAKE REPORTS ---
export async function fetchFakeReports(): Promise<FakeReport[]> {
  const res = await fetch(`${API_BASE}/api/v1/fake-reports`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch fake reports: ${res.status}`);
  const json = await res.json();
  return (json.data || []).map((row: any) => ({
    id: row.id,
    workerName: row.workerName,
    customerName: row.customerName,
    requestId: row.requestId,
    reason: row.reason,
    status: 'pending',
  }));
}

export async function createFakeReport(data: {
  workerName: string;
  customerName: string;
  requestId: string;
  reason: string;
}): Promise<FakeReport> {
  const res = await fetch(`${API_BASE}/api/v1/fake-reports`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to submit fake report: ${res.status}`);
  const json = await res.json();
  const row = json.data;
  return {
    id: row.id,
    workerName: row.workerName,
    customerName: row.customerName,
    requestId: row.requestId,
    reason: row.reason,
    status: 'pending',
  };
}

// --- AUDIT LOGS ---
export async function fetchAuditLogs(): Promise<AuditLog[]> {
  const res = await fetch(`${API_BASE}/api/v1/audit-logs`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch audit logs: ${res.status}`);
  const json = await res.json();
  return (json.data || []).map((row: any) => ({
    id: row.id,
    adminName: row.adminName,
    action: row.action,
    target: row.target,
    timestamp: row.timestamp || 'الآن',
  }));
}

export async function createAuditLog(data: {
  adminName: string;
  action: string;
  target: string;
}): Promise<AuditLog> {
  const res = await fetch(`${API_BASE}/api/v1/audit-logs`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create audit log: ${res.status}`);
  const json = await res.json();
  const row = json.data;
  return {
    id: row.id,
    adminName: row.adminName,
    action: row.action,
    target: row.target,
    timestamp: row.timestamp || 'الآن',
  };
}

// --- AREAS ---
export async function fetchAreas(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/areas`, {
      headers: defaultHeaders,
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) return json.data;
    }
  } catch (err) {
    console.warn('[Sanai3i API] Failed to fetch areas:', err);
  }
  return [
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
}
