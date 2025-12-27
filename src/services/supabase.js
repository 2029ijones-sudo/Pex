import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://trpgxqitfkpmteyjavuy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRycGd4cWl0ZmtwbXRleWphdnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODA4NjksImV4cCI6MjA4MTc1Njg2OX0.oQLGCMI8uwvx1f6weqkqIViBi07ahlB7uN89UgTEOv8';
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Initialize Supabase and auto-signup / auto-login the user via OAuth (Google)
 */
export const initSupabase = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (!user) {
    // Sign in with Google OAuth
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href
      }
    });
    if (oauthError) console.error('OAuth sign-in error:', oauthError);
    return data.user;
  }

  return user;
};

/**
 * Get the current logged-in user
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};
