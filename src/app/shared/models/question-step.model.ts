import { Question } from './question.model';

export interface QuestionStep {
  question: Question | null;
  isValidated?: boolean;
}
