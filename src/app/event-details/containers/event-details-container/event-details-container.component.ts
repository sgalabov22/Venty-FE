import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailsFacadeService } from '../../services';

@Component({
  selector: 'app-event-details-container',
  templateUrl: './event-details-container.component.html',
  styleUrls: ['./event-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsContainerComponent implements OnDestroy {
  public eventInfo$ = this.eventDetailsFacade.eventInfo$;
  public guestList$ = this.eventDetailsFacade.guestList$;
  public locationData$ = this.eventDetailsFacade.locationData$;
  public reviewsList$ = this.eventDetailsFacade.reviewsList$;
  public users$ = this.eventDetailsFacade.users$;
  
  private id: number;

  constructor(
    private eventDetailsFacade: EventDetailsFacadeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.eventDetailsFacade.loadEventInfo(this.id);
      this.eventDetailsFacade.loadGuestList(this.id);
      this.eventDetailsFacade.loadLocationData();
    });
  }

  public ngOnDestroy(): void {
    this.eventDetailsFacade.clearData();
  }

  public clearUsers(): void {
    this.eventDetailsFacade.clearUsers();
  }

  public loadSearchUsers(term: string): void {
    this.eventDetailsFacade.loadSearchUsers(term, this.id);
  }

  public addUser(userId: number): void {
    this.eventDetailsFacade.addUser(userId, this.id);
  }
}
