import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginContainerComponent {
  public loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public errorMessage$: Observable<string> = this.authFacade.errorMessage$;;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacadeService,
    private router: Router
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
    });

    // this.router.navigate(['/calendar']);
  }

  public goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
