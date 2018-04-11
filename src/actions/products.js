import {
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_LOADING,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  SET_PRODUCT_ID,
  SET_PRODUCT_MODE,
} from 'constants/products';
import firebase from 'utils/firebase';

export const fetchProductsLoading = () => ({
  type: FETCH_PRODUCTS_LOADING,
});

export const fetchProductsFailure = err => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: err,
});

export const fetchProductsSuccess = payload => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload,
});

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsLoading());
  return firebase
    .database()
    .ref('products')
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      dispatch(fetchProductsSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(fetchProductsFailure(err));
      return Promise.reject(err);
    });
};

export const fetchProductLoading = () => ({
  type: FETCH_PRODUCT_LOADING,
});

export const fetchProductFailure = err => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: err,
});

export const fetchProductSuccess = payload => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload,
});

export const fetchProduct = productId => (dispatch) => {
  dispatch(fetchProductLoading());
  return firebase
    .database()
    .ref(`products/${productId}`)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      dispatch(fetchProductSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(fetchProductFailure(err));
      return Promise.reject(err);
    });
};

export const createProductLoading = () => ({
  type: ADD_PRODUCT_LOADING,
});

export const createProductFailure = err => ({
  type: ADD_PRODUCT_FAILURE,
  payload: err,
});

export const createProductSuccess = payload => ({
  type: ADD_PRODUCT_SUCCESS,
  payload,
});

export const createProduct = product => (dispatch) => {
  dispatch(createProductLoading());
  return firebase
    .database()
    .ref(`/products/${product.id}`)
    .set(product)
    .then(() => {
      dispatch(createProductSuccess(product));
      return product;
    })
    .catch((err) => {
      dispatch(createProductFailure(err));
      return Promise.reject(err);
    });
};

export const deleteProductLoading = () => ({ type: DELETE_PRODUCT_LOADING });

export const deleteProductFailure = err => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: err,
});

export const deleteProductSuccess = payload => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload,
});

export const deleteProduct = productId => (dispatch) => {
  dispatch(deleteProductLoading());
  return firebase
    .database()
    .ref(`/products/${productId}`)
    .remove()
    .then(() => {
      dispatch(deleteProductSuccess(productId));
      return productId;
    })
    .catch((err) => {
      dispatch(deleteProductFailure(err));
      return Promise.reject(err);
    });
};

export const setCurrentId = (id = '') => ({
  type: SET_PRODUCT_ID,
  payload: id,
});

export const setProductMode = (mode = '') => ({
  type: SET_PRODUCT_MODE,
  payload: mode,
});

export default {
  fetchProducts,
};
