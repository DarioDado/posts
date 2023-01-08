import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CommentDataModel } from '../data-models/comment.data-model';
import { PostDataModel } from '../data-models/post.data-model';
import { UserDataModel } from '../data-models/user.data-model';
import { fetchComments } from '../queries/CommentQueries';
import { fetchPosts } from '../queries/PostQueries';
import { fetchUsers } from '../queries/UserQueries';
import { ComponentWithChildren } from '../types';

export interface Props {
  isLoading: boolean;
  posts: PostDataModel[];
  usersIdMap: Record<number, UserDataModel> | undefined;
}

const PostContext = createContext<Props | undefined>(undefined);

export const PostProvider: FC<ComponentWithChildren> = ({ children }) => {
  const [posts, setPosts] = useState<PostDataModel[]>([]);
  const [usersIdMap, setUsersIdMap] = useState<
    Record<number, UserDataModel> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const value = useMemo(
    () => ({ isLoading, posts, usersIdMap }),
    [isLoading, posts, usersIdMap]
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const postsData = await fetchPosts();
      const commentsData = await fetchComments();
      const usersData = await fetchUsers();
      const postIdCommentsMap = commentsData.reduce(
        (acc: Record<number, CommentDataModel[]>, curr) => {
          if (acc[curr.postId]) {
            acc[curr.postId].push(curr);
          } else {
            acc[curr.postId] = [curr];
          }
          return acc;
        },
        {}
      );

      const usersIdMap = usersData.reduce(
        (acc: Record<number, UserDataModel>, curr) => ({
          ...acc,
          [curr.id]: curr,
        }),
        {}
      );
      setUsersIdMap(usersIdMap);

      const mappedPosts = postsData.map((p) => ({
        ...p,
        comments: postIdCommentsMap[p.id],
        user: usersIdMap[p.userId],
      }));
      setPosts(mappedPosts);
      setIsLoading(false);
      try {
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    }
    fetchData();
  }, []);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = (): Props => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error('usePost cannot be used outside PostProvider');
  }

  return context;
};
