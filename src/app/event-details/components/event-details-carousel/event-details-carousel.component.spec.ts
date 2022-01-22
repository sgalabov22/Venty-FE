import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsCarouselComponent } from './event-details-carousel.component';

describe('EventDetailsCarouselComponent', () => {
  let component: EventDetailsCarouselComponent;
  let fixture: ComponentFixture<EventDetailsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventDetailsCarouselComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
