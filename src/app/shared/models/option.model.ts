export interface Option {
  text: string;
  correct?: boolean;
  selected?: boolean;
  className?: string;
}
export type Options = Option[];
