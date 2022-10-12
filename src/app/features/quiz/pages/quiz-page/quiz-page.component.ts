import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../../../../shared';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizPageComponent extends BaseComponent {}
