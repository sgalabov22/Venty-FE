import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [ModalDialogComponent],
  imports: [CommonModule, DialogModule],
  exports: [ModalDialogComponent]
})
export class ModalDialogModule {}
