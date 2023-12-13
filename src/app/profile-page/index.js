import {
  memo,
  useEffect
} from 'react';

import useSelector from '../../hooks/use-selector';

import Profile from '../../components/profile';
import { useNavigate } from 'react-router-dom';

/**
 * Главная страница - первичная загрузка каталога
 */
function ProfilePage() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.auth.data?.user,
    isAuth: state.auth.isAuth
  }));

  useEffect(() => {
    if (!select.isAuth) {
      navigate('/login')
    }
  }, [select.isAuth]);

  return <Profile user={select.user} />;
}

export default memo(ProfilePage);
