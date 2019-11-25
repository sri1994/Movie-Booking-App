import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBookingComponent } from './payment-booking.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

describe('PaymentBookingComponent', () => {
  let component: PaymentBookingComponent;
  let fixture: ComponentFixture<PaymentBookingComponent>;
  const matDialogRefStub = {
    close: () => {}
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

  const queryParams = {
    id: 1,
    category: 'nowPlaying',
    customerMasterId: ''
  };
  const activatedRouteStub = {
    snapshot: {
      params: {
        movieTitle: 'HSSH'
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],

      declarations: [PaymentBookingComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialogRefStub
        },
        { provide: MatDialog, useValue: matDialogStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can openConfirmDialog', () => {
    expect(component.openConfirmDialog).toBeDefined();
    spyOn(component, 'openConfirmDialog').and.callThrough();
    component.openConfirmDialog();
    expect(component.openConfirmDialog).toHaveBeenCalled();
  });
});
