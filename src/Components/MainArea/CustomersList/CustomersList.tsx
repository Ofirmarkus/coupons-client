import { useEffect, useState } from "react";
import "./CustomersList.css";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import { customersListStore } from "../../../Redux/CustomersListState";
import CustomerFromList from "../CustomerFromList/CustomerFromList";
import notificationService from "../../../Services/NotificationService";

function CustomersList(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);

  useEffect(() => {
    adminService.getAllCustomers().then(
      (arr) => setCustomers(arr),
      (err) => notificationService.error(err)
    );
    const unsubscribe = customersListStore.subscribe(() => {
      adminService.getAllCustomers().then(
        (arr) =>{

          setCustomers(arr)
        } ,
        (err) => notificationService.error(err)
      );
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="CustomersList">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Client type</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <CustomerFromList
              key={c.id}
              firstname={c.firstName}
              lastname={c.lastName}
              id={c.id}
              email={c.email}
              clientType={c.clientType}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersList;
