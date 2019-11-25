import { HomeService } from './../../services/home.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const storeStub = {
    select: arg1 => ({
      subscribe: success => {
        const res = {
          State: 1,
          nowPlayingMoviesSelector: ''
        };
        success(res);
      }
    })
  };

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
  const homeServiceStub = {
    getNowshowing: home => ({}),
    getGenres: () => ({}),
    getUpcomingMovies: home => ({})
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        {
          provide: Store,
          useValue: storeStub
        },
        { provide: HttpClient, useValue: httpClientStub },
        { provide: HomeService, useValue: homeServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call getNewSetofComingMovies method', () => {
    const socialPlatform = 'google';
    expect(component.getNewSetofComingMovies).toBeDefined();
    spyOn(component, 'getNewSetofComingMovies').and.callThrough();
    component.getNewSetofComingMovies(socialPlatform);
    expect(component.getNewSetofComingMovies).toHaveBeenCalled();
  });
});
