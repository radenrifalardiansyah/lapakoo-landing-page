-- =============================================
-- LapaKoo Supabase Schema
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- ENUM TYPES
-- =============================================

create type plan_id as enum ('starter', 'pro', 'business', 'enterprise');
create type billing_cycle as enum ('monthly', 'yearly');
create type payment_method as enum ('transfer', 'credit_card', 'qris');
create type order_status as enum (
  'pending_payment',
  'payment_confirmed',
  'active',
  'trial',
  'expired',
  'cancelled',
  'refunded'
);

-- =============================================
-- ORDERS TABLE
-- =============================================

create table orders (
  id            uuid primary key default uuid_generate_v4(),
  order_id      text unique not null,           -- e.g. LPK-MPAQ889E-FPC3

  -- Plan info
  plan_id       plan_id not null,
  billing_cycle billing_cycle not null,
  base_price    integer,                         -- in IDR, null for enterprise
  total_amount  integer,                         -- base_price * 1.11 (incl. PPN)

  -- Customer info
  first_name    text not null,
  last_name     text not null,
  email         text not null,
  phone         text not null,
  business_name text not null,
  business_type text not null,

  -- Payment
  payment_method payment_method not null,

  -- Status & lifecycle
  status        order_status not null default 'pending_payment',
  trial_end_date timestamptz,
  activated_at  timestamptz,
  cancelled_at  timestamptz,
  expires_at    timestamptz,

  -- Meta
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  notes         text
);

-- Index for fast lookups
create index idx_orders_email      on orders (email);
create index idx_orders_status     on orders (status);
create index idx_orders_plan_id    on orders (plan_id);
create index idx_orders_created_at on orders (created_at desc);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- =============================================
-- PLANS TABLE (reference / pricing catalog)
-- =============================================

create table plans (
  id              plan_id primary key,
  name            text not null,
  description     text,
  monthly_price   integer,                       -- null = custom/enterprise
  yearly_price    integer,
  is_popular      boolean default false,
  max_stores      integer,                       -- null = unlimited
  max_products    integer,
  max_orders      integer,                       -- null = unlimited
  max_users       integer,
  features        jsonb default '[]',
  is_active       boolean default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger plans_updated_at
  before update on plans
  for each row execute function set_updated_at();

-- Seed default plans
insert into plans (id, name, description, monthly_price, yearly_price, is_popular, max_stores, max_products, max_orders, max_users, features) values
(
  'starter',
  'Starter',
  'Sempurna untuk penjual baru yang ingin memulai',
  99000, 79000, false, 2, 500, 200, 1,
  '["2 Toko marketplace","500 produk","200 pesanan/bulan","Laporan dasar","Support via email","Sinkronisasi stok"]'
),
(
  'pro',
  'Pro',
  'Untuk penjual serius yang ingin naik level',
  299000, 239000, true, 10, 5000, null, 3,
  '["10 Toko marketplace","5.000 produk","Pesanan tak terbatas","Analitik mendalam + AI","Otomasi pesanan","Multi-ekspedisi","Support prioritas 24/7","Export laporan"]'
),
(
  'business',
  'Business',
  'Untuk bisnis dengan volume tinggi & tim besar',
  699000, 559000, false, null, null, null, 10,
  '["Unlimited toko","Unlimited produk","Unlimited pesanan","AI + analitik enterprise","Manajemen tim (10 user)","API access","Dedicated account manager","Onboarding khusus","SLA 99.9%"]'
),
(
  'enterprise',
  'Enterprise',
  'Solusi custom untuk perusahaan besar',
  null, null, false, null, null, null, null,
  '["Semua fitur Business","Infrastructure khusus","Integrasi custom","White-label tersedia","Unlimited pengguna","Dukungan on-site","Kontrak fleksibel"]'
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

alter table orders enable row level security;
alter table plans  enable row level security;

-- Plans are publicly readable
create policy "plans_public_read"
  on plans for select
  using (is_active = true);

-- Orders: only service role (API) can insert/read
-- Public cannot read orders directly
create policy "orders_service_insert"
  on orders for insert
  with check (true);

-- Allow reading own order by email (for future user auth)
create policy "orders_read_by_email"
  on orders for select
  using (true);   -- tighten this when you add auth

-- =============================================
-- ANALYTICS VIEW
-- =============================================

create view order_stats as
select
  plan_id,
  billing_cycle,
  status,
  count(*)                                    as total_orders,
  sum(total_amount)                           as total_revenue,
  avg(total_amount)                           as avg_order_value,
  date_trunc('day', created_at)               as date
from orders
group by plan_id, billing_cycle, status, date_trunc('day', created_at)
order by date desc;

-- =============================================
-- HELPER FUNCTION: generate order_id
-- =============================================

create or replace function generate_order_id()
returns text language plpgsql as $$
declare
  ts   text;
  rand text;
begin
  ts   := upper(to_hex(extract(epoch from now())::bigint));
  rand := upper(substring(md5(random()::text), 1, 4));
  return 'LPK-' || ts || '-' || rand;
end;
$$;
