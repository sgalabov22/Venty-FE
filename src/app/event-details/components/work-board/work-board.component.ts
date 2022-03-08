import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DIALOG_SETTINGS } from '@app/core/constants';
import {
  ChecklistItem,
  ExtensionsData,
  ReminderItem,
  UpdateChecklistItem
} from '../../interfaces';
import {
  ChecklistFormContainerComponent,
  ReminderFormContainerComponent
} from '../../containers';
import { EventDetailsFacadeService } from '../../services';

@Component({
  selector: 'app-work-board',
  templateUrl: './work-board.component.html',
  styleUrls: ['./work-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkBoardComponent implements OnInit, OnChanges {
  @Input() extensionsData: ExtensionsData;
  @Input() eventId: number;
  @Output() onUpdateChecklistItem = new EventEmitter<UpdateChecklistItem>();

  public items: MenuItem[];
  public checklistItems: ChecklistItem[];
  public reminderItems: ReminderItem[];

  constructor(
    private dialogService: DialogService,
    private eventDetailsFacade: EventDetailsFacadeService
  ) {
    this.items = [
      {
        icon: 'pi pi-list',
        command: () => {
          this.eventDetailsFacade.dialogRef = this.dialogService.open(
            ChecklistFormContainerComponent,
            {
              ...DIALOG_SETTINGS,
              data: {
                isCreate: true,
                eventId: this.eventId
              }
            }
          );
        }
      },
      {
        icon: 'pi pi-history',
        command: () => {
          this.eventDetailsFacade.dialogRef = this.dialogService.open(
            ReminderFormContainerComponent,
            {
              ...DIALOG_SETTINGS,
              data: {
                isCreate: true,
                eventId: this.eventId
              }
            }
          );
        }
      }
    ];
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.checklistItems = (
      changes['extensionsData'].currentValue as ExtensionsData
    ).checklist;

    this.reminderItems = (
      changes['extensionsData'].currentValue as ExtensionsData
    ).reminder;
  }

  public ngOnInit(): void {
    this.checklistItems = this.extensionsData.checklist;
    this.reminderItems = this.extensionsData.reminder;
  }

  public dropExtension(event: CdkDragDrop<any[]>): void {
    moveItemInArray(
      this.checklistItems,
      event.previousIndex,
      event.currentIndex
    );
  }
}
