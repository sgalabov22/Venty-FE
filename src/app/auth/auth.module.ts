import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { RegisterContainerComponent } from './containers/register-container/register-container.component';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [LoginContainerComponent, RegisterContainerComponent],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PurpleBackgroundModule,
    AvatarModule
  ]
})
export class AuthModule {}
