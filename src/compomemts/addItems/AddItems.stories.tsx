import type { Meta, StoryObj } from '@storybook/react';
import {AddItems} from './AddItems';
import {action} from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItems> = {
  title: 'TodoList/AddItems',
  component: AddItems,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    callBack: {
      description: 'Button click inside form',
      action: 'clicked'
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItems>;

export const AddItemsStory: Story = {
  args: {
    callBack: action('Button click inside form')
  },
};

export const AddItemsSecondStory: Story = {
  render: () => <AddItems callBack={action('Button click inside form')}/>
};

