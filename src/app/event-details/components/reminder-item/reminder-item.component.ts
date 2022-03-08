import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input
} from '@angular/core';
import { DIALOG_SETTINGS } from '@app/core/constants';
import { ReminderFormContainerComponent } from '@app/event-details/containers';
import { ReminderItem } from '@app/event-details/interfaces';
import { EventDetailsFacadeService } from '@app/event-details/services';
import { faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminder-item',
  templateUrl: './reminder-item.component.html',
  styleUrls: ['./reminder-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReminderItemComponent implements OnDestroy {
  @Input() reminderItem: ReminderItem;

  public faHeart = faHeart;
  public faCheckCircle = faCheckCircle;
  public showModify = false;
  public unsubscribe$$ = new Subject<void>();

  constructor(
    private dialogService: DialogService,
    private eventDetailsFacade: EventDetailsFacadeService
  ) {}

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  public openModifyReminder(): void {
    this.eventDetailsFacade.dialogRef = this.dialogService.open(
      ReminderFormContainerComponent,
      {
        ...DIALOG_SETTINGS,
        data: {
          reminderItem: this.reminderItem,
          eventId: this.reminderItem.event
        }
      }
    );

    this.eventDetailsFacade.dialogRef.onClose
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe(() => {
        this.eventDetailsFacade.clearUsers();
      });
  }
}
