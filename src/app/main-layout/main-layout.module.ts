import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './containers';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PurpleBackgroundModule } from '@app/resources/purple-background';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    AvatarModule,
    FontAwesomeModule,
    PurpleBackgroundModule
  ]
})
export class MainLayoutModule {}
