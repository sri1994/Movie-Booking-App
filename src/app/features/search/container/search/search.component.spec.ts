import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { MatDialog } from '@angular/material';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
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

  const routerStub = {
    navigate: arg => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [{ provide: MatDialog, useValue: matDialogStub }, { provide: Router, useValue: routerStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
