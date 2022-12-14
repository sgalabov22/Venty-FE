import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-guest-reviews',
  templateUrl: './guest-reviews.component.html',
  styleUrls: ['./guest-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestReviewsComponent {
  @Input() reviewsList: google.maps.places.PlaceReview[];
  @Input() totalReviews: number;

  public showAllReviews = false;
  public modalTitle = 'Place Reviews';

  public closeModal(): void {
    console.log('closing');
  }
}
