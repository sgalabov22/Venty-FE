import { Component } from '@angular/core';
import { AuthFacadeService } from '@app/auth';
import { faCalendarAlt, faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  public currentUser$ = this.authFacade.currentUser$;
  public faCalendar = faCalendarAlt;
  public faMap = faMap;

  constructor(private authFacade: AuthFacadeService) {}
}
