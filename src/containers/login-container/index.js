import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import Login from "../../components/login";
import { useNavigate } from "react-router-dom";

/**
 * Контейнер с компонентами навигации
 */
function LoginContainer() {
  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    lang: state.locale.lang,
    isAuth: state.auth.isAuth,
    user: state.auth.data?.user,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.auth.logout(), [store])
  }

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <SideLayout side='end'>
      <Login
        isAuth={select.isAuth}
        name={select.user?.profile?.name}
        onChange={!select.isAuth
          ? () => navigate('/login')
          : () => callbacks.onLogout()}
      />
    </SideLayout>
  );
}

export default memo(LoginContainer);
