import React, { useCallback } from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const totalCount = cart.items.reduce((count, currentItem) => {
    return count + currentItem.count;
  }, 0)

  const callbacks = {
    onRemoveItem: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItemToCart(item);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Cart
        cart={cart.items}
        totalCount={totalCount}
        onRemove={callbacks.onRemoveItem}
      />
      <List
        list={list}
        onAdd={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
