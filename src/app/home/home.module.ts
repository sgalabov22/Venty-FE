import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './containers';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HomeContainerComponent],
  imports: [CommonModule, HomeRoutingModule, ButtonModule]
})
export class HomeModule {}
