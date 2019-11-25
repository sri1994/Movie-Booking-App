// import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

// @Component({
//   selector: 'app-home-page',
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.scss'],
//   // changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class HomePageComponent implements OnInit {
//   @Input()
//   moviesList;

//   @Input()
//   upcomingList;

//   @Input()
//   theaterList;

//   @Input()
//   userPreference;

//   @Output()
//   getNewNowPlayingMovies: EventEmitter<number> = new EventEmitter<number>();

//   @Output()
//   getNewUpcomingMovies: EventEmitter<number> = new EventEmitter<number>();

//   activeTabIndex = 0;
//   nowPlayingMovieFetchedPageNum = 1;
//   upcomingMoviesFetchedPageNum = 0;
//   selectedLanguage = '';
//   selectedGenre = '';
//   languageList = [{ id: 'en', name: 'English' }, { id: 'ja', name: 'Japanese' }, { id: 'zh', name: 'Chinese' }];
//   constructor() {}

//   ngOnInit() {
//     this.getNewNowPlayingMovies.emit(1);
//     this.getNewUpcomingMovies.emit(1);
//   }

//   trackMovie(index, movie) {
//     if (movie) {
//       return movie.id;
//     } else {
//       return -1;
//     }
//   }
//   getMovies() {}

//   tabChanged(event) {
//     this.activeTabIndex = event;
//   }

//   getLanguage(lang) {
//     this.selectedLanguage = lang;
//   }

//   getGenre(g) {
//     this.selectedGenre = g;
//   }

//   track(_index, item) {
//     return item;
//   }
// }


import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

import { HomeService } from '../../services/home.service';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  @Input()
  moviesList;

  @Input()
  upcomingList;

  @Input()
  theaterList;

  @Input()
  userPreference;

  @Output()
  getNewNowPlayingMovies: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  getNewUpcomingMovies: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  activeTabIndex = 0;
  searchPageNumber = 1;
  nowPlayingMovieFetchedPageNum = 1;
  upcomingMoviesFetchedPageNum = 0;
  selectedLanguage = '';
  selectedGenre = '';
  page = 1;
  languageList = [{ id: 'en', name: 'English' }, { id: 'ja', name: 'Japanese' }, { id: 'zh', name: 'Chinese' }];
  constructor(private homeService: HomeService, private scrollDispatcher: ScrollDispatcher) {}

  ngOnInit() {
    this.getNewNowPlayingMovies.emit(this.page);
    this.getNewUpcomingMovies.emit(this.page);
  }

  trackMovie(index, movie) {
    if (movie) {
      return movie.id;
    } else {
      return -1;
    }
  }

  tabChanged(event) {
    this.activeTabIndex = event;
  }

  getLanguage(lang) {
    this.selectedLanguage = lang;
  }

  getGenre(g) {
    this.selectedGenre = g;
  }
  goTop() {
    this.virtualScroll.scrollToIndex(0);
  }
  getMovies(): void {
    console.log('this.virtualScroll.getDataLength() :', this.virtualScroll.getDataLength());
    console.log('this.virtualScroll.getRenderedRange().end :', this.virtualScroll.getRenderedRange().end);
    if (this.virtualScroll.getDataLength() === this.virtualScroll.getRenderedRange().end) {
      if (this.activeTabIndex === 0) {
        this.getNewNowPlayingMovies.emit(++this.page);
      } else if (this.activeTabIndex === 1) {
        this.getNewUpcomingMovies.emit(++this.page);
      }
    }
  }

}
