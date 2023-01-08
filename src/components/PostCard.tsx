import { FC, MouseEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { PostDataModel } from '../data-models/post.data-model';
import { withLogs } from '../hoc/withLogs';
import { ReactComponent as CommentIcon } from '../assets/icons/comment.svg';
import { useNavigate } from 'react-router-dom';
import { CommentList } from './CommentList';

interface Props {
  post: PostDataModel;
}

const Wrapper = styled.div`
  cursor: pointer;
  padding: 16px;
  border-radius: 4px;
  background: radial-gradient(
    100% 204.54% at 0% 0%,
    rgba(249, 250, 250, 0.8) 0%,
    rgba(255, 255, 255, 0.32) 100%
  );
  box-shadow: rgb(255 255 255 / 6%) 0px -4px 40px,
    rgb(16 37 62 / 4%) 0px 4px 24px, rgb(75 82 93 / 2%) 0px 24px 48px;
`;

const Title = styled.h1`
  color: rgb(16, 37, 62);
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-bottom: 8px;
`;

const Paragraph = styled.p`
  color: rgb(16, 37, 62);
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AuthorName = styled.p`
  color: rgb(128, 137, 153);
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
`;

const CommentLabel = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(35, 36, 101);
`;

const PostCardImp: FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const onCommentsClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowComments((prevState) => !prevState);
  }, []);
  const onCardClick = useCallback(() => {
    navigate(`/posts/${post.id}`);
  }, [navigate, post.id]);
  return (
    <Wrapper onClick={onCardClick}>
      <Title>{post.title}</Title>
      <Paragraph>{post.body}</Paragraph>
      <AuthorName>- {post.user.name}</AuthorName>
      <CommentLabel onClick={onCommentsClick}>
        {post.comments?.length || 0} <CommentIcon />
      </CommentLabel>
      {showComments && <CommentList comments={post.comments ?? []} />}
    </Wrapper>
  );
};

export const PostCard = withLogs(PostCardImp, 'PostCard');
