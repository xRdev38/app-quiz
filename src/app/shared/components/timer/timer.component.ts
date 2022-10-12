import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BaseComponent } from '../base.component';

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

  _timeLeft!: number;
  display!: string;
  timerInterval!: any;

  constructor() {
    super();
  }

  timer(minute: number = 2) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(this.timerInterval);
        this.timeEnd.emit();
      }
    }, 1000);
  }
}
