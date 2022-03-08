import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormContainerComponent } from './reminder-form-container.component';

describe('ReminderFormContainerComponent', () => {
  let component: ReminderFormContainerComponent;
  let fixture: ComponentFixture<ReminderFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReminderFormContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
