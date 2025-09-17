import React from "react";
import { TaskItem } from "./TaskItem";
import { useTasks } from "../hooks/useTasks";

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, isError } = useTasks();

  if (isLoading) {
    return (
      <p className="text-gray-500 text-center animate-pulse py-4 text-lg">
        Loading tasks...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center py-4 text-lg font-medium">
        Failed to load tasks.
      </p>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-gray-400 text-center py-4 italic">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
        />
      ))}
    </div>
  );
};

export default TaskList;
