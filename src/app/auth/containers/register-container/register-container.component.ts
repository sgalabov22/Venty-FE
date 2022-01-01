import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth';
import { matchingPasswords } from '@app/core/validators';
import { FileUpload } from 'primeng/fileupload';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent implements AfterViewInit {
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
    this.confirmPassword.setValidators([Validators.required, matchingPasswords(this.password)]);
  }

  public ngAfterViewInit(): void {
    this.profilePic.onSelect
      .subscribe((value) => {
        console.log(value);
      });
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
      profile_picture: this.profilePic?.files[0]
    });

    // this.router.navigate(['/calendar']);
  }

  public goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
