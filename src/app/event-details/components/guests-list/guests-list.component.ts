import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Message } from 'primeng/api';
import { Guest, GuestStatus, GuestUserAccount } from '../../interfaces';
import { CurrentUserData } from '@app/auth';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsListComponent {
  @Input() guestList: Guest[];
  @Input() users: GuestUserAccount[];
  @Input() eventOwnerId: number;
  @Input() currentUser: CurrentUserData;

  @Output() onSearchLoadUsers = new EventEmitter<string>();
  @Output() onCloseGuestsModal = new EventEmitter<void>();
  @Output() onAddUser = new EventEmitter<number>();
  @Output() onMessage = new EventEmitter<Message>();

  public readonly modalTitle = 'All Guests List';
  public readonly modalContent = 'Guests List Here';

  public showAllGuests = false;
  public selectedStatus: GuestStatus;

  public addUser(user: CurrentUserData): void {
    this.onAddUser.emit(user.id);
    this.onCloseGuestsModal.emit();
  }

  public closeModal(): void {
    this.onCloseGuestsModal.emit();
  }
}
