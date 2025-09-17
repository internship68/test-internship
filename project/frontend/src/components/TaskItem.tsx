import React, { useState } from 'react';
import { Check, X, Edit2, Trash2, Loader2 } from 'lucide-react';
import type { Task } from '@/lib/api';
import { useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { ConfirmModal } from '@/components/ConfirmModal';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showConfirm, setShowConfirm] = useState(false);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleToggleComplete = async () => {
    try {
      await updateTask.mutateAsync({
        id: task._id,
        updates: { completed: !task.completed },
      });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;
    try {
      await updateTask.mutateAsync({
        id: task._id,
        updates: { title: editTitle.trim() },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTask.mutateAsync(task._id);
      setShowConfirm(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const isLoading = updateTask.isPending || deleteTask.isPending;

  return (
    <>
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01]">
        {/* Complete checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={isLoading}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${task.completed
              ? 'bg-green-500 border-green-500 text-white hover:scale-110'
              : 'border-gray-300 hover:border-green-400 hover:scale-110'}
            disabled:opacity-50`}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        {/* Task title */}
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none shadow-sm transition-all duration-200"
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              autoFocus
            />
          ) : (
            <span
              className={`text-gray-900 text-lg font-medium transition-colors duration-200
                ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
            >
              {task.title}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}

          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={isLoading || !editTitle.trim()}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                disabled={isLoading}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Task?"
        message="This action cannot be undone. Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};
