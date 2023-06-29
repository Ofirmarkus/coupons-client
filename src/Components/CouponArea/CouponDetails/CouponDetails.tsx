import "./CouponDetails.css";
import { NavLink, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { useEffect, useState } from "react";
import couponService from "../../../Services/couponService";
import notificationService from "../../../Services/NotificationService";

function CouponDetails(): JSX.Element {

    const params=useParams();
    const couponId= +params.couponId;

   


    const [coupon, setCoupon]= useState<CouponModel>();

    useEffect(()=>{
        couponService.getOneCouponById(couponId).then(
            (c) => setCoupon(c),
            (e) => notificationService.error(e)
            )
    },[]);
    
    return (
        <div className="CouponDetails ">

            {coupon && (
                <>
                <img src={coupon.image}  />
                <h3 className="name">{coupon.title}</h3>
                Stock : {coupon.amount}
                <h3>Description : </h3>{coupon.description}
                <h3 className="price">💲{coupon.price} </h3>
                </>
            )}
            <div className="navLinks">
            <NavLink to={"/purchaseCoupon/"+couponId}>Buy it now👜</NavLink>
            <NavLink to={"/home"}>Return home🏠</NavLink>
            </div>
			
        </div>
    );
}

export default CouponDetails;
