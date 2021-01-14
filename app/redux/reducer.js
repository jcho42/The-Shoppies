
// Action types
const GET_MOVIES = 'GET_MOVIES'
const ADD_MOVIE = 'ADD_MOVIE'

// Action creator
const getMovies = (movies) => ({
  type: GET_MOVIES,
  movies
})

export const addMovies = (movie) => ({
  type: ADD_MOVIE,
  movie
})

// Thunk creator
export const getFromOMDB = () => async dispatch => {
  try {
    console.log("In thunk!!!!!!!!!!!")
    const url = `http://www.omdbapi.com/?s=star wars&apikey=65162c51`
    const res = await fetch(url)
    const resJson = await res.json()

    if(resJson.Search) {
      dispatch(getMovies(resJson.Search))
    }
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  movies: []
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case GET_MOVIES:
      return {...state, movies: action.movies}
    case ADD_MOVIE:
      return {...state, movies: [...state.movies, action.movie]}
    default:
      return state
  }
}
