import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";
import CompanyModelComplete from "../Models/CompanyModelComplete";

export class CompaniesListState {
    public companies: CompanyModelComplete[] = [];
   
  
  }
  
  export enum CompaniesListActionType {
    FetchCompaniesList,
    AddCompany,
    UpdateCompany,
    DeleteCompany
  }
  
  export interface CompaniesListAction {
    type: CompaniesListActionType;
    payload: any;
  }
  
  export function fetchCompaniesListAction(companies: CompanyModel[]): CompaniesListAction {
    return { type: CompaniesListActionType.FetchCompaniesList, payload: companies };
  }
  
  export function addCompanyAction(companies: CompanyModel): CompaniesListAction {
    return { type: CompaniesListActionType.AddCompany, payload: companies };
  }
  export function updateCompanyAction(companies: CompanyModel): CompaniesListAction {
    return { type: CompaniesListActionType.UpdateCompany, payload: companies };
  }
  export function deleteCompanyAction(id: number): CompaniesListAction {
    return { type: CompaniesListActionType.DeleteCompany, payload: id };
  }
  
  export function CompaniesListReducer(
    currentState: CompaniesListState = new CompaniesListState(),
    action: CompaniesListAction
  ): CompaniesListState {
    const newState = { ...currentState };
  
    switch (action.type) {
      case CompaniesListActionType.FetchCompaniesList:
        newState.companies = action.payload;
        break;
     
      case CompaniesListActionType.AddCompany:
        newState.companies.push(action.payload);
        break;
      case CompaniesListActionType.UpdateCompany:
        const indexToUpdate = newState.companies.findIndex(
          (p) => p.id === action.payload.id
        );
        if (indexToUpdate >= 0) newState.companies[indexToUpdate] = action.payload;
        break;
      case CompaniesListActionType.DeleteCompany:
        
        const indexToDelete = newState.companies.findIndex(

          (p) => {
           return p.id === action.payload;

          }
          );
          
          if (indexToDelete >= 0) newState.companies.splice(indexToDelete, 1);
          
        break;
    }
    return newState;
  }
  
  export const companiesListStore = createStore(CompaniesListReducer);
  