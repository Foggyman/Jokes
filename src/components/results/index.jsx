/** @jsx h */
import { h } from 'preact';
import { connect } from "redux-zero/preact";
import {useRef} from "preact/compat";
import {useEffect, useState} from "preact/hooks";
import style from './style.scss';
import debounce from "../../utils/debounce";

const THROTTLE_TIMER = 200;

const mapToProps = ({ searchResults, searchQuery }) => ({ searchResults, searchQuery });

const Result = function({ joke, scrollY, searchQuery, onVisibile, index }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();
  const calcAnimated = () => {
    const rect = ref.current ? ref.current.getBoundingClientRect() : null;
    if (rect && rect.y < window.innerHeight) {
      setAnimated(true);
      onVisibile(index);
    } else {
      setAnimated(false);
    }
  };

  useEffect(() => {
    setAnimated(false);
    calcAnimated();
  }, [null, joke]);

  useEffect(() => {
    calcAnimated();
  }, [scrollY]);


  // done very fast, should search all the occurrences not just the first
  const match = joke && searchQuery ? joke.toLowerCase().indexOf(searchQuery.toLowerCase()) : 0;
  let str1 = joke;
  let str2 = '';
  let str3 = '';
  if (match >= 0) {
    str1 = joke.substr(0, match);
    str2 = joke.substr(match, searchQuery.length);
    str3 = joke.substr(match + searchQuery.length, joke.length);
  }

  return (
    <p ref={ref}>
      <span
        className={animated && style.animated}
      >
        {str1}
        <mark>{str2}</mark>
        {str3}
      </span>
    </p>
  )
}

const Results = function({searchResults, searchQuery}) {
  const [scrollY, setScrollY] = useState(typeof window !== "undefined" ? window.scrollY : 0);
  const [maxVisibile, setMaxVisible] = useState(1);
  const maxVisibileRef = useRef(maxVisibile);
  maxVisibileRef.current = maxVisibile;
  const setMaxVisibileRef = useRef(setMaxVisible);
  setMaxVisibileRef.current = setMaxVisible;

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      setScrollY(window.scrollY);
    }
  }

  const throttledHandleScroll = useRef(debounce(handleScroll, THROTTLE_TIMER)).current;

  useEffect(() => {
    setMaxVisible(1);
  }, [searchQuery]);


  useEffect(() => {
    if (typeof window === "undefined") {
      return () => {};
    }
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    }
  }, []);


  const onChildShown = index => {
    setTimeout(() => {
      if (index + 1 >= maxVisibileRef.current) {
        setMaxVisibileRef.current(index + 2);
      }
    }, THROTTLE_TIMER)
  };

  return (
    <div className={style.results}>
      <p className={style.results__counter}>
        <strong>{searchResults.length}</strong>
        {' '}
        jokes found
      </p>
      <ul>
        {searchResults.slice(0, maxVisibile).map((joke, index) => (
          <li key={`${ searchQuery }@${ index }`}>
            <Result
              joke={joke}
              scrollY={scrollY}
              searchQuery={searchQuery}
              index={index}
              onVisibile={onChildShown}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const ResultsComponent = Results;


export default connect(mapToProps, null)(Results)
