import axios from "axios";
import CompanyModel from "../Models/CompanyModelRegister";
import appConfig from "../Util/config";
import { authCompanyStore, logoutAction } from "../Redux/AuthStateCompany";
import CustomerModel from "../Models/CustomerModelRegister";
import CredentialsModel from "../Models/CredentialsModel";
import { authCustomerStore, loginAction } from "../Redux/AuthStateCustomer";
import { adminloginAction, authAdminStore } from "../Redux/AuthStateAdmin";
import userType from "../Components/AuthArea/Login/userType";

class AuthService {
  async companyRegister(companyModel: CompanyModel): Promise<void> {
    const response = await axios.post<CompanyModel>(
      appConfig.companyRegisterUrl,
      companyModel
    );
  }
  async getCompanyDetails(): Promise<CompanyModel> {
    const response = await axios.get<CompanyModel>(appConfig.getCompanyDetails);
    const company = response.data;
    return company;
  }
  async customerRegister(customerModel: CustomerModel): Promise<void> {
    const response = await axios.post<CustomerModel>(
      appConfig.customerRegisterUrl,
      customerModel
    );
  }

  async login(credential: CredentialsModel): Promise<void> {
    const type: userType = credential.type;
    const credentialToSend = {
      email: credential.email,
      password: credential.password,
    };

    if (userType.customer === type) {
      const response = await axios.post<string>(
        appConfig.customerLoginUrl,
        credentialToSend
      );
      const token = response.data;
      authCustomerStore.dispatch(loginAction(token));
    }

    if (userType.company === type) {
      const response = await axios.post<string>(
        appConfig.companyLoginUrl,
        credentialToSend
      );
      const token = response.data;
      authCompanyStore.dispatch(loginAction(token));
    }
    if (userType.admin === type) {
      const response = await axios.post<string>(
        appConfig.adminLoginUrl,
        credentialToSend
      );
      const token = response.data;
      authAdminStore.dispatch(adminloginAction(token));
    }
  }
  public logout(): void {
    authAdminStore.dispatch(logoutAction());
    authCompanyStore.dispatch(logoutAction());
    authCustomerStore.dispatch(logoutAction());
  }
}

const authService = new AuthService();
export default authService;
