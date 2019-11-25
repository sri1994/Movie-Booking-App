import { TestBed, async } from '@angular/core/testing';

import { LoginService } from './login.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

describe('LoginService', () => {
  let service: LoginService;
  const LoginServiceStub = {
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
        LoginService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub }
      ]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(LoginService);
  });
  it('should be created', () => {
    // const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
  it('can call getUserData method', () => {
    expect(service.getUserData).toBeDefined();
    spyOn(service, 'getUserData').and.callThrough();
    service.getUserData();
    expect(service.getUserData).toHaveBeenCalled();
  });
});
