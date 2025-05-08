import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { KanbanColumn } from "./components/kanban-column";
import type { Board, Task } from "./types/kanban";

const initialBoard: Board = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          title: "Create ERD Diagram",
          description: "Design database schema for the project",
          status: "todo",
          priority: "high",
          assignee: "John",
          dueDate: "2024-02-20",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "review",
      title: "Review",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ],
};

export default function App() {
  const [board, setBoard] = React.useState<Board>(initialBoard);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Partial<Task> | null>(
    null
  );
  const [selectedColumn, setSelectedColumn] = React.useState<string | null>(
    null
  );

  const handleAddTask = (columnId: string) => {
    setSelectedColumn(columnId);
    setSelectedTask({
      status: columnId as Task["status"],
      priority: "medium",
    });
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setBoard((prev) => ({
      columns: prev.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      })),
    }));
  };

  const handleSaveTask = () => {
    if (!selectedTask?.title) return;

    const newTask: Task = {
      id: selectedTask.id || Math.random().toString(36).substr(2, 9),
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status || "todo",
      priority: selectedTask.priority || "medium",
      assignee: selectedTask.assignee,
      dueDate: selectedTask.dueDate,
    };

    setBoard((prev) => ({
      columns: prev.columns.map((column) => {
        if (selectedTask.id) {
          // Edit existing task
          if (column.tasks.some((task) => task.id === selectedTask.id)) {
            return {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === selectedTask.id ? newTask : task
              ),
            };
          }
        } else if (column.id === selectedColumn) {
          // Add new task
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      }),
    }));

    setIsModalOpen(false);
    setSelectedTask(null);
    setSelectedColumn(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">School Project Kanban Board</h1>
      </header>

      <main className="flex gap-4 overflow-x-auto pb-6">
        {board.columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </main>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={() => {
          setSelectedTask(null);
          setSelectedColumn(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {selectedTask?.id ? "Edit Task" : "Add New Task"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input
                    label="Title"
                    placeholder="Enter task title"
                    value={selectedTask?.title || ""}
                    onValueChange={(value) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, title: value } : null
                      )
                    }
                  />

                  <Textarea
                    label="Description"
                    placeholder="Enter task description"
                    value={selectedTask?.description || ""}
                    onValueChange={(value) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, description: value } : null
                      )
                    }
                  />

                  <Select
                    label="Priority"
                    selectedKeys={
                      selectedTask?.priority ? [selectedTask.priority] : []
                    }
                    onChange={(e) =>
                      setSelectedTask((prev) =>
                        prev
                          ? {
                              ...prev,
                              priority: e.target.value as Task["priority"],
                            }
                          : null
                      )
                    }
                  >
                    <SelectItem key="low">Low</SelectItem>
                    <SelectItem key="medium">Medium</SelectItem>
                    <SelectItem key="high">High</SelectItem>
                  </Select>

                  <Input
                    label="Assignee"
                    placeholder="Enter assignee name"
                    value={selectedTask?.assignee || ""}
                    onValueChange={(value) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, assignee: value } : null
                      )
                    }
                  />

                  <Input
                    type="date"
                    label="Due Date"
                    value={selectedTask?.dueDate || ""}
                    onChange={(e) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, dueDate: e.target.value } : null
                      )
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSaveTask}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
