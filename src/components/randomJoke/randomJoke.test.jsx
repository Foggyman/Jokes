/** @jsx h */
import { h } from 'preact';
import { shallow } from 'enzyme';
import {RandomJokeComponent as RandomJoke, randomJokeLoadInterval} from './index';

describe('Random Joke Unit', () => {
  afterEach(() => {
    jest.useRealTimers()
  });

  test('Random joke call the "getRandomJoke" action at load, random joke is displayed from the store', () => {
    const randomJoke = 'random joke';
    const getRandomJokeMock = jest.fn();
    const wrapper = shallow(
      <RandomJoke
        randomJoke={randomJoke}
        getRandomJoke={getRandomJokeMock}
      />
    );
    expect(wrapper.find('p').text()).toMatch(randomJoke);
    expect(getRandomJokeMock).toBeCalledTimes(1);
  });
  test(`The "getRandomJokeMock" should be called every ${ randomJokeLoadInterval } ms`, async () => {
    const randomJoke = 'random joke';
    const getRandomJokeMock = jest.fn();
    jest.useFakeTimers();
    shallow(
      <RandomJoke
        randomJoke={randomJoke}
        getRandomJoke={getRandomJokeMock}
      />
    );
    expect(getRandomJokeMock).toBeCalledTimes(1);
    jest.advanceTimersByTime(randomJokeLoadInterval);
    expect(getRandomJokeMock).toBeCalledTimes(2);
    jest.advanceTimersByTime(randomJokeLoadInterval);
    expect(getRandomJokeMock).toBeCalledTimes(3);
  });
});
