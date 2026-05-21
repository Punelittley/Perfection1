
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);


CREATE TABLE IF NOT EXISTS public.masters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    photo TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.master_categories (
    master_id UUID REFERENCES public.masters(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    PRIMARY KEY (master_id, category)
);


ALTER TABLE public.masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_categories ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Allow public read access on masters" ON public.masters;
CREATE POLICY "Allow public read access on masters" ON public.masters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin manage masters" ON public.masters;
CREATE POLICY "Allow admin manage masters" ON public.masters FOR ALL USING (auth.role() = 'authenticated');


DROP POLICY IF EXISTS "Allow public read access on master_categories" ON public.master_categories;
CREATE POLICY "Allow public read access on master_categories" ON public.master_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin manage master_categories" ON public.master_categories;
CREATE POLICY "Allow admin manage master_categories" ON public.master_categories FOR ALL USING (auth.role() = 'authenticated');
