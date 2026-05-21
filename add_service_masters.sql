
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS allowed_masters UUID[] DEFAULT '{}';
