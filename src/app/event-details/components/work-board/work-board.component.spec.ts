import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBoardComponent } from './work-board.component';

describe('WorkBoardComponent', () => {
  let component: WorkBoardComponent;
  let fixture: ComponentFixture<WorkBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkBoardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
