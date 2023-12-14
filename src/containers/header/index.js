import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useSelector from '../../hooks/use-selector';

import Head from "../../components/head";

import LocaleSelect from "../locale-select";

/**
 * Главная страница - первичная загрузка каталога
 */
function Header() {

  const store = useStore();

  const location = useLocation();

  const select = useSelector(state => ({
    article: state.article.data
  }));

  useInit(() => {
    store.actions.catalog.setCategories();
    store.actions.catalog.initParams();
  }, [], true);

  const { t } = useTranslate();

  return <Head title={
    location.pathname.includes('/articles')
      ? select.article.title
      : t('title')
  }>
    <LocaleSelect />
  </Head>;
}

export default memo(Header);