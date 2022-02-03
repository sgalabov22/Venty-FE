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
    this.mapsActionsService.initMap(
      this.mapElement.nativeElement,
    );
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
      location: {
        "geometry": {
            "lat": -33.866489,
            "lng": 151.1958561
        },
        "opening_hours": {
            "weekly_text": [
                "Monday: 9:00 AM – 5:00 PM",
                "Tuesday: 9:00 AM – 5:00 PM",
                "Wednesday: 9:00 AM – 5:00 PM",
                " Thursday: 9:00 AM – 5:00 PM",
                " Friday: 9:00 AM – 5:00 PM",
                "Saturday: Closed",
                "Sunday: Closed"
            ]
        },
        "photos": [
            {
                "height": 3024,
                "width": 4032,
                "html_attributes": "'<a href=\"https://maps.google.com/maps/contrib/1050673738"
            },
            {
                "height": 3264,
                "width": 4912,
                "html_attributes": "'<a href=\"https://maps.google.com/maps/contrib/102493344958625549078\">Heyang Li</a>',"
            },
            {
                "height": 3,
                "width": 3,
                "html_attributes": "'<a href=\"https://maps.google.com/maps/contrib/102493344958625549078\">Heyang Li</a>',"
            }
        ],
        "reviews": [
            {
                "author_name": "Mark Smith (Mark ZZZ Smith)",
                "author_url": "https://www.google.com/maps/contrib/109015045837507592030/reviews",
                "profile_photo_url": "https://lh3.googleusercontent.com/a-/AOh14Gi-thk-CV41Ymw9Udvr0O5WL8Iguf9HYAKKyEWDxw=s128-c0x00000000-cc-rp-mo",
                "rating": 5,
                "relative_time_description": "a year ago",
                "text": "Great place to visit, cafeteria great. Also has a good toilet."
            },
            {
                "author_name": "Agent Cliff (The Mediator)",
                "author_url": "https://www.google.com/maps/contrib/100253428394439543029/reviews",
                "profile_photo_url": "https://lh3.googleusercontent.com/a-/AOh14GhSLTmC1QVzI8oXWkDvqv_fTq1Xmm7_gM2udfRlbw=s128-c0x00000000-cc-rp-mo-ba3",
                "rating": 4,
                "relative_time_description": "5 months ago",
                "text": "Had an office tour here a few years ago and absolutely loved the look of it , as an AV person I was very impressed with the meeting rooms and loved the themes. Most of the staff were generally friendly and I was offered a range of different waters when waiting at reception.\\n\\nThe office"
            }
        ],
        "formatted_address": "48 Pirrama Rd, Pyrmont NSW 2009, Australia",
        "international_phone_number": "+61 2 9374 4000",
        "name": "Google Workplace 6",
        "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
        "rating": 4.1,
        "user_rating_total": 932,
        "website": "http://google.com/"
    }
    };

    console.log(bodyParams);
    this.eventsActionsFacade.createEvent(bodyParams);
    this.router.navigate(['calendar']);
  }

  public getMinDate(): Date {
    return new Date(this.startDate.value);
  }
}
