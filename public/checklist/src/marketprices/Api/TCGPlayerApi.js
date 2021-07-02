import LocalStorageApi from "./LocalStorageApi";

const getUserId = () => {
  return LocalStorageApi.getUserId();
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
  sort,
  typeFilter,
  selectedFolder,
  pageSize,
  pageIndex
) => {
  const userId = getUserId();
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

const getCardCollectionMarketPrice = async (typeFilter, selectedFolder) => {
  const { folderName, folderId } = selectedFolder;
  const response = await fetch(
    `/api/pokemon/users/${getUserId()}/collection/marketPrice?cardType=${
      typeFilter !== "All" ? typeFilter : ""
    }&folderId=${folderName !== "All" ? folderId : ""}`
  );
  return response.json();
};

const getFolders = async () => {
  const userId = getUserId();
  if (userId) {
    const response = await fetch(`/api/pokemon/users/${userId}/folders`);
    return response.json();
  } else {
    return [];
  }
};

const addCardToCollection = async (productId, selectedFolder) => {
  const userId = getUserId();
  if (userId) {
    const cardFolders =
      selectedFolder.folderName === "All" ? [] : [selectedFolder];
    await fetch(`/api/pokemon/users/${getUserId()}/collection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getUserId(),
        productId,
        cardFolders,
        count: 1,
      }),
    });
  } else {
    throw new Error("Must create a collection first");
  }
};

const removeCardFromCollection = async (productId) => {
  await fetch(
    `/api/pokemon/users/${getUserId()}/collection/products/${productId}`,
    {
      method: "DELETE",
    }
  );
};

const addFolder = async (folderName) => {
  await fetch(`/api/pokemon/users/${getUserId()}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: getUserId(),
      folderName,
    }),
  });
};

const deleteFolder = async (folderId) => {
  await fetch(`/api/pokemon/users/${getUserId()}/folders/${folderId}`, {
    method: "DELETE",
  });
};

const updateCardInCollection = async (productId, attributes) => {
  const { skuId, cardFolders, displayOrder } = attributes;
  const filteredCardFolders = cardFolders.filter(
    (cardFolder) => cardFolder.folderName !== "All"
  );
  await fetch(`/api/pokemon/users/${getUserId()}/collection`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: getUserId(),
      productId,
      skuId,
      cardFolders: filteredCardFolders,
      displayOrder,
    }),
  });
};

const createUser = async (nickname) => {
  if (!nickname) {
    throw new Error("Collection name is required");
  }

  const response = await fetch(`/api/pokemon/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: nickname,
  });
  return response.json();
};

const getUser = async (userId) => {
  const response = await fetch(`/api/pokemon/users/${userId}`);
  return response.json();
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

const TCGPlayerApi = {
  addCardToCollection,
  addFolder,
  createUser,
  deleteFolder,
  getCardCollection,
  getCardCollectionMarketPrice,
  getFolders,
  getProductDetails,
  getSkuPrices,
  getUser,
  removeCardFromCollection,
  searchProducts,
  updateCardInCollection,
};

export default TCGPlayerApi;
