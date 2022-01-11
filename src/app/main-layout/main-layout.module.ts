import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './containers';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import {AvatarModule} from 'primeng/avatar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    AvatarModule,
    FontAwesomeModule
  ]
})
export class MainLayoutModule {}
