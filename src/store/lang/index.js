import StoreModule from "../module";

class Lang extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
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