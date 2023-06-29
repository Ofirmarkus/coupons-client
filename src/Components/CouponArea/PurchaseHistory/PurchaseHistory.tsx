import { useEffect, useState } from "react";
import CouponCard from "../CouponCard/CouponCard";
import "./PurchaseHistory.css";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/couponService";
import { NavLink, useParams } from "react-router-dom";
import CouponFromPurchaseList from "../CouponFromPurchaseList/CouponFromPurchaseList";

function PurchaseHistory(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const params=useParams();
  const customerId= +params.customerId;
  useEffect(() => {
    couponService.getAllCouponsPurchase(customerId).then(
      (arr) => {
        setCoupons(arr);
      },
      (err) => {
        alert(err);
      }
    );
  }, []);
  return (
    <div className="PurchaseHistory">
      <table>
        <thead>
          <tr>
            <th>Coupon Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>

          {coupons.map((c) => (
        <CouponFromPurchaseList key={c.id} coupon={c} />
        ))}

        </tbody>
          </table>
      {coupons.length == 0 && (
        <div id="messageDiv">
          <span>you dont purchase any coupos yet</span>
          <NavLink to="/home">Purchase Coupons</NavLink>
        </div>
      )}
    </div>
  );
}

export default PurchaseHistory;
