import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDetailsFacadeService } from '@app/event-details/services';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ChecklistItem } from '../../interfaces';

@Component({
  selector: 'app-checklist-form-container',
  templateUrl: './checklist-form-container.component.html',
  styleUrls: ['./checklist-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistFormContainerComponent {
  public checklistForm: FormGroup;
  public header: string;
  public checklistItem?: ChecklistItem;
  public isCreate?: boolean;
  public eventId: number;

  constructor(
    private fb: FormBuilder,
    private eventDetailsFacade: EventDetailsFacadeService,
    public config: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) {
    this.eventId = this.config.data?.eventId;
    this.checklistItem = this.config.data?.checklistItem;
    this.isCreate = this.config.data?.isCreate;
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

  public deleteChecklistExtension(): void {
    this.confirmationService.confirm({
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
}
