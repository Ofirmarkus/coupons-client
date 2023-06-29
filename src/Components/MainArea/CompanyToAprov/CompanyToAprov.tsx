import { ToggleButton } from "@mui/material";
import clientAproveService from "../../../Services/ClientAproveService";
import "./CompanyToAprov.css";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import notificationService from "../../../Services/NotificationService";

interface Props {
  id: number;
  name: string;
  email: string;
  clientType: string;
}

function CompanyToAprov(props: Props): JSX.Element {
  function send() {
    try {
      clientAproveService.aproveCompany(props.id);
      notificationService.success("company aproved.");
    } catch (error) {
      notificationService.error(error);
    }
  }
  return (
    <tr className="CompanyToAprov">
      <td>{props.name}</td>
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

export default CompanyToAprov;
