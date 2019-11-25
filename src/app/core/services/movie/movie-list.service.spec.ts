import { TestBed, async } from '@angular/core/testing';

import { MovieListService } from './movie-list.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

describe('MovieListService', () => {
  let service: MovieListService;
  const MovieListServiceStub = {
    saveNowPlaying: (arg1, arg2) => {},
    newTheater: arg1 => {}
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        MovieListService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub }
      ]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(MovieListService);
  });
  it('should be created', () => {
    // const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
  it('can call getLanguageList method', () => {
    const movieList = [
      { original_language: { name: 'Anv' }, language: 'Hindi', name: 'K3g' },
      { original_language: 'Eng', language: 'Hindi', name: 'K2g' },
      { original_language: 'Eng', language: 'Hindi', name: 'K1g' }
    ];
    expect(service.getLanguageList).toBeDefined();
    spyOn(service, 'getLanguageList').and.callThrough();
    service.getLanguageList(movieList);
    expect(service.getLanguageList).toHaveBeenCalled();
  });

  it('can call getVoteCount method', () => {
    const movieList = [
      { original_language: { name: 'Anv' }, language: 'Hindi', name: 'K3g' },
      { original_language: 'Eng', language: 'Hindi', name: 'K2g' },
      { original_language: 'Eng', language: 'Hindi', name: 'K1g' }
    ];

    const res = [];
    expect(service.getVoteCount).toBeDefined();
    spyOn(service, 'getVoteCount').and.callThrough();
    service.getVoteCount(movieList, res);
    expect(service.getVoteCount).toHaveBeenCalled();
  });
});
