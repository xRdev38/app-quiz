import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BaseComponent } from '../base.component';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  Answer,
  FormInput,
  Option,
  Question,
  QuestionType,
} from '../../models';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { TimerService } from '../../services';
import { TextAnswerComponent } from './text-answer/text-answer.component';
import { MultipleAnswerComponent } from './multiple-answer/multiple-answer.component';
import { SingleAnswerComponent } from './single-answer/single-answer.component';

const DESKTOP_FOCUS_DELAY = 350;

const widgetByType: Record<QuestionType, Type<FormInput>> = {
  [QuestionType.Text]: TextAnswerComponent,
  [QuestionType.Choice]: SingleAnswerComponent,
  [QuestionType.Multiple]: MultipleAnswerComponent,
};

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent extends BaseComponent implements OnChanges {
  @Input() set question(value: any) {
    this._question = value;
    if (!!this._question) {
      this.initForm(value);
    }
  }

  get question(): any {
    return this._question;
  }

  @Output() answer = new EventEmitter<Answer>();

  private _question: any;
  readonly questionType = QuestionType;
  formGroup!: FormGroup;
  optionSelected!: Option;
  userAnswers$ = new BehaviorSubject<string | string[]>([]);
  type$ = new BehaviorSubject<QuestionType>(QuestionType.Choice);

  @ViewChild('widgetInput', { read: ViewContainerRef })
  widgetRef!: ViewContainerRef;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(private readonly timerService: TimerService) {
    super();

    this.formGroup = new FormGroup({
      answer: new FormControl(['', Validators.required]),
    });

    this.onInit$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.type$.next(this.question.type);
    });

    this.onAfterViewInit$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.initForm(this.question);
    });
  }

  get answerFormControl(): FormControl {
    return this.formGroup.get('answer') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    const { question } = changes;
    this.type$.next(question.currentValue.type);
  }

  initForm(question: any) {
    if (!question) {
      return;
    }
    this.initializeFormControl(question);
    this.initializeWidget(question);
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }

    const results = this.formGroup.value;
    console.log('R', results);
    /*
    this.answer.emit({
      user_answer: results['answer']?.['options'] ?? results['answer'],
      correct_answer: this.question.answer,
    });
     */
  }

  initializeWidget(question: Question) {
    const component = widgetByType[question.type];

    if (this.widgetRef) {
      this.widgetRef.clear();
    }

    if (!component) {
      throw new Error(`No component for ${question.type}`);
    }

    if (!!this.widgetRef) {
      const componentRef = this.widgetRef.createComponent<FormInput>(component);
      this.initializeWidgetContent(componentRef, question);
    }
  }

  private initializeWidgetContent(
    ref: ComponentRef<FormInput>,
    question: Question
  ) {
    ref.instance.question = question;
    ref.instance.control = this.answerFormControl;
    ref.changeDetectorRef.detectChanges();

    setTimeout(() => {
      if (ref.instance.focusInput) {
        ref.instance.focusInput();
      }
    }, DESKTOP_FOCUS_DELAY);
  }

  initializeForm(question: Question) {
    const componentForm = widgetByType[question.type];

    if (this.widgetRef) {
      this.widgetRef.clear();
    }

    if (!componentForm) {
      throw new Error(`No form for ${question.type}`);
    }

    const componentRef =
      this.widgetRef.createComponent<FormInput>(componentForm);
    this.initializeWidgetContent(componentRef, question);
  }

  initializeFormControl(value?: any) {
    if (this.formGroup.get('answer')) {
      this.formGroup.removeControl('answer');
    }
    this.formGroup.addControl(
      'answer',
      new FormControl('', [Validators.required])
    );
  }
}
