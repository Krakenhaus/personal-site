export const oktaAuthConfig = {
  issuer: "https://dev-24666051.okta.com/oauth2/default",
  clientId: "<redacted>",
  redirectUri: window.location.origin + "/login/callback",
  authParams: {
    pkce: true, // Proof of Code Key Exchange (PKCE)
  },
};

export const oktaSignInConfig = {
  baseUrl: "https://dev-24666051.okta.com",
  clientId: "<redacted>",
  redirectUri: window.location.origin + "/login/callback",
  authParams: {
    pkce: true, // Proof of Code Key Exchange (PKCE)
  },
  // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};
