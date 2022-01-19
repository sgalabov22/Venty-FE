import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private authFacade: AuthFacadeService
  ) { }

  ngOnInit(): void {
    this.authFacade.loadCurrentUser();
  }

  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(42.69512293711063, 23.321151902018464),
      zoom: 13,
      mapId: '46e9a02490e5def9',
      fullscreenControl: false,
      mapTypeControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.infoWindow = new google.maps.InfoWindow();
    this.infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    this.infoWindow.setContent(this.infowindowContent);

    this.map.addListener("click", this.handleClick.bind(this));

    this.initCurrentLocationButton();

    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    this.map.addListener("bounds_changed", () => {
      searchBox.setBounds(this.map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const map = this.map;
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  private initCurrentLocationButton(): void {
    const locationButton = document.createElement("button");

    locationButton.style.backgroundColor = 'yellow';

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");

    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            console.log(pos);
            this.infoWindow.setPosition(pos);
            this.infoWindow.open(this.map);
            this.map.setCenter(pos);
          },
          () => {
            this.handleLocationError(true, this.infoWindow, this.map.getCenter()!);
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
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

  public isIconMouseEvent(
    e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ): e is google.maps.IconMouseEvent {
    return "placeId" in e;
  }

  public handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log("You clicked on: " + event.latLng);

    // If the event has a placeId, use it.
    if (this.isIconMouseEvent(event)) {
      console.log("You clicked on place:" + event.placeId);

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
        fields: ["name", "formatted_address", "place_id", "geometry"],
      },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        console.log(place);
        if (
          status === "OK" &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          this.infoWindow.close();
          this.infoWindow.setPosition(place.geometry.location);
          (
            this.infowindowContent.children["place-icon"] as HTMLImageElement
          ).src = place.icon as string;
          (
            this.infowindowContent.children["place-name"] as HTMLElement
          ).textContent = place.name!;
          (
            this.infowindowContent.children["place-id"] as HTMLElement
          ).textContent = place.place_id as string;
          (
            this.infowindowContent.children["place-address"] as HTMLElement
          ).textContent = place.formatted_address as string;
          this.infoWindow.open(this.map);
        }
      }
    );
  }
}