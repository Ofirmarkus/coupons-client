import { Navigate, Route, Routes } from "react-router-dom";
import CouponDetails from "../../CouponArea/CouponDetails/CouponDetails";
import CoupounList from "../../CouponArea/CoupounList/CoupounList";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import NavBar from "../../HeaderArea/NavBar/NavBar";
import SearchBar from "../../HeaderArea/SearchBar/SearchBar";
import CompaniesToAproveList from "../../MainArea/CompaniesToAproveList/CompaniesToAproveList";
import SearchComponent from "../../MainArea/SearchComponent/SearchComponent";
import Register from "../../AuthArea/Register/Register";
import CustomersToAproveList from "../../MainArea/CustomersToAproveList/CustomersToAproveList";
import CompaniesList from "../../MainArea/CompaniesList/CompaniesList";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import PurchaseHistory from "../../CouponArea/PurchaseHistory/PurchaseHistory";
import CustomerFromList from "../../MainArea/CustomerFromList/CustomerFromList";
import CustomersList from "../../MainArea/CustomersList/CustomersList";
import CompanyCoupons from "../../MainArea/CompanyCoupons/CompanyCoupons";
import PurchaseCoupon from "../../MainArea/PurchaseCoupon/PurchaseCoupon";
import About from "../../MainArea/About/About";
import LoginFromBuy from "../../AuthArea/LoginFromBuy/LoginFromBuy";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import CompanyDetails from "../../MainArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../MainArea/CustomerDetails/CustomerDetails";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/home" element={<CoupounList />} />
        <Route path="/companyDetails/:companyId" element={<CompanyDetails />} />
        <Route path="/customerDetails/:customerId" element={<CustomerDetails />} />
        <Route path="/companyCoupons/:companyId" element={<CompanyCoupons />} />
        <Route path="/loginFromBuy/:couponId" element={<LoginFromBuy />} />
        <Route path="/editCoupon/:couponId" element={<EditCoupon />} />
        <Route path="/about" element={<About />} />
        <Route path="/addCoupon" element={<AddCoupon />} />
        <Route path="/companiesToAprove" element={<CompaniesToAproveList />} />
        <Route path="/customersToAprove" element={<CustomersToAproveList />} />
        <Route path="/allCompanies" element={<CompaniesList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/purchaseHistory/:customerId" element={<PurchaseHistory />} />
        <Route path="/coupons/details/:couponId" element={<CouponDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchaseCoupon/:couponId" element={<PurchaseCoupon />} />
        <Route path="/allCustomers" element={<CustomersList />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="*" element={<Navigate to={"/home"} />} />
      </Routes>
    </div>
  );
}

export default Routing;
