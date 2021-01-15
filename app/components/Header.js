import React from 'react';
import { connect } from 'react-redux';
import { updateSearch, toggleList } from '../redux/reducer';

const Header = ({ searchValue, update, toggle }) => {
  return (
    <div className="p-5 px-20 bg-black bg-opacity-90 sticky top-0 flex justify-between items-center">
      <div>
        <h2 className="text-yellow-500 text-2xl">The Shoppies</h2>
        <p>Choose 5 movies to nominate</p>
      </div>
      <div>
        <input
          name="search"
          value={searchValue}
          onChange={(evt) => update(evt.target.value)}
          placeholder="Search Movie Title"
          className="bg-grey-900 border-gray-100 border mx-10 focus:outline-none text-sm p-1 w-60"
        />
        <button
          className="border border-gray-100 p-1 rounded focus:outline-none hover:bg-yellow-500 hover:text-black"
          onClick={toggle}
        >
          Nominations List
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  searchValue: state.search,
});
const mapDispatch = (dispatch) => ({
  update: (value) => dispatch(updateSearch(value)),
  toggle: () => dispatch(toggleList()),
});

export default connect(mapState, mapDispatch)(Header);
