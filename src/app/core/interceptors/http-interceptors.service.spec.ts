import { TestBed } from '@angular/core/testing';
import { HttpInterceptorService } from './http-interceptors.service';
import { MatSnackBar } from '@angular/material';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { LogService } from '../services/Logger/log.service';

// import { HttpInterceptorsService, HttpInterceptorService } from './http-interceptors.service';
// HttpInterceptorService

describe('HttpInterceptorsService', () => {
  let service: HttpInterceptorService;

  const matSnackBarStub = {
    dismiss: () => ({}),
    open: (message1, string2, object3) => ({})
  };

  const LogServiceStub = {
    ebug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    fatal: () => {},
    log: () => {}
  };

  const httpRequestStub = {
    clone: object1 => ({}),
    headers: { set: () => ({}) }
  };

  const httpHandlerStub = { handle: request1 => ({ pipe: () => ({}) }) };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          useValue: matSnackBarStub
        },
        {
          provide: LogService,
          useValue: LogServiceStub
        },
        { provide: HttpRequest, useValue: httpRequestStub },
        { provide: HttpHandler, useValue: httpHandlerStub }
      ]
    })
  );

  it('should be created', () => {
    service = TestBed.get(HttpInterceptorService);
    expect(service).toBeTruthy();
  });

  describe('intercept', () => {
    it('Should test intercept', () => {
      const request: any = 'Test1';
      const next: any = 'Test2';
      expect(service.intercept).toBeDefined();
      spyOn(service, 'intercept').and.callThrough();
      service.intercept(request, next);
      expect(service.intercept).toHaveBeenCalled();
    });
  });
});
