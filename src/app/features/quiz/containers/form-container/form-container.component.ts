import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Answer,
  BaseComponent,
  Question,
  QuestionType,
} from '../../../../shared';
import { BehaviorSubject, combineLatest, switchMap, takeUntil } from 'rxjs';
import { QuizService } from '../../services';
import { AnswerType } from '@core/models';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '@core/services';
import { QuizRoutingEnum } from '../../quiz-routing.enum';

type AnimationState = 'animationStarted' | 'none';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent extends BaseComponent {
  score = 0;
  currentIndex$ = new BehaviorSubject<number>(0);
  isLoading$ = new BehaviorSubject<boolean>(false);
  currentQuestion$ = new BehaviorSubject<Question | null>(null);
  totalQuestion$ = new BehaviorSubject<number>(0);
  animationState$ = new BehaviorSubject<AnimationState>('none');

  constructor(
    private readonly localService: LocalService,
    private readonly quizService: QuizService,
    private route: ActivatedRoute,
    private readonly router: Router
  ) {
    super();

    this.route.params.subscribe(params => {
      this.currentIndex$.next(params['id']);
      if (params['id'] === '1') {
        this.localService.removeData('answers');
      }
    });

    combineLatest([this.onInit$, this.currentIndex$])
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(() =>
          this.quizService.getCountQuestions('assets/data/quiz.json')
        ),
        tap(count => {
          this.totalQuestion$.next(count);
        }),
        switchMap(() =>
          this.quizService.getQuestion(
            'assets/data/quiz.json',
            this.currentIndex$.value
          )
        )
      )
      .subscribe(quiz => {
        const options =
          quiz?.choices?.map((choice: string) => {
            return {
              text: choice,
              className: `opt-${choice.toLocaleLowerCase()}`,
            };
          }) || null;

        this.currentQuestion$.next({
          options,
          label: quiz?.label,
          type: this.getTypeOfQuestion(quiz?.answerType),
          answer: quiz?.answer,
        });
      });
  }

  animationDoneHandler(): void {
    this.animationState$.next('none');
  }

  async goToValid(answer: Answer): Promise<void> {
    this.currentIndex$.next(parseInt(`${this.currentIndex$.value}`, 10) + 1);
    this.updateScore(answer);

    if (this.currentIndex$.value - 1 === this.totalQuestion$.value) {
      await this.router.navigate(['quiz', QuizRoutingEnum.Results]);
    } else {
      await this.router.navigate([
        'quiz',
        'question',
        this.currentIndex$.value,
      ]);
    }
  }

  async redirectToResults(): Promise<void> {
    await this.router.navigate(['quiz', QuizRoutingEnum.Results]);
  }

  updateScore(answers: Answer) {
    if (answers.user_answer === answers.correct_answer) {
      this.score = this.score + 2;
    }
    this.localService.saveData('score', JSON.stringify(this.score));
    this.saveResponse(answers);
  }

  private saveResponse(answers: Answer): void {
    const dataSaving = JSON.parse(this.localService.getData('answers')) ?? [];
    dataSaving.push({
      isCorrect: answers.user_answer === answers.correct_answer,
      answers,
    });
    this.localService.saveData('answers', JSON.stringify(dataSaving));
  }

  private getTypeOfQuestion(type: AnswerType): QuestionType {
    switch (type) {
      case AnswerType.Choice:
        return QuestionType.Choice;
      case AnswerType.Multiple:
        return QuestionType.Multiple;
      case AnswerType.Text:
        return QuestionType.Text;
    }
  }
}
