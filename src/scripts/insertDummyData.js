import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const insertDummyData = async () => {
  const issues = [
    {
      title: 'Login Authentication Error',
      description: 'Users experiencing intermittent login failures during peak hours',
      severity: 'high',
      status: 'open',
      created_at: new Date().toISOString(),
    },
    {
      title: 'Slow Page Load Times',
      description: 'Dashboard taking >5 seconds to load on slower connections',
      severity: 'medium',
      status: 'open',
      created_at: new Date().toISOString(),
    },
    {
      title: 'Mobile Layout Issues',
      description: 'UI elements overlapping on smaller screen sizes',
      severity: 'low',
      status: 'closed',
      created_at: new Date().toISOString(),
    },
    {
      title: 'Data Sync Delay',
      description: 'Real-time updates experiencing 30-second delays',
      severity: 'high',
      status: 'open',
      created_at: new Date().toISOString(),
    },
    {
      title: 'Search Function Bug',
      description: 'Search results not updating when filters are applied',
      severity: 'medium',
      status: 'open',
      created_at: new Date().toISOString(),
    }
  ];

  for (const issue of issues) {
    try {
      const { data, error } = await supabase
        .from('known_issues')
        .insert([issue]);

      if (error) {
        console.error('Error inserting issue:', error);
      } else {
        console.log('Successfully inserted issue:', issue.title);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
};

insertDummyData()
  .then(() => console.log('Finished inserting dummy data'))
  .catch(error => console.error('Error in main execution:', error));
