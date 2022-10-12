import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BaseComponent } from '../../../../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends BaseComponent {
  @Input() set totalQuestion(value: number | null) {
    this._totalQuestion = value;
  }

  get totalQuestion(): number | null {
    return this._totalQuestion;
  }

  @Input() set ranking(value: number | null) {
    this._ranking = value;
  }

  get ranking(): number | null {
    return this._ranking;
  }

  @Input() set loading(isLoading: boolean | null) {
    this._loading = isLoading;
  }

  get loading(): boolean | null {
    return this._loading;
  }

  @Output() begin = new EventEmitter<number>();

  private _totalQuestion!: number | null;
  private _ranking!: number | null;
  private _loading: boolean | null = false;

  constructor() {
    super();
  }
}
