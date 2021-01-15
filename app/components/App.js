import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, MovieTiles, NomsList } from './index'
import { getFromOMDB, getNoms } from '../redux/reducer'

const App = ({fetchMovies, searchValue, fetchNoms, showList}) => {
  useEffect(() => {
    fetchMovies(searchValue)
  }, [searchValue])

  useEffect(() => {
    fetchNoms()
  }, [])

  return (
    <div className="bg-grey-900 min-h-screen text-gray-100">
      <Header />
      <MovieTiles />
      {showList && <NomsList />}
    </div>
  )
}

const mapState = (state) => ({
  searchValue: state.search,
  showList: state.show
})
const mapDispatch = (dispatch) => ({
  fetchMovies: (searchValue) => dispatch(getFromOMDB(searchValue)),
  fetchNoms: () => dispatch(getNoms())
})

export default connect(mapState, mapDispatch)(App)
