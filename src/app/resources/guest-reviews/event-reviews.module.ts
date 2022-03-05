import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { GuestReviewsComponent } from './components/guest-reviews.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GuestReviewsComponent],
  imports: [
    CommonModule,
    RatingModule,
    DialogModule,
    DynamicDialogModule,
    FormsModule,
  ],
  exports: [GuestReviewsComponent]
})
export class GuestReviewsModule {}