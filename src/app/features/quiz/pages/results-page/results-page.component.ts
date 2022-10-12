import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
