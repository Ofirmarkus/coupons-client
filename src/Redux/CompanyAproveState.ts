import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import CompanyToAproveModel from "../Models/CompanyToAproveModel";

export class CompanysToAprovState {
  public companysToAprov: CompanyToAproveModel[] = [];
}

export enum CompanysToAprovActionType {
  FeatchAction,
  DeleteAction,
}

export interface CompanyAprovAction {
  type: CompanysToAprovActionType;
  payload: any;
}

export function featchCompanyToAprovAction(
  companysToAprov: CompanyToAproveModel[]
): CompanyAprovAction {
  return { type: CompanysToAprovActionType.FeatchAction, payload: companysToAprov };
}
export function deleteCompanyToAprovAction(
 id:number
): CompanyAprovAction {
  return { type: CompanysToAprovActionType.DeleteAction, payload: id };
}

export function CompanysToAprovReducer(
  currentState: CompanysToAprovState = new CompanysToAprovState(),
  action: CompanyAprovAction
): CompanysToAprovState {
  const newState = { ...currentState };

  switch (action.type) {
    case CompanysToAprovActionType.FeatchAction:
      newState.companysToAprov = action.payload;
      break;
    case CompanysToAprovActionType.DeleteAction:
      const indexToDelete = newState.companysToAprov.findIndex(
        c => c.id === action.payload
      );
      
      if (indexToDelete >= 0) newState.companysToAprov.splice(indexToDelete, 1);
      break;
  }
  return newState;
}

export const companysToAprovStore = createStore(CompanysToAprovReducer);
