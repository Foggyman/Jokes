/** @jsx h */
import { h } from 'preact';
import Header from './index';
import RandomJoke from "../randomJoke";

export default {
  title: 'Header',
  component: Header,
};

const Template = function(args) {
  return <Header {...args} />
}

export const Primary = Template.bind({});

Primary.args = {
  title: 'Page Title',
};



