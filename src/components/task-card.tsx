import React from 'react';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Task } from '../types/kanban';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'danger'
} as const;

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Card 
      className="mb-3 w-full"
      isPressable
      onPress={() => onEdit(task)}
    >
      <CardBody className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-small font-semibold">{task.title}</h4>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-default-400 hover:text-danger"
            onPress={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
          >
            <Icon icon="lucide:trash-2" className="h-4 w-4" />
          </Button>
        </div>
        
        {task.description && (
          <p className="text-tiny text-default-500 mt-1">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 mt-3">
          <Chip
            size="sm"
            color={priorityColors[task.priority]}
            variant="flat"
          >
            {task.priority}
          </Chip>
          
          {task.assignee && (
            <Chip
              size="sm"
              variant="flat"
              className="capitalize"
            >
              {task.assignee}
            </Chip>
          )}
          
          {task.dueDate && (
            <Chip
              size="sm"
              variant="flat"
              startContent={<Icon icon="lucide:calendar" className="h-3 w-3" />}
            >
              {new Date(task.dueDate).toLocaleDateString()}
            </Chip>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
