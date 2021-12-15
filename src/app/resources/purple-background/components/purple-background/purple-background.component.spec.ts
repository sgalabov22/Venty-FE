import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurpleBackgroundComponent } from './purple-background.component';

describe('PurpleBackgroundComponent', () => {
  let component: PurpleBackgroundComponent;
  let fixture: ComponentFixture<PurpleBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurpleBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurpleBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
