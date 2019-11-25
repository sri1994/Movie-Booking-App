import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

describe('HomeService', () => {
  let service: HomeService;

  const httpClientStub = {
    get: arg1 => ({
      subscribe: (success, err) => {
        const obj = {
          firstname: 'John',
          lastname: 'Doe',
          age: 50,
          eyecolor: 'blue',
          results: [
            {
              casts: ['casts', 'crew']
            }
          ],
          cast: ['Banana', 'Orange', 'Apple', 'Mango'],
          crew: ['casts', 'crew'],
          users: [
            {
              uid: 1,
              preferences: 'Hindi'
            }
          ]
        };
        const error = {
          message: 'Error'
        };
        success(obj);
        // err(error);
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

  const storeStub = {
    select: arg1 => ({
      subscribe: success => {
        const res = {
          State: 1,
          nowPlayingMoviesSelector: ''
        };
        success(res);
      }
    }),
    dispatch: arg1 => {}
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        { provide: HttpClient, useValue: httpClientStub },
        {
          provide: Store,
          useValue: storeStub
        }
      ]
    })
  );

  it('should be created', () => {
    service = TestBed.get(HomeService);
    // expect(service).toBeTruthy();
  });

  it('can call getNowshowing method', () => {
    // const socialPlatform = 'google';
    expect(service.getNowshowing).toBeDefined();
    spyOn(service, 'getNowshowing').and.callThrough();
    service.getNowshowing(1);
    expect(service.getNowshowing).toHaveBeenCalled();
  });

  it('can call getUpcomingMovies method', () => {
    // const socialPlatform = 'google';
    expect(service.getUpcomingMovies).toBeDefined();
    spyOn(service, 'getUpcomingMovies').and.callThrough();
    service.getUpcomingMovies(1);
    expect(service.getUpcomingMovies).toHaveBeenCalled();
  });

  it('can call getGenres method', () => {
    // const socialPlatform = 'google';
    expect(service.getGenres).toBeDefined();
    spyOn(service, 'getGenres').and.callThrough();
    service.getGenres();
    expect(service.getGenres).toHaveBeenCalled();
  });

  it('can call fetchGenres method', () => {
    // const socialPlatform = 'google';
    expect(service.fetchGenres).toBeDefined();
    spyOn(service, 'fetchGenres').and.callThrough();
    service.fetchGenres();
    expect(service.fetchGenres).toHaveBeenCalled();
  });

  it('can call getCastAndCrew method', () => {
    // const movie = {
    //   title: 'string',
    //   id: 1,
    //   casts: [
    //     {
    //       name: 'string',
    //       profile_path: 'string',
    //       character: 'string',
    //       id: 'string',
    //       credit_id: 'string'
    //     }
    //   ],
    //   crews: [
    //     {
    //       name: 'string',
    //       profile_path: 'string',
    //       department: 'string',
    //       job: 'string',
    //       id: 'string',
    //       credit_id: 'string'
    //     }
    //   ],
    //   popularity: 'string',
    //   poster_path: 'string',
    //   release_date: 'string',
    //   original_language: 'string',
    //   overview: 'string',
    //   genre_ids: 'any',
    //   vote_average: 6,
    //   vote_count: 8
    // };
    // expect(service.getCastAndCrew).toBeDefined();
    // spyOn(service, 'getCastAndCrew').and.callThrough();
    // service.getCastAndCrew(movie);
    // expect(service.getCastAndCrew).toHaveBeenCalled();
  });

  it('can call getGenres method', () => {
    // const socialPlatform = 'google';
    expect(service.getGenres).toBeDefined();
    spyOn(service, 'getGenres').and.callThrough();
    service.getGenres();
    expect(service.getGenres).toHaveBeenCalled();
  });

  it('can call getTheaterList method', () => {
    // const socialPlatform = 'google';
    expect(service.getTheaterList).toBeDefined();
    spyOn(service, 'getTheaterList').and.callThrough();
    service.getTheaterList();
    expect(service.getTheaterList).toHaveBeenCalled();
  });

  it('can call getUserPreference method', () => {
    // const socialPlatform = 'google';
    expect(service.getUserPreference).toBeDefined();
    spyOn(service, 'getUserPreference').and.callThrough();
    service.getUserPreference();
    expect(service.getUserPreference).toHaveBeenCalled();
  });
  it('can call setPreference method', () => {
    const newPreference = 'google';
    const currentUserId = 1;
    expect(service.setPreference).toBeDefined();
    spyOn(service, 'setPreference').and.callThrough();
    service.setPreference(newPreference, currentUserId);
    expect(service.setPreference).toHaveBeenCalled();
  });
});
