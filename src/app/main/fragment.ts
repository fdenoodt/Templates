export interface IFragment {
  id: number;
  text: string;
  items: Array<IFragment>;
  title?: string;
  content?: string;
}
