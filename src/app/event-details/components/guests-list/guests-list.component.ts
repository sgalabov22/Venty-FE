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
import { Message } from 'primeng/api';
import { Guest, GuestStatus, GuestUserAccount } from '../../interfaces';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CurrentUserData } from '@app/auth';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsListComponent implements OnInit, OnDestroy {
  @Input() guestList: Guest[];
  @Input() users: GuestUserAccount[];
  @Input() eventOwnerId: number;
  @Input() currentUser: CurrentUserData;

  @Output() onSearchLoadUsers = new EventEmitter<string>();
  @Output() onCloseGuestsModal = new EventEmitter<void>();
  @Output() onAddUser = new EventEmitter<number>();
  @Output() onMessage = new EventEmitter<Message>();
  @ViewChild('searchBox') searchBox: ElementRef;

  public readonly modalTitle = 'All Guests List';
  public readonly modalContent = 'Guests List Here';

  public searchTerms$$ = new Subject<string>();
  public unsubscribe$$ = new Subject<void>();
  public showAllGuests = false;
  public selectedStatus: GuestStatus;

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

  public addUser(userId: number): void {
    this.onAddUser.emit(userId);
    this.closeModal();
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
