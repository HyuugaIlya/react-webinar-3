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
   * Учет общего количества товаров и их суммы в корзине
   */
  setCartTotals() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        // Обновление значения общего количества товаров в корзине
        totalCount: this.state.cart.items.reduce((count, current) => {
          return count + current.count;
        }, 0),
        // Обновление значения общей суммы товаров в корзине
        totalPrice: this.state.cart.items.reduce((price, current) => {
          return price + (current.count * current.price);
        }, 0)
      }
    });
  };

  /**
   * Добавление товара в корзину
   * @param item {Object}
   */
  addItemToCart(code) {
    const itemToAdd = this.state.list.find(i => i.code === code);
    const cartItem = this.state.cart.items.find(i => i.code === code);

    // Добавление в корзину товаров только с уникальным идентификатором
    // и учет количества товара с идентичным идентификатором
    if (cartItem) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          items: this.state.cart.items.map(i => {
            if (i.code === code) {
              return {
                ...i,
                count: i.count + 1
              }
            }
            return i
          })
        }
      });
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          items: [...this.state.cart.items, {
            code: itemToAdd.code,
            title: itemToAdd.title,
            price: itemToAdd.price,
            count: 1
          }]
        }
      });
    }

    //Вызов метода setCartTotals для обновления общего количества товаров
    //и их суммы в корзине
    this.setCartTotals();
  }

  /**
   * Удаление товара из корзины по коду
   * @param code {number}
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список в корзине, в котором не будет удаляемого товара
      cart: {
        ...this.state.cart,
        items: this.state.cart.items.filter(item => item.code !== code)
      }
    });

    //Вызов метода setCartTotals для обновления общего количества товаров
    //и их суммы в корзине
    this.setCartTotals();
  };
}

export default Store;