import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { AuthFacadeService } from '@app/auth';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement: any;
  @ViewChild('infowindow-content') infoWindowContent: any;
  public map: google.maps.Map;
  public infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();

  private placesService: google.maps.places.PlacesService;
  

  private infowindowContent: HTMLElement;
  private markers: google.maps.Marker[] = [];

  private MARKER_PATH =
    'https://developers.google.com/maps/documentation/javascript/images/marker_green';

  constructor(private authFacade: AuthFacadeService) {}

  ngOnInit(): void {
    this.authFacade.loadCurrentUser();
  }

  ngAfterViewInit(): void {
    this.mapInit();

    this.initCurrentLocationButton();
    this.initSearchBox2();
  }

  private mapInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(42.69512293711063, 23.321151902018464),
      zoom: 13,
      mapId: '46e9a02490e5def9',
      fullscreenControl: false,
      mapTypeControl: false
    };

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );

    this.placesService = new google.maps.places.PlacesService(this.map);
    this.infoWindow = new google.maps.InfoWindow();
    this.infowindowContent = document.getElementById(
      'infowindow-content'
    ) as HTMLElement;
    this.infoWindow.setContent(this.infowindowContent);

    this.map.addListener('click', this.handleClick.bind(this));
  }

  private initSearchBox2(): void {
    const searchContainer = document.getElementById('search-container') as HTMLElement;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchContainer);

    const input = document.getElementById('pac-input') as HTMLInputElement;
    const options = {
      // bounds: defaultBounds,
      // componentRestrictions: { country: "us" },
      // fields: ["address_components", "geometry", "icon", "name"],
      // strictBounds: false,
      types: ['establishment']
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById(
      'infowindow-content'
    ) as HTMLElement;

    infowindow.setContent(infowindowContent);

    const map = this.map;
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();
      console.log(place);
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      let address = '';

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            '',
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            '',
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            ''
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });
  }

  public onKey(value: string): void {
    console.log(value);

    
  }

  private search(): void {
    const search = {
      bounds: this.map.getBounds() as google.maps.LatLngBounds,
      types: ['lodging']
    };

    this.placesService.nearbySearch(
      search,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // clearResults();
          this.clearMarkers();
          // while (pagination && pagination.hasNextPage) {
          // console.log(results);
          // pagination.nextPage();
          // }
          console.log(results);

          // Create a marker for each hotel found, and
          // assign a letter of the alphabetic to each marker icon.
          for (let i = 0; i < results.length; i++) {
            const markerLetter = String.fromCharCode(
              'A'.charCodeAt(0) + (i % 26)
            );
            const markerIcon = this.MARKER_PATH + markerLetter + '.png';

            // Use marker animation to drop the icons incrementally on the map.
            this.markers[i] = new google.maps.Marker({
              map: this.map,
              position: (
                results[i].geometry as google.maps.places.PlaceGeometry
              ).location,
              animation: google.maps.Animation.DROP,
              icon: markerIcon
            });
            // If the user clicks a hotel marker, show the details of that hotel
            // in an info window.
            // this.markers[i].placeResult = results[i];
            // google.maps.event.addListener(this.markers[i], "click", showInfoWindow);
            // setTimeout(dropMarker(i), i * 100);
            // addResult(results[i], i);
          }

          // if (pagination.hasNextPage) {
          //   delay(2000);
          //   pagination.nextPage();
          // }
        }
      }
    );
  }

  private clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i]) {
        this.markers[i].setMap(null);
      }
    }

    this.markers = [];
  }

  private initCurrentLocationButton(): void {
    const locationButton = document.createElement('button');

    locationButton.style.backgroundColor = 'yellow';

    locationButton.textContent = 'Pan to Current Location';
    locationButton.classList.add('custom-map-control-button');

    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
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
            this.infoWindow.setPosition(pos);
            // this.infoWindow.open(this.map);
            this.map.setCenter(pos);
          },
          () => {
            this.handleLocationError(
              true,
              this.infoWindow,
              this.map.getCenter()!
            );
          }
        );
      } else {
        this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
      }
    });
  }

  private handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

  public isIconMouseEvent(
    e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ): e is google.maps.IconMouseEvent {
    return 'placeId' in e;
  }

  public handleClick(
    event: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ) {
    console.log('You clicked on: ' + event.latLng);

    // If the event has a placeId, use it.
    if (this.isIconMouseEvent(event)) {
      console.log('You clicked on place:' + event.placeId);

      event.stop();

      if (event.placeId) {
        this.getPlaceInformation(event.placeId);
      }
    }
  }

  private getPlaceInformation(placeId: string) {
    this.placesService.getDetails(
      {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'place_id', 'geometry']
      },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        console.log(place);
        if (
          status === 'OK' &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          this.infoWindow.close();
          this.infoWindow.setPosition(place.geometry.location);
          (
            this.infowindowContent.children['place-icon'] as HTMLImageElement
          ).src = place.icon as string;
          (
            this.infowindowContent.children['place-name'] as HTMLElement
          ).textContent = place.name!;
          (
            this.infowindowContent.children['place-id'] as HTMLElement
          ).textContent = place.place_id as string;
          (
            this.infowindowContent.children['place-address'] as HTMLElement
          ).textContent = place.formatted_address as string;
          this.infoWindow.open(this.map);
        }
      }
    );
  }
}
