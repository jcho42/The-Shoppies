import React, {useState} from 'react'
import { connect } from 'react-redux'
import { updateSearch } from '../redux/reducer'

const Header = ({searchValue, update}) => {
  return (
    <div>
      <h2>The Shoppies</h2>
      <input
        name="search"
        value={searchValue}
        onChange={(evt) => update(evt.target.value)}
        placeholder="Type to search..."
      ></input>
    </div>
  )
}

const mapState = (state) => ({
  searchValue: state.search
})
const mapDispatch = (dispatch) => ({
  update: (value) => dispatch(updateSearch(value))
})

export default connect(mapState, mapDispatch)(Header)
