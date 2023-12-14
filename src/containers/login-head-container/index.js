import {
  memo,
  useCallback,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

import SideLayout from "../../components/side-layout";
import LoginHead from "../../components/login-head";

/**
 * Контейнер с компонентами навигации
 */
function LoginHeadContainer() {
  const store = useStore();

  const [cookies, _, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      store.actions.auth.getProfile(cookies.token);
    }
  }, [])

  const navigate = useNavigate();

  const select = useSelector(state => ({
    lang: state.locale.lang,
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    isFetching: state.auth.isFetching,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.auth.logout(cookies.token);
      removeCookie('token');
    }, [store])
  }

  return (
    <SideLayout side='end'>
      <LoginHead
        isAuth={select.isAuth}
        isFetching={select.isFetching}
        name={select.user?.profile?.name}
        onChange={!select.isAuth
          ? () => navigate('/login')
          : () => callbacks.onLogout()}
      />
    </SideLayout>
  );
}

export default memo(LoginHeadContainer);
