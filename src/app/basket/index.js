import {
  memo,
  useCallback,
  useEffect
} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    //Basket Data
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,

    //Lang Data
    langObj: state.lang.langObj,
    language: state.lang.language
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),

    //Сравнение языка для отрисовки
    langComp: useCallback((item) => store.actions.lang.langComp(item), [store]),
    //Смена языка
    onLang: useCallback((lang) => store.actions.lang.setLanguage(lang), [store])
  }

  const langItems = {
    cartHead: callbacks.langComp(select.langObj.cartHead),
    buttonRemove: callbacks.langComp(select.langObj.buttonRemove),
    buttonClose: callbacks.langComp(select.langObj.buttonClose),
    total: callbacks.langComp(select.langObj.total)
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket
        item={item}
        lang={select.language}
        buttonRemove={langItems.buttonRemove}
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
      title={langItems.cartHead}
      buttonClose={langItems.buttonClose}
      onClose={callbacks.closeModal}
    >
      <List
        list={select.list}
        renderItem={renders.itemBasket}
      />
      <BasketTotal
        sum={select.sum}
        lang={select.language}
        total={langItems.total}
      />
    </ModalLayout>
  );
}

export default memo(Basket);
