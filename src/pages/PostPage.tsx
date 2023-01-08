import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CommentList } from '../components/CommentList';
import { Loader } from '../components/Loader';
import { AuthorName } from '../components/PostCard';
import { CommentDataModel } from '../data-models/comment.data-model';
import { PostDataModel } from '../data-models/post.data-model';
import { withLogs } from '../hoc/withLogs';
import { usePost } from '../provider/PostProvider';
import { fetchCommentsByPostId } from '../queries/CommentQueries';
import { fetchPost } from '../queries/PostQueries';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const Title = styled.h1`
  color: rgb(16, 37, 62);
  font-size: 26px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-bottom: 24px;
`;

const Paragraph = styled.p`
  color: rgb(16, 37, 62);
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  margin-bottom: 16px;
`;

const AllPostsLink = styled.p`
  color: rgb(35, 36, 101);
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
  margin-top: 36px;
  cursor: pointer;
`;

const PostPageImp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<PostDataModel | undefined>(undefined);
  const [comments, setComments] = useState<CommentDataModel[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const { usersIdMap } = usePost();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        const postData = await fetchPost(Number(id));
        setPost(postData);
        const commentsData = await fetchCommentsByPostId(Number(id));
        setComments(commentsData);
        setIsLoading(false);
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    }
    fetchData();
  }, [id]);

  if (!post || !usersIdMap) return null;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader height="50vh" />
      ) : (
        <>
          <Title>{post.title}</Title>
          <Paragraph>{post.body}</Paragraph>
          <AuthorName>- {usersIdMap[post.userId].name}</AuthorName>
          {comments && <CommentList comments={comments} />}
          <AllPostsLink onClick={() => navigate('/posts')}>
            See all posts
          </AllPostsLink>
        </>
      )}
    </Wrapper>
  );
};

export const PostPage = withLogs(PostPageImp, 'PostPage');
