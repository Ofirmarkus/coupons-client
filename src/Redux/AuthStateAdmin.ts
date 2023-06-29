import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import AdminModel from "../Models/AdminModel";

//redux tookit

// 1. state
export class AuthStateAdmin {
  token: string;
  user: AdminModel;

  constructor() {
    this.token = localStorage.getItem("adminToken");
    if (this.token) {
      const decodedToken: AdminModel = jwtDecode(this.token);
      this.user = new AdminModel();
      this.user.clientType= decodedToken.clientType;
      this.user.email= decodedToken.email;
      this.user.name= decodedToken.name;


    }
  }
}

export enum AuthActionType {
  Register,
  Login,
  Logout,
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export function registerAction(token: string): AuthAction {
  return { type: AuthActionType.Register, payload: token };
}
export function adminloginAction(token: string): AuthAction {
  return { type: AuthActionType.Login, payload: token };
}
export function logoutAction(): AuthAction {
  return { type: AuthActionType.Logout };
}

export function authReducer(
  currentState = new AuthStateAdmin(),
  action: AuthAction
): AuthStateAdmin {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Login:
      newState.token = action.payload;
      const decodedToken: AdminModel = jwtDecode(newState.token);
      newState.user = new AdminModel();

      newState.user.clientType = decodedToken.clientType;
      newState.user.email = decodedToken.email;
      localStorage.setItem("adminToken", newState.token);

      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      localStorage.removeItem("adminToken");
      break;
  }
  return newState;
}
// 6. store
export const authAdminStore = createStore(authReducer);
