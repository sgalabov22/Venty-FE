import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';

@NgModule({
  declarations: [LoginContainerComponent],
  imports: [AuthRoutingModule]
})
export class AuthModule {}
