import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistFormControlComponent } from './checklist-form-control.component';

describe('ChecklistFormControlComponent', () => {
  let component: ChecklistFormControlComponent;
  let fixture: ComponentFixture<ChecklistFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecklistFormControlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
