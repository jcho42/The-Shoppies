import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, MovieTiles } from './index'
import { getFromOMDB, getNoms } from '../redux/reducer'

const App = ({fetchMovies, searchValue, fetchNoms}) => {
  useEffect(() => {
    fetchMovies(searchValue)
  }, [searchValue])

  useEffect(() => {
    fetchNoms()
  }, [])

  return (
    <div>
      <div>{process.env.NODE_ENV}</div>
      <Header />
      <MovieTiles />
    </div>
  )
}

const mapState = (state) => ({
  searchValue: state.search
})
const mapDispatch = (dispatch) => ({
  fetchMovies: (searchValue) => dispatch(getFromOMDB(searchValue)),
  fetchNoms: () => dispatch(getNoms())
})

export default connect(mapState, mapDispatch)(App)
