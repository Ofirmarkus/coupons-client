import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { couponsSearchStore } from "../../../Redux/CouponSearchState";
import couponService from "../../../Services/couponService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import "./SearchComponent.css";
import { useEffect, useState } from "react";

function SearchComponent(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
useEffect(() => {

    couponService.getAllCouponsSearchd().then(
        (arr)=>{
            setCoupons(arr)
        },
        (err)=>{
            alert(err)
        }
        )
        const unsubscribe=couponsSearchStore.subscribe(()=>{
            couponService.getAllCouponsSearchd().then(
                (arr)=>{
                    setCoupons(arr)
                },
                (err)=>{
                    alert(err)
                }
                )
          });
            return ()=>{
                unsubscribe(); 
            }
            
},[])
        
            
return (
    <div className="SearchComponent">
    
      {coupons.map((c) => (
          <CouponCard key={c.id} coupon={c} />
          
          ))}
          <NavLink id="return" to="/home">Home🏠</NavLink>
          
    </div>
  
       
    );
    };





export default SearchComponent;
