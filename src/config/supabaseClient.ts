import { createClient } from '@supabase/supabase-js';
import fetchRetry from 'fetch-retry';

const fetchWithRetry = fetchRetry(fetch, {
  retries: 3, // Number of retry attempts
  retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
});

const supabaseUrl: string = 'https://omerwyjzojbjcdtttehi.supabase.co';
const supabaseAnonKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjcyNzAsImV4cCI6MTk4ODgwMzI3MH0.2VfUzB0S6IK-5jIgbqClhgrVBVcCY84q8Cd39FcbYZA';

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: fetchWithRetry,
  },
});

export default supabaseClient;
