import { Injectable } from '@angular/core';
import { CurrentUserData } from '@app/auth';
import { MapsActionsService } from '@app/maps';
import { addHours } from 'date-fns';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventDetailsService } from '.';
import { ExtensionTypeEnum } from '../enums';
import {
  ChecklistItem,
  EventInfo,
  ExtensionsData,
  Guest,
  GuestUserAccount,
  ReminderItem,
  UpdateEventData,
  UpdateGuestStatus
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsFacadeService {
  private eventInfo$$ = new BehaviorSubject<EventInfo>(null);
  public eventInfo$ = this.eventInfo$$.asObservable();

  private guestList$$ = new BehaviorSubject<Guest[]>([]);
  public guestList$ = this.guestList$$.asObservable();

  public locationData$ = this.mapsActionsService.selectedPlaceDetails$;
  public reviewsList$ = this.mapsActionsService.selectedPlaceReviews$;

  private users$$ = new BehaviorSubject<GuestUserAccount[]>([]);
  public users$ = this.users$$.asObservable();

  private extensionsData$$ = new BehaviorSubject<ExtensionsData>(null);
  public extensionsData$ = this.extensionsData$$.asObservable();

  public dialogRef?: DynamicDialogRef;

  constructor(
    private eventDetailsService: EventDetailsService,
    private mapsActionsService: MapsActionsService,
    private messageService: MessageService
  ) {}

  public loadAllEventData(eventId: number): void {
    forkJoin([
      this.eventDetailsService.getEventInfo(eventId),
      this.eventDetailsService.getAllExtensionsForEvent(eventId),
      this.eventDetailsService.getGuestsList(eventId)
    ]).subscribe(([eventInfo, eventExtensions, guestList]) => {
      this.loadLocationData(eventInfo.location);
      this.eventInfo$$.next(eventInfo);
      this.extensionsData$$.next(eventExtensions);
      this.guestList$$.next(guestList);

      console.log(this.extensionsData$$.value);
    });
  }

  public loadAllExtensions(eventId: number): void {
    this.eventDetailsService
      .getAllExtensionsForEvent(eventId)
      .subscribe((eventExtensions) => {
        this.extensionsData$$.next(eventExtensions);
        this.dialogRef?.close();
      });
  }

  public loadGuestList(eventId: number): void {
    this.eventDetailsService.getGuestsList(eventId).subscribe((guestList) => {
      this.guestList$$.next(guestList);
    });
  }

  public loadLocationData(placeId: string): void {
    this.mapsActionsService.loadPlaceDetails(placeId);
  }

  public loadSearchUsers(term: string, eventId: number): void {
    this.eventDetailsService
      .searchUsers(term, eventId)
      .pipe(
        switchMap((users) =>
          of(
            users.filter((u) => {
              if (u.fullname) {
                return u.fullname.toLowerCase().startsWith(term.toLowerCase());
              }
            })
          )
        )
      )
      .subscribe((users) => {
        this.users$$.next(users);
      });
  }

  public loadSearchChecklistUsers(
    term: string,
    eventId: number,
    extensionId: number
  ): void {
    this.eventDetailsService.getGuestsList(eventId),
      this.eventDetailsService
        .getCatalogWithAllAvailableUsers(
          eventId,
          extensionId,
          ExtensionTypeEnum.CHECKLIST
        )
        .pipe(
          switchMap((currentExtensionUsers) =>
            of(
              currentExtensionUsers.filter((user) =>
                user.fullname.toLowerCase().startsWith(term.toLowerCase())
              )
            )
          )
        )
        .subscribe((users) => {
          this.users$$.next(users);
        });
  }

  public loadSearchReminderUsers(
    term: string,
    eventId: number,
    extensionId: number
  ): void {
    this.eventDetailsService.getGuestsList(eventId),
      this.eventDetailsService
        .getCatalogWithAllAvailableUsers(
          eventId,
          extensionId,
          ExtensionTypeEnum.REMINDER
        )
        .pipe(
          switchMap((currentExtensionUsers) =>
            of(
              currentExtensionUsers.filter((user) =>
                user.fullname.toLowerCase().startsWith(term.toLowerCase())
              )
            )
          )
        )
        .subscribe((users) => {
          this.users$$.next(users);
        });
  }

  public updateEventData(updatedData: UpdateEventData, eventId: number): void {
    this.eventDetailsService
      .updateEvent(updatedData, eventId)
      .subscribe((updatedData: UpdateEventData) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Event description has been successfully updated!'
        });

        this.eventInfo$$.next({
          id: this.eventInfo$$.value.id,
          location: this.eventInfo$$.value.location,
          event_owner: this.eventInfo$$.value.event_owner,
          ...updatedData
        });
      });
  }

  public updateGuestStatus(updatedGuestStatus: UpdateGuestStatus): void {
    this.eventDetailsService
      .updateGuestStatus(updatedGuestStatus)
      .subscribe(({ status }) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: `Guest status has been updated to ${status}`
        });
      });
  }

  public updateChecklistItem(
    eventId: number,
    extensionId: number,
    updatedChecklistItem: ChecklistItem
  ): void {
    this.eventDetailsService
      .updateChecklistItem(eventId, extensionId, updatedChecklistItem)
      .subscribe((updatedRes) => {
        this.loadAllExtensions(updatedRes.event);
      });
  }

  public updateReminderItem(
    eventId: number,
    extensionId: number,
    updatedReminderItem: ReminderItem
  ): void {
    this.eventDetailsService
      .updateReminderItem(eventId, extensionId, updatedReminderItem)
      .subscribe((updatedRes) => {
        this.loadAllExtensions(updatedRes.event);
      });
  }

  public removeChecklistViewers(
    eventId: number,
    extensionId: number,
    viewerToRemove: CurrentUserData
  ): void {
    this.eventDetailsService
      .removeExtensionViewer(
        eventId,
        extensionId,
        viewerToRemove,
        ExtensionTypeEnum.CHECKLIST
      )
      .subscribe(() => {
        this.loadAllExtensions(eventId);
      });
  }

  public removeReminderViewers(
    eventId: number,
    extensionId: number,
    viewerToRemove: CurrentUserData
  ): void {
    this.eventDetailsService
      .removeExtensionViewer(
        eventId,
        extensionId,
        viewerToRemove,
        ExtensionTypeEnum.REMINDER
      )
      .subscribe(() => {
        this.loadAllExtensions(eventId);
      });
  }

  public addUser(userId: number, eventId: number): void {
    this.eventDetailsService.addUser(userId, eventId).subscribe((value) => {
      this.loadGuestList(eventId);
    });
  }

  public addChecklist(eventId: number, checklistItem: ChecklistItem): void {
    this.eventDetailsService
      .addChecklist(eventId, checklistItem)
      .subscribe((checklistRes) => {
        this.loadAllExtensions(checklistRes.event);
      });
  }

  public addReminder(eventId: number, reminderItem: ReminderItem): void {
    this.eventDetailsService
      .addReminder(eventId, reminderItem)
      .subscribe((checklistRes) => {
        this.loadAllExtensions(checklistRes.event);
      });
  }

  public addChecklistViewer(
    eventId: number,
    extensionId: number,
    viewer: CurrentUserData
  ): void {
    this.eventDetailsService
      .addViewerToChecklist(eventId, extensionId, viewer)
      .subscribe(() => {
        this.clearUsers();
        this.loadAllExtensions(eventId);
      });
  }

  public addReminderViewer(
    eventId: number,
    extensionId: number,
    viewer: CurrentUserData
  ): void {
    this.eventDetailsService
      .addViewerToReminder(eventId, extensionId, viewer)
      .subscribe(() => {
        this.clearUsers();
        this.loadAllExtensions(eventId);
      });
  }

  public deleteChecklistExtension(eventId: number, extensionId: number): void {
    this.eventDetailsService
      .deleteExtension(eventId, extensionId, ExtensionTypeEnum.CHECKLIST)
      .subscribe(() => {
        this.loadAllExtensions(eventId);
      });
  }

  public deleteReminderExtension(eventId: number, extensionId: number): void {
    this.eventDetailsService
      .deleteExtension(eventId, extensionId, ExtensionTypeEnum.REMINDER)
      .subscribe(() => {
        this.loadAllExtensions(eventId);
      });
  }

  public clearUsers(): void {
    this.users$$.next(null);
  }

  public clearData(): void {
    this.eventInfo$$.next(null);
    this.guestList$$.next(null);
    this.users$$.next(null);
    this.extensionsData$$.next(null);
  }
}
