import { CommentDataModel } from './comment.data-model';
import { UserDataModel } from './user.data-model';

export interface PostDataModel {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: CommentDataModel[];
  user: UserDataModel;
}
