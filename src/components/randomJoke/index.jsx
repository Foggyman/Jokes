/** @jsx h */
import { h } from 'preact';
import { connect } from "redux-zero/preact";
import { useEffect, useState } from 'preact/hooks';
import style from './style.scss';
import actions from '../../redux/randomJokeActions';

const INTERVAL_MILLISECONDS = 6000;

const mapToProps = ({ randomJoke }) => ({ randomJoke });

const RandomJoke = function({randomJoke, getRandomJoke}) {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    getRandomJoke();
    const interval = setInterval(() => {
      setAnimation(false);
      getRandomJoke();
    }, INTERVAL_MILLISECONDS);
    return function cleanup() {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    setAnimation(true);
  }, [randomJoke])

  return (
    <p className={`${ style['random-joke'] } ${ animation && style.animated }`}>
      {randomJoke}
    </p>
  )
}

// exported to simplify unit test
export const RandomJokeComponent = RandomJoke;
export const randomJokeLoadInterval = INTERVAL_MILLISECONDS;

export default connect(
  mapToProps,
  actions
)(RandomJoke);
