import {
  lazy,
  Suspense
} from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import useSelector from "../hooks/use-selector";

import Main from "./main";
import Basket from "./basket";
import Header from './header';

import NotFound from './../components/not-found/index';
import PageLayout from '../components/page-layout';
import Preloader from '../components/common/preloader';

const ArticlePage = lazy(() => import( /* webpackChunkName: "ArticlePage" */ './article-page'));

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return <>
    {activeModal === 'basket' && <Basket />}

    <PageLayout>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to={`/main`} />} />

        <Route path={`/main`} element={<Main />} />
        <Route path={`/article/:id`} element={
          <Suspense fallback={<Preloader />}>
            <ArticlePage />
          </Suspense>}
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </PageLayout>
  </>;
}

export default App;
