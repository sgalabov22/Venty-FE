import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapsActionsService } from '@app/maps/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponentComponent {
  public searchResults$: Observable<google.maps.places.PlaceResult[]> =
    this.mapsActionService.searchResults$;

  constructor(private mapsActionService: MapsActionsService) {}

  public loadResultsLazy(): void {
    if (this.mapsActionService.stopLoading) return;

    this.mapsActionService.stopLoading = true;
    this.mapsActionService.loadNextPage();
  }

  public getImageUrl(element: google.maps.places.PlaceResult): string {
    if (element?.photos && element.photos.length > 0) {
      return element.photos[0].getUrl({
        maxWidth: 210,
        maxHeight: 160
      });
    }
  }

  public getIsOpen(element: google.maps.places.PlaceResult): string {
    if (element.opening_hours.isOpen) {
      return 'Open now';
    }

    return 'Closed';
  }

  public elementClicked(place: google.maps.places.PlaceResult): void {
    console.log(place.place_id);
    this.mapsActionService.selectedPlace = place.place_id;
    this.mapsActionService.changeModalState();
  }

  public getLocationReviews(element: google.maps.places.PlaceResult): string {
    const rating = element.rating;
    const totalReviews = element.user_ratings_total;
    return rating + '/5 (' + totalReviews + ' reviews)';
  }

  public calcHeight(results: google.maps.places.PlaceResult[]): string {
    if (results.length >= 5) {
      return '900px';
    }

    return results.length * 180 + 'px';
  }
}
