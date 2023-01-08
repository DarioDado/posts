import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import { PostCard } from '../components/PostCard';
import { TextInput } from '../components/TextInput';
import { withLogs } from '../hoc/withLogs';
import { usePost } from '../provider/PostProvider';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`;
const SearchWrapper = styled.div`
  padding-top: 24px;
  background-color: #ffffff;
  display: flex;
  position: sticky;
  top: 0;
`;
const PostsWrapper = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const NoDataMessage = styled.h1`
  font-size: 36px;
  padding: 30px 0;
  margin: auto;
`;

const PostsPageImp = () => {
  const { posts, isLoading } = usePost();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter((p) =>
      p.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);
  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <Wrapper>
      <SearchWrapper>
        <TextInput placeholder="Search posts by Author" onChange={onSearch} />
      </SearchWrapper>
      <PostsWrapper>
        {filteredPosts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
        {isLoading && <Loader height="50vh" />}
        {!filteredPosts.length && !isLoading && (
          <NoDataMessage>No data available</NoDataMessage>
        )}
      </PostsWrapper>
    </Wrapper>
  );
};

export const PostsPage = withLogs(PostsPageImp, 'PostsPage');
