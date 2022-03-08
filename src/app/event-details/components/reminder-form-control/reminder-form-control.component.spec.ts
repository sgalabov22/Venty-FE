import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormControlComponent } from './reminder-form-control.component';

describe('ReminderFormControlComponent', () => {
  let component: ReminderFormControlComponent;
  let fixture: ComponentFixture<ReminderFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReminderFormControlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
