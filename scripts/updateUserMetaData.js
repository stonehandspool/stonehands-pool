import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
// TODO this needs to be the service role key and cannot get committed!!!
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzIyNzI3MCwiZXhwIjoxOTg4ODAzMjcwfQ.p5eyHeIWEwqa1UBhslu1yWQGCnLoCbHdXv2nmoSVAuo';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// To get a users info
// const { data, error } = await supabaseClient.auth.admin.getUserById('');

// Update their last name
const { data: user, error } = await supabaseClient.auth.admin.updateUserById('ff84e75f-e1a0-47f2-b37a-3424a0efd75f', {
  user_metadata: { last_name: 'Gilgen' },
});

if (error) {
  console.log(error);
}

console.log(user);
