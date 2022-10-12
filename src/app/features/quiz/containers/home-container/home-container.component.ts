import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../../../../shared';
import { QuizService } from '../../services';
import { BehaviorSubject, switchMap, takeUntil } from 'rxjs';
import { LocalService } from '@core/services';
import { tap } from 'rxjs/operators';
import { LocalType } from '@core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainerComponent extends BaseComponent {
  totalQuestions$ = new BehaviorSubject<number | null>(null);
  ranking$ = new BehaviorSubject<number | null>(null);
  loading$ = new BehaviorSubject<boolean | null>(null);

  constructor(
    private readonly router: Router,
    private readonly quizService: QuizService,
    private readonly localService: LocalService
  ) {
    super();

    this.onInit$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.loading$.next(true)),
        switchMap(() =>
          this.quizService.getCountQuestions('assets/data/quiz.json')
        ),
        tap(questions => {
          const ranking = parseInt(
            this.localService.getData(LocalType.Ranking) ?? '',
            10
          );
          this.ranking$.next(ranking ?? null);
          this.totalQuestions$.next(questions);
          this.loading$.next(false);
        })
      )
      .subscribe();
  }

  async goToQuiz(): Promise<void> {
    await this.router.navigate(['quiz', 'question', '1']);
  }
}
