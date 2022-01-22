import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EventDetailsFacadeService } from '@app/event-details/services';

@Component({
  selector: 'app-event-details-container',
  templateUrl: './event-details-container.component.html',
  styleUrls: ['./event-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsContainerComponent {
  public eventInfo$ = this.eventDetailsFacade.eventInfo$;
  public infoTextData$ = this.eventDetailsFacade.infoTextData$;
  public guestList$ = this.eventDetailsFacade.guestList$;
  public locationData$ = this.eventDetailsFacade.locationData$;
  public reviewsList$ = this.eventDetailsFacade.reviewsList$;

  constructor(private eventDetailsFacade: EventDetailsFacadeService) {
    this.eventDetailsFacade.loadEventInfo();
    this.eventDetailsFacade.loadGuestList();
    this.eventDetailsFacade.loadLocationData();
  }
}
