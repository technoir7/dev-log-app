import React, { useState } from 'react';
import { Message } from '../types/Message';
import { supabase } from '../lib/supabase';
import './MessageInputUI.css';

function MessageInputUI() {
  const [userRole, setUserRole] = useState<'entrepreneur' | 'developer'>('entrepreneur');
  const [inputMessage, setInputMessage] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [accomplishments, setAccomplishments] = useState('');
  const [problems, setProblems] = useState('');
  const [developerQuestions, setDeveloperQuestions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if ((userRole === 'entrepreneur' && inputMessage.trim() === '') || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const newMessage: Message = {
        role: userRole,
        content: userRole === 'entrepreneur' ? inputMessage : '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (userRole === 'developer') {
        newMessage.hours_worked = hoursWorked;
        newMessage.accomplishments = accomplishments;
        newMessage.problems = problems;
        newMessage.developer_questions = developerQuestions;
      }

      const { error } = await supabase
        .from('messages')
        .insert([newMessage]);

      if (error) {
        console.error('Error inserting message:', error);
        return;
      }

      // Clear form
      setInputMessage('');
      setHoursWorked('');
      setAccomplishments('');
      setProblems('');
      setDeveloperQuestions('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="message-input-ui">
      <div className="role-selector">
        <label htmlFor="role">Select Role:</label>
        <select
          id="role"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value as 'entrepreneur' | 'developer')}
        >
          <option value="entrepreneur">Entrepreneur</option>
          <option value="developer">Developer</option>
        </select>
      </div>

      {userRole === 'developer' && (
        <div className="questions">
          <div className="question">
            <input
              type="text"
              id="hoursWorked"
              name="hoursWorked"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              placeholder="How many hours did you work?"
            />
          </div>
          <div className="question">
            <textarea
              id="accomplishments"
              name="accomplishments"
              value={accomplishments}
              onChange={(e) => setAccomplishments(e.target.value)}
              placeholder="What did you accomplish? Not what you did, what did you accomplish?"
            />
          </div>
          <div className="question">
            <textarea
              id="problems"
              name="problems"
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
              placeholder="Did you encounter any problems?"
            />
          </div>
          <div className="question">
            <textarea
              id="developerQuestions"
              name="developerQuestions"
              value={developerQuestions}
              onChange={(e) => setDeveloperQuestions(e.target.value)}
              placeholder="Do you have any questions for me?"
            />
          </div>
        </div>
      )}

      {userRole === 'entrepreneur' && (
        <div className="message-area">
          <textarea
            className="message-input"
            placeholder="What are your concerns?"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
        </div>
      )}
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInputUI;