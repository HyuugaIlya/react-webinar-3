import StoreModule from "../module";

class Lang extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      langObj: {

        //MainPage
        main: {
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
        },


        //CartModal
        cart: {
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
        },

        //ArticlePage
        article: {
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
          },
          buttonAdd: {
            ru: 'Добавить',
            en: 'Add'
          },
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
};

export default Lang;