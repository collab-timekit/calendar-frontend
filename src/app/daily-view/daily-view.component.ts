import { Component, Input, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit {
  @Input() currentDate!: Date;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  ngOnInit(): void {}

  getFormattedDate(): string {
    return this.currentDate.toLocaleDateString();
  }
}
