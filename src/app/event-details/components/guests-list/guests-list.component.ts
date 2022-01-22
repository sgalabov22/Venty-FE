import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GuestList } from '@app/event-details/interfaces';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsListComponent {
  @Input() guestList: GuestList;
}
