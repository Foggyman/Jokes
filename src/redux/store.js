import createStore from "redux-zero";

const initialState = {
  randomJoke: null,
  loadingRandomJoke: false,

  loadingSearchJoke: false,
  searchResults: [],
  searchQuery: null,
};

export default createStore(initialState);
