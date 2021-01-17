import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { toggleList, removeFromNoms } from '../redux/reducer';
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';
import { CSSTransitionGroup } from 'react-transition-group';

const NomsList = ({ noms, toggle, remove, showList }) => {
  const [zIdx, setzIdx] = useState('-z-10');
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
    } else {
      if (zIdx === '-z-10') setzIdx('z-20');
      else setTimeout(() => setzIdx('-z-10'), 500);
    }
  }, [showList]);

  return (
    <div className={`fixed inset-0 h-screen ${zIdx}`}>
      <CSSTransitionGroup
        transitionName="nomsListLeft"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {showList && (
          <div
            className="absolute left-0 h-screen w-screen bg-black bg-opacity-50"
            onClick={toggle}
          ></div>
        )}
      </CSSTransitionGroup>
      <CSSTransitionGroup
        transitionName="nomsList"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {showList && (
          <div className="fixed h-screen top-0 right-0 w-96 bg-black bg-opacity-90 p-5">
            <div className="absolute top-5 right-5 border border-grey-100 rounded p-0.5 hover:bg-yellow-500 transition duration-500 ease-in-out"
            onClick={toggle}>
              <IconContext.Provider value={{ color: '#F3F4F6', size: 30 }}>
                <div className="cursor-pointer">
                  <IoClose />
                </div>
              </IconContext.Provider>
            </div>
            <h3 className="text-2xl text-yellow-500 mb-5">Nominations</h3>
            {noms.length ? (
              <div className="flex flex-col h-9/10">
                {noms.map((movie) => (
                  <div key={movie.imdbID} className="flex h-1/5 py-2">
                    <img className="object-contain w-1/3" src={movie.Poster} />
                    <div>
                      <p>
                        {movie.Title} ({movie.Year})
                      </p>
                      <button
                        className="text-sm p-1 border border-grey-100 rounded hover:bg-yellow-500 hover:text-black focus:outline-none m-2 transition duration-500 ease-in-out"
                        onClick={() => remove(movie)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="mt-5">Movies have yet to be nominated</h4>
            )}
          </div>
        )}
      </CSSTransitionGroup>
    </div>
  );
};

const mapState = (state) => ({
  noms: state.nominations,
  showList: state.showNoms,
});
const mapDispatch = (dispatch) => ({
  toggle: () => dispatch(toggleList()),
  remove: (movie) => dispatch(removeFromNoms(movie)),
});

export default connect(mapState, mapDispatch)(NomsList);
