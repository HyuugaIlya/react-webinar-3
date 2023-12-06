import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      pagination: {
        count: null,
        limit: null,
        skip: null,
        currentPage: null
      },
      isFetching: false
    }
  }

  async load(limit = 10, skip = 0, currentPage = 1) {
    this.setState({
      ...this.getState(),
      isFetching: true
    });

    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price), count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagination: {
        ...this.getState().pagination,
        count: json.result.count,
        limit: limit,
        skip: skip,
        currentPage: currentPage
      },
      isFetching: false
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;