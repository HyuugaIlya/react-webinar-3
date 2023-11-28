/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState; // Корзина товаров
    this.listeners = []; // Слушатели изменений состояния
    this.setState({
      ...this.state,
      // Инициализация корзины товаров
      cart: {
        items: [],
        totalCount: null,
        totalPrice: null
      }
    })
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object}
   */
  addItemToCart(item) {
    // Добавление в корзину товаров только с уникальным идентификатором
    // и учет количества товара с идентичным идентификатором
    this.state.cart.items.find(i => i.code === item.code)
      ? this.state.cart.items.find(i => i.code === item.code).count++
      : this.setState({
        ...this.state,
        cart: {
          items: [...this.state.cart.items, {
            code: item.code,
            title: item.title,
            price: item.price,
            count: 1
          }]
        }
      })
  }

  /**
   * Удаление товара из корзины по коду
   * @param code {number}
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: {
        items: this.state.cart.items.filter(item => item.code !== code)
      }
    })
  };
}

export default Store;
