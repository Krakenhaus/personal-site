const WATCHED_PRODUCTS_KEY = "greg-watched-products";
// {
//   productId: {
//     order,
//     productId,
//     skuId,
//   }
// }

const getWatchedProducts = () => {
  const rawProduct = localStorage.getItem(WATCHED_PRODUCTS_KEY);
  console.log(rawProduct);

  return rawProduct ? JSON.parse(rawProduct) : {};
};

const getWatchedProduct = (productId) => {
  const existingWatchedProducts = getWatchedProducts();
  return existingWatchedProducts[productId];
};

const updateWatchedProductOrder = (productId, newOrder) => {
  const existingWatchedProducts = getWatchedProducts();
  existingWatchedProducts[productId].order = newOrder;
  localStorage.setItem(
    WATCHED_PRODUCTS_KEY,
    JSON.stringify(existingWatchedProducts)
  );
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
    order: numberOfProducts,
  };
  localStorage.setItem(
    WATCHED_PRODUCTS_KEY,
    JSON.stringify(existingWatchedProducts)
  );
};

const removeWatchedProduct = (productId) => {
  const existingWatchedProducts = getWatchedProducts();
  const deletedOrder = existingWatchedProducts[productId].order;
  delete existingWatchedProducts[productId];
  Object.keys(existingWatchedProducts).forEach((productId) => {
    if (existingWatchedProducts[productId].order > deletedOrder) {
      existingWatchedProducts[productId].order -= 1;
    }
  });
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
  updateWatchedProductOrder,
  updateWatchedProductSkuId,
};

export default LocalStorageApi;
