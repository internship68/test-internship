import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useCreateTask } from '@/hooks/useTasks';

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const createTask = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask.mutateAsync(title.trim());
      setTitle('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            disabled={createTask.isPending}
            className="
              w-full px-5 py-3 rounded-xl 
              border border-gray-300 shadow-sm
              focus:outline-none focus:ring-4 focus:ring-blue-300
              transition-all duration-200 
              placeholder-gray-400 text-gray-800
              disabled:bg-gray-100 disabled:cursor-not-allowed
            "
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={createTask.isPending || !title.trim()}
          className="
            flex items-center gap-2 px-6 py-3 
            bg-gradient-to-r from-blue-500 to-purple-500
            text-white font-semibold rounded-xl
            hover:from-purple-500 hover:to-pink-500
            focus:ring-4 focus:ring-purple-300
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg transform transition-all duration-200
            hover:scale-105 active:scale-95
          "
        >
          {createTask.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          Add Task
        </button>
      </div>

      {/* Error message */}
      {createTask.error && (
        <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">
          Failed to create task. Please try again.
        </p>
      )}
    </form>
  );
};
