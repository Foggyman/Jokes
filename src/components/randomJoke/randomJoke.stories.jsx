/** @jsx h */
import { h } from 'preact';
import {RandomJokeComponent as RandomJoke } from './index';

export default {
  title: 'RandomJoke',
  component: RandomJoke,
};
const Template = function(args) {
  return <RandomJoke {...args} />
}

export const Primary = Template.bind({});
Primary.args = {
  randomJoke: 'This is a joke',
};
