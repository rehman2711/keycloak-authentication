const sessionFetchedToken = sessionStorage.getItem("Keycloak_Token");

export const Credentials = {
  token: sessionFetchedToken,
};