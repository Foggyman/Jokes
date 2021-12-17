/** @jsx h */
import { h } from 'preact';
import { connect } from "redux-zero/preact";
import {useRef, useState} from "preact/compat";
import style from './style.scss';
import actions from '../../redux/searchJokeActions';
import debounce from "../../utils/debounce";
import clearIcon from '../../assets/clear.svg';

const DEBOUNCE_TIMER_AUTOSEARCH = 600;
const MIN_CHAR_AUTOSEARCH = 3;

const SearchJoke = function({ searchJoke, placeholder = "Search a joke" }) {
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = (e) => {
    if (e.target.value && e.target.value.length >= MIN_CHAR_AUTOSEARCH) {
      searchJoke(e.target.value);
    }
  }
  const debauncedOnSearch = useRef(debounce(onSearchChange, DEBOUNCE_TIMER_AUTOSEARCH)).current;

  const onInputChange = e => {
    setSearchValue(e.target.value);
    debauncedOnSearch(e);
  };

  const onSearch = (e) => {
    e.preventDefault();
    searchJoke(searchValue);
  };

  return (
    <div className={style['search-joke']}>
      <form role='search' onSubmit={onSearch}>
        <input
          type='search'
          autoComplete='off'
          spellCheck='false'
          placeholder={placeholder}
          onChange={onInputChange}
          maxLength='2048'
          value={searchValue}
          aria-label='search'
          name='search'
        />
      </form>
      <button
        type='button'
        className={`${ style['search-joke__clear-button'] } ${ searchValue?.length > 0 && style.active }`}
        onClick={() => setSearchValue('')}
      >
        <img alt='clear' src={clearIcon} />
      </button>
    </div>
  );
}

// exported to simplyfy unit test
export const SearchJokeComponent = SearchJoke;
export const SearchJokeTimeDebacuneAutosearch = DEBOUNCE_TIMER_AUTOSEARCH;
export const SearchJokeMinCharAutosearch = MIN_CHAR_AUTOSEARCH;

export default connect(() => {}, actions)(SearchJoke);
