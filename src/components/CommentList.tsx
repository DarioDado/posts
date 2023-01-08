import { FC, memo } from 'react';
import styled from 'styled-components';
import { CommentDataModel } from '../data-models/comment.data-model';
import { withLogs } from '../hoc/withLogs';
import { AuthorName } from './PostCard';

const Wrapper = styled.div`
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #e4e5fd;
  border-radius: 4px;
  padding: 8px;
`;

const CommentBody = styled.p`
  color: rgb(16, 37, 62);
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
`;

interface Props {
  comments: CommentDataModel[];
}

const CommentListImp: FC<Props> = ({ comments }) => {
  return (
    <Wrapper>
      {comments.map((c) => (
        <Comment key={c.id}>
          <CommentBody>{c.body}</CommentBody>
          <AuthorName>{c.email}</AuthorName>
        </Comment>
      )) ?? null}
    </Wrapper>
  );
};

export const CommentList = memo(withLogs(CommentListImp, 'CommentList'));
