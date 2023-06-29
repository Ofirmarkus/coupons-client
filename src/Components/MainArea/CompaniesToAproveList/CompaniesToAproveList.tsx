import { useEffect, useState } from "react";
import "./CompaniesToAproveList.css";
import CompanyToAproveModel from "../../../Models/CompanyToAproveModel";
import clientAproveService from "../../../Services/ClientAproveService";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CompanyToAprov from "../CompanyToAprov/CompanyToAprov";
import { companysToAprovStore } from "../../../Redux/CompanyAproveState";
import notificationService from "../../../Services/NotificationService";

function CompaniesToAproveList(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyToAproveModel[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    clientAproveService.getCompaniesToAprove().then(
      (arr) => {
        setCompanies(arr);
      },
      (err) => {
        notificationService.error(err)
      }
    );
    const unsubscribe = companysToAprovStore.subscribe(() => {
      clientAproveService.getCompaniesToAprove().then(
        (arr) => {
          setCompanies(arr);
        },
        (err) => {
          notificationService.error(err)
        }
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="CompaniesToAproveList">
      {companies.length > 0 && (
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
              <CompanyToAprov
                key={c.id}
                clientType={c.clientType}
                id={c.id}
                name={c.name}
                email={c.email}
                
              />
            ))}
          </tbody>
        </table>
      )}
      {companies.length === 0 && (
        <>
        <div id="messageDiv">

       <span>There are no companies to confirm</span>
        </div>
         
          {/* {navigate("/home")} */}
        </>
      )}
 
    </div>
  );
}

export default CompaniesToAproveList;
