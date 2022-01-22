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

  public isAgendaClicked = true;
  public isGoalsClicked = false;
  public isNextStepsClicked = false;

  public changeTab(tabName: string): void {
    this.isAgendaClicked = false;
    this.isGoalsClicked = false;
    this.isNextStepsClicked = false;

    switch (tabName) {
      case 'agenda':
        this.isAgendaClicked = true;
        break;
      case 'goals':
        this.isGoalsClicked = true;
        break;
      case 'nextSteps':
        this.isNextStepsClicked = true;
        break;
    }
  }

  public saveText(): void {
    // Save new text to DB
  }
}
