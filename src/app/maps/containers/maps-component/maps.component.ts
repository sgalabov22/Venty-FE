import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { AuthFacadeService } from '@app/auth';
import { Observable } from 'rxjs';
import { MapsActionsService } from '../../services';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsComponent implements AfterViewInit {
  @ViewChild('map') mapElement: any;
  public map: Observable<google.maps.Map> = this.mapsActionsService.map$;

  public locationTypeOptions: string[] = [
    'Restaurant',
    'Lodging',
    'Supermarket',
    'Gym'
  ];
  public selectedOptions: string[] = [];
  public selectedRadius: string;
  public radiusOptions: string[] = ['500 meters', '1000 meters', '1500 meters'];

  constructor(
    private authFacade: AuthFacadeService,
    private mapsActionsService: MapsActionsService
  ) {}

  ngAfterViewInit(): void {
    this.mapInit();

    this.initCurrentLocationButton();
    this.initSearchBox();
    this.initRadiusChange();
  }

  private mapInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(42.69512293711063, 23.321151902018464),
      zoom: 13,
      mapId: '46e9a02490e5def9',
      fullscreenControl: false,
      mapTypeControl: false
    };

    this.mapsActionsService.initMap(
      this.mapElement.nativeElement,
      mapProperties
    );
  }

  private initSearchBox(): void {
    const searchContainer = document.getElementById(
      'search-container'
    ) as HTMLElement;

    const input = document.getElementById('pac-input') as HTMLInputElement;
    const options = {
      // bounds: defaultBounds,
      // componentRestrictions: { country: "us" },
      // fields: ["address_components", "geometry", "icon", "name"],
      // strictBounds: false,
      // types: ['establishment']
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    this.mapsActionsService.loadSearchBox(searchContainer, autocomplete);
  }

  public initRadiusChange(): void {
    const radiusChange = document.getElementById(
      'radius-change'
    ) as HTMLElement;

    this.mapsActionsService.loadRadiusChange(radiusChange);
  }

  public radiusChange(): void {
    this.mapsActionsService.setSelectedRadius(this.selectedRadius);
  }

  public changedOptions(): void {
    this.mapsActionsService.setOptions(this.selectedOptions);
  }

  public onKey(value: string): void {
    console.log(value);
  }

  private initCurrentLocationButton(): void {
    const locationButton = document.createElement('button');

    locationButton.style.backgroundColor = '#20262e';
    locationButton.style.color = 'rgba(255, 255, 255, 0.6)';

    locationButton.textContent = 'Go to Current Location';
    locationButton.classList.add('custom-map-control-button');

    this.mapsActionsService.loadCurrentLocation(locationButton);
  }
}
