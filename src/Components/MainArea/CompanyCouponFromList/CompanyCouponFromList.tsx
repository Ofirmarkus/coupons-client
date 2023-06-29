import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CompanyCouponFromList.css";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface CouponCardProps{
    coupon: CouponModel;
}

function CompanyCouponFromList(props:CouponCardProps): JSX.Element {
    return (
        <tr className="CompanyCouponFromList">
			
            <td>{props.coupon.title}</td>
            <td>{props.coupon.category}</td>
            <td>{props.coupon.amount}</td>
            <td>{props.coupon.price}</td>
            <td><NavLink to={"/editCoupon/"+props.coupon.id}><EditOutlinedIcon/></NavLink></td>
        </tr>
    );
}

export default CompanyCouponFromList;
