import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BaseComponent } from '../../../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
  @Input() set totalQuestion(value: number | null) {
    this._totalQuestion = value;
  }

  get totalQuestion(): number | null {
    return this._totalQuestion;
  }

  @Input() set currentQuestion(value: number | null) {
    this._currentQuestion = value;
  }

  get currentQuestion(): number | null {
    return this._currentQuestion;
  }

  @Input() set time(value: number) {
    this._time = value;
  }

  get time(): number {
    return this._time;
  }

  @Output() endTime = new EventEmitter<void>();

  private _totalQuestion: number | null = 0;
  private _currentQuestion: number | null = 0;
  private _time!: number;

  constructor() {
    super();
  }

  getEndOfQuiz(): void {
    this.endTime.emit();
  }
}
