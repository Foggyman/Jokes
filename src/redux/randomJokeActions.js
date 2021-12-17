import api from '../api';
import { logError, logDebug } from "../utils/logger";

export default ({ setState, getState }) => ({
  getRandomJoke: () => {
    if (getState().loadingRandomJoke) {
      logDebug('Not loading random joke because state in loading');
      return {};
    }
    setState({loadingRandomJoke: true});
    return api.getRandomJoke()
      .then(joke => {
        logDebug('Random Joke Fetched: ', joke);
        return { randomJoke: joke, loadingRandomJoke: false};
      })
      .catch(error => {
        logError('Get Random Joke:', error);
        return {loadingRandomJoke: false}
      });
  },
});
