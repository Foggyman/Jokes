/** @jsx h */
import { h } from 'preact';
import { mount } from 'enzyme';
import {SearchJokeComponent as SearchJoke, SearchJokeTimeDebacuneAutosearch, SearchJokeMinCharAutosearch} from './index';

describe('Search Jokes Unit', () => {
  afterEach(() => {
    jest.useRealTimers()
  });


  test('Search Jokes call the "searchJoke" action while compiled and on submit', () => {
    const searchJokeMock = jest.fn();
    jest.useFakeTimers();
    const wrapper = mount(
      <SearchJoke
        searchJoke={searchJokeMock}
      />
    );

    const form = wrapper.find('form');
    form.instance().submit();
    expect(searchJokeMock).toBeCalledTimes(1);
    const input = wrapper.find('input');
    let shortStringMock = '';
    for (let i = 0; i < SearchJokeMinCharAutosearch - 1; i++) {
      shortStringMock += 'a';
    }
    const longStringMock = `${ shortStringMock }z`;
    input.getDOMNode().value = shortStringMock;
    input.simulate('input');
    jest.advanceTimersByTime(SearchJokeTimeDebacuneAutosearch);
    expect(searchJokeMock).toBeCalledTimes(1);
    input.getDOMNode().value = longStringMock;
    input.simulate('input');
    expect(searchJokeMock).toBeCalledTimes(1);
    jest.advanceTimersByTime(SearchJokeTimeDebacuneAutosearch);
    expect(searchJokeMock).toBeCalledTimes(2);
    expect(searchJokeMock).toBeCalledWith(longStringMock);
  });
});
