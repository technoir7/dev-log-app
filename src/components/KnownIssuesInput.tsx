import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function KnownIssuesInput() {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [severity, setSeverity] = useState('medium');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('known_issues')
        .insert([
          {
            description,
            status,
            severity,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error("Error inserting issue:", error);
        return;
      }

      // Clear form and navigate to known issues page
      setDescription('');
      setStatus('open');
      setSeverity('medium');
      navigate('/known-issues');
    } catch (error) {
      console.error("Error submitting issue:", error);
    }
  };

  return (
    <div className="known-issues-input">
      <h2>Report New Issue</h2>
      <form onSubmit={handleSubmit} className="issue-form">
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe the issue..."
            className="issue-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="issue-input"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="severity">Severity:</label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="issue-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Submit Issue
        </button>
      </form>
    </div>
  );
}

export default KnownIssuesInput;
