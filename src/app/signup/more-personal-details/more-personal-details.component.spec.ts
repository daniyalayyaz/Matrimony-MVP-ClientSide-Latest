import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePersonalDetailsComponent } from './more-personal-details.component';

describe('MorePersonalDetailsComponent', () => {
  let component: MorePersonalDetailsComponent;
  let fixture: ComponentFixture<MorePersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorePersonalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MorePersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
