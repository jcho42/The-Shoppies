import React from 'react';
import { connect } from 'react-redux';
import { addToNoms } from '../redux/reducer';

const MovieTiles = ({ movies, add, noms }) => {

  const disableButton = (movie) => {
    if (noms.length === 5) return true
    for (let nom of noms) {
      if (nom.imdbID === movie.imdbID) return true
    }
    return false
  }

  return (
    <div className="flex flex-wrap">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="relative w-52 m-5">
          <img className="h-80" src={movie.Poster} />
          <div className="absolute inset-0 h-full w-full opacity-0 hover:opacity-100">
            <div className="absolute bottom-0 h-1/3 w-full bg-black bg-opacity-80 px-2 flex flex-col justify-center items-center text-center">
              <h3 className="my-1 text-sm">
                {movie.Title} ({movie.Year})
              </h3>
              <button
                onClick={() => add(movie)}
                disabled={disableButton(movie)}
                className="text-sm p-1 border border-grey-100 rounded hover:bg-yellow-500 hover:text-black focus:outline-none disabled:bg-grey-500 disabled:text-grey-100"
              >
                Nominate
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapState = (state) => ({
  movies: state.movies,
  noms: state.nominations
});
const mapDispatch = (dispatch) => ({
  add: (movie) => dispatch(addToNoms(movie)),
});

export default connect(mapState, mapDispatch)(MovieTiles);
