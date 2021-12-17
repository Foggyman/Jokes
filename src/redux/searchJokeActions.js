import api from '../api';
import {logDebug, logError} from "../utils/logger";

export default ({ setState }) => ({
  searchJoke: (state, value) => {
    if (state.searchQuery === value) {
      return {};
    }
    if (state.loadingSearchJoke) {
      logDebug('Aborting last search fetch');
      api.abortLastSearchJoke();
    }
    setState({loadingSearchJoke: true});
    return api.searchJoke(value)
      .then(searchResults => {
        logDebug(`Search found: ${ searchResults.length } results`);
        return {
          searchResults,
          searchQuery: value,
          loadingSearchJoke: false,
        };
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          logDebug('Search fetch aborted');
          return {};
        } else {
          logError('Get Random Joke:', error);
          return {
            loadingSearchJoke: false,
            searchQuery: null,
            searchResults: [],
          };
        }
      });
  },
});
