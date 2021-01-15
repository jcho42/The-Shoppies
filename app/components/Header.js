import React from 'react'
import { connect } from 'react-redux'
import { updateSearch, toggleList } from '../redux/reducer'

const Header = ({searchValue, update, toggle}) => {
  return (
    <div>
      <h2 className="text-blue-500">The Shoppies</h2>
      <input
        name="search"
        value={searchValue}
        onChange={(evt) => update(evt.target.value)}
        placeholder="Type to search..."
      />
      <button onClick={toggle}>Nominations List</button>
    </div>
  )
}

const mapState = (state) => ({
  searchValue: state.search
})
const mapDispatch = (dispatch) => ({
  update: (value) => dispatch(updateSearch(value)),
  toggle: () => dispatch(toggleList())
})

export default connect(mapState, mapDispatch)(Header)
