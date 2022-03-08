import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { SpeedDialModule } from 'primeng/speeddial';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CapitalizeFirstPipeModule } from '@app/resources/capitalize-first-pipe';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { EventDetailsContainerComponent } from './containers';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { InfoTabsComponent } from './components/info-tabs/info-tabs.component';
import { GuestsListComponent } from './components/guests-list/guests-list.component';
import { EventDetailsCarouselComponent } from './components/event-details-carousel/event-details-carousel.component';
import { WorkBoardComponent } from './components/work-board/work-board.component';
import { GuestCardComponent } from './components/guest-card/guest-card.component';
import { ChecklistItemComponent } from './components/checklist-item/checklist-item.component';
import { ChecklistFormContainerComponent } from './containers/checklist-form-container/checklist-form-container.component';
import { ChecklistFormControlComponent } from './components/checklist-form-control/checklist-form-control.component';
import { GuestReviewsModule } from '@app/resources/guest-reviews/event-reviews.module';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { ReminderFormContainerComponent } from './containers/reminder-form-container/reminder-form-container.component';
import { ReminderFormControlComponent } from './components/reminder-form-control/reminder-form-control.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReminderItemComponent } from './components/reminder-item/reminder-item.component';

@NgModule({
  declarations: [
    EventDetailsContainerComponent,
    InfoTabsComponent,
    GuestsListComponent,
    EventDetailsCarouselComponent,
    WorkBoardComponent,
    GuestCardComponent,
    ChecklistItemComponent,
    ChecklistFormContainerComponent,
    ChecklistFormControlComponent,
    SearchUsersComponent,
    ReminderFormContainerComponent,
    ReminderFormControlComponent,
    ReminderItemComponent
  ],
  imports: [
    CommonModule,
    EventDetailsRoutingModule,
    PurpleBackgroundModule,
    CarouselModule,
    FormsModule,
    SpeedDialModule,
    EditorModule,
    FontAwesomeModule,
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    DropdownModule,
    CapitalizeFirstPipeModule,
    MessagesModule,
    DragDropModule,
    ReactiveFormsModule,
    CheckboxModule,
    ConfirmPopupModule,
    GuestReviewsModule,
    CalendarModule,
    InputTextareaModule
  ],
  providers: [ConfirmationService, DialogService]
})
export class EventDetailsModule {}
