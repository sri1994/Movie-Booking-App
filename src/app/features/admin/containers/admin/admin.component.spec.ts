import { AdminService } from './../../services/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
const adminServiceStub = {
  saveNowPlaying: (arg1, arg2) => {},
  newTheater: arg1 => {}
};

const storeStub = {
  select: arg1 => ({
    subscribe: success => {
      const res = [];
      success(res);
    }
  })
};
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AdminComponent],
      providers: [
        {
          provide: AdminService,
          useValue: adminServiceStub
        },
        {
          provide: Store,
          useValue: storeStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can addTheater', () => {
    const formData = '';
    expect(component.addTheater).toBeDefined();
    spyOn(component, 'addTheater').and.callThrough();
    component.addTheater(formData);
    expect(component.addTheater).toHaveBeenCalled();
  });
});
