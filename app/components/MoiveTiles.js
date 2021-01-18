import React from 'react';
import { connect } from 'react-redux';
import { addToNoms, removeFromNoms } from '../redux/reducer';
import { IoClose } from 'react-icons/io5';
import { CSSTransitionGroup } from 'react-transition-group';

const MovieTiles = ({ movies, add, noms, remove }) => {

  const nominated = (movie) => {
    for (let nom of noms) {
      if (nom.imdbID === movie.imdbID) return true;
    }
    return false;
  };

  const disableButton = (movie) => {
    if (noms.length === 5) return true;
    return nominated(movie);
  };

  const imgError = (e) => {
    e.target.onerror = null;
    e.target.src =
      'https://i.pinimg.com/originals/6c/c4/88/6cc488d74b68e2cd131fd11f69f03e62.jpg';
  };

  return (
    <div>
      <CSSTransitionGroup
        className="flex flex-wrap"
        transitionName="movieList"
        transitionEnterTimeout={500}
        transitionLeave={false}
      >
        {movies.map((movie) => (
          <div key={movie.imdbID} className="relative w-52 m-5 zoom">
            <img className="h-80" src={movie.Poster} onError={imgError} />
            <div className="absolute inset-0 h-full w-full opacity-0 hover:opacity-100">
              <div className="absolute bottom-0 h-1/3 w-full bg-black bg-opacity-80 px-2 flex flex-col justify-evenly items-center text-center">
                <h3 className="my-1 text-sm">
                  {movie.Title} ({movie.Year})
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={() => add(movie)}
                    disabled={disableButton(movie)}
                    className="text-sm p-1 border border-grey-100 rounded hover:bg-yellow-500 hover:text-black focus:outline-none disabled:bg-grey-500 disabled:text-grey-100 transition duration-500 ease-in-out"
                  >
                    {nominated(movie) ? 'Nominated!' : 'Nominate'}
                  </button>
                  {nominated(movie) && (
                    <button
                      onClick={() => remove(movie)}
                      className="text-2xl p-0.5 border border-grey-100 rounded hover:bg-red-500 focus:outline-none transition duration-500 ease-in-out ml-2"
                    >
                      <span className="text-2xl">
                        <IoClose />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CSSTransitionGroup>
    </div>
  );
};

const mapState = (state) => ({
  movies: state.movies,
  noms: state.nominations,
});
const mapDispatch = (dispatch) => ({
  add: (movie) => dispatch(addToNoms(movie)),
  remove: (movie) => dispatch(removeFromNoms(movie)),
});

export default connect(mapState, mapDispatch)(MovieTiles);
