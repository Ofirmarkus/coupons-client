import "./CustomerDetails.css";
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
import CustomerModel from "../../../Models/CustomerModel";
import CustomerModelComplete from "../../../Models/CustomerModelComplete";

function CustomerDetails(): JSX.Element {
  const params = useParams();
  const customerId = +params.customerId;
    const { register, handleSubmit,setValue } = useForm<CustomerModelComplete>();
    const navigate = useNavigate();
   
    function f() {
      adminService.deleteCustomerFromList(customerId).then(
        ()=>{
          notificationService.success("Customer Deleted");
          navigate("/allCustomers")
          
        }
      ).catch()
    }
    useEffect(()=>{
      adminService.getOneCustomerComplete(customerId).then(
        (c)=>{
          setValue("firstName",c.firstName);
          setValue("lastName",c.lastName);
          setValue("clientType",c.clientType);
          setValue("email",c.email);
          setValue("active",c.active);
          setValue("password",c.password);
          setValue("id",c.id);
          

          
        }
      )
    },[])
  
    async function send(customer: CustomerModelComplete) {
      adminService.updateCustomer(customer).then(
        ()=>{notificationService.success("Customer Updated")
        navigate("/allCustomers")}
      ).catch(
        (err)=>notificationService.error(err)
      )
    }
    return (
        <div className="CustomerDetails">
					<br />
        <h2>Edit Details</h2>
        <br /><br />
        <form className="RegisterForm" onSubmit={handleSubmit(send)}>
       
        <FormControl fullWidth>
          <InputLabel>First name</InputLabel>
          <Input
          {...register("firstName",{required: { value: true, message: "Missing firstName" }}
          )}
         
          />

  
      </FormControl>
          
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel>Last name</InputLabel>
          <Input 
          {...register("lastName",{required: { value: true, message: "Missing lastName" }}
          )}
          />
        </FormControl>

            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel>Email</InputLabel>
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
        <div id="buttonsDiv">

            <Button variant="contained"  className="buttons" type="submit" startIcon={<SendIcon/>}>Update</Button>
            <Button variant="contained" color="error" className="buttons" onClick={f}  startIcon={<>x</>}>Delete</Button>
        </div>
          
      </form>
        </div>
    );
}

export default CustomerDetails;
