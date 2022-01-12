import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRowComponent } from './components';


@NgModule({
  declarations: [EventRowComponent],
  imports: [
    CommonModule
  ],
  exports: [EventRowComponent]
})
export class EventRowModule { }
