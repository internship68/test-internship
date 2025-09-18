import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskForm } from '../components/TaskForm';

jest.mock('../hooks/useTasks', () => ({
  useCreateTask: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
    error: null,
  }),
}));

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

describe('TaskForm', () => {
  it('renders form with input and button', () => {
    render(<TaskForm />, { wrapper: createWrapper() });
    
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<TaskForm />, { wrapper: createWrapper() });
    
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'New task' } });
    
    expect(input).toHaveValue('New task');
  });

  it('clears input after successful submission', async () => {
    render(<TaskForm />, { wrapper: createWrapper() });
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});