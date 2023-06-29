import axios from "axios";
import {
  companiesListStore,
  deleteCompanyAction,
  fetchCompaniesListAction,
  updateCompanyAction,
} from "../Redux/CompaniesListState";
import appConfig from "../Util/config";
import CompanyModel from "../Models/CompanyModel";
import {
  customersListStore,
  deleteCustomerAction,
  fetchCustomersListAction,
  updateCustomerAction,
} from "../Redux/CustomersListState";
import CustomerModel from "../Models/CustomerModel";
import CustomerModelComplete from "../Models/CustomerModelComplete";
import CompanyModelComplete from "../Models/CompanyModelComplete";

class AdminService {
  public async getAllCompanies() {
    if (companiesListStore.getState().companies.length === 0) {
      const respons = await axios.get<CompanyModel[]>(
        appConfig.getAllCompanies
      );
      const companies = respons.data;
      companiesListStore.dispatch(fetchCompaniesListAction(companies));
      return companies;
    }
    return companiesListStore.getState().companies;
  }
  
  public async getAllCustomers(): Promise<CustomerModel[]> {
    if (customersListStore.getState().customers.length === 0) {
      const respons = await axios.get<CustomerModel[]>(
        appConfig.getAllCustomers
      );
      const customers = respons.data;
      
      
      customersListStore.dispatch(fetchCustomersListAction(customers));
      return customers;
    }
    return customersListStore.getState().customers;
  }

  public async deleteCompanyFromList(id: number) {
    
    await axios.delete(appConfig.deleteCompany + id);
    companiesListStore.dispatch(deleteCompanyAction(id));
  }
  public async deleteCustomerFromList(id: number) {
    
    await axios.delete(appConfig.deleteCustomer + id);
    customersListStore.dispatch(deleteCustomerAction(id));
  }

  public async getOneCustomer(id: number):Promise<CustomerModel> {
    return customersListStore.getState().customers.find((c) => c.id === id);
  }

  public async getOneCompany(id: number):Promise<CompanyModel>  {
    return companiesListStore.getState().companies.find((c) => c.id === id);
  }
  public async getOneCustomerComplete(id: number):Promise<CustomerModelComplete> {
    if(customersListStore.getState().customers.length===0){
      const respons = await axios.get<CustomerModelComplete>(
        appConfig.getOneCustomer+id
      );
      const customer= respons.data;
      return customer;

    }
    return customersListStore.getState().customers.find((c) => c.id === id);
  }

  public async getOneCompanyComplete(id: number):Promise<CompanyModelComplete>  {
    return companiesListStore.getState().companies.find((c) => c.id === id);
  }
  
  public async updateCompany(company:CompanyModelComplete):Promise<void> {
    
      const response= await axios.put(appConfig.updateCompany,company);
      const updatedCompany=response.data;
       companiesListStore.dispatch(updateCompanyAction(updatedCompany));
     
  }
  
  public async updateCustomer(customer:CustomerModelComplete):Promise<void>  {
    const response= await axios.put(appConfig.updateCustomer,customer);
    const updatedCustomer=response.data;
     customersListStore.dispatch(updateCustomerAction(updatedCustomer));
  }
  
}

const adminService = new AdminService();
export default adminService;
