const processor = {
  processJoke: response => response.value,
  processSearchResult: response => response.result.map(j => j.value),
};

export default processor;
