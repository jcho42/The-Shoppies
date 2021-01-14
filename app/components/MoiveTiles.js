import React from 'react'
import { connect } from 'react-redux'
import { addToNoms } from '../redux/reducer'

const MovieTiles = ({movies, add}) => {
  return (
    <div>
      {movies.map(movie => (
        <img onClick={() => add(movie)} key={movie.imdbID} src={movie.Poster} />
      ))}
    </div>
  )
}

const mapState = (state) => ({
  movies: state.movies,
})
const mapDispatch = (dispatch) => ({
  add: (movie) => dispatch(addToNoms(movie))
})

export default connect(mapState, mapDispatch)(MovieTiles)
