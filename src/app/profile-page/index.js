import {
  memo,
  useEffect
} from 'react';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useSelector from '../../hooks/use-selector';

import Profile from '../../components/profile';

/**
 * Главная страница - первичная загрузка каталога
 */
function ProfilePage() {
  const navigate = useNavigate();

  const [_, setCookie] = useCookies(['token']);

  const select = useSelector(state => ({
    user: state.auth.user,
    token: state.auth.token,
    isAuth: state.auth.isAuth
  }));

  useEffect(() => {
    if (select.token) {
      setCookie('token', select.token);
    }
  }, []);

  useEffect(() => {
    if (!select.isAuth) {
      navigate('/login')
    }
  }, [select.isAuth]);

  return <Profile user={select.user} />;
}

export default memo(ProfilePage);