import { TestBed, async } from '@angular/core/testing';

import { SearchApiService } from './search-api.service';
import { HttpClient } from '@angular/common/http';

describe('SearchApiService', () => {
  let service: SearchApiService;

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
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientStub
        }
      ]
    })));

  beforeEach(() => {
    service = TestBed.get(SearchApiService);
  });

  it('should be created', () => {
    // const service: SearchApiService = TestBed.get(SearchApiService);
    expect(service).toBeTruthy();
  });

  it('can getMovies', () => {
    const movieList = '';
    expect(service.getMovies).toBeDefined();
    spyOn(service, 'getMovies').and.callThrough();
    service.getMovies(movieList);
    expect(service.getMovies).toHaveBeenCalled();
  });

  it('can searchMovieFromStore', () => {
    const movieList = [];
    const query = '';
    expect(service.searchMovieFromStore).toBeDefined();
    spyOn(service, 'searchMovieFromStore').and.callThrough();
    service.searchMovieFromStore(movieList, query);
    expect(service.searchMovieFromStore).toHaveBeenCalled();
  });
});
