export interface Message {
  id?: number;
  role: 'entrepreneur' | 'developer';
  content: string;
  hours_worked?: string;
  accomplishments?: string;
  problems?: string;
  developer_questions?: string;
  created_at?: string;
  updated_at?: string;
}
