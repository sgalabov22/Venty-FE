import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacadeService } from '@app/auth';
import { MessageService } from 'primeng/api';
import { UpdateChecklistItem, UpdateEventData } from '../../interfaces';
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
  public extensionsData$ = this.eventDetailsFacade.extensionsData$;
  public currentUser$ = this.authFacade.currentUser$;
  public eventId: number;

  constructor(
    public messageService: MessageService,
    private eventDetailsFacade: EventDetailsFacadeService,
    private authFacade: AuthFacadeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.authFacade.loadCurrentUser();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.eventId = Number(params.get('id'));
      this.eventDetailsFacade.loadAllEventData(this.eventId);
    });
  }

  public ngOnDestroy(): void {
    this.eventDetailsFacade.clearData();
  }

  public clearUsers(): void {
    this.eventDetailsFacade.clearUsers();
  }

  public loadSearchUsers(term: string): void {
    this.eventDetailsFacade.loadSearchUsers(term, this.eventId);
  }

  public addUser(userId: number): void {
    this.eventDetailsFacade.addUser(userId, this.eventId);
  }

  public updateEventData(updatedEvent: UpdateEventData): void {
    this.eventDetailsFacade.updateEventData(updatedEvent, this.eventId);
  }

  public updateChecklistItem({
    extensionId,
    updatedChecklistPayload
  }: UpdateChecklistItem): void {
    this.eventDetailsFacade.updateChecklistItem(
      this.eventId,
      extensionId,
      updatedChecklistPayload
    );
  }
}
