import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-work-board',
  templateUrl: './work-board.component.html',
  styleUrls: ['./work-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkBoardComponent implements OnInit {
  public items: MenuItem[];

  public ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          alert('New item added');
        }
      }
    ];
  }
}
