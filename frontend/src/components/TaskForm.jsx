import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description || ''
      });
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: '', description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 mb-6 shadow-xl border border-purple-400/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
        <h3 className="text-2xl font-bold text-white" style={{fontFamily: 'Orbitron, sans-serif'}}>
          {editTask ? 'EDIT MISSION' : 'NEW MISSION'}
        </h3>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="block text-purple-200 text-sm font-semibold tracking-wide uppercase">
            Mission Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl glass text-white placeholder-purple-300/50 
                     border border-purple-400/30 focus:border-purple-400 focus:outline-none 
                     focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
            placeholder="Enter your task title..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-purple-200 text-sm font-semibold tracking-wide uppercase">
            Mission Details
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl glass text-white placeholder-purple-300/50 
                     border border-purple-400/30 focus:border-purple-400 focus:outline-none 
                     focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none"
            placeholder="Add description (optional)..."
            rows="3"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-xl font-bold text-white uppercase tracking-wider
                     bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                     transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            {editTask ? '✓ UPDATE' : '+ CREATE'}
          </button>
          {editTask && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-purple-200 uppercase tracking-wider
                       glass hover:bg-white/10 transition-all duration-300 border border-purple-400/30"
            >
              ✕ CANCEL
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
