import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-answer',
  templateUrl: './single-answer.component.html',
  styleUrls: ['./single-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleAnswerComponent extends BaseComponent {
  @Input() control!: FormControl;
  @Input() question: any;

  formGroup!: FormGroup;

  constructor() {
    super();
    this.formGroup = new FormGroup({
      options: new FormControl('', Validators.required),
    });
  }

  selected(event: any) {
    this.control.setValue({ options: event.value });
  }
}
