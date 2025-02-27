import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: join(__dirname, '../../.env') });

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function initializeMessagesTable() {
  try {
    // Insert some initial messages
    const { error } = await supabase
      .from('messages')
      .upsert([
        {
          id: 1,
          role: 'entrepreneur',
          content: 'Welcome to the development log!',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          role: 'developer',
          content: 'Initial setup complete. Ready to start development.',
          hours_worked: '2',
          accomplishments: 'Set up project structure and database',
          problems: 'None so far',
          developer_questions: 'What features should we prioritize?',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error inserting messages:', error);
      return;
    }

    console.log('Successfully initialized messages table');
  } catch (error) {
    console.error('Error:', error);
  }
}

initializeMessagesTable();
