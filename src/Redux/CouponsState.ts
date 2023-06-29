import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CouponsState {
  public coupons: CouponModel[] = [];
 

}

export enum CouponsActionType {
  FetchCoupons,
  AddCoupon,
  UpdateCoupon,
  DeleteCoupon
}

export interface CouponsAction {
  type: CouponsActionType;
  payload: any;
}

export function fetchCouponsAction(coupons: CouponModel[]): CouponsAction {
  return { type: CouponsActionType.FetchCoupons, payload: coupons };
}

export function addPCouponAction(coupon: CouponModel): CouponsAction {
  return { type: CouponsActionType.AddCoupon, payload: coupon };
}
export function updateCouponAction(coupon: CouponModel): CouponsAction {
  return { type: CouponsActionType.UpdateCoupon, payload: coupon };
}
export function deleteCouponAction(id: number): CouponsAction {
  return { type: CouponsActionType.DeleteCoupon, payload: id };
}

export function CouponsReducer(
  currentState: CouponsState = new CouponsState(),
  action: CouponsAction
): CouponsState {
  const newState = { ...currentState };

  switch (action.type) {
    case CouponsActionType.FetchCoupons:
      newState.coupons = action.payload;
      break;
   
    case CouponsActionType.AddCoupon:
      newState.coupons.push(action.payload);
      break;
    case CouponsActionType.UpdateCoupon:
      const indexToUpdate = newState.coupons.findIndex(
        (p) => p.id === action.payload.id
      );
      if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
      break;
    case CouponsActionType.DeleteCoupon:
      const indexToDelete = newState.coupons.findIndex(
        (p) => p.id === action.payload.id
      );
      if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1);
      break;
  }
  return newState;
}

export const couponsStore = createStore(CouponsReducer);
