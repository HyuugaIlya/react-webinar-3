import {
  memo,
  useEffect
} from 'react';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useSelector from '../../hooks/use-selector';

import Profile from '../../components/profile';
import Spinner from '../../components/spinner';

/**
 * Главная страница - первичная загрузка каталога
 */
function ProfilePage() {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['token']);

  const select = useSelector(state => ({
    user: state.auth.user,
    token: state.auth.token,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
  }));

  useEffect(() => {
    if (select.token) {
      setCookie('token', select.token);
    }
  }, []);

  useEffect(() => {
    if (!select.isAuth && !cookies.token) {
      navigate('/login')
    }
  }, [select.isAuth]);

  return <Spinner active={select.isFetching}>
    <Profile user={select.user} />
  </Spinner>;
}

export default memo(ProfilePage);