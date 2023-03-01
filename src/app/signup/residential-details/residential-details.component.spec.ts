import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialDetailsComponent } from './residential-details.component';

describe('ResidentialDetailsComponent', () => {
  let component: ResidentialDetailsComponent;
  let fixture: ComponentFixture<ResidentialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
