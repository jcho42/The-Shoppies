import { movieSeries } from '../data/movieSeries'

// Action types
const GET_MOVIES = 'GET_MOVIES'
const UPDATE_SEARCH = 'UPDATE_SEARCH'
const SET_NOMS = 'SET_NOMS'
const ADD_MOVIE = 'ADD_MOVIE'
const TOGGLE_LIST = 'TOGGLE_LIST'
const REMOVE_MOVIE = 'REMOVE_MOVIE'
const TOGGLE_BANNER = 'TOGGLE_BANNER'
const CLEAR_SEARCH = 'CLEAR_SEARCH'

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

export const toggleBanner = () => ({
  type: TOGGLE_BANNER
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

// Thunk creator
export const getFromOMDB = (searchValue) => async dispatch => {
  try {
    if (searchValue) {
      const url = `https://www.omdbapi.com/?s=${searchValue}&type=movie&apikey=65162c51`
      const res = await fetch(url)
      const resJson = await res.json()

      if(resJson.Search) {
        dispatch(getMovies(resJson.Search))
      }
    } else {
      dispatch(setInitalMovieSeries())
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
    } else {
      dispatch(setNoms([]))
    }
  } catch (error) {
    console.error(error)
  }
}

export const addToNoms = (movie) => async (dispatch, getState) => {
  try {
    dispatch(addMovie(movie))
    localStorage.setItem('nominations', JSON.stringify(getState().nominations))

    if (getState().nominations.length === 5) {
      dispatch(toggleBanner())
    }
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

export const setInitalMovieSeries = () => async dispatch => {
  try {
    const randomIdx = Math.floor(Math.random() * movieSeries.length)
    dispatch(getFromOMDB(movieSeries[randomIdx]))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const initialState = {
  movies: [],
  search: '',
  nominations: [],
  showNoms: false,
  showBanner: false
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
        return {...state, showNoms: !state.showNoms}
      case REMOVE_MOVIE:
        const newNoms = state.nominations.filter(movie => movie.imdbID !== action.movie.imdbID)
        return {...state, nominations: newNoms}
      case TOGGLE_BANNER:
        return {...state, showBanner: !state.showBanner}
      case CLEAR_SEARCH:
        return {...state, search: ''}
    default:
      return state
  }
}
