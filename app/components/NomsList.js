import React from 'react'
import { connect } from 'react-redux'

const NomsList = ({noms}) => {
  return (
    <div className="overlay">
      <div className="main-content">
        <h3>Nominations</h3>
        <div className="movie-list">
          {noms.map(movie => (
            <img key={movie.imdbID} src={movie.Poster} />
          ))}
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => ({
  noms: state.nominations
})

export default connect(mapState)(NomsList)
