import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import useSelector from "../hooks/use-selector";

import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from './login-page';
import ProfilePage from './profile-page';

import LoginContainer from '../containers/login-container';
import Navigation from '../containers/navigation';
import Header from '../containers/header';

import PageLayout from '../components/page-layout';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return <>
    {activeModal === 'basket' && <Basket />}

    <PageLayout>
      <LoginContainer />
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
