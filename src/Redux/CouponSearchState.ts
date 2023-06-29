import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CouponsState {
  public couponsSearchd: CouponModel[] = [];

}

export enum CouponsActionType {
  SearchCoupon
  
}

export interface CouponsAction {
  type: CouponsActionType;
  payload: any;
}

export function searchCouponsAction(coupons: CouponModel[]): CouponsAction {
  return { type: CouponsActionType.SearchCoupon,
     payload: coupons };
}


export function CouponsReducer(
  currentState: CouponsState = new CouponsState(),
  action: CouponsAction
): CouponsState {
  const newState = { ...currentState };

  switch (action.type) {
    case CouponsActionType.SearchCoupon
    :
      newState.couponsSearchd = action.payload;
      break;
    
  }
  return newState;
}

export const couponsSearchStore = createStore(CouponsReducer);
