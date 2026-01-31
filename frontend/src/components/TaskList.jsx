import React from 'react';

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="glass-strong rounded-2xl p-12 text-center border border-purple-400/20">
        <div className="inline-block p-6 rounded-full bg-purple-500/10 mb-4 animate-pulse-slow">
          <svg
            className="w-20 h-20 text-purple-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2" style={{fontFamily: 'Orbitron, sans-serif'}}>
          NO ACTIVE MISSIONS
        </h3>
        <p className="text-purple-300">Create your first task to get started on your journey.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task._id}
          className="glass-strong rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 
                   border border-purple-400/20 hover:border-purple-400/40 hover:shadow-xl 
                   hover:shadow-purple-500/20 group"
          style={{
            animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="flex items-start gap-4">
            {/* Custom Checkbox */}
            <div className="relative pt-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task)}
                className="peer sr-only"
                id={`task-${task._id}`}
              />
              <label
                htmlFor={`task-${task._id}`}
                className="block w-6 h-6 rounded-lg border-2 border-purple-400/50 cursor-pointer
                         peer-checked:bg-gradient-to-br peer-checked:from-purple-500 peer-checked:to-pink-500
                         peer-checked:border-transparent transition-all duration-300 hover:scale-110
                         flex items-center justify-center"
              >
                {task.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </label>
            </div>
            
            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <h4
                className={`text-lg font-bold mb-1 transition-all duration-300 ${
                  task.completed
                    ? 'line-through text-purple-400/50'
                    : 'text-white group-hover:text-purple-200'
                }`}
                style={{fontFamily: 'Rajdhani, sans-serif'}}
              >
                {task.title}
              </h4>
              {task.description && (
                <p
                  className={`text-sm transition-all duration-300 ${
                    task.completed ? 'text-purple-300/30' : 'text-purple-200/70'
                  }`}
                >
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs text-purple-300/50 uppercase tracking-wider">
                  {new Date(task.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                {task.completed && (
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold uppercase tracking-wider">
                    ✓ Complete
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onEdit(task)}
                className="p-2 rounded-lg glass-strong hover:bg-blue-500/20 transition-all duration-300 
                         border border-blue-400/30 hover:border-blue-400 group/btn"
                title="Edit task"
              >
                <svg
                  className="w-5 h-5 text-blue-300 group-hover/btn:text-blue-200 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-2 rounded-lg glass-strong hover:bg-red-500/20 transition-all duration-300 
                         border border-red-400/30 hover:border-red-400 group/btn"
                title="Delete task"
              >
                <svg
                  className="w-5 h-5 text-red-300 group-hover/btn:text-red-200 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
