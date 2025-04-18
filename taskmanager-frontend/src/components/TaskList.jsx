import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = () => {
    setLoading(true); // Show spinner
    getTasks()
      .then(res => {
        setTasks(res.data);
        setLoading(false); // Hide spinner once data is fetched
      })
      .catch(err => {
        console.error("Failed to fetch tasks", err);
        setLoading(false); // Hide spinner if there's an error
      });
  };

  const handleTaskDeleted = () => {
    fetchTasks(); // Refresh task list after deletion
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <TaskForm onTaskCreated={fetchTasks} />

      <h2 className="text-xl font-bold mb-4">Task List</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin border-t-4 border-blue-500 w-8 h-8 border-solid rounded-full"></div>
        </div>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onTaskUpdated={fetchTasks} onTaskDeleted={handleTaskDeleted} />
        ))
      )}
    </div>
  );
};

export default TaskList;
