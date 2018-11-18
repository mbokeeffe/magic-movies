import { formatGenres, getOptionsHtml, formatedMovieData } from './utils.js';
import { expect } from 'chai';

describe('utilities function', () => {
  it('formats genres', () => {
    const genre_ids = [1, 2, 3];
    const genre_maps = {
      1: 'One',
      2: 'Two',
      3: 'Three'
    };

    const expected = 'One, Two, Three';
    const formattedGenres = formatGenres(genre_ids, genre_maps);
    expect(expected).to.equal(formattedGenres);
  });

  it('gets genre options', () => {
    const genres = [
      {
        id: 1,
        name: 'One'
      },
      {
        id: 2,
        name: 'Two'
      }
    ];
    const expected = '<option value=\'\'>-- Select All --</option><option value=\'1\'>One</option><option value=\'2\'>Two</option>';
    const selectOptions = getOptionsHtml(genres);
    expect(expected).to.equal(selectOptions);
  });

  it('formats the movie data correctly', () => {
    const movieData = [
      {
        title: 'Title 1',
        genre_ids: [1, 2, 3],
        poster_path: 'pic.jpg',
        vote_average: 7,
        popularity: 26
      },
      {
        title: 'Title 2',
        genre_ids: [4, 5, 6],
        poster_path: 'pic2.jpg',
        vote_average: 7,
        popularity: 32
      }
    ];
    const expected = [{ title: 'Title 2',
         genre_ids: [ 4, 5, 6 ],
         poster_path: 'https://image.tmdb.org/t/p/w500/pic2.jpg',
         vote_average: 7,
         popularity: 32 },
       { title: 'Title 1',
         genre_ids: [ 1, 2, 3 ],
         poster_path: 'https://image.tmdb.org/t/p/w500/pic.jpg',
         vote_average: 7,
         popularity: 26 } ]
    const formatedData = formatedMovieData(movieData);
    expect(expected).to.deep.equal(formatedData);
  });
});
