import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUserData } from '@app/auth';
import { ReminderItem } from '@app/event-details/interfaces';
import { EventDetailsFacadeService } from '@app/event-details/services';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-reminder-form-container',
  templateUrl: './reminder-form-container.component.html',
  styleUrls: ['./reminder-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReminderFormContainerComponent {
  public reminderForm: FormGroup;
  public header: string;
  public eventId: number;
  public faHeart = faHeart;
  public showViewers: boolean;
  public users$ = this.eventDetailsFacade.users$;
  public reminderItem?: ReminderItem;
  public isCreate?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private eventDetailsFacade: EventDetailsFacadeService,
    private confirmationService: ConfirmationService
  ) {
    this.reminderItem = this.config.data?.reminderItem;
    if (this.reminderItem) {
      this.reminderItem.viewers = this.reminderItem.viewers?.reverse();
    }
    this.isCreate = this.config.data?.isCreate;
    this.eventId = this.config.data?.eventId;
    this.header = this.isCreate ? 'Create Reminder' : 'Modify Reminder';

    this.reminderForm = this.formBuilder.group({
      reminderFormControl: [null, Validators.required]
    });
  }

  public createReminder(): void {
    const formControlValue = this.reminderForm.get('reminderFormControl').value;
    const reminderItemPayload = {
      name: formControlValue.name,
      scheduled: formControlValue.scheduled,
      email_body: formControlValue.emailBody
    } as ReminderItem;

    this.eventDetailsFacade.addReminder(this.eventId, reminderItemPayload);
  }

  public modifyReminder(): void {
    const formControlValue = this.reminderForm.get('reminderFormControl').value;
    const reminderItemPayload = {
      name: formControlValue.name,
      scheduled: formControlValue.scheduled,
      email_body: formControlValue.emailBody
    } as ReminderItem;

    this.eventDetailsFacade.updateReminderItem(
      this.eventId,
      this.reminderItem?.id,
      reminderItemPayload
    );
  }

  public deleteReminder(event: Event): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete this extension?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventDetailsFacade.deleteReminderExtension(
          this.eventId,
          this.reminderItem.id
        );
      }
    });
  }

  public searchViewers(term: string): void {
    this.eventDetailsFacade.loadSearchReminderUsers(
      term,
      this.eventId,
      this.reminderItem.id
    );
  }

  public addViewer(viewer: CurrentUserData): void {
    this.eventDetailsFacade.addReminderViewer(
      this.eventId,
      this.reminderItem.id,
      viewer
    );
  }

  public removeViewer(viewer: CurrentUserData, event: Event): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to remove this viewer?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventDetailsFacade.removeReminderViewers(
          this.eventId,
          this.reminderItem.id,
          viewer
        );
      }
    });
  }
}
