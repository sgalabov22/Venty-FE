import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapsComponent } from './containers';
import { MapsRoutingModule } from './maps-routing.module';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { InputTextModule } from 'primeng/inputtext';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [MapsComponent, SearchComponentComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    PurpleBackgroundModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ]
})
export class MapsModule {}
