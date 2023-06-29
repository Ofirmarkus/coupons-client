import CompanyModel from "../../../Models/CompanyModel";
import { companiesListStore } from "../../../Redux/CompaniesListState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../LayoutArea/Loading/Loading";
import CompanyFromList from "../CompanyFromList/CompanyFromList";
import "./CompaniesList.css";
import { useEffect, useState } from "react";


function CompaniesList(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);

  useEffect(() => {
    
       adminService.getAllCompanies().then(
        (arr) => {
          setCompanies(arr);
        
          
        },
        
        (err) => notificationService.error(err)
        );
        
        
        const unsubscribe = companiesListStore.subscribe(() => {
          
         
          adminService.getAllCompanies().then(
            (arr) => {
              
              setCompanies(arr);
            },
            (err) => notificationService.error(err)
            );

        
        });

        return () => unsubscribe();
      
      }, []);
  return (
    <div className="CompaniesList">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Client type</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <CompanyFromList
              key={c.id}
              name={c.name}
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

export default CompaniesList;
