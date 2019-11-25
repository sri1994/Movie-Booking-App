import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmationModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialogRefStub
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogDataStub
        },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can onCloseConfirm', () => {
    const movieList = '';
    expect(component.onCloseConfirm).toBeDefined();
    spyOn(component, 'onCloseConfirm').and.callThrough();
    component.onCloseConfirm();
    expect(component.onCloseConfirm).toHaveBeenCalled();
  });
});
