import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePageComponent } from './movie-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';

describe('MoviePageComponent', () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;
  const matDialogStub = {
    open: (dialogComponentName1, object2) => ({
      afterClosed: () => {
        return { subscribe: result => [] };
      }
    }),
    closeAll: () => ({
      afterClosed: () => {
        return {
          subscribe: success => {
            const res = { movieTitle: 'K3g', screen: '3', time: '330', movieList: [] };
            success(res);
          }
        };
      }
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [MoviePageComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: matDialogStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    component.movieDescription = {
      title: 'DDLJ'
    };
    component.theaterList = [];
    component.category = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call checKToDialog method', () => {
    // const socialPlatform = 'google';
    expect(component.checKToDialog).toBeDefined();
    spyOn(component, 'checKToDialog').and.callThrough();
    component.checKToDialog();
    expect(component.checKToDialog).toHaveBeenCalled();
  });

  it('can call openDialog method', () => {
    // const socialPlatform = 'google';
    expect(component.openDialog).toBeDefined();
    spyOn(component, 'openDialog').and.callThrough();
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('can call onValChange method', () => {
    const socialPlatform = 'google';
    expect(component.onValChange).toBeDefined();
    spyOn(component, 'onValChange').and.callThrough();
    component.onValChange(socialPlatform);
    expect(component.onValChange).toHaveBeenCalled();
  });

  it('can call isInvalid method', () => {
    // const socialPlatform = 'google';
    expect(component.isInvalid).toBeDefined();
    spyOn(component, 'isInvalid').and.callThrough();
    component.isInvalid();
    expect(component.isInvalid).toHaveBeenCalled();
  });

  it('can call trackCastandCrew method', () => {
    const index = 1;
    const cast = '';
    expect(component.trackCastandCrew).toBeDefined();
    spyOn(component, 'trackCastandCrew').and.callThrough();
    component.trackCastandCrew(index, cast);
    expect(component.trackCastandCrew).toHaveBeenCalled();
  });

  it('can call ngOnChanges method', () => {
    expect(component.ngOnChanges).toBeDefined();
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges();
    expect(component.ngOnChanges).toHaveBeenCalled();
  });
});
