import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBookingComponent } from './movie-booking.component';

describe('MovieBookingComponent', () => {
  let component: MovieBookingComponent;
  let fixture: ComponentFixture<MovieBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
