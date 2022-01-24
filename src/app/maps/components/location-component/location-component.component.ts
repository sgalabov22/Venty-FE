import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-location-component',
  templateUrl: './location-component.component.html',
  styleUrls: ['./location-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponentComponent {
  @Input() locationElement: google.maps.places.PlaceResult;
  public locationPhoto: string;

  constructor() {
    console.log(this.locationElement);

    if (
      this.locationElement?.photos &&
      this.locationElement.photos.length > 0
    ) {
      this.locationPhoto = this.locationElement.photos[0].getUrl({
        maxWidth: 150,
        maxHeight: 150
      });
    }
  }
}
