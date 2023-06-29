import { useEffect, useState } from "react";
import { authAdminStore } from "../../../Redux/AuthStateAdmin";
import { authCompanyStore } from "../../../Redux/AuthStateCompany";
import { authCustomerStore } from "../../../Redux/AuthStateCustomer";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import AdminModel from "../../../Models/AdminModel";
import CompanyModel from "../../../Models/CompanyModel";
import CustomerModel from "../../../Models/CustomerModelToJwt";
import authService from "../../../Services/AuthService";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function NavBar(): JSX.Element {
  const [adminUser, setAdminUser] = useState<AdminModel>();
  const [companyUser, setCompanyUser] = useState<CompanyModel>();
  const [customerUser, setCustomerUser] = useState<CustomerModel>();

  useEffect(() => {
    setAdminUser(authAdminStore.getState().user);

    const unsubscribe = authAdminStore.subscribe(() => {
      setAdminUser(authAdminStore.getState().user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    setCompanyUser(authCompanyStore.getState().user);

    const unsubscribe = authCompanyStore.subscribe(() => {
      setCompanyUser(authCompanyStore.getState().user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    setCustomerUser(authCustomerStore.getState().user);

    const unsubscribe = authCustomerStore.subscribe(() => {
      setCustomerUser(authCustomerStore.getState().user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <nav className="NavBar">
      {!localStorage.getItem("adminToken") &&
        !localStorage.getItem("customerToken") &&
        !localStorage.getItem("companyToken") && (
          <>
            <span>Hello guest | </span>
            <NavLink className="navBarButtom" to="/login">
              Login
            </NavLink>
            <span> | </span>
            <NavLink className="navBarButtom" to="/register">
              Register
            </NavLink>
            <span> | </span>
            <NavLink className="navBarButtom" to="/home">
              Home🏠
            </NavLink>
          </>
        )}

      {companyUser && (
        <>
          <span>Hello {companyUser.name} | </span>
          <NavLink className="navBarButtom" to="logout">
            Logout
          </NavLink>
          <NavLink className="navBarButtom" to="/home">
            Home🏠
          </NavLink>

          <div className="authDiv">
            <NavLink className="navBarButtom" to={"companyCoupons/"+companyUser.id}>
              My coupons
            </NavLink>
            <NavLink className="navBarButtom" to="addCoupon">
              Add coupon
            </NavLink>
          </div>
        </>
      )}

      {adminUser && (
        <>
          <span>Hello Admin | </span>
          <NavLink className="navBarButtom" to="/logout">
            Logout
          </NavLink>
          <NavLink className="navBarButtom" to="/home">
            Home🏠
          </NavLink>
          <div className="authDiv">
            <NavLink className="navBarButtom" to="/companiesToAprove">
              Companies to aprove
            </NavLink>
            <NavLink className="navBarButtom" to="/customersToAprove">
              Customers to aprove
            </NavLink>
            <NavLink className="navBarButtom" to="/allCompanies">
              Companies list
            </NavLink>
            <NavLink className="navBarButtom" to="/allCustomers">
              Customers list
            </NavLink>
          </div>
        </>
      )}
      {customerUser && (
        <>
          <span>Hello {customerUser.name} | </span>
          <NavLink className="navBarButtom" to="/logout">
            Logout
          </NavLink>
          <NavLink className="navBarButtom" to="/home">
            Home🏠
          </NavLink>
          <div className="authDiv">
            <NavLink className="navBarButtom" to={"/purchaseHistory/"+customerUser.id}>
              Purchase history
            </NavLink>
           
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
