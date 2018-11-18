import _orderBy from 'lodash/orderBy';


/**
 * Return a list of genre labels
 * @param {array} genre_ids
 * @param {object} genre_maps
 */
export const formatGenres = function(genre_ids, genre_maps) {
  const genre_labels = genre_ids.map(id => {
    return genre_maps[id];
  });
  return genre_labels.join(', ');
};


/**
 * Formats movie data for rendering in React-Table component
 * @param {object} movieData
 */
export const formattedMovieData = function(movieData) {
  const formattedMovieData = movieData.map(({ title, genre_ids, poster_path, vote_average, popularity }) => {
    const poster = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '';
    return { title, genre_ids, poster_path: poster, vote_average, popularity };
  });
  return _orderBy(formattedMovieData, ['popularity'], ['desc']);
};


/**
 * Returns HTML for genre filter options
 * @param {array} genres
 */
export const getGenreOptions = function(genres) {
  const selectAll = `<option value=''>-- Select All --</option>`;
  const genre_options = genres.map(({id, name}) => {
    return `<option value='${id}'>${name}</option>`;
  }).join('');
  return {__html: selectAll + genre_options};
};
