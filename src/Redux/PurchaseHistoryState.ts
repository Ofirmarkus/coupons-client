import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";


export class PurchaseHistoryState {
  public coupons: CouponModel[] = [];
}

export enum PurchaseHistoryActionType {
  featchPurchaseHistory
  
}

export interface PurchaseHistoryAction {
  type: PurchaseHistoryActionType;
  payload: any;
}

export function featchPurchaseHistoryAction(coupons: CouponModel[]): PurchaseHistoryAction {
  return { type: PurchaseHistoryActionType.featchPurchaseHistory,
     payload: coupons };
}


export function purchaseHistoryReducer(
  currentState: PurchaseHistoryState = new PurchaseHistoryState(),
  action: PurchaseHistoryAction
): PurchaseHistoryState {
  const newState = { ...currentState };

  switch (action.type) {
    case PurchaseHistoryActionType.featchPurchaseHistory
    :
      newState.coupons = action.payload;
      break;
   
  }
  return newState;
}

export const purchaseHistoryStore = createStore(purchaseHistoryReducer);
