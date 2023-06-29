import CouponModel from "../../../Models/CouponModel";
import "./CouponFromPurchaseList.css";


interface CouponCardProps{
    coupon: CouponModel;
}

function CouponFromPurchaseList(props:CouponCardProps): JSX.Element {


    return (
        <tr className="CouponFromPurchaseList">
			<td>{props.coupon.title}</td>
            <td>{props.coupon.category}</td>
            <td>{props.coupon.price}</td>
        </tr>
    );
}

export default CouponFromPurchaseList;
