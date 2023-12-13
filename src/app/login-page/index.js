import { memo, useCallback } from 'react';

import useStore from "../../hooks/use-store";

import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function LoginPage() {

  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
  }));


  const callbacks = {
    onAuth: useCallback((secrets) => store.actions.auth.login(secrets), [store])
  }

  return <LoginForm
    isAuth={select.isAuth}
    errMessage={select.error}
    onAuth={callbacks.onAuth}
  />;
}

export default memo(LoginPage);
