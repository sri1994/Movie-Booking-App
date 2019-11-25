import { TestBed, async } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminService', () => {
  let service: AdminService;
  const adminServiceStub = {
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AdminService, { provide: HttpClient, useValue: httpClientStub }]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(AdminService);
  });
  it('should be created', () => {
    // const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
  it('can call newTheater method', () => {
    const formData = ['LSH'];
    expect(service.newTheater).toBeDefined();
    spyOn(service, 'newTheater').and.callThrough();
    service.newTheater(formData);
    expect(service.newTheater).toHaveBeenCalled();
  });
  it('can call searchMovie method', () => {
    const term = ['LSH'];
    expect(service.searchMovie).toBeDefined();
    spyOn(service, 'searchMovie').and.callThrough();
    service.searchMovie(term);
    expect(service.searchMovie).toHaveBeenCalled();
  });
  it('can call saveNowPlaying method', () => {
    const nowPlaying = ['LSH'];
    const id = 1;
    expect(service.saveNowPlaying).toBeDefined();
    spyOn(service, 'saveNowPlaying').and.callThrough();
    service.saveNowPlaying(nowPlaying, id);
    expect(service.saveNowPlaying).toHaveBeenCalled();
  });
});
