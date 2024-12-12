-- Create admin user if not exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'cnyagakan@gmail.com',
  crypt('CollinsNyatundo003!', gen_salt('bf')),
  now(),
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'cnyagakan@gmail.com'
);

-- Ensure admin user has appropriate permissions
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM auth.users WHERE email = 'cnyagakan@gmail.com'),
  jsonb_build_object('sub', (SELECT id FROM auth.users WHERE email = 'cnyagakan@gmail.com')),
  'email',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.identities 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'cnyagakan@gmail.com')
);