import { createStore } from "redux";
import CustomerToAproveModel from "../Models/CustomerToAproveModel";

export class CustomersToAprovState {
    public customersToAprov: CustomerToAproveModel[] = [];
  }
  
  export enum CustomersToAprovActionType {
    FeatchAction,
    DeleteAction,
  }
  
  export interface CustomersAprovAction {
    type: CustomersToAprovActionType;
    payload: any;
  }
  
  export function featchCustomersToAprovAction(
    companysToAprov: CustomerToAproveModel[]
  ): CustomersAprovAction {
    return { type: CustomersToAprovActionType.FeatchAction, payload: companysToAprov };
  }
  export function deleteCustomerToAprovAction(
   id:number
  ): CustomersAprovAction {
    return { type: CustomersToAprovActionType.DeleteAction, payload: id };
  }
  
  export function CustomerToAprovReducer(
    currentState: CustomersToAprovState = new CustomersToAprovState(),
    action: CustomersAprovAction
  ): CustomersToAprovState {
    const newState = { ...currentState };
  
    switch (action.type) {
      case CustomersToAprovActionType.FeatchAction:
        newState.customersToAprov = action.payload;
        break;
      case CustomersToAprovActionType.DeleteAction:
        const indexToDelete = newState.customersToAprov.findIndex(

          (p) => {
           return p.id === action.payload;

          }
          );
          
          if (indexToDelete >= 0) newState.customersToAprov.splice(indexToDelete, 1);
          
        break;
    }
    return newState;
  }
  
  export const customersToAprovStore = createStore(CustomerToAprovReducer);
  