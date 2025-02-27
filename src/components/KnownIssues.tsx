import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FaEdit, FaTrash, FaSave, FaTimes, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import './KnownIssues.css';

interface Issue {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  created_at?: string;
}

interface EditingIssue extends Issue {
  isEditing?: boolean;
}

type SortField = 'id' | 'description' | 'created_at' | 'status' | 'severity';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

function KnownIssues() {
  const [issues, setIssues] = useState<EditingIssue[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'id', direction: 'asc' });

  const handleSort = (field: SortField) => {
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSeverityWeight = (severity: string): number => {
    const weights: { [key: string]: number } = {
      'low': 1,
      'medium': 2,
      'high': 3,
      'critical': 4
    };
    return weights[severity.toLowerCase()] || 0;
  };

  const getSortedIssues = () => {
    const sortedIssues = [...issues];
    sortedIssues.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (sortConfig.field === 'id') {
        return sortConfig.direction === 'asc' 
          ? (a.id || 0) - (b.id || 0)
          : (b.id || 0) - (a.id || 0);
      }

      if (sortConfig.field === 'created_at') {
        const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      if (sortConfig.field === 'severity') {
        const aWeight = getSeverityWeight(aValue as string);
        const bWeight = getSeverityWeight(bValue as string);
        return sortConfig.direction === 'asc'
          ? aWeight - bWeight
          : bWeight - aWeight;
      }

      if (!aValue) return sortConfig.direction === 'asc' ? 1 : -1;
      if (!bValue) return sortConfig.direction === 'asc' ? -1 : 1;

      return sortConfig.direction === 'asc'
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });
    return sortedIssues;
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="sort-icon active" /> : 
      <FaSortDown className="sort-icon active" />;
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data, error } = await supabase
          .from('known_issues')
          .select('*');

        if (error) {
          console.error("Supabase fetch error:", error);
        } else {
          setIssues(data || []);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  const handleEdit = (issueId: number) => {
    setIssues(issues.map(issue => ({
      ...issue,
      isEditing: issue.id === issueId
    })));
  };

  const handleSave = async (issue: EditingIssue) => {
    try {
      const { error } = await supabase
        .from('known_issues')
        .update({
          description: issue.description,
          status: issue.status,
          severity: issue.severity
        })
        .eq('id', issue.id);

      if (error) throw error;

      setIssues(issues.map(i => {
        if (i.id === issue.id) {
          return { ...issue, isEditing: false };
        }
        return i;
      }));
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  const handleDelete = async (issueId: number) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;

    try {
      const { error } = await supabase
        .from('known_issues')
        .delete()
        .eq('id', issueId);

      if (error) throw error;

      setIssues(issues.filter(issue => issue.id !== issueId));
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  const handleCancel = (issueId: number) => {
    setIssues(issues.map(issue => ({
      ...issue,
      isEditing: issue.id === issueId ? false : issue.isEditing
    })));
  };

  const handleChange = (issueId: number, field: keyof Issue, value: string) => {
    setIssues(issues.map(issue => {
      if (issue.id === issueId) {
        return { ...issue, [field]: value };
      }
      return issue;
    }));
  };

  return (
    <div className="known-issues-page">
      <h2>Known Issues</h2>
      <table
        className="known-issues-table"
        role="table"
        aria-label="Known Issues List"
      >
        <thead>
          <tr>
            <th 
              scope="col" 
              onClick={() => handleSort('description')}
              className="sortable"
            >
              BUG {getSortIcon('description')}
            </th>
            <th 
              scope="col"
              onClick={() => handleSort('created_at')}
              className="sortable"
            >
              CREATED {getSortIcon('created_at')}
            </th>
            <th 
              scope="col"
              onClick={() => handleSort('status')}
              className="sortable"
            >
              STATUS {getSortIcon('status')}
            </th>
            <th 
              scope="col"
              onClick={() => handleSort('severity')}
              className="sortable"
            >
              SEVERITY {getSortIcon('severity')}
            </th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {getSortedIssues().map((issue) => (
            <tr key={`issue-${issue.id}`}>
              <td style={{ textAlign: 'left' }}>
                <span className="issue-id">DC-{issue.id}</span>{' '}
                {issue.isEditing ? (
                  <input
                    type="text"
                    value={issue.description}
                    onChange={(e) => handleChange(issue.id, 'description', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="issue-description">{issue.description}</span>
                )}
              </td>
              <td>{issue.created_at ? new Date(issue.created_at).toLocaleDateString() : 'N/A'}</td>
              <td>
                {issue.isEditing ? (
                  <select
                    value={issue.status}
                    onChange={(e) => handleChange(issue.id, 'status', e.target.value)}
                    className="edit-select"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                ) : (
                  issue.status
                )}
              </td>
              <td>
                {issue.isEditing ? (
                  <select
                    value={issue.severity}
                    onChange={(e) => handleChange(issue.id, 'severity', e.target.value)}
                    className="edit-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                ) : (
                  issue.severity
                )}
              </td>
              <td>
                {issue.isEditing ? (
                  <div className="action-buttons">
                    <button
                      onClick={() => handleSave(issue)}
                      className="icon-button save"
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => handleCancel(issue.id)}
                      className="icon-button cancel"
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(issue.id)}
                      className="icon-button edit"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="icon-button delete"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KnownIssues;