import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as NavigationEvent,
  NavigationEnd
} from '@angular/router';
import { AuthFacadeService } from '@app/auth';
import { faCalendarAlt, faMap } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public currentUser$ = this.authFacade.currentUser$;
  public faCalendar = faCalendarAlt;
  public faMap = faMap;
  public currentUrl: string;

  constructor(private authFacade: AuthFacadeService, private router: Router) {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  public ngOnInit(): void {
    this.authFacade.loadCurrentUser();
  }

  public goToRoute(url: string): void {
    this.router.navigate([`/${url}`]);
  }
}
