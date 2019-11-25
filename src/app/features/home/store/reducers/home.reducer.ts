import { MovieActionTypes, EMovieActionTypes } from '../actions/home.action';
import { Movie } from '../../models/movie.model';
import { State } from '@ngrx/store';
import { Theater } from '../../models/theater.model';
export interface MoviesState {
    nowPlayingMovies: Movie[];
    upcomingMovies: Movie[];
    setTheaters: Theater[];
}

export const initialMovieState: MoviesState = {
    nowPlayingMovies: [],
    upcomingMovies: [],
    setTheaters: []
};

export function moviesReducer(state = initialMovieState, action: MovieActionTypes) {
    switch (action.type) {
        case EMovieActionTypes.SET_NOW_PLAYING_MOVIES: {
            const newNowPlayingMovies: Movie[] = [...state.nowPlayingMovies];
            newNowPlayingMovies.push(...action.payload);
            return {
                ...state,
                nowPlayingMovies: newNowPlayingMovies
            };
        }
        case EMovieActionTypes.SET_UPCOMING_MOVIES: {
            const newUpcomingMovies: Movie[] = [...state.upcomingMovies];
            newUpcomingMovies.push(...action.payload);
            return {
                ...state,
                upcomingMovies: newUpcomingMovies
            };
        }
        case EMovieActionTypes.SET_CAST_AND_CREW: {
            const newNowPlayingMovieState = { ...state.nowPlayingMovies };
            const newUpcomingMovieState = { ...state.upcomingMovies };

            if (state.nowPlayingMovies[action.payload.id]) {
                newNowPlayingMovieState[action.payload.id].casts = action.payload.cast;
                newNowPlayingMovieState[action.payload.id].crews = action.payload.crew;
            }
            if (state.upcomingMovies[action.payload.id]) {
                newUpcomingMovieState[action.payload.id].casts = action.payload.cast;
                newUpcomingMovieState[action.payload.id].crews = action.payload.crew;
            }
            return {
                ...state,
                nowPlayingMovies: newNowPlayingMovieState,
                upcomingMovies: newUpcomingMovieState
            };
        }
        case EMovieActionTypes.SET_THEATERS: {
            const newSetTheatersState = action.payload;
            return {
                ...state,
                setTheaters: newSetTheatersState
            };
        }
        default:
            return state;
    }
}
