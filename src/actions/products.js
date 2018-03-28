import { FETCH_PRODUCTS } from 'constants/products';
import requestWrapper from 'utils/request-wrapper';
import { fetchProductsApi } from 'requests';

export const fetchProducts = requestWrapper(FETCH_PRODUCTS, fetchProductsApi);

export default {
  fetchProducts,
};
