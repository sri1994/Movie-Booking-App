import { HomeFilterPipe } from './../../../../shared/pipes/home-filter.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDialogCardsComponent } from './s-dialog-cards.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SortMoviePipe } from 'src/app/shared/pipes/sort-movie.pipe';
import { Store } from '@ngrx/store';

describe('SDialogCardsComponent', () => {
  let component: SDialogCardsComponent;
  let fixture: ComponentFixture<SDialogCardsComponent>;
  const storeStub = {
    select: arg1 => ({
      subscribe: success => {
        const res = [];
        success(res);
      }
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SDialogCardsComponent, HomeFilterPipe, SortMoviePipe],
      providers: [
        {
          provide: Store,
          useValue: storeStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDialogCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can call track method', () => {
    const index = 1;
    const item = [];
    expect(component.track).toBeDefined();
    spyOn(component, 'track').and.callThrough();
    component.track(index, item);
    expect(component.track).toHaveBeenCalled();
  });
});
