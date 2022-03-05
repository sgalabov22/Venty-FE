import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/dynamicdialog';
import { CHECKLIST_DIALOG_SETTINGS } from '@app/core/constants';
import { ChecklistFormContainerComponent } from '../../containers';
import { ChecklistItem, UpdateChecklistItem } from '../../interfaces';
import { EventDetailsFacadeService } from '../../services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistItemComponent implements OnInit, OnDestroy {
  @Input() checklistItem: ChecklistItem;
  @Output() onUpdateChecklistItem = new EventEmitter<UpdateChecklistItem>();

  public faHeart = faHeart;
  public faCheckCircle = faCheckCircle;
  public selectedItems: string[] = [];
  public showModify = false;
  public unsubscribe$$ = new Subject<void>();

  constructor(
    private dialogService: DialogService,
    private eventDetailsFacade: EventDetailsFacadeService
  ) {}

  public ngOnInit(): void {
    this.selectedItems = this.checklistItem.items
      .filter((item) => item.status)
      .map((item) => item.value);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  public openModifyChecklist(): void {
    this.eventDetailsFacade.dialogRef = this.dialogService.open(
      ChecklistFormContainerComponent,
      {
        ...CHECKLIST_DIALOG_SETTINGS,
        data: {
          checklistItem: this.checklistItem,
          eventId: this.checklistItem.event
        }
      }
    );

    this.eventDetailsFacade.dialogRef.onClose
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe(() => {
        this.eventDetailsFacade.clearUsers();
      });
  }

  public checkUncheckItem(itemIndex: number): void {
    const selectedItem = this.checklistItem.items[itemIndex];
    selectedItem.status = !selectedItem.status;
    this.checklistItem.items[itemIndex] = selectedItem;
    const updatedChecklistItem: ChecklistItem = {
      name: this.checklistItem.name,
      items: [...this.checklistItem.items]
    };

    this.onUpdateChecklistItem.emit({
      extensionId: this.checklistItem.id,
      updatedChecklistPayload: updatedChecklistItem
    });
  }
}
