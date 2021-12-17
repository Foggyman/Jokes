import chuckNorrisApi from './chuckNorris/api';
import chuckNorrisProcessor from './chuckNorris/processor';
import yoMommaApi from './yoMomma/api';
import yoMommaProcessor from './yoMomma/processor';
import { logDebug } from '../utils/logger';

const apis = {
  CHUCK_NORRIS: chuckNorrisApi,
  YO_MOMMA: yoMommaApi,
};

const processors = {
  CHUCK_NORRIS: chuckNorrisProcessor,
  YO_MOMMA: yoMommaProcessor,
};

const defaultApi = chuckNorrisApi;
const defaultProcessor = chuckNorrisProcessor;
const activeApi = apis[process.env.API] || defaultApi;
const activeProcessor = processors[process.env.API] || defaultProcessor;

// controller to abort fetches (it is not supported on IE)
let searchJokeController;


const getRandomJoke = () => {
  logDebug("API - getRandomJoke");
  return activeApi.getRandomJoke().then(res => activeProcessor.processJoke(res));
};

const searchJoke = (search) => {
  logDebug(`API - searchJoke: ${ search }`);
  searchJokeController = typeof AbortController === "undefined" ?
    { signal: null, abort: () => {} } : new AbortController();
  return activeApi.searchJoke(search, searchJokeController.signal)
    .then(res => activeProcessor.processSearchResult(res));
}

const abortLastSearchJoke = () => {
  searchJokeController.abort();
}

const api = {
  searchJokeController,
  getRandomJoke,
  searchJoke,
  abortLastSearchJoke,
};


export default api;
