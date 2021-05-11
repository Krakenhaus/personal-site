const getProductDetails = async (productIds) => {
  const response = await fetch(`/pokemon/api/products/${productIds}`);
  return response.json();
};

const getSkuPrices = async (skuIds) => {
  const response = await fetch(`/pokemon/api/products/pricing/skus/${skuIds}`);
  return response.json();
};

const searchProducts = async (productName, setName) => {
  const response = await fetch("/pokemon/api/products/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName: productName,
      setName: setName,
    }),
  });
  return response.json();
};

const TCGPlayerApi = {
  getProductDetails,
  getSkuPrices,
  searchProducts,
};

export default TCGPlayerApi;
