import { FETCH_PRODUCTS, ADD_PRODUCT } from 'constants/products';
import requestWrapper from 'utils/request-wrapper';
import { fetchProductsApi, createProductApi } from 'requests';

export const fetchProducts = requestWrapper(FETCH_PRODUCTS, fetchProductsApi);

export const createProduct = requestWrapper(ADD_PRODUCT, createProductApi);

export default {
  fetchProducts,
};
