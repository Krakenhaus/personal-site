const USER_ID_KEY = "greg-cards-userid";

const getUserId = () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  return userId ? userId : "";
};

const setUserId = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

const LocalStorageApi = {
  getUserId,
  setUserId,
};

export default LocalStorageApi;
