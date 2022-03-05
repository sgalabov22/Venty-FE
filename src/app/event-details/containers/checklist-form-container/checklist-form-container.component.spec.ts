import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistFormContainerComponent } from './checklist-form-container.component';

describe('ChecklistFormContainerComponent', () => {
  let component: ChecklistFormContainerComponent;
  let fixture: ComponentFixture<ChecklistFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecklistFormContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
