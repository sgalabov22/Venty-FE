import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';

@NgModule({
  declarations: [LoginContainerComponent],
  imports: [
    AuthRoutingModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    InputTextModule,
    PurpleBackgroundModule
  ]
})
export class AuthModule {}
