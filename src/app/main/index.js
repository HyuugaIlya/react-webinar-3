import { memo } from 'react';

import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.categories.setCategories();
    store.actions.catalog.initParams();
  }, [], true);

  return <>
    <CatalogFilter />
    <CatalogList />
  </>;
}

export default memo(Main);
