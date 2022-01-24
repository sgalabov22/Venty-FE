import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { SpeedDialModule } from 'primeng/speeddial';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EventDetailsContainerComponent } from './containers';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { InfoTabsComponent } from './components/info-tabs/info-tabs.component';
import { GuestsListComponent } from './components/guests-list/guests-list.component';
import { EventDetailsCarouselComponent } from './components/event-details-carousel/event-details-carousel.component';
import { GuestReviewsComponent } from './components/guest-reviews/guest-reviews.component';
import { WorkBoardComponent } from './components/work-board/work-board.component';

@NgModule({
  declarations: [
    EventDetailsContainerComponent,
    InfoTabsComponent,
    GuestsListComponent,
    EventDetailsCarouselComponent,
    GuestReviewsComponent,
    WorkBoardComponent
  ],
  imports: [
    CommonModule,
    EventDetailsRoutingModule,
    PurpleBackgroundModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    SpeedDialModule,
    EditorModule,
    FontAwesomeModule,
    DialogModule,
    InputTextModule
  ]
})
export class EventDetailsModule {}
