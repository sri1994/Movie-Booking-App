import { AdminService } from './../../services/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeShowComponent } from './change-show.component';
import { FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';

const adminServiceStub = {
  saveNowPlaying: (arg1, arg2) => {}
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
describe('ChangeShowComponent', () => {
  let component: ChangeShowComponent;
  let fixture: ComponentFixture<ChangeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChangeShowComponent],
      providers: [
        {
          provide: AdminService,
          useValue: adminServiceStub
        },
        {
          provide: MatDialog,
          useValue: matDialogStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeShowComponent);
    component = fixture.componentInstance;
    component.movieInput = new FormControl();
    component.selectTheater = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can addMovie', () => {
    const movie = {
      name: 'KHNH',
      id: 100
    };
    expect(component.addMovie).toBeDefined();
    spyOn(component, 'addMovie').and.callThrough();
    component.addMovie(movie);
    expect(component.addMovie).toHaveBeenCalled();
  });

  it('can save', () => {
    expect(component.save).toBeDefined();
    spyOn(component, 'save').and.callThrough();
    component.save();
    expect(component.save).toHaveBeenCalled();
  });

  it('can cancel', () => {
    expect(component.cancel).toBeDefined();
    spyOn(component, 'cancel').and.callThrough();
    component.cancel();
    expect(component.cancel).toHaveBeenCalled();
  });

  it('can dialogOk', () => {
    expect(component.dialogOk).toBeDefined();
    spyOn(component, 'dialogOk').and.callThrough();
    component.dialogOk();
    expect(component.dialogOk).toHaveBeenCalled();
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
