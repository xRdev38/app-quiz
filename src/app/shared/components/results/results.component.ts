import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent extends BaseComponent {
  @Input() set answers(value: any) {
    this._answers = value;
  }

  get answers(): any {
    return this._answers;
  }

  private _answers: any;

  constructor() {
    super();
  }

  trackByAnswer(index: number, answer: any): string {
    return `${index}-${answer.user_answer}`;
  }
}
