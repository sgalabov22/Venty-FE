import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MapsActionsService } from '@app/maps/services';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponentComponent implements OnDestroy {
  public searchResults$: Observable<google.maps.places.PlaceResult[]> =
    this.mapsActionService.searchResults$;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private mapsActionService: MapsActionsService,
    private router: Router
  ) {}

  public loadResultsLazy(): void {
    if (this.mapsActionService.stopLoading) return;

    this.mapsActionService.stopLoading = true;
    console.log('lazy load');
    this.mapsActionService.loadNextPage();
  }

  public getImageUrl(element: google.maps.places.PlaceResult): string {
    console.log(element);

    if (element?.photos && element.photos.length > 0) {
      return element.photos[0].getUrl({
        maxWidth: 210,
        maxHeight: 160
      });
    }
  }

  public getIsOpen(element: google.maps.places.PlaceResult): boolean {
    return element.opening_hours?.isOpen(new Date());
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

  public ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
