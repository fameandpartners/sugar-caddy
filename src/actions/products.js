import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  SET_PRODUCT_ID,
  SET_PRODUCT_MODE,
} from 'constants/products';
import requestWrapper from 'utils/request-wrapper';
import { fetchProductsApi, createProductApi, deleteProductApi } from 'requests';

export const fetchProducts = requestWrapper(FETCH_PRODUCTS, fetchProductsApi);

export const createProduct = requestWrapper(ADD_PRODUCT, createProductApi);

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
  return deleteProductApi(productId)
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
