import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurpleBackgroundComponent } from './components/purple-background/purple-background.component';

@NgModule({
  declarations: [
    PurpleBackgroundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PurpleBackgroundComponent
  ]
})
export class PurpleBackgroundModule { }
