import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDialogComponent } from './s-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

describe('SDialogComponent', () => {
  let component: SDialogComponent;
  let fixture: ComponentFixture<SDialogComponent>;
  const storeStub = {
    select: arg1 => ({
      subscribe: success => {
        const res = [];
        success(res);
      }
    }),
    dispatch: arg1 => {}
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

      declarations: [SDialogComponent],
      providers: [
        {
          provide: Store,
          useValue: storeStub
        },
        {
          provide: HttpClient,
          useValue: httpClientStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call changeGenere method', () => {
    const socialPlatform = 'google';
    expect(component.changeGenere).toBeDefined();
    spyOn(component, 'changeGenere').and.callThrough();
    component.changeGenere();
    expect(component.changeGenere).toHaveBeenCalled();
  });


});
