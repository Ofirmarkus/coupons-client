import { NavLink } from "react-router-dom";
import "./CustomerFromList.css";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface Props{
    id: number;
    firstname: string;
    lastname:string;
    email: string;
    clientType: string;
}
function CustomerFromList(props:Props): JSX.Element {
    function send() {
       
        }
    return (
        <tr className="CustomerFromList">
            
			<td>{props.firstname}</td>
			<td>{props.lastname}</td>
      <td>{props.email}</td>
      <td>{props.clientType}</td>
      <td><NavLink to={"/customerDetails/"+props.id}><ModeEditOutlineOutlinedIcon/></NavLink></td>
      
        </tr>
    );
}

export default CustomerFromList;
