import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  public locationTypeOptions: string[] = [
    'Restaurant',
    'Lodging',
    'Supermarket',
    'Gym'
  ];
  public selectedOptions: string[] = [];
  public selectedRadius: string;
  public radiusOptions: string[] = ['500 meters', '1000 meters', '1500 meters'];

  public modalTitle = 'Create event';
  public showCreateEvent$: Observable<boolean> =
    this.mapsActionsService.showCreateEvent$;
  public showCreateEvent = false;

  public createEventForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
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

    this.mapsActionsService.changeModalState(false);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngAfterViewInit(): void {
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

  public closeModal(): void {
    console.log('closing');
    this.mapsActionsService.changeModalState();
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

  public get title(): FormControl {
    return this.createEventForm.get('title') as FormControl;
  }

  public get startDate(): FormControl {
    return this.createEventForm.get('startDate') as FormControl;
  }

  public get endDate(): FormControl {
    return this.createEventForm.get('endDate') as FormControl;
  }

  public onCreateEvent(): void {
    console.log(this.mapsActionsService.selectedPlace);

    const bodyParams: EventCreateData = {
      event_title: this.title.value,
      start_date: this.startDate.value,
      end_date: this.endDate.value,
      description: 'test123',
      location: this.mapsActionsService.selectedPlace
    };

    console.log(bodyParams);
    this.eventsActionsFacade.createEvent(bodyParams);
    this.router.navigate(['calendar']);
  }

  public getMinDate(): Date {
    return new Date(this.startDate.value);
  }
}
