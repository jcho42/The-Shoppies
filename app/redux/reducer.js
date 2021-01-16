
// Action types
const GET_MOVIES = 'GET_MOVIES'
const UPDATE_SEARCH = 'UPDATE_SEARCH'
const SET_NOMS = 'SET_NOMS'
const ADD_MOVIE = 'ADD_MOVIE'
const TOGGLE_LIST = 'TOGGLE_LIST'
const REMOVE_MOVIE = 'REMOVE_MOVIE'

// Action creator
const getMovies = (movies) => ({
  type: GET_MOVIES,
  movies
})

export const updateSearch = (value) => ({
  type: UPDATE_SEARCH,
  value
})

const setNoms = (noms) => ({
  type:SET_NOMS,
  noms
})

const addMovie = (movie) => ({
  type: ADD_MOVIE,
  movie
})

export const toggleList = () => ({
  type: TOGGLE_LIST
})

const removeMovie = (movie) => ({
  type: REMOVE_MOVIE,
  movie
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
    } else {
      dispatch(getMovies([]))
    }
  } catch (error) {
    console.error(error)
  }
}

export const getNoms = () => async dispatch => {
  try {
    const nominations = JSON.parse(localStorage.getItem('nominations'))
    if (nominations) {
      dispatch(setNoms(nominations))
    }
  } catch (error) {
    console.error(error)
  }
}

export const addToNoms = (movie) => async (dispatch, getState) => {
  try {
    dispatch(addMovie(movie))
    localStorage.setItem('nominations', JSON.stringify(getState().nominations))
  } catch (error) {
    console.error(error)
  }
}

export const removeFromNoms = (movie) => async (dispatch, getState) => {
  try {
    dispatch(removeMovie(movie))
    localStorage.setItem('nominations', JSON.stringify(getState().nominations))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  movies: [],
  search: '',
  nominations: [],
  show: false
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case GET_MOVIES:
      return {...state, movies: action.movies}
      case UPDATE_SEARCH:
        return {...state, search: action.value}
      case SET_NOMS:
        return {...state, nominations: action.noms}
      case ADD_MOVIE:
        return {...state, nominations: [...state.nominations, action.movie]}
      case TOGGLE_LIST:
        return {...state, show: !state.show}
      case REMOVE_MOVIE:
        const newNoms = state.nominations.filter(movie => movie.imdbID !== action.movie.imdbID)
        return {...state, nominations: newNoms}
    default:
      return state
  }
}
