import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  faMapMarkerAlt,
  faClock,
  faLink,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-details-carousel',
  templateUrl: './event-details-carousel.component.html',
  styleUrls: ['./event-details-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsCarouselComponent implements OnChanges {
  @Input() locationData: google.maps.places.PlaceResult;
  @Input() reviewsList: google.maps.places.PlaceReview[];

  public imageUrls: string[];
  public faIcons: IconDefinition[] = [faMapMarkerAlt, faClock, faLink];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['locationData']) {
      // console.log(this.locationData?.photos);
      this.imageUrls = this.locationData?.photos?.map((i) => {
        // console.log(i);
        return i.getUrl({
          maxHeight: 500,
          maxWidth: 500
        });
      }
      );
    }
  }
}
