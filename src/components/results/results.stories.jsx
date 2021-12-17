/** @jsx h */
import { h } from 'preact';
import {ResultsComponent as Results } from './index';

export default {
  title: 'Results',
  component: Results,
  argTypes: {
    searchResults: {
      name: 'Search results',
      type: {name: 'array', required: true},
      defaultValue: [],
      description: 'Search results',
      control: {
        type: 'array',
      },
    },
  },
};
const Template = function(args) {
  return <Results {...args} />
}

export const Primary = Template.bind({});
Primary.args = {
  searchQuery: 'query',
  searchResults: ["test test query", "test test query 2"],
};
