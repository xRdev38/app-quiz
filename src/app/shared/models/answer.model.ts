export interface Answer {
  user_answer: string;
  correct_answer: string | string[];
}

export interface AnswerCheck extends Answer {
  isCorrect: boolean;
}
