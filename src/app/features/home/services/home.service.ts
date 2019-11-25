import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import * as MovieState from './../../../reducers/index';
import { SetNowPlayingMovies, SetUpcomingMovies, SetCastAndCrew, SetTheaters } from '../store/actions/home.action';
import { Movie } from '../models/movie.model';
import { BASE_URL, JSON_SERVER_URLS, TMDB_URLS } from 'src/app/shared/config';
import { SetUser } from 'src/app/core/store/action/userDetails.action';
import { mergeMap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  nowPlayingMoviesUrl = BASE_URL.TMDB_API + TMDB_URLS.NOW_PLAYING_MOVIES + environment.API_KEY + '&page=';
  upcomingMoviesUrl = BASE_URL.TMDB_API + TMDB_URLS.UPCOMING_MOVIES + environment.API_KEY + '&page=';
  genresUrl = BASE_URL.TMDB_API + TMDB_URLS.GENRES + environment.API_KEY + '&language=en-US';
  sortPreferenceUrl = environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS;
  genres = [];

  public isNowShowingMovieLoading = true;
  public isUpcomingMovieLoading = true;

  constructor(private http: HttpClient, private store: Store<MovieState.State>) {}

  getNowshowing(page = 1) {
    // this.isNowShowingMovieLoading = true;
    this.http
      .get<Movie[]>(this.nowPlayingMoviesUrl + page)
      .pipe(
        mergeMap((movie: Movie[]) => {
          return forkJoin(
            movie['results'].map(element => {
              const getCreditsUrl =
                BASE_URL.TMDB_API + TMDB_URLS.GET_CREDITS + element.id + '/credits?' + environment.API_KEY;
              return this.http.get(getCreditsUrl).pipe(
                map(resp => {
                  element.casts = resp['cast'].splice(0, 5);
                  element.crews = resp['crew'].splice(0, 5);
                  return element;
                })
              );
            })
          );
        }), take(1)
      )
      .subscribe((res: Movie[]) => {
        this.isNowShowingMovieLoading = false;
        this.store.dispatch(new SetNowPlayingMovies(res));
      });
  }

  getUpcomingMovies(page = 1) {
    // this.isUpcomingMovieLoading = true;
    this.http.get<Movie[]>(this.upcomingMoviesUrl + page).pipe(take(1)).subscribe(
      (movies: Movie[]) => {
        movies['results'].forEach(element => {
          const getCreditsUrl =
            BASE_URL.TMDB_API + TMDB_URLS.GET_CREDITS + element.id + '/credits?' + environment.API_KEY;

          this.http.get(getCreditsUrl).subscribe(res => {
            element.casts = res['cast'].splice(0, 5);
            element.crews = res['crew'].splice(0, 5);
          });
        });
        this.store.dispatch(new SetUpcomingMovies(movies['results']));
        // this.isUpcomingMovieLoading = false;
      },
      error => {
        console.error(error);
      }
    );
  }

  getGenres() {
    return this.genres;
  }

  fetchGenres() {
    this.http.get(this.genresUrl).subscribe(res => {
      this.genres = res['genres'];
    });
  }
  getCastAndCrew(movies: Movie[]) {
    movies.forEach(element => {
      const getCreditsUrl = BASE_URL.TMDB_API + TMDB_URLS.GET_CREDITS + element.id + '/credits?' + environment.API_KEY;

      this.http.get(getCreditsUrl).subscribe(res => {
        res['cast'].splice(5);
        res['crew'].splice(5);
        this.store.dispatch(new SetCastAndCrew(res));
      });
    });
  }
  getTheaterList() {
    this.http.get(environment.JSONSERVER + JSON_SERVER_URLS.THEATER_URL).subscribe(res => {
      this.store.dispatch(new SetTheaters(res['theaters']));
    });
  }

  updateLogs(logObject: any): void {
    this.http.post(environment.JSONSERVER + JSON_SERVER_URLS.LOGGER_URL, logObject).subscribe(res => {
      console.log('UPDATE LOGS :', res);
    }, (error: any) => {
      console.log(error);
    });
  }

  getUserPreference(): Observable<any> {
    return this.http.get(this.sortPreferenceUrl);
  }

  setPreference(newPreference, currentUserId) {
    let objectRef, currentUserData;
    this.http.get(environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS).subscribe(res => {
      objectRef = res;
      res['users'].forEach(user => {
        if (user.uid === currentUserId) {
          user.preferences = newPreference;
          currentUserData = user;
        }
      });
      this.http.put(environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS, objectRef).subscribe(resp => {
        this.store.dispatch(new SetUser(currentUserData));
      });
    });
  }
}
