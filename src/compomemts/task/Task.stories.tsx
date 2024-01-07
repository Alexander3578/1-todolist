import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';
import {v1} from 'uuid';
import {useState} from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TodoList/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onChangeTaskStatusHandler: {
      description: 'Status was changed',
      action: 'clicked'
    },
    updateTaskHandler:{
      description: 'Tasks title is changing',
      action: 'clicked'
    },
    onClickRemoveTaskHandler:{
      description: 'Tasks was removed',
      action: 'clicked'
    }
  },
  args: {
    task: {id: v1(), title: 'Storybook', isDone: true},
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {

};

export const TaskIsNotDoneStory: Story = {
  args: {
    task: {id: v1(), title: 'Storybook', isDone: false},
  },
};

const InteractiveTask = () => {

  const [task, setTask] = useState({id: v1(), title: 'Storybook', isDone: false})

 const  onChangeTaskStatus = (taskId: string, checked: boolean) => {
    setTask({...task, id: taskId, isDone: checked})
  }

  const updateTask = (taskId: string, title: string) => {
    setTask({...task, id: taskId, title: title})
  }

  return <Task task={task}
               onChangeTaskStatusHandler={onChangeTaskStatus}
               updateTaskHandler={updateTask}
               onClickRemoveTaskHandler={action('remove task')}/>
}

export const TaskStory: Story = {
  render: () => <InteractiveTask/>
}

