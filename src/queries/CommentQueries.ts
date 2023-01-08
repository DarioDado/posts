import { CommentDataModel } from '../data-models/comment.data-model';
import { Http } from '../Http';

export async function fetchComments() {
  const response = await Http.axios?.get<CommentDataModel[]>(`/comments`);
  return response?.data;
}

export async function fetchCommentsByPostId(postId: number) {
  const response = await Http.axios?.get<CommentDataModel[]>(
    `/posts/${postId}/comments`
  );
  return response?.data;
}
