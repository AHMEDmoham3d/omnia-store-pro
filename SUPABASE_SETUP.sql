-- ============================================================================
-- إنشاء جداول قاعدة البيانات لـ Supabase
-- انسخ هذا الكود ونفذه في SQL Editor في Supabase Dashboard
-- ============================================================================

-- 1. إنشاء جدول orders
CREATE TABLE IF NOT EXISTS orders (
  id bigserial PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text,
  number text,
  adres text,
  count text,
  type text,
  delivery_date date
);

-- 2. إنشاء جدول visitor_analytics
CREATE TABLE IF NOT EXISTS visitor_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  country text,
  city text,
  section_viewed text,
  ip_address text,
  user_agent text,
  session_duration integer DEFAULT 0
);

-- ============================================================================
-- إعدادات الأمان (RLS)
-- ============================================================================

-- تفعيل Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;

-- سياسات جدول orders
-- تسمح لأي شخص بإضافة طلب جديد
DROP POLICY IF EXISTS "Anyone can insert orders" ON orders;
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT TO anon WITH CHECK (true);

-- تسمح لمستخدم service_role بقراءة البيانات
DROP POLICY IF EXISTS "Service role can view orders" ON orders;
CREATE POLICY "Service role can view orders" ON orders FOR SELECT USING (true);

-- سياسات جدول visitor_analytics
DROP POLICY IF EXISTS "Anyone can insert analytics" ON visitor_analytics;
CREATE POLICY "Anyone can insert analytics" ON visitor_analytics FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can view analytics" ON visitor_analytics;
CREATE POLICY "Service role can view analytics" ON visitor_analytics FOR SELECT USING (true);

-- ============================================================================
-- تم الانتهاء!
-- ============================================================================

