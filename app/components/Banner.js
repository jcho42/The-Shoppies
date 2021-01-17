import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { toggleBanner } from '../redux/reducer';
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';
import { CSSTransitionGroup } from 'react-transition-group';

const Banner = ({ toggle, noms, showBanner }) => {
  const [zIdx, setzIdx] = useState('-z-10');
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
    } else {
      if (zIdx === '-z-10') setzIdx('z-20');
      else setTimeout(() => setzIdx('-z-10'), 500);
    }
  }, [showBanner]);

  return (
    <div className={`fixed h-screen inset-0 ${zIdx}`}>
      <CSSTransitionGroup
        transitionName="bannerBot"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {showBanner && (
          <div
            className="bg-black bg-opacity-50 absolute top-0 h-screen w-screen"
            onClick={toggle}
          ></div>
        )}
      </CSSTransitionGroup>
      <CSSTransitionGroup
        transitionName="banner"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {showBanner && (
          <div className="absolute h-1/3 top-0 w-full bg-black bg-opacity-90 py-5 px-40 flex justify-between">
            <div>
              <h3 className="text-2xl mb-5">Congratulations!</h3>
              <p className="text-xl text-yellow-500 mb-2">
                You have nominated the following 5 movies for the Shoppie award:
              </p>
              <ul className="list-disc list-inside">
                {noms.map((movie) => (
                  <li key={movie.imdbID}>
                    {movie.Title} ({movie.Year})
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-grey-100 rounded p-0.5 hover:bg-yellow-500 self-start transition duration-500 ease-in-out">
              <IconContext.Provider value={{ color: '#F3F4F6', size: 30 }}>
                <div className="cursor-pointer" onClick={toggle}>
                  <IoClose />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        )}
      </CSSTransitionGroup>
    </div>
  );
};
const mapState = (state) => ({
  noms: state.nominations,
  showBanner: state.showBanner,
});
const mapDispatch = (dispatch) => ({
  toggle: () => dispatch(toggleBanner()),
});

export default connect(mapState, mapDispatch)(Banner);
