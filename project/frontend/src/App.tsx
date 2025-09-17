import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CheckSquare } from 'lucide-react';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            </div>
            <p className="text-gray-600">
              Fullstack Developer Coding Test (React + Node.js)
            </p>
          </header>

          <main className="max-w-2xl mx-auto">
            <TaskForm />
            <TaskList />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
