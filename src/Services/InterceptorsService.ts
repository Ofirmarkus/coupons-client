import axios from "axios";
import { authAdminStore } from "../Redux/AuthStateAdmin";
import { authCustomerStore } from "../Redux/AuthStateCustomer";
import { authCompanyStore } from "../Redux/AuthStateCompany";

class InterceptorsService {
  createInterceptors(): void {
    /*
            tell axios that we need an interceptor on outgoing request

            axois give us the request object, we add the token to the request
            and return it to axios

            axios sends the request (with the token on it)

            all this is wriiten in the callback code:
        
        */
    axios.interceptors.request.use((request) => {
      if (authAdminStore.getState().token) {
        request.headers.Authorization =
          "Bearer " + authAdminStore.getState().token;
      }
      if (authCustomerStore.getState().token) {
        request.headers.Authorization =
          "Bearer " + authCustomerStore.getState().token;
      }
      if (authCompanyStore.getState().token) {
        request.headers.Authorization =
          "Bearer " + authCompanyStore.getState().token;
      }

      return request;
    });
  }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
