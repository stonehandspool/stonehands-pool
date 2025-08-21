import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
// TODO this needs to be the service role key and cannot get committed!!!
const supabaseAnonKey = '';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// To get a users info
// const { data, error } = await supabaseClient.auth.admin.getUserById('');

// Update their last name
const { data: user, error } = await supabaseClient.auth.admin.updateUserById('ff84e75f-e1a0-47f2-b37a-3424a0efd75f', {
  user_metadata: { last_name: 'Gilgen' },
});

// Resend a confirmation email
// const { error } = await supabaseClient.auth.resend({
//   type: 'signup',
//   email: 'jbreen851@gmail.com',
// });

if (error) {
  console.log(error);
}

console.log(user);
