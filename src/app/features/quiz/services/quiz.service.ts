import { Injectable } from '@angular/core';

import { ApiService } from '@core/services';
import { distinctUntilChanged, Observable, shareReplay } from 'rxjs';
import { Quiz } from '@core/models';
import { map } from 'rxjs/operators';

@Injectable()
export class QuizService {
  constructor(private readonly apiService: ApiService) {}

  getQuestions(path: string): Observable<Quiz[]> {
    return this.apiService
      .get(`${path}`)
      .pipe(distinctUntilChanged(), shareReplay(1));
  }

  getQuestion(path: string, index: number): Observable<Quiz> {
    return this.getQuestions(`${path}`).pipe(
      map((questions: Quiz[]) => {
        const i = parseInt(`${index}`, 10);
        return questions.filter((question, key) => key === i - 1)[0];
      })
    );
  }

  getCountQuestions(path: string): Observable<number> {
    return this.getQuestions(`${path}`).pipe(
      map((questions: Quiz[]) => questions.length)
    );
  }
}
