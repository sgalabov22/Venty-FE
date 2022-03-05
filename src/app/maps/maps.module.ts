import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapsComponent } from './containers';
import { MapsRoutingModule } from './maps-routing.module';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { InputTextModule } from 'primeng/inputtext';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GuestReviewsModule } from '@app/resources/guest-reviews/event-reviews.module';

@NgModule({
  declarations: [MapsComponent, SearchComponentComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    PurpleBackgroundModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    MultiSelectModule,
    VirtualScrollerModule,
    SelectButtonModule,
    DialogModule,
    CalendarModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RatingModule,
    CarouselModule,
    InputTextareaModule,
    GuestReviewsModule
  ]
})
export class MapsModule {}
