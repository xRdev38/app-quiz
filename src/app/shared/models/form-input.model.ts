import { FormControl } from '@angular/forms';

export interface FormInput {
  control: FormControl;
  question: any;
  focusInput?(): void;
}
