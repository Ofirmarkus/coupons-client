import { createStore } from "redux";
import CustomerModel from "../Models/CustomerModelToJwt";
import CustomerModelComplete from "../Models/CustomerModelComplete";

export class CustomersListState {
  public customers: CustomerModelComplete[] = [];
}

export enum CustomersListActionType {
  FetchCustomersList,
  AddCustomer,
  UpdateCustomer,
  DeleteCustomer,
}

export interface CustomersListAction {
  type: CustomersListActionType;
  payload: any;
}

export function fetchCustomersListAction(
  customers: CustomerModel[]
): CustomersListAction {
  return {
    type: CustomersListActionType.FetchCustomersList,
    payload: customers,
  };
}

export function addCustomerAction(
  customers: CustomerModel
): CustomersListAction {
  return { type: CustomersListActionType.AddCustomer, payload: customers };
}
export function updateCustomerAction(
  customers: CustomerModel
): CustomersListAction {
  return { type: CustomersListActionType.UpdateCustomer, payload: customers };
}
export function deleteCustomerAction(id: number): CustomersListAction {
  return { type: CustomersListActionType.DeleteCustomer, payload: id };
}


export function CustomersListReducer(
  currentState: CustomersListState = new CustomersListState(),
  action: CustomersListAction
): CustomersListState {
  const newState = { ...currentState };

  switch (action.type) {
    case CustomersListActionType.FetchCustomersList:
      newState.customers = action.payload;
      break;

    case CustomersListActionType.AddCustomer:
      newState.customers.push(action.payload);
      break;
    case CustomersListActionType.UpdateCustomer:
      const indexToUpdate = newState.customers.findIndex(
        (p) => p.id === action.payload.id
      );
      if (indexToUpdate >= 0)
        newState.customers[indexToUpdate] = action.payload;
      break;
      case CustomersListActionType.DeleteCustomer:
        const indexToDelete = newState.customers.findIndex(
          (p) => p.id === action.payload
        );
        if (indexToDelete >= 0) newState.customers.splice(indexToDelete, 1);
        break;
      
  }
  return newState;
}

export const customersListStore = createStore(CustomersListReducer);
