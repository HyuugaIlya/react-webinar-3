import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class AuthProfileState extends StoreModule {

  initState() {
    return {
      user: {},
      token: '',
      error: '',
      isAuth: false,
      isFetching: false
    }
  }

  async login(secrets) {
    this.setState({
      ...this.getState(),
      isAuth: false,
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
        user: json.result.user,
        token: json.result.token,
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

  async getProfile(token) {
    this.setState({
      ...this.getState(),
      isAuth: false,
      isFetching: true
    });

    try {
      const response = await fetch(`api/v1/users/self?fields=*`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();

      if (response.ok) {
        this.setState({
          ...this.getState(),
          user: json.result,
          token: token,
          isAuth: true,
          isFetching: false
        })
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async logout(token) {
    this.setState({
      ...this.getState(),
      isAuth: false,
      isFetching: true
    });

    try {
      const response = await fetch(`api/v1/users/sign`, {
        method: "delete",
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        this.setState({
          ...this.getState(),
          user: {},
          token: '',
          isAuth: false,
          isFetching: false
        })
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default AuthProfileState;
