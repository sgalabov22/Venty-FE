import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapsComponent } from './containers';
import { MapsRoutingModule } from './maps-routing.module';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { InputTextModule } from 'primeng/inputtext';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { LocationComponentComponent } from './components/location-component/location-component.component';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    MapsComponent,
    SearchComponentComponent,
    LocationComponentComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    PurpleBackgroundModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    MultiSelectModule,
    VirtualScrollerModule,
    SelectButtonModule
  ]
})
export class MapsModule {}
