import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/couponService";
import "./CompanyCoupons.css";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import CompanyCouponFromList from "../CompanyCouponFromList/CompanyCouponFromList";
import { companyCouponsStore } from "../../../Redux/CompanyCouponsStete";
import { useParams } from "react-router-dom";


function CompanyCoupons(): JSX.Element {
  const params=useParams();
  const companyId=+params.companyId;
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    useEffect(() => {
      couponService.getAllCompanyCoupons(companyId).then(
        (arr) => {
          setCoupons(arr);
        },
        (err) => {
          alert(err);
        }
      );
      const unsubscribe = companyCouponsStore.subscribe(() => {
          
         
        couponService.getAllCompanyCoupons(companyId).then(
          (arr) => {
            setCoupons(arr);
          },
          (err) => {
            alert(err);
          })

      
      });
      return () => unsubscribe();

    }, []);
    return (
        <div className="CompanyCoupons">
          <table>
            <thead>
              <tr>
              <th>Coupon Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Price</th>

              </tr>
            </thead>
            <tbody>

				  {coupons.map((c) => (
        <CompanyCouponFromList key={c.id} coupon={c} />
      ))}
            </tbody>
          </table>
        </div>
    );
}

export default CompanyCoupons;
