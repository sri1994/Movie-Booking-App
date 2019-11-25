import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MovieState from '../../../../reducers/index';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

import {} from '../../../home/store/actions/home.action';
import { HomeService } from '../../../home/services/home.service';
import { SegregateMovieService } from '../../services/segregate-movie.service';
import { SearchApiService } from '../../services/search-api.service';
import { OnDestroy } from '@angular/core';
import { HostBinding } from '@angular/core';
import { MovieListService } from 'src/app/core/services/movie/movie-list.service';

@Component({
  selector: 'app-s-dialog',
  templateUrl: './s-dialog.component.html',
  styleUrls: ['./s-dialog.component.scss']
})
export class SDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class.app-s-dialog') bgColor = true;
  moviesList: any = [];
  genresList: any = [];

  originalMovieList: any = [];
  voteCountList: any = [];

  value = '';
  lang: String = 'en';
  selectedGenre: any;
  selectedVoteCount: any;
  selectedLanguage = 'en';
  languageList: any;
  originalMovieObjArray = [];
  voteCounts: any;
  movieFilterObj = {
    filter: 'genre',
    value: ''
  };
  voteFilterObj = {
    key: 'vote',
    value: ''
  };
  movieObjArray = []; // movie seperated by language
  voteCountFilter: FormControl;

  searchField = new FormControl();
  sortedValue = [];

  constructor(
    private store: Store<MovieState.State>,
    private homeService: HomeService,
    private movieListService: MovieListService,
    private segregateMovies: SegregateMovieService,
    private searchService: SearchApiService
  ) {}

  ngOnInit() {
    this.voteCountFilter = new FormControl();
    this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => {
      this.originalMovieList = result;
      this.moviesList = result;
      this.voteCountList = result;

      this.movieObjArray = this.movieListService.getLanguageList(this.moviesList);
      this.originalMovieObjArray = this.movieObjArray;
      // get movies with languages
    });
    this.voteCount();

    this.voteCountFilter.valueChanges.subscribe(res => {
      this.movieObjArray = this.originalMovieObjArray;
      this.movieObjArray = this.movieListService.getVoteCount(this.movieObjArray, res);
    });

    // genre list from service
    this.genresList = this.homeService.getGenres();

    // fetch from api/store
    this.searchField.valueChanges.pipe(debounceTime(400)).subscribe(searchString => {
      this.searchService.getMovies(searchString).subscribe(
        searchList => {
          this.moviesList = searchList.results;
          this.movieObjArray = this.movieListService.getLanguageList(this.moviesList);
          this.originalMovieObjArray = this.movieObjArray;
        },
        error => {
          this.moviesList = this.searchService.searchMovieFromStore(this.originalMovieList, searchString);
          this.movieObjArray = this.movieListService.getLanguageList(this.moviesList); // get Languages
          this.originalMovieObjArray = this.movieObjArray;
        }
      );
    });
  }

  changeGenere() {
    this.movieFilterObj.filter = 'genre';
    this.movieFilterObj.value = this.selectedGenre;
    this.movieFilterObj = Object.assign({}, this.movieFilterObj);
  }
  voteCount() {
    this.voteCounts = this.voteCountList.map(item => item.vote_count);
    this.sortedValue = this.voteCounts.sort((a, b) => 0 - (a > b ? 1 : -1));
  }

  ngOnDestroy(): void {
    this.moviesList = [];
  }
  trackByFn(index, item) {
    return index;
  }
}
