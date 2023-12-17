import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      waiting: false
    }
  }

  /**
   * Установка категорий товаров
   * @return {Promise<void>}
   */
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
    const categoriesRoot = items.filter(item => !item.parent?._id);
    let result = [];
    let count = 0;

    const resultFunc = (id, count) => {
      const findItem = items.find(item => item._id === id);
      result = [...result, {
        ...findItem,
        title: findItem.parent?._id
          ? ((' -'.repeat(count)) + ' ' + findItem.title)
          : findItem.title
      }];

      const parentItems = items.filter(item => item.parent?._id === id) || [];

      if (parentItems.length) {
        parentItems.map(item => {
          resultFunc(item._id, (count + 1));
        })
      } else {
        return
      }
    }

    categoriesRoot.map(item => {
      resultFunc(item._id, count);
    });

    this.setState({
      ...this.getState(),
      items: result,
      waiting: false
    }, 'Установлен отсортированный список категорий');
  }
}

export default CategoriesState;