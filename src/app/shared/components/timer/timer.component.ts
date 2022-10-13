import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BaseComponent } from '../base.component';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent extends BaseComponent {
  @Input() set timeLeft(time: number) {
    this._timeLeft = time;
  }

  get timeLeft(): number {
    return this._timeLeft;
  }

  @Output() timeEnd = new EventEmitter<void>();

  time$ = new BehaviorSubject<number>(120);
  _timeLeft!: number;
  timerInterval!: any;

  constructor() {
    super();
    this.onInit$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.timer();
    });
  }

  timer() {
    this.timerInterval = setInterval(() => {
      if (this._timeLeft > 0) {
        this.time$.next(this._timeLeft);
        this._timeLeft -= 1;
      } else {
        clearInterval(this.timerInterval);
        this.timeEnd.emit();
      }
    }, 500);
  }
}
