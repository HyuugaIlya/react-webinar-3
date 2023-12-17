import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import useTranslate from "../../hooks/use-translate";
import useSelector from '../../hooks/use-selector';

import Head from "../../components/head";

import LocaleSelect from "../locale-select";

/**
 * Главная страница - первичная загрузка каталога
 */
function Header() {

  const location = useLocation();

  const select = useSelector(state => ({
    article: state.article.data
  }));

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