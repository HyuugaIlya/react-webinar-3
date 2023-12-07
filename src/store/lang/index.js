import StoreModule from "../module";

class Lang extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      langObj: {

        //Main
        title: {
          ru: 'Магазин',
          en: 'Shop'
        },
        cartEmpty: {
          ru: 'пусто',
          en: 'empty'
        },
        buttonGo: {
          ru: 'Перейти',
          en: 'Go'
        },
        cartTitle: {
          ru: 'В корзине',
          en: 'In the cart'
        },
        linkHome: {
          ru: 'Главная',
          en: 'Home'
        },
        buttonAdd: {
          ru: 'Добавить',
          en: 'Add'
        },

        //Cart
        cartHead: {
          ru: 'Корзина',
          en: 'Cart'
        },
        buttonRemove: {
          ru: 'Удалить',
          en: 'Remove'
        },
        buttonClose: {
          ru: 'Закрыть',
          en: 'Close'
        },
        total: {
          ru: 'Итого',
          en: 'Total'
        },

        //Article
        country: {
          ru: 'Страна производитель',
          en: 'Country'
        },
        category: {
          ru: 'Категория',
          en: 'Category'
        },
        edition: {
          ru: 'Год выпуска',
          en: 'Edition'
        },
        price: {
          ru: 'Цена',
          en: 'Price'
        }
      },
      language: 'ru'
    }
  }

  setLanguage(lang = 'ru') {
    this.setState({
      ...this.getState(),
      language: lang
    })
  }

  langComp(item) {
    return this.getState().language === 'ru'
      ? item.ru
      : item.en
  }
};

export default Lang;