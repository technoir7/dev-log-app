export interface Message {
  role: 'entrepreneur' | 'developer';
  content: string;
  hoursWorked?: string;
  accomplishments?: string;
  problems?: string;
  developerQuestions?: string;
  title?: string;
  symptom?: string;
  reason?: string;
  solution?: string;
}