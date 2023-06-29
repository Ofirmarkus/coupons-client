import { useNavigate } from "react-router-dom";
import CustomerToAproveModel from "../../../Models/CustomerToAproveModel";
import { authCustomerStore } from "../../../Redux/AuthStateCustomer";
import { customersToAprovStore } from "../../../Redux/CustomerAproveState";
import clientAproveService from "../../../Services/ClientAproveService";
import CustomerToAprove from "../CustomerToAprove/CustomerToAprove";
import "./CustomersToAproveList.css";
import { useEffect, useState } from "react";
import notificationService from "../../../Services/NotificationService";



function CustomersToAproveList(): JSX.Element {
  const navigate = useNavigate();

    const [customers, setCustomers] = useState<CustomerToAproveModel[]>([]);
  useEffect(() => {
    clientAproveService.getCustomersToAprove().then(
      (arr) => {
        setCustomers(arr);
      },
      (err) => {
        alert(err.message);
      }
    );
    const unsubscribe=customersToAprovStore.subscribe(()=>{
      clientAproveService.getCustomersToAprove().then(
        (arr) => {
            setCustomers(arr);
        },
        (err) => {
          alert(err.message);
        }
      );

    });
    return ()=>{
      unsubscribe()
    }
  }, []);
    return (
        <div className="CustomersToAproveList">

          {customers.length > 0 &&

			    <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Client type</th>
          </tr>
        </thead>
        <tbody> 
          {customers.map((c)=>(
            <CustomerToAprove key={c.id} clientType={c.clientType} id={c.id} firstname={c.firstName} lastname={c.lastName} email={c.email}/>
          )
            
          )}         
        </tbody>
      </table>
          }
          {customers.length === 0 && 
           <>
           <div id="messageDiv">
   
          <span>There are no customers to confirm</span>
           </div>
            
             
           </>
          }
        </div>
    );
}

export default CustomersToAproveList;
