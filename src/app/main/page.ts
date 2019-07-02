import { IFragment } from './fragment';

export interface IPage {
  id: number;
  text: string;
  fragments: Array<IFragment>;
}
