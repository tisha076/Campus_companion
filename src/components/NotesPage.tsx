import React, { useState } from 'react';
import { NoteItem } from '../types';
import { mockNotes } from '../data/mockData';

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // New Note Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('CS 302');
  const [newCategory, setNewCategory] = useState<'Lecture Note' | 'Exam Prep' | 'Project' | 'General'>('Lecture Note');
  const [newContent, setNewContent] = useState('');

  const filteredNotes = notes.filter((n) => {
    const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const note: NoteItem = {
      id: `n-${Date.now()}`,
      title: newTitle.trim(),
      courseCode: newCourseCode.trim(),
      category: newCategory,
      content: newContent.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Header */}
      <div className="glass-card p-4 rounded-4 border mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold mb-2 d-inline-block">
            Digital Study Hub
          </span>
          <h1 className="h3 fw-extrabold text-body mb-1">Student Study Notes</h1>
          <p className="text-secondary small mb-0">Organize class notes, lecture summaries, and exam preparation guides.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary rounded-pill px-4 py-2 bg-gradient-accent border-0 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
        >
          <i className="bi bi-pencil-square fs-5"></i>
          <span>Create Note</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div className="btn-group btn-group-sm rounded-pill p-1 bg-body-tertiary border border-subtle">
          {(['All', 'Lecture Note', 'Exam Prep', 'Project', 'General'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`btn rounded-pill px-3 py-1.5 fw-semibold ${
                categoryFilter === cat ? 'btn-primary bg-gradient-accent text-white shadow-sm' : 'btn-light text-secondary border-0'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="form-control rounded-pill px-3"
          placeholder="Search notes content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '280px' }}
        />
      </div>

      {/* Notes Grid */}
      <div className="row g-3">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="col-12 col-md-6 col-lg-4">
              <div className="glass-card p-4 rounded-4 border h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-primary text-white font-monospace rounded-pill px-2.5 py-0.5 fw-bold">
                      {note.courseCode}
                    </span>
                    <span className="badge bg-body-tertiary text-muted border border-subtle rounded-pill px-2.5 py-0.5 xsmall">
                      {note.category}
                    </span>
                  </div>

                  <h3 className="h6 fw-bold text-body mb-2">{note.title}</h3>
                  <p className="text-secondary small mb-3 text-break" style={{ whiteSpace: 'pre-line' }}>
                    {note.content}
                  </p>
                </div>

                <div className="pt-2 border-top border-subtle d-flex align-items-center justify-content-between text-muted xsmall">
                  <span>{note.date}</span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="btn btn-link text-danger p-0 text-decoration-none xsmall"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="glass-card p-5 rounded-4 text-center text-muted">
              <i className="bi bi-file-earmark-text display-4 text-secondary mb-2 d-block"></i>
              <p className="mb-0 fw-semibold">No notes found matching your search or category.</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-modal border-0 p-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-body">Create New Note</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>

              <form onSubmit={handleAddNote}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Note Title</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g. JavaScript Closures & Promises"
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
                        placeholder="CS 302"
                        value={newCourseCode}
                        onChange={(e) => setNewCourseCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Category</label>
                      <select
                        className="form-select rounded-3"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                      >
                        <option value="Lecture Note">Lecture Note</option>
                        <option value="Exam Prep">Exam Prep</option>
                        <option value="Project">Project</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Note Content</label>
                    <textarea
                      className="form-control rounded-3"
                      rows={4}
                      placeholder="Write your study notes here..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill bg-gradient-accent border-0 px-4 fw-semibold">
                    Save Note
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
