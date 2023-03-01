import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterInterestComponent } from './filter-interest.component';

describe('FilterInterestComponent', () => {
  let component: FilterInterestComponent;
  let fixture: ComponentFixture<FilterInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
