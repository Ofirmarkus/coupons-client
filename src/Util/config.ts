const server = process.env.REACT_APP_SERVER;
class Config {}

// Development Environment
class DevelopmentConfig extends Config {
  getAllCouponsUrl = server + "api/GuestController/getAllCoupons";
  updateCustomer = server + "api/adminController/updateCustomer";
  updateCompany = server + "api/adminController/updateCompany";
  buyCoupon = server + "api/customerController/purchaseCoupon?couponId=";
  getCompanyCoupons =
    server + "api/companyController/getCompanyCoupons?companyId=";
  addCoupon = server + "api/companyController/addCoupon";
  companyRegisterUrl = server + "api/authController/registerCompany";
  customerRegisterUrl = server + "api/authController/registerCustomer";
  companyLoginUrl = server + "api/authController/companyLogin";
  customerLoginUrl = server + "api/authController/customerLogin";
  adminLoginUrl = server + "api/authController/adminLogin";
  companiesToAprove = server + "api/adminController/getCompaniesToAprove";
  customersToAprove = server + "api/adminController/getCustomersToAprove";
  aproveCompany = server + "api/adminController/aproveCompany?id=";
  aproveCustomer = server + "api/adminController/aproveCustomers?id=";
  getAllCustomers = server + "api/adminController/getAllCustomers";
  getAllCompanies = server + "api/adminController/getAllCompanies";
  deleteCompany = server + "api/adminController/deleteCompany?id=";
  deleteCustomer = server + "api/adminController/deleteCustomer?id=";
  getOneCompany = server + "api/adminController/getOneCompany?id=";
  getOneCustomer = server + "api/adminController/getOneCustomer?id=";
  getCompanyDetails = server + "api/companyController/getOneCompany";
  updateCoupon = server + "api/companyController/updateCoupon";
  getAllPurchaseCoupons =
    server + "api/customerController/getAllCoupons?customerId=";
}

// Production Environment
// class ProductionConfig extends Config {
//   getOneCompany = "http://localhost:8080/api/adminController/getOneCompany?id=";
//   getOneCustomer =
//     "http://localhost:8080/api/adminController/getOneCustomer?id=";
//   updateCustomer = "http://localhost:8080/api/adminController/updateCustomer";
//   updateCompany = "http://localhost:8080/api/adminController/updateCompany";
//   updateCoupon = "http://localhost:8080/api/companyController/updateCoupon";
//   buyCoupon =
//     "http://localhost:8080/api/customerController/purchaseCoupon?couponId=";
//   addCoupon = "http://localhost:8080/api/companyController/addCoupon";
//   getCompanyCoupons =
//     "http://localhost:8080/api/companyController/getCompanyCoupons?companyId=";
//   getAllPurchaseCoupons =
//     "http://localhost:8080/api/customerController/getAllCoupons";
//   getAllCouponsUrl = "http://localhost:8080/api/GuestController/getAllCoupons";
//   companyRegisterUrl =
//     "http://localhost:8080/api/authController/registerCompany";
//   customerRegisterUrl =
//     "http://localhost:8080/api/authController/registerCustomer";
//   companyLoginUrl = "http://localhost:8080/api/authController/companyLogin";
//   customerLoginUrl = "http://localhost:8080/api/authController/customerLogin";
//   adminLoginUrl = "http://localhost:8080/api/authController/adminLogin";
//   companiesToAprove =
//     "http://localhost:8080/api/adminController/getCompaniesToAprove";
//   customersToAprove =
//     "http://localhost:8080/api/adminController/getCustomersToAprove";
//   aproveCompany = "http://localhost:8080/api/adminController/aproveCompany?id=";
//   aproveCustomer =
//     "http://localhost:8080/api/adminController/aproveCustomers?id=";
//   getAllCustomers = "http://localhost:8080/api/adminController/getAllCustomers";
//   getAllCompanies = "http://localhost:8080/api/adminController/getAllCompanies";
//   deleteCompany = "http://localhost:8080/api/adminController/deleteCompany?id=";
//   deleteCustomer =
//     "http://localhost:8080/api/adminController/deleteCustomer?id=";
//   getCompanyDetails =
//     "http://localhost:8080/api/companyController/getOneCompany";
// }

const appConfig = new DevelopmentConfig();

export default appConfig;
