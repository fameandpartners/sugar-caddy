import fetch from 'utils/fetch';

export const fetchHierarchyApi = () => fetch('/hierarchy.json');

export const fetchComponentsApi = () => fetch('/components.json');

export const updateComponentApi = (componentId, update) =>
  fetch(`/components/${componentId}.json`, {
    method: 'PATCH',
    'content-type': 'Application/json',
    body: JSON.stringify(update),
  });

export const fetchProductsApi = () => fetch('/products.json');
