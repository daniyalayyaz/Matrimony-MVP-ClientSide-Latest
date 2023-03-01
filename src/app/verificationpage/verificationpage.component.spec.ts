import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationpageComponent } from './verificationpage.component';

describe('VerificationpageComponent', () => {
  let component: VerificationpageComponent;
  let fixture: ComponentFixture<VerificationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
