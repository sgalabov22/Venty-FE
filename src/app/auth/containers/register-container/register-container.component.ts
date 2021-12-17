import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent {
  public registerFormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authFacade: AuthFacadeService
  ) {}

  public get email(): AbstractControl {
    return this.registerFormGroup.get('email');
  }

  public get password(): AbstractControl {
    return this.registerFormGroup.get('password');
  }

  public onRegister(): void {
    // TODO - add new fields to request
    this.authFacade.loadRegisterUser({
      email: this.email.value,
      password: this.password.value
    });

    this.router.navigate(['/calendar']);
  }

  public goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
