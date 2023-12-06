import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {},
      isFetching: false
    }
  }

  async setArticle(id) {
    this.setState({
      ...this.getState(),
      isFetching: true
    });

    const response = await fetch(`/api/v1/articles/${id}?fields=_id, title, description, price, edition, category, madeIn(title, code),category(title)`)
    const json = await response.json();

    this.setState({
      ...this.getState(),
      item: json.result,
      isFetching: false
    }, 'Товар загружен из АПИ');
  }

  clearArticle() {
    this.setState({
      ...this.getState(),
      item: {}
    })
  }
}

export default Article;