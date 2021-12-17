import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent {
  constructor(private router: Router) {}

  public goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  public goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
