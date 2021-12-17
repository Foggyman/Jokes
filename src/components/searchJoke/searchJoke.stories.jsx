/** @jsx h */
import { h } from 'preact';
import {SearchJokeComponent as Search } from './index';

export default {
  title: 'Search',
  component: Search,
};
const Template = function(args) {
  return <Search {...args} />
}

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Search placeholder',
};
