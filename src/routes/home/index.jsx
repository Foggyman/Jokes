/** @jsx h */
import { h } from 'preact';
import style from './style.scss';
import RandomJoke from "../../components/randomJoke";
import SearchJoke from "../../components/searchJoke";
import Results from "../../components/results";

const Home = function() {
  return (
    <div className={style.home}>
      <div className='container-fluid'>
        <div className='row center-xs mt-4-rem mb-1-rem'>
          <div className='col-xs-10 col-sm-6 col-md-4'>
            <SearchJoke />
            <RandomJoke />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <Results />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
