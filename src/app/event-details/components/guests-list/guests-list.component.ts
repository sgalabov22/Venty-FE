import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { GuestList, SearchUser } from '../../interfaces';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsListComponent implements OnInit, OnDestroy {
  @Input() guestList: GuestList;
  @Input() users: SearchUser[];

  @Output() onSearchLoadUsers = new EventEmitter<string>();
  @Output() onCloseGuestsModal = new EventEmitter<void>();
  @ViewChild('searchBox') searchBox: ElementRef;

  public readonly modalTitle = 'All Guests List';
  public readonly modalContent = 'Guests List Here';

  public searchTerms$$ = new Subject<string>();
  public unsubscribe$$ = new Subject<void>();
  public showAllGuests = false;

  public searchTerm(term: string): void {
    this.searchTerms$$.next(term);
  }

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

  public closeModal(): void {
    this.onCloseGuestsModal.emit();
    this.searchBox.nativeElement.value = '';
  }
}
