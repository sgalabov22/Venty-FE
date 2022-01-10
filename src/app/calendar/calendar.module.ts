import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarContainerComponent } from './containers/calendar-container/calendar-container.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { ButtonModule } from 'primeng/button';
import { CalendarModule as PrimeNgCalendar } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarContainerComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    PurpleBackgroundModule,
    FormsModule,
    ButtonModule,
    PrimeNgCalendar,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class CalendarComponentModule {}
