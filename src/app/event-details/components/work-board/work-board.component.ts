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
  DragAndDropBoardItem,
  ExtensionsData,
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
  public allExtensions: DragAndDropBoardItem[];

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
    const checklistItems = (
      changes['extensionsData'].currentValue as ExtensionsData
    ).checklist;

    const reminderItems = (
      changes['extensionsData'].currentValue as ExtensionsData
    ).reminder;

    this.allExtensions = [...checklistItems, ...reminderItems];
  }

  public ngOnInit(): void {
    this.allExtensions = [
      ...this.extensionsData.checklist,
      ...this.extensionsData.reminder
    ];
  }

  public dropExtension(event: CdkDragDrop<DragAndDropBoardItem[]>): void {
    moveItemInArray(
      this.allExtensions,
      event.previousIndex,
      event.currentIndex
    );
  }
}
