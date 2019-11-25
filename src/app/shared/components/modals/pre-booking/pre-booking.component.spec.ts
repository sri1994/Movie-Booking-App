import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBookingComponent } from './pre-booking.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('PreBookingComponent', () => {
  let component: PreBookingComponent;
  let fixture: ComponentFixture<PreBookingComponent>;

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

  const matDialogRefStub = {
    close: () => {}
  };

  const matDialogDataStub = {
    userInfo: [],
    backdropEnabled: false,
    function: 'selectUser'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [PreBookingComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogStub },
        {
          provide: MatDialogRef,
          useValue: matDialogRefStub
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogDataStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call onNoClick method', () => {
    expect(component.onNoClick).toBeDefined();
    spyOn(component, 'onNoClick').and.callThrough();
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  });
});
