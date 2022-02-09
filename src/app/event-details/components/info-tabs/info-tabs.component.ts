import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-info-tabs',
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoTabsComponent {
  @Input() description: string;
  @Output() onUpdateDescription = new EventEmitter<string>();

  public openEditor = false;

  public saveText(): void {
    this.onUpdateDescription.emit(this.description);
  }
}
