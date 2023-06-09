import {
    BACK_TO_FIRST,
    NEXT_MOVIE,
    PREVIOUS_MOVIE,
    ADD_LIST,
    GO_TO_LAST,
    DELETE_FAV
  } from "../store/actions";
  import { movies } from "../movies";
  
  const initialState = {
    movies: movies,
    sira: 0,
    favMovies: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_LIST:
        return {
          ...state,
          favMovies:
            state.favMovies.filter((i) => i == action.payload) == 0
              ? [...state.favMovies, action.payload]
              : [...state.favMovies],
          movies: state.movies.filter((i) => i.id !== action.payload.id),
          sira: state.sira == state.movies.length - 1 ? 0 : state.sira,
        };
  
      case BACK_TO_FIRST:
        return {
          ...state,
          sira: 0,
        };
      case GO_TO_LAST:
        return {
          ...state,
          sira: state.movies.length - 1,
        };
  
      case NEXT_MOVIE:
        return {
          ...state,
          sira:
            state.sira == state.movies.length - 1 ? state.sira : state.sira + 1,
        };
  
      case PREVIOUS_MOVIE:
        return {
          ...state,
          sira: state.sira === 0 ? state.sira : state.sira - 1,
        };
  
      case DELETE_FAV:
        return {
          ...state,
          movies: [...state.movies, state.favMovies.find(item =>item.id == action.payload)],
          favMovies: state.favMovies.filter((i) => i.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;