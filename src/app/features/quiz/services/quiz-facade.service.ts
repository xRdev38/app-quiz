import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Question, QuestionStep } from '../../../shared';

import { QuizService } from './quiz.service';

export interface QuizzState {
  questions: Question[];
  questionWithReponses: QuestionStep[];
  currentQuestion: number;
  totalQuestion: number;
  loading: boolean;
}

let quizzState: QuizzState = {
  questions: [],
  questionWithReponses: [],
  currentQuestion: 1,
  totalQuestion: 0,
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
export class QuizFacadeService {
  private store = new BehaviorSubject<QuizzState>(quizzState);
  private state$ = this.store.asObservable();

  questions$ = this.state$.pipe(
    map(state => state.questions),
    distinctUntilChanged()
  );
  questionWithReponses$ = this.state$.pipe(
    map(state => state.questionWithReponses),
    distinctUntilChanged()
  );
  currentQuestion$ = this.state$.pipe(
    map(state => state.currentQuestion),
    distinctUntilChanged()
  );
  loading$ = this.state$.pipe(map(state => state.loading));

  constructor(private readonly quizzService: QuizService) {}

  private updateState(state: QuizzState): void {
    this.store.next((quizzState = state));
  }
}
