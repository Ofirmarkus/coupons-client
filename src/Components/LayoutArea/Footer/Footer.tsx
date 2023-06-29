import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <footer className="Footer">
			<NavLink id="about" to="/about">About Us</NavLink>
            <p>All Rights Reserved &copy;</p>
        </footer>
    );
}

export default Footer;
