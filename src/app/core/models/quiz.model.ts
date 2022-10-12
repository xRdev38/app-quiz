import { AnswerType } from './answer-type.enum';

export interface Quiz {
  label: string;
  answerType: AnswerType;
  choices?: string[];
  answer: string | string[];
}
