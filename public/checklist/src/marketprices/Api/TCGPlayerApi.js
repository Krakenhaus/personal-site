const getUserId = (authState) => {
  const { idToken: { claims: { UserId: userId } = {} } = {} } = authState || {};
  return userId;
};

const getProductDetails = async (productIds) => {
  const response = await fetch(`/api/pokemon/products/${productIds}`);
  return response.json();
};

const getSkuPrices = async (skuIds) => {
  const response = await fetch(`/api/pokemon/products/pricing/skus/${skuIds}`);
  return response.json();
};

const getCardCollection = async (
  authState,
  sort,
  typeFilter,
  selectedFolder,
  pageSize,
  pageIndex
) => {
  const userId = getUserId(authState);
  if (userId) {
    const { folderName, folderId } = selectedFolder;
    const { sortBy, order } = sort;
    const response = await fetch(
      `/api/pokemon/users/${userId}/collection?cardType=${
        typeFilter !== "All" ? typeFilter : ""
      }&folderId=${folderName !== "All" ? folderId : ""}&order=${
        order || ""
      }&sortBy=${sortBy || ""}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    );
    return response.json();
  } else {
    return [];
  }
};

const getCardCollectionMarketPrice = async (
  authState,
  typeFilter,
  selectedFolder
) => {
  const { folderName, folderId } = selectedFolder;
  const userId = getUserId(authState);
  if (userId) {
    const response = await fetch(
      `/api/pokemon/users/${userId}/collection/marketPrice?cardType=${
        typeFilter !== "All" ? typeFilter : ""
      }&folderId=${folderName !== "All" ? folderId : ""}`
    );
    return response.json();
  } else {
    return "";
  }
};

const getFolders = async (authState) => {
  const userId = getUserId(authState);
  if (userId) {
    const response = await fetch(`/api/pokemon/users/${userId}/folders`);
    return response.json();
  } else {
    return [];
  }
};

const addCardToCollection = async (authState, productId, selectedFolder) => {
  const userId = getUserId(authState);
  if (userId) {
    const cardFolders =
      selectedFolder.folderName === "All" ? [] : [selectedFolder];
    await fetch(`/api/pokemon/users/${userId}/collection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        cardFolders,
        count: 1,
      }),
    });
  } else {
    throw new Error("Must create a collection first");
  }
};

const removeCardFromCollection = async (authState, productId) => {
  const userId = getUserId(authState);
  if (userId) {
    await fetch(
      `/api/pokemon/users/${userId}/collection/products/${productId}`,
      {
        method: "DELETE",
      }
    );
  }
};

const addFolder = async (authState, folderName) => {
  const userId = getUserId(authState);
  if (userId) {
    await fetch(`/api/pokemon/users/${userId}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        folderName,
      }),
    });
  }
};

const deleteFolder = async (authState, folderId) => {
  const userId = getUserId(authState);
  if (userId) {
    await fetch(`/api/pokemon/users/${userId}/folders/${folderId}`, {
      method: "DELETE",
    });
  }
};

const updateCardInCollection = async (authState, productId, attributes) => {
  const { skuId, cardFolders, displayOrder, cardCount } = attributes;
  const userId = getUserId(authState);
  const filteredCardFolders = cardFolders.filter(
    (cardFolder) => cardFolder.folderName !== "All"
  );
  if (userId) {
    await fetch(`/api/pokemon/users/${userId}/collection`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId,
        skuId,
        cardCount,
        cardFolders: filteredCardFolders,
        displayOrder,
      }),
    });
  }
};

const searchProducts = async (productName, setName) => {
  const response = await fetch("/api/pokemon/products/search", {
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

const getPriceHistory = async (skuId) => {
  const response = await fetch(
    `/api/pokemon/products/pricing/skus/${skuId}/history`
  );
  return response.json();
};

const TCGPlayerApi = {
  addCardToCollection,
  addFolder,
  deleteFolder,
  getCardCollection,
  getCardCollectionMarketPrice,
  getFolders,
  getPriceHistory,
  getProductDetails,
  getSkuPrices,
  removeCardFromCollection,
  searchProducts,
  updateCardInCollection,
};

export default TCGPlayerApi;
