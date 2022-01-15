import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent {
  constructor(
    private router: Router,
    // private authFacade: AuthFacadeService
  ) {
    // if (this.authFacade.getAuthDetails()) {
    //   this.router.navigate(['/calendar']);
    // }
  }

  public goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  public goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
