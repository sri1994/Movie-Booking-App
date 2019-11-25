import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule, MatAutocompleteModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const httpClientStub = {
    get: arg1 => ({
      subscribe: (success, err) => {
        const obj = {
          firstname: 'John',
          lastname: 'Doe',
          age: 50,
          eyecolor: 'blue',
          theaters: ['Hello']
        };
        const error = {
          message: 'Error'
        };
        success(obj);
        err(error);
      }
    }),
    put: arg1 => ({
      subscribe: success => {
        const obj = [
          {
            theaters: {}
          }
        ];
        success(obj);
        return {};
      }
    }),
    post: (arg1, arg2) => ({ pipe: () => ({ pipe: () => ({}) }) })
  };

  const routerStub = {
    navigate: arg => {}
  };

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
      imports: [MatMenuModule, MatAutocompleteModule, ScrollingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomePageComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can call trackMovie method', () => {
    const index = 1;
    const movie = {
      id: 1
    };
    expect(component.trackMovie).toBeDefined();
    spyOn(component, 'trackMovie').and.callThrough();
    component.trackMovie(index, movie);
    expect(component.trackMovie).toHaveBeenCalled();
  });

  it('can call getMovies method', () => {
    expect(component.getMovies).toBeDefined();
    spyOn(component, 'getMovies').and.callThrough();
    component.getMovies();
    expect(component.getMovies).toHaveBeenCalled();
  });
  it('can call tabChanged method', () => {
    const event = {};
    expect(component.tabChanged).toBeDefined();
    spyOn(component, 'tabChanged').and.callThrough();
    component.tabChanged(event);
    expect(component.tabChanged).toHaveBeenCalled();
  });
  it('can call getLanguage method', () => {
    const lang = 'Hindi';
    expect(component.getLanguage).toBeDefined();
    spyOn(component, 'getLanguage').and.callThrough();
    component.getLanguage(lang);
    expect(component.getLanguage).toHaveBeenCalled();
  });
  it('can call getGenre method', () => {
    const g = 'Rock';
    expect(component.getGenre).toBeDefined();
    spyOn(component, 'getGenre').and.callThrough();
    component.getGenre(g);
    expect(component.getGenre).toHaveBeenCalled();
  });
});
