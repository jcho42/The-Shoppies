
// Action types
const GET_MOVIES = 'GET_MOVIES'
const ADD_MOVIE = 'ADD_MOVIE'
const UPDATE_SEARCH = 'UPDATE_SEARCH'

// Action creator
const getMovies = (movies) => ({
  type: GET_MOVIES,
  movies
})

export const addMovies = (movie) => ({
  type: ADD_MOVIE,
  movie
})

export const updateSearch = (value) => ({
  type: UPDATE_SEARCH,
  value
})

// Thunk creator
export const getFromOMDB = (searchValue) => async dispatch => {
  try {
    if (searchValue) {
      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=65162c51`
      const res = await fetch(url)
      const resJson = await res.json()

      if(resJson.Search) {
        dispatch(getMovies(resJson.Search))
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  movies: [],
  search: ''
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case GET_MOVIES:
      return {...state, movies: action.movies}
    case ADD_MOVIE:
      return {...state, movies: [...state.movies, action.movie]}
    case UPDATE_SEARCH:
      return {...state, search: action.value}
    default:
      return state
  }
}
