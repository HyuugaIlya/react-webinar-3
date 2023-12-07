import {
  memo,
  useCallback,
  useEffect
} from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Link
} from 'react-router-dom';

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/common/pagination';
import ArticlePage from '../article-page';

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import NotFound from '../../components/not-found';
import Preloader from '../../components/common/preloader';

function Main() {

  const store = useStore();

  const location = useLocation();

  useEffect(() => {
    store.actions.catalog.load();
  }, [store]);

  const select = useSelector(state => ({
    //Catalog Data
    list: state.catalog.list,
    isCatalogFetching: state.catalog.isFetching,
    pagination: state.catalog.pagination,

    //Basket Data
    amount: state.basket.amount,
    sum: state.basket.sum,

    //Article Data
    article: state.article.item,
    isArticleFetching: state.article.isFetching,

    //Lang Data
    langObj: state.lang.langObj,
    language: state.lang.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    // Добавление товара на страницу товара
    setArticle: useCallback((id) => store.actions.article.setArticle(id), [store]),
    // Очищение страницы товара
    clearArticle: useCallback(() => store.actions.article.clearArticle(), [store]),

    //Подгрузка новых данных страницы каталога
    onLoad: useCallback((limit, skip, currentPage) => store.actions.catalog.load(limit, skip, currentPage), [store]),

    //Сравнение языка для отрисовки
    langComp: useCallback((item) => store.actions.lang.langComp(item), [store]),
    //Смена языка
    onLang: useCallback((lang) => store.actions.lang.setLanguage(lang), [store])
  }

  const langMain = {
    title: callbacks.langComp(select.langObj.title),
    linkHome: callbacks.langComp(select.langObj.linkHome),
    cartTitle: callbacks.langComp(select.langObj.cartTitle),
    cartEmpty: callbacks.langComp(select.langObj.cartEmpty),
    buttonGo: callbacks.langComp(select.langObj.buttonGo),
    buttonAdd: callbacks.langComp(select.langObj.buttonAdd),
  }

  const langArticle = {
    country: callbacks.langComp(select.langObj.country),
    category: callbacks.langComp(select.langObj.category),
    edition: callbacks.langComp(select.langObj.edition),
    price: callbacks.langComp(select.langObj.price),
    buttonAdd: callbacks.langComp(select.langObj.buttonAdd)
  }

  const renders = {
    item: useCallback((item) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}
        lang={select.language}
        buttonAdd={langMain.buttonAdd}
      />
    }, [callbacks.addToBasket, select.language, langMain.buttonAdd])
  };

  return (
    <PageLayout>
      <Head
        title={location.pathname.includes('/main')
          ? langMain.title
          : select.article.title}
      >
        <button onClick={() => {
          callbacks.onLang(select.language === 'ru' ? 'en' : 'ru')
        }}>
          {select.language === 'ru' ? 'EN' : 'RU'}
        </button>
      </Head>
      <BasketTool
        langMain={langMain}
        lang={select.language}
        clearArticle={callbacks.clearArticle}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Routes>
        <Route path='/' element={<Navigate to={`/main`} />} />
        <Route path={`/main`} element={<>
          {select.isCatalogFetching ? <Preloader /> : <List
            list={select.list}
            renderItem={renders.item}
          />}
          <Pagination
            pagination={select.pagination}
            onLoad={callbacks.onLoad}
          />
        </>} />
        <Route path={`/article/:id`} element={<ArticlePage
          lang={select.language}
          langArticle={langArticle}
          isFetching={select.isArticleFetching}
          article={select.article}
          setArticle={callbacks.setArticle}
          onAdd={callbacks.addToBasket}
        />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);