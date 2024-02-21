import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "./Task";
import { v1 } from "uuid";
import { useState } from "react";
import { TaskPriorities, TaskStatuses } from "common/api/tasks-api/tasks-api";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: "TodoList/Task",
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onChangeTaskStatusHandler: {
      description: "Status was changed",
      action: "clicked",
    },
    updateTaskTitleHandler: {
      description: "Tasks title is changing",
      action: "clicked",
    },
    onClickRemoveTaskHandler: {
      description: "Tasks was removed",
      action: "clicked",
    },
  },
  args: {
    task: {
      id: v1(),
      title: "Storybook",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      description: "",
      order: 0,
      deadline: "",
      startDate: "",
      addedDate: "",
      todoListId: "TodoListOne",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
  args: {
    task: {
      id: v1(),
      title: "Storybook",
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      description: "",
      order: 0,
      deadline: "",
      startDate: "",
      addedDate: "",
      todoListId: "TodoListOne",
    },
  },
};

const InteractiveTask = () => {
  const [task, setTask] = useState({
    id: v1(),
    title: "Storybook",
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    description: "",
    order: 0,
    deadline: "",
    startDate: "",
    addedDate: "",
    todoListId: "TodoListOne",
  });

  const onChangeTaskStatus = (taskId: string, checked: boolean) => {
    setTask({ ...task, id: taskId, status: checked ? TaskStatuses.Completed : TaskStatuses.New });
  };

  const updateTask = (taskId: string, title: string) => {
    setTask({ ...task, id: taskId, title: title });
  };

  return (
    <Task
      task={task}
      onChangeTaskStatusHandler={onChangeTaskStatus}
      updateTaskTitleHandler={updateTask}
      onClickRemoveTaskHandler={action("remove task")}
    />
  );
};

export const TaskStory: Story = {
  render: () => <InteractiveTask />,
};
