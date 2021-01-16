import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateSearch, toggleList, clearSearch } from '../redux/reducer';
import { IconContext } from 'react-icons';
import { IoSearch, IoClose } from 'react-icons/io5';

const Header = ({ searchValue, update, toggle, clear }) => {
  return (
    <div className="p-5 px-20 bg-black bg-opacity-90 sticky top-0 flex justify-between items-center z-10">
      <div>
        <h2 className="text-yellow-500 text-2xl">The Shoppies</h2>
        <p>Choose 5 movies to nominate for the Shoppie award</p>
      </div>
      <div className="flex">
        <div className="flex">
          <div className="border border-grey-100 bg-grey-900 border-r-0 p-1">
            <IconContext.Provider value={{ color: '#F3F4F6', size: 25 }}>
              <label for="searchbar" className="cursor-pointer">
                <IoSearch />
              </label>
            </IconContext.Provider>
          </div>
          <input
            name="search"
            id="searchbar"
            value={searchValue}
            onChange={(evt) => update(evt.target.value)}
            placeholder="Search Movie Title"
            className="bg-grey-900 border-gray-100 border border-l-0 border-r-0 focus:outline-none text-sm p-1 w-52"
          />
          <div onClick={clear} className="border border-grey-100 bg-grey-900 border-l-0 p-1 mr-10">
            <IconContext.Provider value={{ color: '#F3F4F6', size: 25 }}>
              <label for="searchbar" className="cursor-pointer">
                <IoClose />
              </label>
            </IconContext.Provider>
          </div>
        </div>
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
  clear: () => dispatch(clearSearch())
});

export default connect(mapState, mapDispatch)(Header);
