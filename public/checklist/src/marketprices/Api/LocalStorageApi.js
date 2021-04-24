const WATCHED_PRODUCTS_KEY = "greg-watched-products";
// {
//   productId: {
//     order,
//     productId,
//     skuId,
//   }
// }

const getWatchedProducts = () => {
  return JSON.parse(localStorage.getItem(WATCHED_PRODUCTS_KEY)) || {};
};

const getWatchedProduct = (productId) => {
  const existingWatchedProducts = getWatchedProducts();
  return existingWatchedProducts[productId];
};

const updateWatchedProductSkuId = (productId, newSkuId) => {
  const existingWatchedProducts = getWatchedProducts();
  existingWatchedProducts[productId].skuId = newSkuId;
  localStorage.setItem(
    WATCHED_PRODUCTS_KEY,
    JSON.stringify(existingWatchedProducts)
  );
};

const addWatchedProduct = (productId) => {
  const existingWatchedProducts = getWatchedProducts() || {};
  const numberOfProducts = Object.keys(existingWatchedProducts).length;
  existingWatchedProducts[productId] = {
    productId,
    order: numberOfProducts + 1,
  };
  localStorage.setItem(
    WATCHED_PRODUCTS_KEY,
    JSON.stringify(existingWatchedProducts)
  );
};

const removeWatchedProduct = (productId) => {
  const existingWatchedProducts = getWatchedProducts();
  delete existingWatchedProducts[productId];
  localStorage.setItem(
    WATCHED_PRODUCTS_KEY,
    JSON.stringify(existingWatchedProducts)
  );
};

const LocalStorageApi = {
  addWatchedProduct,
  getWatchedProduct,
  getWatchedProducts,
  removeWatchedProduct,
  updateWatchedProductSkuId,
};

export default LocalStorageApi;
