const BASE_PATH = "https://api.chucknorris.io";

const chuckNorrisApi = {
  getRandomJoke: () => {
    return fetch(`${ BASE_PATH }/jokes/random`).then(response => response.json());
  },
  searchJoke: (search, signal) => {
    return fetch(`${ BASE_PATH }/jokes/search?query=${ search }`, {signal}).then(response => response.json());
  },
};


export default chuckNorrisApi;
