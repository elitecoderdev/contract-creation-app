import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvrtvkcqzpkidvsskfqr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2cnR2a2NxenBraWR2c3NrZnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNTgyNDgsImV4cCI6MjAyMTkzNDI0OH0.phAmzVtSAEkWsgPdhJnaCdT7o6RwabCKFJ4zr4qMCpQ';
export const supabase = createClient(supabaseUrl, supabaseKey);
