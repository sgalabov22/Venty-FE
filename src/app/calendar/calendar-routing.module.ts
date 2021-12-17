import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarContainerComponent } from './containers';

const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {}
