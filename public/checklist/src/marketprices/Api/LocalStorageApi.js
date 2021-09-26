const OKTA_TOKEN = "okta-token-storage";

const getOktaToken = () => {
  const { idToken = "{}" } = localStorage.getItem(OKTA_TOKEN) || {};
  return JSON.parse(idToken);
};

const getUserId = () => {
  const { claims: { UserId = "" } = {} } = getOktaToken();
  return UserId;
};

const getFirstName = () => {
  const { claims: { FirstName = "" } = {} } = getOktaToken();
  return FirstName;
};

const LocalStorageApi = {
  getUserId,
  getFirstName,
};

export default LocalStorageApi;
