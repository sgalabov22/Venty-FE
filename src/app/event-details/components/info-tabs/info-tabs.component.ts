import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CurrentUserData } from '@app/auth';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-info-tabs',
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoTabsComponent {
  @Input() description: string;
  @Input() eventOwnerId: number;
  @Input() currentUser: CurrentUserData;

  @Output() onUpdateDescription = new EventEmitter<string>();
  @Output() onMessage = new EventEmitter<Message>();

  public openEditor = false;

  public saveText(): void {
    this.onUpdateDescription.emit(this.description);
  }

  public checkIfCanOpenEditor(): void {
    if (this.currentUser.id !== this.eventOwnerId) {
      this.onMessage.emit({
        severity: 'error',
        summary: `Unauthorized:`,
        detail: `${this.currentUser.fullname} cannot change the description. Only owners can do that.`
      });
    } else {
      this.openEditor = true;
    }
  }
}
