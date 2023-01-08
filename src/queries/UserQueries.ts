import { UserDataModel } from '../data-models/user.data-model';
import { Http } from '../Http';

export async function fetchUsers() {
  const response = await Http.axios.get<UserDataModel[]>(`/users`);
  return response?.data;
}
