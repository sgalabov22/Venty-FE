import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventCreateData } from '@app/maps';
import {
  faClock,
  faLink,
  faMapMarkedAlt,
  faMapMarker,
  faPhone,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { EventsActionFacadeService, MapsActionsService } from '../../services';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement: any;
  public map: Observable<google.maps.Map> = this.mapsActionsService.map$;

  public faIcons: IconDefinition[] = [faClock, faMapMarker, faLink, faPhone];

  public locationTypeOptions: string[] = [
    'Restaurant',
    'Lodging',
    'Supermarket',
    'Gym'
  ];
  public selectedOptions: string[] = [];
  public selectedRadius: string;
  public radiusOptions: string[] = ['500 meters', '1000 meters', '1500 meters'];

  public previewModalTitle = '';
  public selectedPlaceDetails$ = this.mapsActionsService.selectedPlaceDetails$;

  public showLocationPreview$: Observable<boolean> =
    this.mapsActionsService.showPreview$;
  public showLocationPreview = false;

  public createModalTitle = 'Create Event';
  public showCreateEvent$: Observable<boolean> =
    this.mapsActionsService.showCreateEvent$;
  public showCreateEvent = false;

  public imageUrls: string[];

  public createEventForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    description: ['']
  });

  private unsubscribe$ = new Subject<void>();

  constructor(
    private mapsActionsService: MapsActionsService,
    private formBuilder: FormBuilder,
    private eventsActionsFacade: EventsActionFacadeService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.showCreateEvent$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: boolean) => {
        this.showCreateEvent = value;
      });

    this.showLocationPreview$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: boolean) => {
        this.showLocationPreview = value;
      });

    this.selectedPlaceDetails$
      .pipe(
        filter((value: google.maps.places.PlaceResult) => !!value),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value: google.maps.places.PlaceResult) => {
        this.previewModalTitle = value.name;
        this.imageUrls = value.photos.map((i) => {
          return i.getUrl({
            maxHeight: 500,
            maxWidth: 500
          });
        });
      });

    this.mapsActionsService.changeModalState(false, 'create');
    this.mapsActionsService.changeModalState(false, 'preview');
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    this.mapInit();

    this.initCurrentLocationButton();
    this.initSearchBox();
    this.initRadiusChange();
  }

  private mapInit(): void {
    this.mapsActionsService.initMap(this.mapElement.nativeElement);
  }

  private initSearchBox(): void {
    const searchContainer = document.getElementById(
      'search-container'
    ) as HTMLElement;

    const input = document.getElementById('pac-input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

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

  public closePreviewModal(): void {
    this.mapsActionsService.changeModalState(false, 'preview');
  }

  public closeCreateModal(): void {
    this.mapsActionsService.changeModalState(false, 'create');
    this.createEventForm.reset();
  }

  private initCurrentLocationButton(): void {
    const locationButton = document.createElement('button');

    locationButton.style.backgroundColor = '#20262e';
    locationButton.style.color = 'rgba(255, 255, 255, 0.6)';

    locationButton.textContent = 'Go to Current Location';
    locationButton.classList.add('custom-map-control-button');

    this.mapsActionsService.loadCurrentLocation(locationButton);
  }

  public get title(): FormControl {
    return this.createEventForm.get('title') as FormControl;
  }

  public get startDate(): FormControl {
    return this.createEventForm.get('startDate') as FormControl;
  }

  public get endDate(): FormControl {
    return this.createEventForm.get('endDate') as FormControl;
  }

  public get description(): FormControl {
    return this.createEventForm.get('description') as FormControl;
  }

  public onCreateEvent(): void {
    const bodyParams: EventCreateData = {
      event_title: this.title.value,
      start_date: this.startDate.value,
      end_date: this.endDate.value,
      description: this.description.value,
      location: this.mapsActionsService.selectedPlace
    };

    this.eventsActionsFacade.createEvent(bodyParams);
    this.router.navigate(['calendar']);
  }

  public getIsOpen(element: google.maps.places.PlaceResult): string {
    if (element.opening_hours && element.opening_hours.isOpen) {
      return 'Open now';
    }

    return 'Closed';
  }

  public proceedClicked(): void {
    this.mapsActionsService.changeModalState(false, 'preview');
    this.mapsActionsService.changeModalState(true, 'create');
  }
}
