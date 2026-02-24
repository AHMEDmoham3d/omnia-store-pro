/*
  # Create Orders and Analytics Tables

  ## Overview
  Creates tables for managing customer orders and tracking website analytics.

  ## New Tables
  
  ### `orders`
  Stores customer order information for spiritual products
  - `id` (bigserial, primary key) - Unique order identifier
  - `created_at` (timestamptz) - Order creation timestamp
  - `name` (text) - Customer name
  - `number` (text) - Customer phone number
  - `adres` (text) - Delivery address
  - `count` (text) - Quantity ordered
  - `type` (text) - Product type/name (auto-detected)
  - `delivery_date` (date) - Requested delivery date

  ### `visitor_analytics`
  Tracks visitor behavior and location data for admin dashboard
  - `id` (uuid, primary key) - Unique visit identifier
  - `created_at` (timestamptz) - Visit timestamp
  - `country` (text) - Visitor country
  - `city` (text) - Visitor city
  - `section_viewed` (text) - Section/page viewed
  - `ip_address` (text) - Visitor IP address
  - `user_agent` (text) - Browser/device information
  - `session_duration` (integer) - Time spent on site (seconds)

  ## Security
  - Enable RLS on both tables
  - Orders: Public can insert (for customer orders)
  - Orders: Only authenticated users (admin) can view/update
  - Analytics: System can insert, only admin can view
*/

-- Create orders table
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

-- Create visitor analytics table
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

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Anyone can insert orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete orders"
  ON orders
  FOR DELETE
  TO authenticated
  USING (true);

-- Analytics policies
CREATE POLICY "Anyone can insert analytics"
  ON visitor_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view analytics"
  ON visitor_analytics
  FOR SELECT
  TO authenticated
  USING (true);