import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full'
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../calendar/calendar.module').then(
            (m) => m.CalendarComponentModule
          )
      },
      {
        path: 'map',
        loadChildren: () =>
          import('../maps/maps.module').then((m) => m.MapsModule)
      },
      {
        path: 'event-details',
        loadChildren: () =>
          import('../event-details/event-details.module').then(
            (m) => m.EventDetailsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule {}
