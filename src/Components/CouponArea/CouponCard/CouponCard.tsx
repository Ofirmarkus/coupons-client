import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProps{
    coupon: CouponModel
}

function CouponCard(props: CouponCardProps): JSX.Element {
    return (
        <div className="CouponCard Box">
            <div>
			<NavLink to={"/coupons/details/" + props.coupon.id}>
                <img src={props.coupon.image} />
                
            </NavLink>
            </div>
            <span className="spanName">
             {props.coupon.title}
            </span>
            <br />
            <span>
            Category : {props.coupon.category} 

            </span>
            <br /> 
            <span>
            Stock : {props.coupon.amount} <br />
            </span>
            <br />
            <span className="spanPrice">
            💲{props.coupon.price} 
            </span>
        </div>
    );
}

export default CouponCard;
