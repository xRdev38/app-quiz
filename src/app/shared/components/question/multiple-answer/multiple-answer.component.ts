import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiple-answer',
  templateUrl: './multiple-answer.component.html',
  styleUrls: ['./multiple-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleAnswerComponent {
  @Input() control!: FormControl;
  @Input() question: any;

  formGroup!: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      options: new FormControl(),
    });
  }

  selected(event: any) {
    this.control.setValue({ options: event.value });
  }
}
