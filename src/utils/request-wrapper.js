const requestWrapper = (baseType, request) =>
  (...args) => (dispatch) => {
    dispatch({
      type: `${baseType}_REQUEST`,
    });
    return request(...args)
      .then((data) => {
        dispatch({
          type: `${baseType}_SUCCESS`,
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: `${baseType}_FAILURE`,
          payload: err,
        });
        return Promise.reject(err);
      });
  };


export default requestWrapper;
