import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { MatMenuModule, MatAutocompleteModule, MatDialog } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  const matDialogStub = {
    open: (dialogComponentName1, object2) => ({
      afterClosed: () => {
        return { subscribe: result => [] };
      }
    }),
    closeAll: () => ({
      afterClosed: () => {
        return { subscribe: result => [] };
      }
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule, MatAutocompleteModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MovieCardComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: matDialogStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call onValChange method', () => {
    const socialPlatform = 'google';
    expect(component.onValChange).toBeDefined();
    spyOn(component, 'onValChange').and.callThrough();
    component.onValChange(socialPlatform);
    expect(component.onValChange).toHaveBeenCalled();
  });

  it('can call isInvalid method', () => {
    expect(component.isInvalid).toBeDefined();
    spyOn(component, 'isInvalid').and.callThrough();
    component.isInvalid();
    expect(component.isInvalid).toHaveBeenCalled();
  });

  it('can call checKToDialog method', () => {
    expect(component.checKToDialog).toBeDefined();
    spyOn(component, 'checKToDialog').and.callThrough();
    component.checKToDialog();
    expect(component.checKToDialog).toHaveBeenCalled();
  });

  it('can call preBookDialog method', () => {
    expect(component.preBookDialog).toBeDefined();
    spyOn(component, 'preBookDialog').and.callThrough();
    component.preBookDialog();
    expect(component.preBookDialog).toHaveBeenCalled();
  });

  it('can call openDialog method', () => {
    expect(component.openDialog).toBeDefined();
    spyOn(component, 'openDialog').and.callThrough();
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('can call trackCastandCrew method', () => {
    const index = 1;
    const cast = {
      is: 1
    };
    expect(component.trackCastandCrew).toBeDefined();
    spyOn(component, 'trackCastandCrew').and.callThrough();
    component.trackCastandCrew(index, cast);
    expect(component.trackCastandCrew).toHaveBeenCalled();
  });

  it('can call ngOnChanges   method', () => {
    expect(component.ngOnChanges).toBeDefined();
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges();
    expect(component.ngOnChanges).toHaveBeenCalled();
  });
});
