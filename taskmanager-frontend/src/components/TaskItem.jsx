import React, { useState } from 'react';
import { updateTask, deleteTask } from '../services/api';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);

  const handleUpdate = async () => {
    try {
      await updateTask(task.id, {
        title: updatedTitle,
        description: updatedDescription
      });
      setIsEditing(false);
      onTaskUpdated(); // Notify parent to refresh
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onTaskDeleted(); // Notify parent to refresh after deletion
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <div className="border p-3 rounded mb-2 shadow">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            rows="2"
          />
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
