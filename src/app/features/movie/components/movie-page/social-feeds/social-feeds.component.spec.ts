import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFeedsComponent } from './social-feeds.component';

describe('SocialFeedsComponent', () => {
  let component: SocialFeedsComponent;
  let fixture: ComponentFixture<SocialFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
