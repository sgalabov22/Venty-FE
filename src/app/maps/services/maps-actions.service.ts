import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsActionsService {
  private map$$ = new BehaviorSubject<google.maps.Map>(null);
  public map$: Observable<google.maps.Map> = this.map$$.asObservable();

  private searchResults$$ = new BehaviorSubject<
    google.maps.places.PlaceResult[]
  >([]);
  public searchResults$: Observable<google.maps.places.PlaceResult[]> =
    this.searchResults$$.asObservable();

  private showCreateEvent$$ = new BehaviorSubject<boolean>(false);
  public showCreateEvent$: Observable<boolean> =
    this.showCreateEvent$$.asObservable();

  private selectedPlaceDetails$$ =
    new BehaviorSubject<google.maps.places.PlaceResult>(null);
  public selectedPlaceDetails$: Observable<google.maps.places.PlaceResult> =
    this.selectedPlaceDetails$$.asObservable();

  private selectedPlaceReviews$$ = new BehaviorSubject<
    google.maps.places.PlaceReview[]
  >([]);
  public selectedPlaceReviews$: Observable<google.maps.places.PlaceReview[]> =
    this.selectedPlaceReviews$$.asObservable();

  private placesService: google.maps.places.PlacesService;
  private marker: google.maps.Marker;

  public selectedPlace: string = null;

  private getNextPage: () => void | false;
  public stopLoading = false;
  private categories: string[] = [];
  private selectedRadius = 500;

  public initMap(nativeElement: any): void {
    const mapProperties = {
      center: new google.maps.LatLng(42.69512293711063, 23.321151902018464),
      zoom: 13,
      mapId: '46e9a02490e5def9',
      fullscreenControl: false,
      mapTypeControl: false
    };

    this.map$$.next(new google.maps.Map(nativeElement, mapProperties));

    this.placesService = new google.maps.places.PlacesService(this.map$$.value);

    const map = this.map$$.value;
    this.marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    this.map$$.value.addListener('click', (mapsMouseEvent) => {
      const position = mapsMouseEvent.latLng;

      if (this.isIconMouseEvent(mapsMouseEvent)) {
        mapsMouseEvent.stop();
        this.selectedPlace = mapsMouseEvent['placeId'];
        this.showCreateEvent$$.next(true);
        this.searchResults$$.next([]);
      } else {
        this.getNearbyPlaces(position);
      }
      this.map$$.value.setCenter(position);
      this.marker.setPosition(position);
    });
  }

  private isIconMouseEvent(event: google.maps.MapMouseEvent): boolean {
    return 'placeId' in event;
  }

  public loadNextPage(): void {
    if (this.getNextPage) {
      this.getNextPage();
    }
  }

  public setOptions(options: string[]): void {
    this.categories = options.map((option: string) => option.toLowerCase());
  }

  public changeModalState(value?: boolean): void {
    this.searchResults$$.next([]);
    value != null
      ? this.showCreateEvent$$.next(value)
      : this.showCreateEvent$$.next(!this.showCreateEvent$$.value);
  }

  public setSelectedRadius(radius: string): void {
    switch (radius) {
      case '1000 meters':
        this.selectedRadius = 1000;
        break;

      case '1500 meters':
        this.selectedRadius = 1500;
        break;

      default:
        this.selectedRadius = 500;
        break;
    }
  }

  private getNearbyPlaces(location: google.maps.LatLng): void {
    const request = {
      location: location,
      radius: this.selectedRadius,
      types: this.categories
    };
    this.stopLoading = false;

    const loadNearbyLocations = (
      results: google.maps.places.PlaceResult[],
      status: google.maps.places.PlacesServiceStatus.OK,
      pagination: google.maps.places.PlaceSearchPagination | null
    ) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults$$.next(this.searchResults$$.value.concat(results));

        this.stopLoading = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          this.getNextPage = () => {
            pagination.nextPage();
          };
        }
      }
    };

    this.searchResults$$.next([]);
    this.placesService.nearbySearch(request, loadNearbyLocations);
  }

  public loadRadiusChange(radiusChange: HTMLElement): void {
    const map = this.map$$.value;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(radiusChange);
  }

  public loadCurrentLocation(locationButton: HTMLButtonElement): void {
    this.map$$.value.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
      locationButton
    );

    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            console.log(pos);
            this.map$$.value.setZoom(15);
            this.map$$.value.setCenter(pos);
          }
        );
      }
    });
  }

  public loadPlaceDetails(placeId: string): void {
    this.initMap(document.createElement('div'));
    const request = {
      placeId: placeId
    };

    this.placesService.getDetails(request, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        this.selectedPlaceDetails$$.next(place);
        this.selectedPlaceReviews$$.next(place.reviews);
      }
    });
  }

  public loadSearchBox(
    searchContainer: HTMLElement,
    autocomplete: google.maps.places.Autocomplete
  ): void {
    const map = this.map$$.value;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchContainer);

    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      this.marker.setVisible(false);
      this.searchResults$$.next([]);

      const place = autocomplete.getPlace();
      console.log(place);
      if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.marker.setPosition(place.geometry.location);
      this.marker.setVisible(true);
    });
  }
}
