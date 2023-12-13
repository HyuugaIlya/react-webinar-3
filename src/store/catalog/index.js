import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: ''
      },
      categories: [],
      count: 0,
      waiting: false
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  async setCategories() {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const items = json.result.items;

    // Сортировка категорий товаров в соответствии с родительскими id
    let result = [];
    for (let i = 0; i < items.length; i++) {
      if (!items[i].parent?._id) {
        result = [...result, items[i]];
        const temp = items.filter(item => item._id !== items[i]._id && item.parent);

        for (let j = 0; j < temp.length; j++) {
          const parentItem = temp[j].parent?._id === items[i]._id;

          if (parentItem) {
            result = [...result, {
              ...temp[j],
              title: (' - ' + temp[j].title)
            }];

            const temp1 = temp.filter(item => item.parent?._id === temp[j]._id)
            if (temp1) {
              temp1.forEach(item => {
                result = [...result, {
                  ...item,
                  title: (' - - ' + item.title)
                }];
              });
            } else {
              continue
            }

          } else {
            continue
          }
        }
      } else {
        continue
      }
    };

    this.setState({
      ...this.getState(),
      categories: result,
      waiting: false
    }, 'Установлен отсортированный список категорий');
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = {
      ...this.getState().params,
      ...newParams
    };

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    let urlSearchSTR = new URLSearchParams(params);
    console.log(urlSearchSTR.entries());
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    let apiParams = {};

    if (params.category !== '') {
      apiParams = {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: 'items(*),count',
        sort: params.sort,
        'search[query]': params.query,
        'search[category]': params.category,
      };
    } else {
      apiParams = {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: 'items(*),count',
        sort: params.sort,
        'search[query]': params.query,
      };
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }
}

export default CatalogState;
