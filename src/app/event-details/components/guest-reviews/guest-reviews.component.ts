import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReviewsList } from '@app/event-details/interfaces';

@Component({
  selector: 'app-guest-reviews',
  templateUrl: './guest-reviews.component.html',
  styleUrls: ['./guest-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestReviewsComponent {
  @Input() reviewsList: ReviewsList;
}
