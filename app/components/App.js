import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, MovieTiles } from './index'
import { getFromOMDB } from '../redux/reducer'

const App = ({fetchMovies}) => {
  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div>
      <div>{process.env.NODE_ENV}</div>
      <Header />
      <MovieTiles />
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  fetchMovies: () => dispatch(getFromOMDB())
})

export default connect(null, mapDispatch)(App)
