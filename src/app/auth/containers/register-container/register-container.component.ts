import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth';
import { matchingPasswords } from '@app/core/validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent {
  public profilePicture$: Observable<string> = this.authFacade.profilePicture$;
  public errorMessage$: Observable<string> = this.authFacade.errorMessage$;

  public registerFormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authFacade: AuthFacadeService
  ) {
    this.confirmPassword.setValidators([
      Validators.required,
      matchingPasswords(this.password)
    ]);
  }

  public onImageSelect(event: Event): void {
    this.authFacade.loadProfilePicture(event);
  }

  public get fullName(): FormControl {
    return this.registerFormGroup.get('fullName') as FormControl;
  }

  public get email(): FormControl {
    return this.registerFormGroup.get('email') as FormControl;
  }

  public get password(): FormControl {
    return this.registerFormGroup.get('password') as FormControl;
  }

  public get confirmPassword(): FormControl {
    return this.registerFormGroup.get('confirmPassword') as FormControl;
  }

  public onRegister(): void {
    this.authFacade.loadRegisterUser({
      email: this.email.value,
      password: this.password.value,
      fullname: this.fullName.value
    });
  }

  public goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
