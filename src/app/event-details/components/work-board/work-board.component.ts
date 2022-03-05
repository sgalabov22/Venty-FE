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
import { CHECKLIST_DIALOG_SETTINGS } from '@app/core/constants';
import {
  ChecklistItem,
  ExtensionsData,
  UpdateChecklistItem
} from '../../interfaces';
import { ChecklistFormContainerComponent } from '../../containers';
import { EventDetailsFacadeService } from '../../services';

@Component({
  selector: 'app-work-board',
  templateUrl: './work-board.component.html',
  styleUrls: ['./work-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkBoardComponent implements OnInit, OnChanges {
  @Input() extensionsData: ExtensionsData;
  @Output() onUpdateChecklistItem = new EventEmitter<UpdateChecklistItem>();

  public items: MenuItem[];
  public checklistItems: ChecklistItem[];

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
              ...CHECKLIST_DIALOG_SETTINGS,
              data: {
                isCreate: true
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
  }

  public ngOnInit(): void {
    this.checklistItems = this.extensionsData.checklist;
  }

  public dropExtension(event: CdkDragDrop<ChecklistItem[]>): void {
    moveItemInArray(
      this.checklistItems,
      event.previousIndex,
      event.currentIndex
    );
  }
}
