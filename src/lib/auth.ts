import { z } from 'zod';
import { supabase } from './supabase';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export async function signIn(email: string, password: string) {
  // First try Supabase authentication
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authData?.user) {
    return {
      id: authData.user.id,
      email: authData.user.email!,
      role: 'ADMIN'
    };
  }

  // Fallback to environment variables if Supabase auth fails
  if (
    email === import.meta.env.VITE_ADMIN_EMAIL &&
    password === import.meta.env.VITE_ADMIN_PASSWORD
  ) {
    return {
      id: '1',
      email,
      role: 'ADMIN'
    };
  }

  throw new Error('Invalid credentials');
}

export async function signOut() {
  await supabase.auth.signOut();
}