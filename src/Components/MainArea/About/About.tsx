import "./About.css";
import img1 from "../../../Assets/Images/1.png";
import img2 from "../../../Assets/Images/2.png";
import img3 from "../../../Assets/Images/3.png";

function About(): JSX.Element {
    return (
        <div className="About">
            <div id="text">
               <h3>Trusted local marketplace where consumers go to buy services and experiences that make life more interesting and deliver boundless value.</h3>
<p>Strong partnerships with great local businesses are at the very heart of CouponSite.com. These partnerships allow us to bring the best experiences and value to our customers, whether they’re looking for new things to try, taste, learn or do. And, by connecting our customers with our merchant partners, we create relationships between loyal, repeat customers and quality local businesses that help communities thrive.</p>
            </div>
            <div id="logo">
			<img src={img1}  />
			<img src={img2} />
			<img src={img3}/>
            </div>

        </div>
    );
}

export default About;
