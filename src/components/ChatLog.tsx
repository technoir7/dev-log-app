import React, { useEffect, useState } from 'react';
import { Message } from '../types/Message';
import { supabase } from '../lib/supabase';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import './ChatLog.css';

interface EditingMessage extends Message {
  isEditing?: boolean;
}

function ChatLog() {
  const [messages, setMessages] = useState<EditingMessage[]>([]);

  const messageStyle = {
    developer: {
      border: '2px solid var(--darkreader-border-333333, #000000)',
      backgroundColor: 'var(--darkreader-background-353230, #353230)'
    },
    entrepreneur: {
      border: '1px solid var(--darkreader-border-4c4c4c, #333)',
      backgroundColor: 'var(--darkreader-background-1e1e1e, #1e1e1e)'
    }
  };

  useEffect(() => {
    // Initial fetch of messages
    fetchMessages();

    // Subscribe to changes
    const subscription = supabase
      .channel('messages_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          console.log('Change received!', payload);
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (messageId: number) => {
    setMessages(messages.map(msg => ({
      ...msg,
      isEditing: msg.id === messageId
    })));
  };

  const handleSave = async (message: EditingMessage) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({
          title: message.title,
          content: message.content,
          symptom: message.symptom,
          reason: message.reason,
          solution: message.solution,
          hours_worked: message.hours_worked,
          accomplishments: message.accomplishments,
          problems: message.problems,
          developer_questions: message.developer_questions
        })
        .eq('id', message.id);

      if (error) throw error;

      setMessages(messages.map(msg => {
        if (msg.id === message.id) {
          return { ...message, isEditing: false };
        }
        return msg;
      }));
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async (messageId: number) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleCancel = (messageId: number) => {
    setMessages(messages.map(msg => ({
      ...msg,
      isEditing: msg.id === messageId ? false : msg.isEditing
    })));
  };

  const handleChange = (messageId: number, field: keyof Message, value: string | number) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, [field]: value };
      }
      return msg;
    }));
  };

  return (
    <div className="chat-log">
      <h2>Chat Log</h2>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={`message-${message.id || index}`} 
            className={`message ${message.role}`}
            style={messageStyle[message.role]}
          >
            <div className="message-content">
              {message.isEditing ? (
                <div className="edit-form">
                  {message.role !== 'developer' && (
                    <div className="form-group">
                      <label>Content</label>
                      <textarea
                        value={message.content || ''}
                        onChange={(e) => handleChange(message.id!, 'content', e.target.value)}
                        className="edit-textarea"
                      />
                    </div>
                  )}
                  {message.symptom !== undefined && (
                    <div className="form-group">
                      <label>Symptom</label>
                      <textarea
                        value={message.symptom || ''}
                        onChange={(e) => handleChange(message.id!, 'symptom', e.target.value)}
                        className="edit-textarea"
                      />
                    </div>
                  )}
                  {message.reason !== undefined && (
                    <div className="form-group">
                      <label>Reason</label>
                      <textarea
                        value={message.reason || ''}
                        onChange={(e) => handleChange(message.id!, 'reason', e.target.value)}
                        className="edit-textarea"
                      />
                    </div>
                  )}
                  {message.solution !== undefined && (
                    <div className="form-group">
                      <label>Solution</label>
                      <textarea
                        value={message.solution || ''}
                        onChange={(e) => handleChange(message.id!, 'solution', e.target.value)}
                        className="edit-textarea"
                      />
                    </div>
                  )}
                  {message.role === 'developer' && (
                    <>
                      <div className="form-group">
                        <label>Hours Worked</label>
                        <input
                          type="number"
                          value={message.hours_worked || ''}
                          onChange={(e) => handleChange(message.id!, 'hours_worked', parseFloat(e.target.value))}
                          className="edit-input"
                          step="0.5"
                        />
                      </div>
                      <div className="form-group">
                        <label>Accomplishments</label>
                        <textarea
                          value={message.accomplishments || ''}
                          onChange={(e) => handleChange(message.id!, 'accomplishments', e.target.value)}
                          className="edit-textarea"
                        />
                      </div>
                      <div className="form-group">
                        <label>Problems</label>
                        <textarea
                          value={message.problems || ''}
                          onChange={(e) => handleChange(message.id!, 'problems', e.target.value)}
                          className="edit-textarea"
                        />
                      </div>
                      <div className="form-group">
                        <label>Questions</label>
                        <textarea
                          value={message.developer_questions || ''}
                          onChange={(e) => handleChange(message.id!, 'developer_questions', e.target.value)}
                          className="edit-textarea"
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {message.title && <h3 className="message-title">{message.title}</h3>}
                  {message.role !== 'developer' && message.content && <p>{message.content}</p>}
                  {message.symptom && <p><strong>Symptom:</strong> {message.symptom}</p>}
                  {message.reason && <p><strong>Reason:</strong> {message.reason}</p>}
                  {message.solution && <p><strong>Solution:</strong> {message.solution}</p>}
                  {message.role === 'developer' && (
                    <div className="developer-details">
                      {message.hours_worked && <p><strong>Hours worked:</strong> {message.hours_worked}</p>}
                      {message.accomplishments && <p><strong>Accomplishments:</strong> {message.accomplishments}</p>}
                      {message.problems && <p><strong>Problems:</strong> {message.problems}</p>}
                      {message.developer_questions && <p><strong>Questions:</strong> {message.developer_questions}</p>}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="message-actions">
              {message.isEditing ? (
                <>
                  <button
                    onClick={() => handleSave(message)}
                    className="icon-button save"
                    title="Save"
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={() => handleCancel(message.id!)}
                    className="icon-button cancel"
                    title="Cancel"
                  >
                    <FaTimes />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(message.id!)}
                    className="icon-button edit"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id!)}
                    className="icon-button delete"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatLog;