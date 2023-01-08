import { Outlet, useNavigate } from 'react-router';
import styled from 'styled-components';
import { withLogs } from '../hoc/withLogs';

const Wrapper = styled.div``;

const Header = styled.div`
  height: 70px;
  padding: 0 24px;
  background-color: rgb(35, 36, 101);
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  height: calc(100vh - 70px);
  overflow: auto;
  background: linear-gradient(
        0.75deg,
        rgb(226, 226, 255) 0.71%,
        rgba(234, 235, 253, 0.76) 38.63%,
        rgba(242, 243, 254, 0.88) 67.64%,
        rgb(250, 253, 255) 99.43%
      )
      0% 0% / cover,
    rgb(255, 255, 255);
`;

const LayoutImp = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header onClick={() => navigate('/posts')}>Posts App</Header>
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export const Layout = withLogs(LayoutImp, 'Layout');
