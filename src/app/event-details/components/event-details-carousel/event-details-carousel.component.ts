import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { LocationData, ReviewsList } from '@app/event-details/interfaces';

@Component({
  selector: 'app-event-details-carousel',
  templateUrl: './event-details-carousel.component.html',
  styleUrls: ['./event-details-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsCarouselComponent implements OnChanges {
  @Input() locationData: LocationData;
  @Input() reviewsList: ReviewsList;

  public imageUrls: string[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['locationData']) {
      this.imageUrls = this.locationData?.images?.map((i) => i.url);
    }
  }
}