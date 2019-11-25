import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MovieState from '../../../../reducers/index';
import * as UserState from '../../../../reducers/index';

import { HomeService } from '../../services/home.service';
import { Subscription, Observable } from 'rxjs';
import { Movie } from 'src/app/features/search/models/search.model';
import { PreferenceInterface } from 'src/app/features/interfaces/preference';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  nowPlayingMoviesList = [];
  upcomingMoviesList: Observable<Movie[]>;
  genresList = [];
  theaterList = [];
  userPreference: PreferenceInterface = {
    email: '',
    id: '',
    image: '',
    name: '',
    preference: {},
    rating: {},
    role: '',
    token: '',
  };
  nowPlayingMovieSubs: Subscription;
  upcomingSubs: Subscription;
  theatreSubs: Subscription;
  userPrefSubs: Subscription;
  constructor(
    private store: Store<MovieState.State>,
    private userStore: Store<UserState.State>,
    public homeService: HomeService
  ) { }

  ngOnInit() {
    this.getNewSetofNowPlayingMovies(1);
    this.nowPlayingMovieSubs = this.store
      .select(MovieState.nowPlayingMoviesSelector)
      .subscribe(result => {
        return this.nowPlayingMoviesList = result;
      });
    this.upcomingMoviesList = this.store.select(MovieState.upcomingMovieSelector);

    this.homeService.getTheaterList();

    this.theatreSubs = this.store.select(MovieState.theaterList).subscribe(result => {
      this.theaterList = Object.values(result);
      console.log('TheaterList: ', this.theaterList);
    });
    this.userPrefSubs = this.userStore.select(UserState.userSelector).subscribe(result => {
      this.userPreference.preference = result.preference;
    });
    this.genresList = this.homeService.getGenres();
  }

  getNewSetofNowPlayingMovies(page) {
    this.homeService.getNowshowing(page);
  }
  getNewSetofComingMovies(page) {
    this.homeService.getUpcomingMovies(page);
  }

  ngOnDestroy() {
    if (this.nowPlayingMovieSubs && !this.nowPlayingMovieSubs.closed) {
      this.nowPlayingMovieSubs.unsubscribe();
    }
    if (this.upcomingSubs && !this.upcomingSubs.closed) {
      this.upcomingSubs.unsubscribe();
    }
    if (this.theatreSubs && !this.theatreSubs.closed) {
      this.theatreSubs.unsubscribe();
    }
    if (this.userPrefSubs && !this.userPrefSubs.closed) {
      this.userPrefSubs.unsubscribe();
    }
  }
}
