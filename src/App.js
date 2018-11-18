import React, { Component } from 'react';
import MovieMagic from './MovieMagic.js';
import { GENRES_URL, MOVIES_URL } from './constants.js'

class App extends Component {
  render() {
    return (
      <MovieMagic genreUrl={GENRES_URL} moviesUrl={MOVIES_URL}/>
    );
  }
}

export default App;
