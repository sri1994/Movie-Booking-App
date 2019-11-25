import { HttpClient } from '@angular//common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  const storeStub = {
    select: arg1 => ({
      subscribe: success => {
        const res = [{ id: 1 }];
        success(res);
      }
    }),
    dispatch: arg1 => {}
  };
  const queryParams = {
    id: 1,
    category: 'nowPlaying',
    customerMasterId: ''
  };
  const activatedRouteStub = {
    params: {
      subscribe: res => {
        res(queryParams);
      }
    }
  };

  const httpClientStub = {
    get: arg1 => ({
      subscribe: success => {
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MovieComponent],
      providers: [
        {
          provide: Store,
          useValue: storeStub
        },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: HttpClient, useValue: httpClientStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
