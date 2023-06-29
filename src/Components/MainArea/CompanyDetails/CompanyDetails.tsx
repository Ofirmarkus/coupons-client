import "./CompanyDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material";
import RegisterModel from "../../../Models/RegisterModel";
import { useForm } from "react-hook-form";
import ClientType from "../../../Models/ClientType";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyModel from "../../../Models/CompanyModel";
import CompanyModelComplete from "../../../Models/CompanyModelComplete";

function CompanyDetails(): JSX.Element {
  const params = useParams();
  const companyId = +params.companyId;
  const { register, handleSubmit,setValue } = useForm<CompanyModelComplete>();
  const navigate = useNavigate();
  
  function f() {
    adminService.deleteCompanyFromList(companyId).then(
      ()=> {
        notificationService.success("Company Deleted")
        navigate("/allCompanies");
      }
      ).catch(
        (err)=>notificationService.error(err)
        )
      }
      useEffect(()=>{
        
        adminService.getOneCompanyComplete(companyId).then(
          (c)=>{
            
              
              
              setValue("email",c.email);
              setValue("name",c.name);
              setValue("clientType",c.clientType);
              setValue("id",c.id);
              setValue("active",c.active);
              setValue("password",c.password);
            
              
              
              
              
              
            }
            )
          },[])
          
  async function send(company: CompanyModelComplete) {
    adminService.updateCompany(company).then(
      ()=>{notificationService.success("Company Updated");
      navigate("/allCompanies")}
    ).catch(
      (err)=>notificationService.error(err)
    )
    }

    return (
        <div className="CompanyDetails">
			<br />
        <h2>Edit Details</h2>
        <br /><br />
        <form className="RegisterForm" onSubmit={handleSubmit(send)}>
       
      

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
         {...register("email",{required: { value: true, message: "Missing email" }}
         )}
          />
        </FormControl>
          
             
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="buttonsDiv">
            
            <Button className="buttons" variant="contained" type="submit" startIcon={<SendIcon/>}>Update</Button>
            <Button  className="buttons" color="error" variant="contained" onClick={f} startIcon={<>x</>}>Delete</Button>
          
        </div>
      </form>
        </div>
    );
}

export default CompanyDetails;
