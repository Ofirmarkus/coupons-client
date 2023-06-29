import "./Header.css";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import { NavLink } from "react-router-dom";
import NavBar from "../../HeaderArea/NavBar/NavBar";
import SearchBar from "../../HeaderArea/SearchBar/SearchBar";
import { colors } from "@mui/material";
import { yellow } from "@mui/material/colors";

function Header(): JSX.Element {
  return (
    <header className="Header">
      <NavLink className="logo" to="/home">
      <h1>
        C<MouseOutlinedIcon sx={{color: yellow[600]}} />
        uponSite.com
      </h1>

      </NavLink>
      <div>
      </div>
      <h2><p>We make you <span>Happy</span></p>
        
      </h2>
      <NavBar/>
      <SearchBar/>
     
    </header>
  );
}

export default Header;
