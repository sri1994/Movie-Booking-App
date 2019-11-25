import { Component, OnInit, Input, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
// tslint:disable-next-line:max-line-length

import { FormControl } from '@angular/forms';
import { BASE_URL, TMDB_URLS } from '../../../../../shared/config';
import { Movie } from '../../../../search/models/search.model';
import { SeatReservationModalComponent } from 'src/app/shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { PreBookingComponent } from 'src/app/shared/components/modals/pre-booking/pre-booking.component';
import { OfflineDialogComponent } from 'src/app/components/modals/offline-dialog/offline-dialog.component';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent implements OnInit, OnChanges {
  @Input()
  movie;
  @Input()
  theaterList;
  @Input()
  category;

  imagesPath = TMDB_URLS.IMAGE_URL;
  castCrewPath = TMDB_URLS.CAST_CREW_SMALL;
  dialogResult;
  rating = 4.7;
  totalReviews = 51;

  minDate = new Date();
  date = new FormControl(this.minDate);
  selectTheater: FormControl;
  selectedTheater;
  selectedTime;

  constructor(public dialog: MatDialog, private homeService: HomeService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.selectTheater = new FormControl();
    this.selectTheater.setValue(this.theaterList[0]);
    this.selectedTheater = this.theaterList[0];
    this.selectTheater.valueChanges.subscribe(selectedTheater => {
      this.selectedTheater = selectedTheater;
    });
  }
  onValChange(val: string) {
    this.selectedTime = val;
  }
  isInvalid() {
    if (this.selectedTheater && this.selectedTheater.name) {
      return false;
    }
    return true;
  }

  checKToDialog() {
    this.homeService.updateLogs({ id: new Date().getMilliseconds() , log: new Date() + 'click book or prebook button on movie card'});
    if (navigator.onLine) {
      console.log('ONLINE :', true);
      this.category === 'nowPlaying' ? this.openDialog() : this.preBookDialog();
    } else {
      console.log('OFFLINE :', false);
      this.openOfflineDialog();
    }
  }

  preBookDialog() {
    const dialogRef = this.dialog.open(PreBookingComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openOfflineDialog(): void {
    const dialogRef = this.dialog.open(OfflineDialogComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SeatReservationModalComponent, {
      width: sessionStorage.getItem('authDetails') ? window.innerWidth + 'px' : 'auto',
      height: sessionStorage.getItem('authDetails') ? '599px' : 'auto',
      data: { category: this.category },
      disableClose: true
    });

    const bookingInstance = dialogRef.componentInstance;
    bookingInstance.movieTitle = this.movie.title;
    bookingInstance.screen = this.selectedTheater && this.selectedTheater.name;
    bookingInstance.time = this.selectedTime;
    bookingInstance.movieList = this.movie;
  }

  trackCastandCrew(index, cast) {
    if (cast) {
      return cast.id;
    } else {
      return -1;
    }
  }
}
