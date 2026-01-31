import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './components/Auth';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:5000/api';

function App() {
  // State variables
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      fetchTasks(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Get all tasks from backend
  const fetchTasks = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // When user logs in
  const handleLogin = (userData) => {
    setUser(userData);
    fetchTasks();
  };

  // When user logs out
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTasks([]);
  };

  // Create new task or update existing task
  const handleTaskSubmit = async (formData) => {
    const token = localStorage.getItem('token');
    
    try {
      if (editTask) {
        // Update existing task
        const response = await axios.put(
          `${API_URL}/tasks/${editTask._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks(tasks.map(t => t._id === editTask._id ? response.data : t));
        setEditTask(null);
      } else {
        // Create new task
        const response = await axios.post(
          `${API_URL}/tasks`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks([response.data, ...tasks]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save task');
    }
  };

  // Mark task as complete/incomplete
  const handleToggleTask = async (task) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(t => t._id === task._id ? response.data : t));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;

    const token = localStorage.getItem('token');
    
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show login page if not logged in
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full opacity-20 blur-3xl animate-float"></div>
      </div>

      {/* Main content */}
      <div className="relative min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="glass rounded-xl p-6 mb-6 shadow-lg border border-blue-400/20">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Task Manager</h1>
                <p className="text-blue-200">Welcome, {user.username}!</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-semibold text-white glass border border-red-400/30 
                         hover:bg-red-500/20 transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass rounded-xl p-4 text-center border border-blue-400/20">
              <p className="text-3xl font-bold text-white">{tasks.length}</p>
              <p className="text-blue-200 text-sm">Total</p>
            </div>
            <div className="glass rounded-xl p-4 text-center border border-green-400/20">
              <p className="text-3xl font-bold text-white">{tasks.filter(t => t.completed).length}</p>
              <p className="text-green-200 text-sm">Completed</p>
            </div>
            <div className="glass rounded-xl p-4 text-center border border-orange-400/20">
              <p className="text-3xl font-bold text-white">{tasks.filter(t => !t.completed).length}</p>
              <p className="text-orange-200 text-sm">Pending</p>
            </div>
          </div>

          {/* Task Form */}
          <TaskForm
            onSubmit={handleTaskSubmit}
            editTask={editTask}
            onCancel={() => setEditTask(null)}
          />

          {/* Task List */}
          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onEdit={setEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
