import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './containers';
import { MainLayoutRoutingModule } from './main-layout-routing.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, MainLayoutRoutingModule]
})
export class MainLayoutModule {}
