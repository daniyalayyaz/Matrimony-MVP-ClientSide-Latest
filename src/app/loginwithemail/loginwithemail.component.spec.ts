import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwithemailComponent } from './loginwithemail.component';

describe('LoginwithemailComponent', () => {
  let component: LoginwithemailComponent;
  let fixture: ComponentFixture<LoginwithemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginwithemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginwithemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
