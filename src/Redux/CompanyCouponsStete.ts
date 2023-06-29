import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CompanyCouponsStete {
  public companyCoupons: CouponModel[] = [];

}

export enum CompanyCouponsActionType {
  FeatchCoupons,
  DeleteCoupons
  
  
}

export interface CompanyCouponsAction {
  type: CompanyCouponsActionType;
  payload: any;
}

export function featchCouponsAction(companyCoupons: CouponModel[]): CompanyCouponsAction {
  return { type: CompanyCouponsActionType.FeatchCoupons,
     payload: companyCoupons };
}


export function CompanyCouponsReducer(
  currentState: CompanyCouponsStete = new CompanyCouponsStete(),
  action: CompanyCouponsAction
): CompanyCouponsStete {
  const newState = { ...currentState };

  switch (action.type) {
    case CompanyCouponsActionType.FeatchCoupons
    :
      newState.companyCoupons = action.payload;
      break;
    
  }
  return newState;
}

export const companyCouponsStore = createStore(CompanyCouponsReducer);
