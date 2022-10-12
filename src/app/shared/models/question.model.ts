import { QuestionType } from './question-type.model';
import { Options } from './option.model';

export interface Question {
  label: string;
  type: QuestionType;
  options: Options | null;
  answer?: any;
}
