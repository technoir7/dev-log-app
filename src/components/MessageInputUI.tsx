import React, { useState } from 'react';
import { Message } from '../types/Message';
import { supabase } from '../lib/supabase';

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
      <style>{`
        .message-input-ui {
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          border: 1px solid #e0e0e0;
          border-radius: 0.625rem;
          background-color: #f9f9f9;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .role-selector {
          margin-bottom: 1.25rem;
        }

        .role-selector select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d0d0d0;
          border-radius: 0.25rem;
          font-size: 1rem;
        }

        .questions h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #333;
        }

        .questions {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.25rem;
          padding: 1rem;
          border: 1px solid #d0d0d0;
          border-radius: 0.5rem;
          background-color: #ffffff;
        }

        .question {
          margin-bottom: 1rem;
        }

        .question input,
        .question textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #b0b0b0;
          border-radius: 0.25rem;
          font-size: 1rem;
        }

        .question textarea {
          min-height: 8rem;
          height: auto;
          resize: vertical;
          box-sizing: border-box;
        }

        .message-area {
          margin-bottom: 1.25rem;
        }

        .message-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #b0b0b0;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          min-height: 10rem;
          height: auto;
          font-family: Arial, sans-serif;
          font-size: 1rem;
          color: #444;
          resize: vertical;
          box-sizing: border-box;
        }

        button {
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 0.25rem;
          background-color: #808080;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
          max-width: 200px;
          margin: 0 auto;
        }

        button:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          .message-input-ui {
            padding: 1rem;
            border-radius: 0.5rem;
          }

          .role-selector {
            margin-bottom: 1rem;
          }

          .questions {
            padding: 0.75rem;
            margin-bottom: 1rem;
          }

          .question {
            margin-bottom: 0.75rem;
          }

          .question input,
          .question textarea,
          .message-input {
            font-size: 0.875rem;
            padding: 0.375rem;
          }

          .message-input {
            min-height: 10rem;
          }

          button {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .message-input-ui {
            padding: 0.75rem;
          }

          .question textarea {
            min-height: 12rem;
          }

          .message-input {
            min-height: 15rem;
            height: auto;
          }

          textarea {
            height: auto !important;
            min-height: 12rem !important;
          }

          .questions {
            padding: 0.5rem;
          }

          button {
            width: 100%;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}

export default MessageInputUI;