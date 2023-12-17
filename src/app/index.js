import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { useCookies } from 'react-cookie';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';

import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from './login-page';
import ProfilePage from './profile-page';

import LoginHeadContainer from '../containers/login-head-container';
import Navigation from '../containers/navigation';
import Header from '../containers/header';

import PageLayout from '../components/page-layout';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const [cookies] = useCookies(['token']);

  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    if (cookies.token) {
      store.actions.auth.getProfile(cookies.token);
    }
  }, [cookies.token])

  return <>
    {activeModal === 'basket' && <Basket />}

    <PageLayout>
      <LoginHeadContainer />
      <Header />
      <Navigation />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/main'} />} />

        <Route path={'/main'} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  </>;
}

export default App;