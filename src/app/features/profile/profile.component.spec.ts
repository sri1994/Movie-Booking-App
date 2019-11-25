import { LoginService } from './../../core/services/login.service';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { HomeService } from '../home/services/home.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
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

  const formBuilderStub = new FormBuilder();

  const storeStub = {
    select: arg1 => ({
      subscribe: success => {
        const res = [{ id: 1 }];
        success(res);
      }
    }),
    dispatch: arg1 => {}
  };

  const matDialogStub = {
    open: (dialogComponentName1, object2) => ({
      afterClosed: () => {
        return { subscribe: result => [] };
      }
    }),
    closeAll: () => ({
      afterClosed: () => {
        return { subscribe: result => [] };
      }
    })
  };

  const loginServiceStub = {
    getUserData: () => ({
      subscribe: success => {
        const res = { users: 'Anuroop' };
        success(res);
      }
    })
  };

  const homeServiceStub = {
    getNowshowing: home => ({}),
    getGenres: () => ({}),
    getUpcomingMovies: home => ({}),
    setPreference: (arg1, arg2) => ({})
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [ProfileComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogStub },
        { provide: HttpClient, useValue: httpClientStub },
        {
          provide: Store,
          useValue: storeStub
        },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: LoginService, useValue: loginServiceStub },
        { provide: HomeService, useValue: homeServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.newPreference = formBuilderStub.group({
      lang: new FormControl(),
      generes: new FormControl(),
      theaters: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call submitPreferences method', () => {
    expect(component.submitPreferences).toBeDefined();
    spyOn(component, 'submitPreferences').and.callThrough();
    component.submitPreferences();
    expect(component.submitPreferences).toHaveBeenCalled();
  });

  it('can call sucess method', () => {
    expect(component.sucess).toBeDefined();
    spyOn(component, 'sucess').and.callThrough();
    component.sucess();
    expect(component.sucess).toHaveBeenCalled();
  });

  it('can call track method', () => {
    const index = 1;
    const item = [];
    expect(component.track).toBeDefined();
    spyOn(component, 'track').and.callThrough();
    component.track(index, item);
    expect(component.track).toHaveBeenCalled();
  });
});
