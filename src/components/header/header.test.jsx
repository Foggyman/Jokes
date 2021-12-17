import { h } from 'preact';
import { shallow } from 'enzyme';
import Header from './index';

describe('Header unit', () => {
  test('Title in the header', () => {
    const context = shallow(<Header title='Jokes' />);
    expect(context.find('h1').text()).toBe('Jokes');
  });
});
