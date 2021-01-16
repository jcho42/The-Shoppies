import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, MovieTiles, NomsList, Banner } from './index'
import { getFromOMDB, getNoms, setInitalMovieSeries } from '../redux/reducer'

const App = ({fetchMovies, searchValue, fetchNoms, showList, showBanner, setInitialMovies}) => {
  useEffect(() => {
    fetchMovies(searchValue)
  }, [searchValue])

  useEffect(() => {
    fetchNoms()
    setInitialMovies()
  }, [])

  return (
    <div className="bg-grey-900 min-h-screen text-gray-100">
      <Header />
      <MovieTiles />
      {showList && <NomsList />}
      {showBanner && <Banner/>}
    </div>
  )
}

const mapState = (state) => ({
  searchValue: state.search,
  showList: state.showNoms,
  showBanner: state.showBanner
})
const mapDispatch = (dispatch) => ({
  fetchMovies: (searchValue) => dispatch(getFromOMDB(searchValue)),
  fetchNoms: () => dispatch(getNoms()),
  setInitialMovies: () => dispatch(setInitalMovieSeries())
})

export default connect(mapState, mapDispatch)(App)
