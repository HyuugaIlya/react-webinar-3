import React, {
  useCallback,
  useState,
  useEffect
} from 'react';

import PageLayout from "./components/page-layout";
import Head from "./components/head";
import CartControls from './components/cart-controls';
import List from "./components/list";
import ModalLayout from './components/modal-layout';
import CartHead from './components/cart-head';
import CartLayout from './components/cart-layout';
import CartSumm from './components/cart-summ';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModal, setIsModal] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  useEffect(() => {
    if (!cart.items.length) {
      setIsModal(false);
    }
  }, [cart.items.length]);

  const callbacks = {
    onRemoveItem: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
    }, [store])
  };

  return (<>
    <PageLayout>
      <Head title='Магазин' />
      <CartControls
        cartLength={cart.items.length}
        totalPrice={cart.totalPrice}
        totalCount={cart.totalCount}
        isModal={isModal}
        setIsModal={setIsModal}
      />
      <List
        list={list}
        onAction={callbacks.onAddItem}
      />
    </PageLayout>
    {isModal && <ModalLayout>
      <CartHead
        title='Корзина'
        isModal={isModal}
        setIsModal={setIsModal}
      />
      <CartLayout>
        <List
          list={cart.items}
          onAction={callbacks.onRemoveItem}
        />
        <CartSumm totalPrice={cart.totalPrice} />
      </CartLayout>
    </ModalLayout>}
  </>);
};

export default App;
