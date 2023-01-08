import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from './constants/routes';
import { withLogs } from './hoc/withLogs';
import { Http } from './Http';
import { Layout } from './pages/Layout';
import { PostPage } from './pages/PostPage';
import { PostsPage } from './pages/PostsPage';

const AppImp = () => {
  useEffect(() => {
    Http.init();
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<PostsPage />} />
        <Route path={ROUTES.POSTS} element={<PostsPage message="Kalimera" />} />
        <Route path={`${ROUTES.POSTS}/:id`} element={<PostPage />} />
        <Route path="*" element={<Navigate replace to={ROUTES.POSTS} />} />
      </Route>
    </Routes>
  );
};

export const App = withLogs(AppImp, 'App');
