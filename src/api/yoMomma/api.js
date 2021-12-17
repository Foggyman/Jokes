const BASE_PATH = "https://yomomma-api.herokuapp.com";

const yoMommaApi = {
  getRandomJoke: () => {
    return fetch(`${ BASE_PATH }/jokes`).then(response => response.json());
  },
  searchJoke: (search, signal) => {
    return fetch(`${ BASE_PATH }/search?query=${ search }`, {signal}).then(response => response.json());
  },
};

export default yoMommaApi;
