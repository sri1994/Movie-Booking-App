import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule, MatAutocompleteModule, MatDialog } from '@angular/material';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../../services/login.service';
import { UserDetailService } from '../../services/userDetails.service';
import { Store } from '@ngrx/store';
import { UiService } from 'src/app/shared/ui-service.service';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
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

  const authServiceStub = {
    signIn: arg1 => {
      return Promise.resolve(33);
    },
    signOut: () => {
      return Promise.resolve(33);
    }
  };
  const loginServiceStub = {
    getUserData: () => ({
      subscribe: success => {
        const res = { users: 'Anuroop' };
        success(res);
      }
    })
  };
  const userDetailsStub = {};
  const storeStub = {
    select: arg1 => ({
      subscribe: success => {
        const res = [];
        success(res);
      }
    }),
    dispatch: arg1 => {}
  };
  const uiServiceStub = {
    addNewUser: () => {}
  };
  const routerStub = {
    navigate: arg => {}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule, MatAutocompleteModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogStub },
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: LoginService,
          useValue: loginServiceStub
        },
        {
          provide: UserDetailService,
          useValue: userDetailsStub
        },
        {
          provide: Store,
          useValue: storeStub
        },
        {
          provide: UiService,
          useValue: uiServiceStub
        },
        {
          provide: Router,
          useValue: routerStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.signUpFlag = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call socialSignIn method', () => {
    const socialPlatform = 'google';
    expect(component.socialSignIn).toBeDefined();
    spyOn(component, 'socialSignIn').and.callThrough();
    component.socialSignIn(socialPlatform);
    expect(component.socialSignIn).toHaveBeenCalled();
  });

  it('can call socialSignOut method', () => {
    const socialPlatform = 'google';
    expect(component.socialSignOut).toBeDefined();
    spyOn(component, 'socialSignOut').and.callThrough();
    component.socialSignOut(socialPlatform);
    expect(component.socialSignOut).toHaveBeenCalled();
  });

  it('can call loadProfile method', () => {
    expect(component.loadProfile).toBeDefined();
    spyOn(component, 'loadProfile').and.callThrough();
    component.loadProfile();
    expect(component.loadProfile).toHaveBeenCalled();
  });

  it('can call openSearchPage method', () => {
    expect(component.openSearchPage).toBeDefined();
    spyOn(component, 'openSearchPage').and.callThrough();
    component.openSearchPage();
    expect(component.openSearchPage).toHaveBeenCalled();
  });
});
