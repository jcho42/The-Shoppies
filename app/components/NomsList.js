import React from 'react';
import { connect } from 'react-redux';
import { toggleList, removeFromNoms } from '../redux/reducer';

const NomsList = ({ noms, toggle, remove }) => {
  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed h-screen inset-0 z-20 bg-black bg-opacity-50"
      onClick={toggle}
    >
      <div
        className="absolute h-screen right-0 w-96 bg-black bg-opacity-90 p-5"
        onClick={preventPropagation}
      >
        <h3 className="text-2xl text-yellow-500 mb-5">Nominations</h3>
        <div className="flex flex-col h-9/10">
          {noms.map((movie) => (
            <div key={movie.imdbID} className="flex h-1/5 py-2">
              <img className="object-contain w-1/3" src={movie.Poster} />
              <div>
                <p>
                  {movie.Title} ({movie.Year})
                </p>
                <button
                  className="text-sm p-1 border border-grey-100 rounded hover:bg-yellow-500 hover:text-black focus:outline-none"
                  onClick={() => remove(movie)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  noms: state.nominations,
});
const mapDispatch = (dispatch) => ({
  toggle: () => dispatch(toggleList()),
  remove: (movie) => dispatch(removeFromNoms(movie)),
});

export default connect(mapState, mapDispatch)(NomsList);
