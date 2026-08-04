import React, { useState } from 'react';
import { ScheduleItem } from '../types';
import { mockSchedule } from '../data/mockData';

export const RoutinePage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'All' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchedule = mockSchedule.filter((item) => {
    const matchesDay = selectedDay === 'All' || item.day === selectedDay;
    const matchesSearch =
      item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDay && matchesSearch;
  });

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Header Banner */}
      <div className="glass-card p-4 rounded-4 border mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold">
                Weekly Class Routine
              </span>
              <span className="text-muted small">Fall Semester 2026</span>
            </div>
            <h1 className="h3 fw-extrabold text-body mb-1">Class Schedule & Timetable</h1>
            <p className="text-secondary small mb-0">View lecture slots, lab sessions, room numbers, and faculty assignments.</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control rounded-pill px-3"
              placeholder="Search course, teacher, room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '220px' }}
            />
          </div>
        </div>
      </div>

      {/* Day Filter Pills */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        {(['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`btn rounded-pill px-3 py-1.5 fw-semibold ${
              selectedDay === day ? 'btn-primary bg-gradient-accent text-white shadow-sm' : 'btn-outline-secondary'
            }`}
          >
            {day === 'All' ? 'Full Schedule' : day}
          </button>
        ))}
      </div>

      {/* Routine Cards Grid */}
      <div className="row g-3">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((item: ScheduleItem) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div className="glass-card p-3.5 rounded-4 h-100 border d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-primary text-white rounded-pill px-2.5 py-1 fw-bold font-monospace">
                      {item.courseCode}
                    </span>
                    <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-2.5 py-1 font-monospace fw-semibold">
                      {item.day}
                    </span>
                  </div>

                  <h3 className="h6 fw-bold text-body mb-2">{item.title}</h3>

                  <div className="text-secondary xsmall mb-2 d-flex align-items-center gap-2">
                    <i className="bi bi-clock text-primary"></i>
                    <span>{item.time}</span>
                  </div>

                  <div className="text-secondary xsmall mb-2 d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt text-danger"></i>
                    <span>Room: {item.room}</span>
                  </div>

                  <div className="text-secondary xsmall mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-person-badge text-success"></i>
                    <span>{item.instructor}</span>
                  </div>
                </div>

                <div className="pt-2 border-top border-subtle d-flex align-items-center justify-content-between">
                  <span className="text-muted xsmall">Session Type</span>
                  <span
                    className={`badge rounded-pill px-3 py-1 ${
                      item.type === 'Lecture'
                        ? 'bg-primary-subtle text-primary border border-primary-subtle'
                        : item.type === 'Lab'
                        ? 'bg-warning-subtle text-warning border border-warning-subtle'
                        : 'bg-success-subtle text-success border border-success-subtle'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="glass-card p-5 rounded-4 text-center text-muted">
              <i className="bi bi-calendar-x display-4 text-secondary mb-2 d-block"></i>
              <p className="mb-0 fw-semibold">No class schedule matches your filter criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
