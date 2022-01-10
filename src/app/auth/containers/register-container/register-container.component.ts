import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth';
import { matchingPasswords } from '@app/core/validators';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent {
  public profilePicture$: Observable<string> = this.authFacade.profilePicture$;

  @ViewChild('profilePicInput') profilePic: FileUpload;

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
    if (this.authFacade.currentPictureFile) {
      this.authFacade.loadRegisterUser({
        email: this.email.value,
        password: this.password.value,
        profile_picture: this.authFacade.currentPictureFile
      });
    } else {
      this.authFacade.loadRegisterUser({
        email: this.email.value,
        password: this.password.value
      });
    }

    this.router.navigate(['/calendar']);
  }

  public goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
