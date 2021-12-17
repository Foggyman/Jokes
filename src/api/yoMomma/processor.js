const processor = {
  processJoke: response => response.joke,
  processSearchResult: response => response.results,
};

export default processor;
