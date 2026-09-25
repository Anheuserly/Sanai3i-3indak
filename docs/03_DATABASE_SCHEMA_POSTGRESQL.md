# مخطط قاعدة البيانات الشامل — منصة ويب صنايعي عندك
# SANAI3I 3INDAK — Database Schema & DDL Blueprint

---

## الجداول الـ 11 الأساسية للنظام

```sql
-- 1. المستخدمون (users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(25) NOT NULL UNIQUE,
    photo_url TEXT,
    role VARCHAR(30) NOT NULL DEFAULT 'customer' 
        CHECK (role IN ('customer', 'worker', 'admin', 'owner_admin')),
    account_status VARCHAR(30) NOT NULL DEFAULT 'active' 
        CHECK (account_status IN ('active', 'suspended', 'banned')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ملفات الصنائعية (worker_profiles)
CREATE TABLE worker_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    profession VARCHAR(100) NOT NULL,
    experience_years INT NOT NULL DEFAULT 1,
    location VARCHAR(150) NOT NULL DEFAULT 'نابلس',
    service_area TEXT NOT NULL DEFAULT 'كافة مناطق نابلس',
    description TEXT,
    availability_status VARCHAR(30) NOT NULL DEFAULT 'available'
        CHECK (availability_status IN ('available', 'busy', 'offline')),
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    rating_average DECIMAL(3, 2) NOT NULL DEFAULT 5.00,
    rating_count INT NOT NULL DEFAULT 0,
    completed_jobs_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. طلبات الانضمام كصنايعي (worker_applications)
CREATE TABLE worker_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    profession VARCHAR(100) NOT NULL,
    experience_years INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    service_area TEXT NOT NULL,
    description TEXT NOT NULL,
    work_photos TEXT[] DEFAULT '{}',
    status VARCHAR(30) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. تصنيفات الخدمات الـ 19 (service_categories)
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. طلبات الصيانة (service_requests)
CREATE TABLE service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
    profession_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location_area VARCHAR(150) NOT NULL,
    address_details TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    photos TEXT[] DEFAULT '{}',
    status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'accepted', 'worker_on_way', 'in_progress', 'completed', 'cancelled', 'disputed')),
    assigned_worker_id UUID REFERENCES users(id) ON DELETE SET NULL,
    direct_payment_responsibility_confirmed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. التقييمات (ratings)
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL UNIQUE REFERENCES service_requests(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    worker_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. البلاغات ومكافحة الطلبات الوهمية (reports)
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    reported_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    request_id UUID REFERENCES service_requests(id) ON DELETE SET NULL,
    report_type VARCHAR(50) NOT NULL 
        CHECK (report_type IN ('fake_request', 'unpaid_service', 'customer_unreachable', 'worker_no_show', 'misconduct')),
    reason TEXT NOT NULL,
    evidence TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. تحذيرات الزبائن (customer_warnings)
CREATE TABLE customer_warnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    request_id UUID REFERENCES service_requests(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    evidence TEXT,
    penalty_type VARCHAR(30) NOT NULL DEFAULT 'warning'
        CHECK (penalty_type IN ('warning', 'temporary_restriction', 'suspension', 'ban')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. سجلات حماية الصنائعية (worker_protection_records)
CREATE TABLE worker_protection_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    request_id UUID REFERENCES service_requests(id) ON DELETE SET NULL,
    protection_status VARCHAR(50) NOT NULL DEFAULT 'protected',
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. سجل الرقابة الإداري (admin_audit_logs)
CREATE TABLE admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    admin_name VARCHAR(150) NOT NULL,
    action VARCHAR(100) NOT NULL, 
    target_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    target_request_id UUID REFERENCES service_requests(id) ON DELETE SET NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. الإشعارات (notifications)
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    reference_id UUID,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. جلسات الدخول والأجهزة والمتابعة (user_sessions)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(150) NOT NULL,
    user_email VARCHAR(255),
    user_name VARCHAR(150),
    role VARCHAR(30) NOT NULL CHECK (role IN ('customer', 'worker', 'admin', 'owner_admin')),
    device_id VARCHAR(100) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    device_model VARCHAR(100),
    app_version VARCHAR(30) NOT NULL DEFAULT '1.0.0',
    ip_address VARCHAR(45),
    session_token TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    logout_at TIMESTAMPTZ
);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_device_id ON user_sessions(device_id);
CREATE INDEX idx_user_sessions_is_active ON user_sessions(is_active);
```
