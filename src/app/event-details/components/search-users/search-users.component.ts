import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { CurrentUserData } from '@app/auth';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SearchUsersComponent implements OnInit, OnDestroy {
  @Input() users: CurrentUserData[];
  @Input() placeholder: string;
  @ViewChild('searchBox') searchBox: ElementRef;

  @Output() onSearchLoadUsers = new EventEmitter<string>();
  @Output() onAddUser = new EventEmitter<CurrentUserData>();

  public searchTerms$$ = new Subject<string>();
  public unsubscribe$$ = new Subject<void>();

  public ngOnInit(): void {
    this.searchTerms$$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$$)
      )
      .subscribe((term) => {
        this.onSearchLoadUsers.emit(term);
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  public searchTerm(term: string): void {
    this.searchTerms$$.next(term);
  }
}
