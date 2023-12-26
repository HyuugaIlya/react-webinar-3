export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, _, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });

        // Товар загружен успешно
        dispatch({
          type: 'comments/load-success',
          payload: { data: res.data.result }
        });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });

        console.log(e);
      }
    }
  },
  add: (id, text, paramsId) => {
    return async (dispatch, _, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      const token = localStorage.getItem('token');

      try {
        const res = await services.api.request({
          url: `api/v1/comments`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token,
          },
          body: JSON.stringify({
            'text': text,
            'parent': {
              '_id': id,
              '_type': paramsId === id
                ? 'article'
                : 'comment'
            }
          })
        });

        // Товар загружен успешно
        dispatch({
          type: 'comments/load-success',
          payload: { data: res.data.result }
        });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });

        console.log(e);
      }
    }
  },
}
