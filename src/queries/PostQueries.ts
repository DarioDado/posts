import { PostDataModel } from '../data-models/post.data-model';
import { Http } from '../Http';

export async function fetchPosts() {
  const { data } = await Http.axios?.get<PostDataModel[]>(`/posts`);
  return data;
}

export async function fetchPost(id: number) {
  const response = await Http.axios?.get<PostDataModel>(`posts/${id}`);
  return response?.data;
}
