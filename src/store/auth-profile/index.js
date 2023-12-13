import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class AuthProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      error: '',
      isAuth: false,
      isFetching: false
    }
  }

  async login(secrets) {
    this.setState({
      isFetching: true
    });

    const response = await fetch(`api/v1/users/sign`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: secrets.login,
        password: secrets.password
      })
    });

    const json = await response.json();

    if (response.ok) {
      this.setState({
        ...this.getState(),
        data: json.result,
        isAuth: true,
        isFetching: false
      })
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.data.issues[0].message,
        isAuth: false,
        isFetching: false
      })
    }
  }

  async getProfile() {
    this.setState({
      isFetching: true
    });

    const response = await fetch(`api/v1/users/self?fields=*`, {
      headers: {
        'X-Token': this.getState().data?.token,
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    this.setState({
      ...this.getState(),
      data: {
        ...this.getState().data,
        user: json.result
      },
      isAuth: true,
      isFetching: false
    })

    console.log(json.result);
  }

  async logout() {
    this.setState({
      isFetching: true
    });

    try {
      await fetch(`api/v1/users/sign`, {
        method: "delete",
        headers: {
          'X-Token': this.getState().data?.token,
          'Content-Type': 'application/json'
        },
      });

      this.setState({
        ...this.getState(),
        data: {},
        isAuth: false,
        isFetching: false
      })

    } catch (e) {
      console.log(e.message);
    }
  }
}

export default AuthProfileState;
