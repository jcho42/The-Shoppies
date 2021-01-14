import React from 'react'
import { connect } from 'react-redux'

const MovieTiles = ({movies}) => {
  return (
    <div>
      {movies.map(movie => (
        <img src={movie.Poster} />
      ))}
    </div>
  )
}

const mapState = (state) => ({
  movies: state.movies,
})

export default connect(mapState)(MovieTiles)
