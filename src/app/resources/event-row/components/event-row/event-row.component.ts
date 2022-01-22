import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-row',
  templateUrl: './event-row.component.html',
  styleUrls: ['./event-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventRowComponent {
  @Input() elementWidth: string;
  @Input() title: string;
  @Input() color: string;
}
