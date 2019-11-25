import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatReservationModalComponent } from './seat-reservation-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

describe('SeatReservationModalComponent', () => {
  let component: SeatReservationModalComponent;
  let fixture: ComponentFixture<SeatReservationModalComponent>;

  beforeEach(async(() => {
    const matDialogRefStub = {
      close: () => {}
    };

    const matDialogDataStub = {
      userInfo: [],
      backdropEnabled: false,
      function: 'selectUser'
    };

    const routerStub = {
      navigate: arg => {}
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

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [SeatReservationModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialogRefStub
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogDataStub
        },
        { provide: Router, useValue: routerStub },
        { provide: MatDialog, useValue: matDialogStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can onSubmit', () => {
    expect(component.onNoClick).toBeDefined();
    spyOn(component, 'onNoClick').and.callThrough();
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('can onCloseConfirm', () => {
    expect(component.onCloseConfirm).toBeDefined();
    spyOn(component, 'onCloseConfirm').and.callThrough();
    component.onCloseConfirm();
    expect(component.onCloseConfirm).toHaveBeenCalled();
  });

  it('can onCloseCancel', () => {
    expect(component.onCloseCancel).toBeDefined();
    spyOn(component, 'onCloseCancel').and.callThrough();
    component.onCloseCancel();
    expect(component.onCloseCancel).toHaveBeenCalled();
  });

  it('can getStatus', () => {
    const seatPos = 'A2';
    // const reserved = ['A2', 'A3', 'B5', 'C1', 'C2', 'D4'];

    expect(component.getStatus).toBeDefined();
    spyOn(component, 'getStatus').and.callThrough();
    component.getStatus(seatPos);
    expect(component.getStatus).toHaveBeenCalled();
    const result = component.getStatus(seatPos);
    expect(result).toEqual('reserved');
    expect(result).not.toEqual('selected');
  });

  it('can seatClicked', () => {
    const seatPos = '3a';
    expect(component.seatClicked).toBeDefined();
    spyOn(component, 'seatClicked').and.callThrough();
    component.seatClicked(seatPos);
    expect(component.seatClicked).toHaveBeenCalled();
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
