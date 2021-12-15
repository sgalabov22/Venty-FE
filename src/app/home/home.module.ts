import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule
  ]
})
export class HomeModule {}
