import client, {
  removeAuthorizationheader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const login = (credentials, keepSession) => {
  return client.post("api/auth/login", credentials).then(({accessToken}) => {
    setAuthorizationHeader(accessToken);
    if (keepSession) {
      storage.set('auth', accessToken, {type:'sessionStorage'})
      
    } else {
      
    }
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationheader();
    storage.remove("auth");
  });
};
