import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';
import { CurrentUserData } from '@app/auth';
import { ActivatedRoute } from '@angular/router';

import { GuestStatusEnum } from '../../enums';
import { Guest, GuestStatus } from '../../interfaces';
import { EventDetailsFacadeService } from '../../services';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestCardComponent implements OnInit {
  @Input() guest: Guest;
  @Input() eventOwnerId: number;
  @Input() currentUser: CurrentUserData;

  public readonly statuses: GuestStatus[] = [
    { name: 'Attending', value: GuestStatusEnum.ATTENDING },
    { name: 'Declined', value: GuestStatusEnum.DECLINED }
  ];
  public isAttending: boolean;
  public selectedStatus: GuestStatus;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventDetailsFacade: EventDetailsFacadeService
  ) {}

  public ngOnInit(): void {
    this.isAttending = this.guest.status === GuestStatusEnum.ATTENDING;
    this.selectedStatus = this.statuses.find(
      (s) => s.value === this.guest.status
    );
  }

  public getPicturePath(picture: string): string {
    return 'https://res.cloudinary.com/dhavld11j/' + picture;
  }

  public onChangeGuestStatus(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const eventId = Number(params.get('id'));
      const guestId = this.guest.id;
      this.eventDetailsFacade.updateGuestStatus({
        eventId,
        guestId,
        status: this.selectedStatus.value
      });
    });
  }
}
