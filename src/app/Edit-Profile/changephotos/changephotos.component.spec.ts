import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangephotosComponent } from './changephotos.component';

describe('ChangephotosComponent', () => {
  let component: ChangephotosComponent;
  let fixture: ComponentFixture<ChangephotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangephotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangephotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
