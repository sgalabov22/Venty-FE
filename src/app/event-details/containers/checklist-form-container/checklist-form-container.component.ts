import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserData } from '@app/auth';
import { ChecklistItem } from '../../interfaces';
import { EventDetailsFacadeService } from '../../services';

@Component({
  selector: 'app-checklist-form-container',
  templateUrl: './checklist-form-container.component.html',
  styleUrls: ['./checklist-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistFormContainerComponent {
  public checklistForm: FormGroup;
  public header: string;
  public eventId: number;
  public faHeart = faHeart;
  public showViewers: boolean;
  public users$ = this.eventDetailsFacade.users$;
  public checklistItem?: ChecklistItem;
  public isCreate?: boolean;

  constructor(
    private fb: FormBuilder,
    private eventDetailsFacade: EventDetailsFacadeService,
    public config: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) {
    this.checklistItem = this.config.data?.checklistItem;
    this.isCreate = this.config.data?.isCreate;
    this.eventId = this.config.data?.eventId;
    this.header = this.isCreate ? 'Create Checklist' : 'Modify Checklist';
    this.checklistForm = this.fb.group({
      checklistFormControl: [null, Validators.required]
    });
  }

  public createChecklist(): void {
    const formControlValue = this.checklistForm.get(
      'checklistFormControl'
    ).value;
    const checklistItemPayload = {
      name: formControlValue.name,
      items: formControlValue.items.map((i) => ({
        value: i
      }))
    } as ChecklistItem;
    this.eventDetailsFacade.addChecklist(this.eventId, checklistItemPayload);
  }

  public modifyChecklist(): void {
    const formControlValue = this.checklistForm.get(
      'checklistFormControl'
    ).value;
    const updatedItemPayload = {
      name: formControlValue.name,
      items: formControlValue.items.map((val, index) => ({
        id: this.checklistItem.items[index]?.id,
        status: this.checklistItem.items[index]?.status,
        value: val
      }))
    } as ChecklistItem;
    this.eventDetailsFacade.updateChecklistItem(
      this.eventId,
      this.checklistItem?.id,
      updatedItemPayload
    );
  }

  public deleteChecklist(event: Event): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete this extension?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventDetailsFacade.deleteChecklistExtension(
          this.eventId,
          this.checklistItem.id
        );
      }
    });
  }

  public searchViewers(term: string): void {
    this.eventDetailsFacade.loadSearchChecklistUsers(
      term,
      this.eventId,
      this.checklistItem.id
    );
  }

  public addViewer(viewer: CurrentUserData): void {
    this.eventDetailsFacade.addChecklistViewer(
      this.eventId,
      this.checklistItem.id,
      viewer
    );
  }

  public removeViewer(viewer: CurrentUserData, event: Event): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to remove this viewer?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventDetailsFacade.removeChecklistViewers(
          this.eventId,
          this.checklistItem.id,
          viewer
        );
      }
    });
  }
}
