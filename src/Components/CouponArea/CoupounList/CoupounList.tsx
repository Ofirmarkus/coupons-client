import "./CoupounList.css";
import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/couponService";
import CouponCard from "../CouponCard/CouponCard";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../LayoutArea/Loading/Loading";

function CoupounList(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  useEffect(() => {
    couponService.getAllCoupons().then(
      (arr) => {
        setCoupons(arr);
      },
      (err) => {
        notificationService.error(err);
      }
    );
    
  }, []);
  return (
    <div className="CoupounList">
      {coupons.map((c) => (
        <CouponCard key={c.id} coupon={c} />
      ))}
      {coupons.length===0&&(
        <>
        <Loading/>
        </>
      )
      }
    </div>
  );
}

export default CoupounList;
