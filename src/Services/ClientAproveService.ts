import axios from "axios";
import appConfig from "../Util/config";
import CustomerModel from "../Models/CustomerModelRegister";
import {
  companysToAprovStore,
  deleteCompanyToAprovAction,
  featchCompanyToAprovAction,
} from "../Redux/CompanyAproveState";
import CompanyToAproveModel from "../Models/CompanyToAproveModel";
import CompanyModel from "../Models/CompanyModelRegister";
import { customersToAprovStore, deleteCustomerToAprovAction, featchCustomersToAprovAction } from "../Redux/CustomerAproveState";
import CustomerToAproveModel from "../Models/CustomerToAproveModel";

class ClientAproveService {
  public async getCompaniesToAprove(): Promise<CompanyToAproveModel[]> {
    if (companysToAprovStore.getState().companysToAprov.length === 0) {
      const response = await axios.get<CompanyToAproveModel[]>(
        appConfig.companiesToAprove
      );
      const companysToAprov = response.data;
      companysToAprovStore.dispatch(
        featchCompanyToAprovAction(companysToAprov)
      );
    }
    return companysToAprovStore.getState().companysToAprov;
  }
  public async getCustomersToAprove(): Promise<CustomerToAproveModel[]> {
    if(customersToAprovStore.getState().customersToAprov.length === 0){
      const response = await axios.get<CustomerModel[]>(
        appConfig.customersToAprove
        );
        const customersToAprove = response.data;
        customersToAprovStore.dispatch(
          featchCustomersToAprovAction(customersToAprove)
        );


    }

    return customersToAprovStore.getState().customersToAprov;
  }
  public async aproveCompany(id: number): Promise<void> {
    await axios.delete(appConfig.aproveCompany + id);
    companysToAprovStore.dispatch(deleteCompanyToAprovAction(id));
  }
  public async aproveCustomer(id: number): Promise<void> {
    await axios.delete(appConfig.aproveCustomer + id);
    customersToAprovStore.dispatch(deleteCustomerToAprovAction(id));
  }
}
const clientAproveService = new ClientAproveService();
export default clientAproveService;
