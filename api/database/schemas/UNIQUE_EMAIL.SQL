-- Constraint: unique_email

-- ALTER TABLE IF EXISTS public.users DROP CONSTRAINT IF EXISTS unique_email;

ALTER TABLE IF EXISTS public.users
    ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE IF EXISTS public.audit DROP COLUMN IF EXISTS created_by;

ALTER TABLE IF EXISTS public.audit DROP COLUMN IF EXISTS updated_by;
