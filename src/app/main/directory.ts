import { IPage } from './page';
import { ITreeItem } from './treeItem'

export interface IDirectory extends ITreeItem {
  // id: number;
  // text: string;
  items: Array<IPage>; //pages
  // type: string;
}
