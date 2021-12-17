import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginContainerComponent,
  RegisterContainerComponent
} from './containers';

const routes: Routes = [
  {
    path: 'login',
    component: LoginContainerComponent
  },
  {
    path: 'register',
    component: RegisterContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
