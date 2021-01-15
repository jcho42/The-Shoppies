import React from 'react'
import { connect } from 'react-redux'
import { addToNoms } from '../redux/reducer'

const MovieTiles = ({movies, add}) => {
  return (
    <div>
      {movies.map(movie => (
        <div className="relative">
          <img onClick={() => add(movie)} key={movie.imdbID} src={movie.Poster} />
          <div className="absolute bottom-0 h-full w-full opacity-0 hover:opacity-80">Description</div>
        </div>
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
