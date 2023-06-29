import authService from "../../../Services/AuthService";
import "./Logout.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    // notificationService.success("Bye Bye...");
    navigate("/home");
  }, []);
  return null;
}

export default Logout;
