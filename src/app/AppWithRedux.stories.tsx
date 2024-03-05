import type { Meta, StoryObj } from "@storybook/react";
import { ProviderDecorator } from "common/components/providerDecorator/ProviderDecorator";
import AppWithRedux from "app/AppWithRedux";

const meta: Meta<typeof AppWithRedux> = {
  title: "TodoList/AppWithRedux",
  component: AppWithRedux,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [ProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
  render: () => <AppWithRedux />,
};
