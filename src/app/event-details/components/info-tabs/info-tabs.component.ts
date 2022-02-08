import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { InfoTextData } from '@app/event-details/interfaces';

@Component({
  selector: 'app-info-tabs',
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoTabsComponent {
  @Input() infoTextData: InfoTextData;
  public isNextStepsClicked = true;

  public changeTab(tabName: string): void {
    this.isNextStepsClicked = false;

    switch (tabName) {
      case 'nextSteps':
        this.isNextStepsClicked = true;
        break;
    }
  }

  public saveText(): void {
    // Save new text to DB
  }
}
