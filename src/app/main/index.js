import {
  memo,
  useCallback,
  useEffect
} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useLanguage from '../../hooks/use-language';

import Item from "../../components/item";
import List from "../../components/list";
import Pagination from '../../components/common/pagination';
import Preloader from '../../components/common/preloader';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, [store]);

  const select = useSelector(state => ({
    //Catalog Data
    list: state.catalog.list,
    isCatalogFetching: state.catalog.isFetching,
    pagination: state.catalog.pagination,

    //Lang Data
    language: state.lang.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    //Подгрузка новых данных страницы каталога
    onLoad: useCallback((
      limit,
      skip,
      currentPage
    ) => store.actions.catalog.load(limit, skip, currentPage), [store]),
  }

  //Получение данных для отрисовки в зависимости от выбранного языка
  const {
    buttonAdd
  } = useLanguage('main');

  const renders = {
    item: useCallback((item) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}
        lang={select.language}
        buttonAdd={buttonAdd}
      />
    }, [callbacks.addToBasket, select.language, buttonAdd])
  };

  return <>
    {select.isCatalogFetching
      ? <Preloader />
      : <List
        list={select.list}
        renderItem={renders.item}
      />}
    <Pagination
      pagination={select.pagination}
      onLoad={callbacks.onLoad}
    />
  </>;
}

export default memo(Main);
