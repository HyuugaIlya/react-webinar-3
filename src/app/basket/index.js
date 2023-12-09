import {
  memo,
  useCallback,
  useEffect
} from 'react';

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useLanguage from '../../hooks/use-language';

import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    //Basket Data
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,

    //Lang Data
    language: state.lang.language
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  //Получение данных для отрисовки в зависимости от выбранного языка
  const {
    buttonRemove,
    cartHead,
    buttonClose,
    total,
  } = useLanguage('cart');

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket
        item={item}
        lang={select.language}
        buttonRemove={buttonRemove}
        onRemove={callbacks.removeFromBasket}
        onClose={callbacks.closeModal}
      />
    }, [callbacks.removeFromBasket]),
  };

  useEffect(() => {
    if (!select.list.length) {
      callbacks.closeModal();
    }
  }, [select.list.length])

  return (
    <ModalLayout
      title={cartHead}
      buttonClose={buttonClose}
      onClose={callbacks.closeModal}
    >
      <List
        list={select.list}
        renderItem={renders.itemBasket}
      />
      <BasketTotal
        sum={select.sum}
        lang={select.language}
        total={total}
      />
    </ModalLayout>
  );
}

export default memo(Basket);
