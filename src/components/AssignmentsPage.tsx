import React, { useState } from 'react';
import { Assignment } from '../types';
import { mockAssignments } from '../data/mockData';

export const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');
  
  // New assignment form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('CS 302');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDueTime, setNewDueTime] = useState('11:59 PM');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  const handleToggleStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDueDate) return;

    const newAssgn: Assignment = {
      id: `a-${Date.now()}`,
      title: newTitle.trim(),
      courseCode: newCourseCode,
      dueDate: newDueDate,
      dueTime: newDueTime,
      status: 'Pending',
      priority: newPriority
    };

    setAssignments([newAssgn, ...assignments]);
    setNewTitle('');
    setNewDueDate('');
    setShowAddModal(false);
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Header */}
      <div className="glass-card p-4 rounded-4 border mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold mb-2 d-inline-block">
            Student Task Management
          </span>
          <h1 className="h3 fw-extrabold text-body mb-1">Assignment Tracker</h1>
          <p className="text-secondary small mb-0">Track deadlines, course tasks, homework, and submission status.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary rounded-pill px-4 py-2 bg-gradient-accent border-0 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
        >
          <i className="bi bi-plus-lg fs-5"></i>
          <span>Add New Assignment</span>
        </button>
      </div>

      {/* Filter Tabs & Quick Stats */}
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
        <div className="btn-group btn-group-sm rounded-pill p-1 bg-body-tertiary border border-subtle">
          {(['All', 'Pending', 'In Progress', 'Completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`btn rounded-pill px-3 py-1.5 fw-semibold ${
                filter === status ? 'btn-primary bg-gradient-accent text-white shadow-sm' : 'btn-light text-secondary border-0'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="text-muted small">
          Showing <strong className="text-body">{filteredAssignments.length}</strong> tasks
        </div>
      </div>

      {/* Assignment List */}
      <div className="d-flex flex-column gap-3">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className={`glass-card p-3.5 rounded-4 border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 ${
                assignment.status === 'Completed' ? 'opacity-75' : ''
              }`}
            >
              <div className="d-flex align-items-start gap-3">
                <input
                  type="checkbox"
                  className="form-check-input mt-1 cursor-pointer"
                  style={{ width: '22px', height: '22px' }}
                  checked={assignment.status === 'Completed'}
                  onChange={() => handleToggleStatus(assignment.id)}
                  title="Mark as completed"
                />

                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-secondary-subtle text-body border rounded-pill px-2.5 py-0.5 font-monospace xsmall fw-bold">
                      {assignment.courseCode}
                    </span>

                    <span
                      className={`badge rounded-pill px-2.5 py-0.5 xsmall fw-semibold ${
                        assignment.priority === 'High'
                          ? 'bg-danger-subtle text-danger border border-danger-subtle'
                          : assignment.priority === 'Medium'
                          ? 'bg-warning-subtle text-warning border border-warning-subtle'
                          : 'bg-info-subtle text-info border border-info-subtle'
                      }`}
                    >
                      {assignment.priority} Priority
                    </span>
                  </div>

                  <h3 className={`h6 fw-bold text-body mb-1 ${assignment.status === 'Completed' ? 'text-decoration-line-through text-muted' : ''}`}>
                    {assignment.title}
                  </h3>

                  <div className="text-secondary xsmall d-flex align-items-center gap-2">
                    <i className="bi bi-calendar-event text-primary"></i>
                    <span>Due: {assignment.dueDate} at {assignment.dueTime}</span>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 justify-content-between justify-content-md-end border-top border-top-md-0 pt-2 pt-md-0 border-subtle">
                <span
                  className={`badge rounded-pill px-3 py-1.5 fw-semibold ${
                    assignment.status === 'Completed'
                      ? 'bg-success-subtle text-success border border-success-subtle'
                      : assignment.status === 'In Progress'
                      ? 'bg-primary-subtle text-primary border border-primary-subtle'
                      : 'bg-warning-subtle text-warning border border-warning-subtle'
                  }`}
                >
                  {assignment.status}
                </span>

                <button
                  onClick={() => handleDeleteAssignment(assignment.id)}
                  className="btn btn-outline-danger btn-sm rounded-circle p-1.5 border-0"
                  title="Delete Assignment"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-5 rounded-4 text-center text-muted">
            <i className="bi bi-journal-check display-4 text-secondary mb-2 d-block"></i>
            <p className="mb-0 fw-semibold">No assignments found for status "{filter}".</p>
          </div>
        )}
      </div>

      {/* Modal for Adding Assignment */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-modal border-0 p-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-body">Add New Assignment</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>

              <form onSubmit={handleAddAssignment}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Assignment Title</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g. Lab Report 2"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Course Code</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="e.g. CS 302"
                        value={newCourseCode}
                        onChange={(e) => setNewCourseCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Priority</label>
                      <select
                        className="form-select rounded-3"
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value as any)}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Due Date</label>
                      <input
                        type="date"
                        className="form-control rounded-3"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Due Time</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="11:59 PM"
                        value={newDueTime}
                        onChange={(e) => setNewDueTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill bg-gradient-accent border-0 px-4 fw-semibold">
                    Save Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
