import { IFragment } from './fragment';
import { ITreeItem } from './treeItem'

export interface IPage extends ITreeItem {
  // id: number;
  // text: string;
  fragments: Array<IFragment>;
  // type: string;
}
