import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAnswerComponent {
  @Input() control!: FormControl;
  @Input() question: any;

  formGroup!: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({});
  }
}
