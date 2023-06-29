import { NavLink } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyFromList.css";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface Props{
    id: number;
    
    name: string;
    email: string;
    clientType: string;
}
function CompanyFromList(props:Props): JSX.Element {
   
    return (
        <tr className="CompanyFromList">
			  <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.clientType}</td>
      <td>
       <NavLink to={"/companyDetails/"+props.id}><ModeEditOutlineOutlinedIcon/></NavLink>
      </td>
        </tr>
    );
}

export default CompanyFromList;
