import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
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
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientStub
        }
      ]
    })
  );

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MovieService]
    })
  );

  beforeEach(() => {
    service = TestBed.get(MovieService);
  });

  it('can call getMovie method', () => {
    const id = 1;
    expect(service.getMovie).toBeDefined();
    spyOn(service, 'getMovie').and.callThrough();
    service.getMovie(id);
    expect(service.getMovie).toHaveBeenCalled();
  });

  it('can call getCastAndCrew method', () => {
    const id = 1;
    expect(service.getCastAndCrew).toBeDefined();
    spyOn(service, 'getCastAndCrew').and.callThrough();
    service.getCastAndCrew(id);
    expect(service.getCastAndCrew).toHaveBeenCalled();
  });
});
