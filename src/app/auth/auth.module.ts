import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { RegisterContainerComponent } from './containers/register-container/register-container.component';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [LoginContainerComponent, RegisterContainerComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PurpleBackgroundModule,
    AvatarModule,
    FileUploadModule,
    HttpClientModule
  ]
})
export class AuthModule {}
