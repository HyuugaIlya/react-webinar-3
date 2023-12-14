import {
  memo,
  useCallback,
  useEffect
} from 'react';

import { useNavigate } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';

import LoginForm from '../../components/login-form';
import Spinner from '../../components/spinner';

/**
 * Главная страница - первичная загрузка каталога
 */
function LoginPage() {
  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
    error: state.auth.error,
  }));

  useEffect(() => {
    if (select.isAuth) {
      navigate('/profile');
    }
  }, [select.isAuth]);

  const callbacks = {
    onAuth: useCallback((secrets) => store.actions.auth.login(secrets), [store])
  };

  return <Spinner active={select.isFetching}>
    <LoginForm
      isFetching={select.isFetching}
      errMessage={select.error}
      onAuth={callbacks.onAuth}
    />
  </Spinner>;
}

export default memo(LoginPage);