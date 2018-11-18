import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import Header from './header/Header.js';
import "react-table/react-table.css";
import { formatGenres, formattedMovieData, getGenreOptions } from './utils.js'
import PropTypes from 'prop-types';


/**
 * Movie Magic component for rendering movie listings data
 */
class MovieMagic extends Component {
    constructor(props) {
        super(props);

        // Set the React Table columns
        this.state = {
            columns: [
                {
                  Header: "Poster",
                  accessor: "poster_path",
                  filterable: false,
                  sortable: false,
                  Cell: row => (
                    <img className="poster" src={row.value} alt="Movie"/>
                  )
                },
                {Header: "Title", accessor: "title"},
                {Header: "Popularity", accessor: "popularity"},
                {
                    Header: "Rating",
                    accessor: "vote_average",
                    filterMethod: (filter, row) => {
                      return row[filter.id] >= filter.value;
                    }
                },
            ]
        }
    }

    componentDidMount() {
        const {genreUrl, moviesUrl} = this.props;
        const urls = [ genreUrl, moviesUrl];
        // Call movies api
        Promise.all(urls.map(url =>
          fetch(url)
            .then(result => result.json())
            .catch(error => {
              console.log(error);
            })
        ))
        .then(response => {
          const { genres } = response[0];
          const movies = response[1].results;
          this.loadMovieData(genres, movies);
        });
    }

    loadMovieData(genres, movies) {
      // Format genres in id: label format
      const genreMaps = {};
      genres.forEach(genre => {
        genreMaps[genre.id] = genre.name;
      });
      // Set data for rendering in grid
      const data = formattedMovieData(movies, genreMaps);
      this.setState({
        columns: [...this.state.columns,
          {
              Header:  "Genre",
              accessor: "genre_ids",
              Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    dangerouslySetInnerHTML={getGenreOptions(genres)}
                  >
              </select>,
              Cell: ({value}) => formatGenres(value, genreMaps),
              filterMethod: ({value, id}, row) => {
                if(row[id].includes(parseInt(value))) {
                  return true;
                }
              },
          },
        ] ,
        data
      });
    }

    render() {
        return (
            <Fragment>
              <Header/>
              <ReactTable
                  filterable
                  defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
                  columns={this.state.columns}
                  data={this.state.data}>
              </ReactTable>
            </Fragment>
        );
    }
}

export default MovieMagic;

MovieMagic.propTypes = {
  genreUrl: PropTypes.string,
  moviesUrl: PropTypes.string
};
