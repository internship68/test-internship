import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskItem } from '../components/TaskItem';
import type { Task } from '../types/task';


jest.mock('../hooks/useTasks', () => ({
  useUpdateTask: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
  }),
  useDeleteTask: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

const mockTask: Task = {
  id: '1',
  title: 'Test task',
  completed: false,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('TaskItem', () => {
  it('renders task title', () => {
    render(<TaskItem task={mockTask} />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('shows completed state correctly', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} />, { wrapper: createWrapper() });
    
    const taskText = screen.getByText('Test task');
    expect(taskText).toHaveClass('line-through');
  });

  it('enters edit mode when edit button is clicked', () => {
    render(<TaskItem task={mockTask} />, { wrapper: createWrapper() });
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test task')).toBeInTheDocument();
  });

  it('shows delete confirmation dialog', () => {
    
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    
    render(<TaskItem task={mockTask} />, { wrapper: createWrapper() });
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this task?');
    
    confirmSpy.mockRestore();
  });
});