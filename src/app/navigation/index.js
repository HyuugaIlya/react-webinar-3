import {
  memo,
  useCallback
} from "react";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useLanguage from "../../hooks/use-language";

import NavigationLinks from "../../components/navigation-links";
import BasketTool from "../../components/basket-tool";
import NavigationLayout from "../../components/navigation-layout";


function Navigation() {
  const store = useStore();

  const select = useSelector(state => ({
    //Basket Data
    amount: state.basket.amount,
    sum: state.basket.sum,

    //Lang Data
    language: state.lang.language
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    // Очищение страницы товара
    clearArticle: useCallback(() => store.actions.article.clearArticle(), [store]),
  }

  //Получение данных для отрисовки в зависимости от выбранного языка
  const langNav = useLanguage('nav');

  return (
    <NavigationLayout>
      <NavigationLinks
        linkHome={langNav.linkHome}
        clearArticle={callbacks.clearArticle}
      />
      <BasketTool
        langNav={langNav}
        lang={select.language}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
    </NavigationLayout>
  );
}

export default memo(Navigation);