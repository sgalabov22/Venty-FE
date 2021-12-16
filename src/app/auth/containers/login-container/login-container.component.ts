import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthFacadeService } from '@app/auth';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginContainerComponent {
  public loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]]
  })

  constructor(
    private formBuilder: FormBuilder, 
    private authFacade: AuthFacadeService
  ) {}

  public get email(): AbstractControl {
    return this.loginFormGroup.get('email');
  }

  public get password(): AbstractControl {
    return this.loginFormGroup.get('password');
  }

  public onLogin(): void {
    this.authFacade.loadLoginUser({
      email: this.email.value,
      password: this.password.value
    })
  }
}
