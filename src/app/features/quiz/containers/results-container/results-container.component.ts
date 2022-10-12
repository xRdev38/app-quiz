import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnswerCheck, BaseComponent } from '../../../../shared';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { LocalService } from '@core/services';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsContainerComponent extends BaseComponent {
  ranking$ = new BehaviorSubject<number>(0);
  answers$ = new BehaviorSubject<AnswerCheck | null>(null);

  constructor(private readonly localService: LocalService) {
    super();

    this.onInit$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const score = parseInt(
        JSON.parse(this.localService.getData('score')),
        10
      );
      const answers = JSON.parse(this.localService.getData('answers'));

      this.ranking$.next(score);
      this.answers$.next(answers);
    });
  }
}
