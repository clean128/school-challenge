import React from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { TaskCard } from './task-card';
import type { Column, Task } from '../types/kanban';

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const KanbanColumn = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask
}: KanbanColumnProps) => {
  return (
    <Card className="w-[350px] h-full">
      <CardHeader className="flex justify-between items-center px-4 py-3">
        <h3 className="text-small font-semibold">{column.title}</h3>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => onAddTask(column.id)}
        >
          <Icon icon="lucide:plus" className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardBody className="overflow-y-auto px-3 py-2">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </CardBody>
    </Card>
  );
};
