import clientAproveService from "../../../Services/ClientAproveService";
import "./CustomerToAprove.css";
import { ToggleButton } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

interface Props {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  clientType: string;
}
function CustomerToAprove(props: Props): JSX.Element {
  function send() {
    try {
      console.log(props.id);
      
      clientAproveService.aproveCustomer(props.id);
      alert("company aproved.");
    } catch (error) {
      alert(error);
    }
  }
  return (
    <tr className="CustomerToAprove">
      <td>{props.firstname}</td>
      <td>{props.lastname}</td>
      <td>{props.email}</td>
      <td>{props.clientType}</td>
      <td>
      <ToggleButton
  value="check"
  onChange={() => {
    send();
  }}
>
  <CheckOutlinedIcon />
</ToggleButton>
      </td>
    </tr>
  );
}

export default CustomerToAprove;
