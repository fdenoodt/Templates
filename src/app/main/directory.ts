import { IPage } from './page';

export interface IDirectory {
  id: number;
  text: string;
  items: Array<IPage>; //pages
  type: string;
}
