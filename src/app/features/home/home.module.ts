import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

import { MovieCardComponent } from './components/home-page/movie-card/movie-card.component';

import { SeatReservationModalComponent } from 'src/app/shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { PreBookingComponent } from 'src/app/shared/components/modals/pre-booking/pre-booking.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomePageComponent, HomeComponent, MovieCardComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  entryComponents: [SeatReservationModalComponent, ConfirmationModalComponent, PreBookingComponent]
})
export class HomeModule {}
