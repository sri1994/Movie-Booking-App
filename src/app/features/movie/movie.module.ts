import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { MovieComponent } from './containers/movie/movie.component';
import { MovieRoutingModule } from './movie-routing.module';

import { SocialFeedsComponent } from './components/movie-page/social-feeds/social-feeds.component';
import { MovieDescriptionComponent } from './components/movie-page/movie-description/movie-description.component';

import { MovieService } from './services/movie.service';

import { SharedModule } from 'src/app/shared/shared.module';
import { SeatReservationModalComponent } from 'src/app/shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { PreBookingComponent } from 'src/app/shared/components/modals/pre-booking/pre-booking.component';
@NgModule({
  declarations: [MoviePageComponent, MovieComponent, SocialFeedsComponent, MovieDescriptionComponent],
  imports: [CommonModule, MovieRoutingModule, SharedModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [SeatReservationModalComponent, PreBookingComponent],
  providers: [MovieService]
})
export class MovieModule {}
