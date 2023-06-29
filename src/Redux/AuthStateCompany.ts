import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";
// 1. state
export class AuthState {
  token: string = null;
  user: CompanyModel = null;
 
    

  constructor() {
    this.token = localStorage.getItem("companyToken");
    if (this.token) {
      const decodedToken: CompanyModel = jwtDecode(this.token);
      this.user = new CompanyModel();
      this.user.clientType= decodedToken.clientType;
      this.user.email= decodedToken.email;
      this.user.name= decodedToken.name;
      this.user.id= decodedToken.id;


    }
  }
}
// 2. action type
export enum AuthActionType {
  Register,
  Login,
  Logout,
}
// 3. action
export interface AuthAction {
  type: AuthActionType;
  payload?: any; // <---------- somethig is still missing here
}
// 4. action creators
export function registerAction(token: string): AuthAction {
  return { type: AuthActionType.Register, payload: token };
}
export function loginAction(token: string): AuthAction {
  return { type: AuthActionType.Login, payload: token };
}
export function logoutAction(): AuthAction {
  return { type: AuthActionType.Logout };
}
// 5. reducer
export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Login: // payload is token
      newState.token = action.payload;
      const decodedToken: CompanyModel = jwtDecode(newState.token);
      newState.user = new CompanyModel();
      newState.user.clientType = decodedToken.clientType;
      newState.user.email = decodedToken.email;
      newState.user.name = decodedToken.name;
      newState.user.id = decodedToken.id;

      localStorage.setItem("companyToken", newState.token); // save token in local storage (for refresh)
      break;
    case AuthActionType.Logout: // no payload
      newState.token = null;
      newState.user = null;
      localStorage.removeItem("companyToken"); // loose token from local storage
      break;
  }
  return newState;
}
// 6. store
export const authCompanyStore = createStore(authReducer);
