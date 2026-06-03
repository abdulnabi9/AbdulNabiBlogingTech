ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS keywords text;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS author text DEFAULT 'Abdul Nabi';
