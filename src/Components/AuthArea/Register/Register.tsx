import { useForm } from "react-hook-form";
import "./Register.css";
import RegisterModel from "../../../Models/RegisterModel";
import authService from "../../../Services/AuthService";
import CompanyModel from "../../../Models/CompanyModelRegister";
import CustomerModel from "../../../Models/CustomerModelRegister";
import ClientType from "../../../Models/ClientType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import notificationService from "../../../Services/NotificationService";

function Register(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState } = useForm<RegisterModel>();
  const navigate = useNavigate();

  async function send(registerModel: RegisterModel) {
    if (registerModel.type === ClientType.COMPANY) {
      try {
        const company = new CompanyModel(
          0,
          registerModel.firstName,
          registerModel.email,
          registerModel.password,
          registerModel.type
        );
        await authService.companyRegister(company);
        notificationService.success("register complete,white for aprove");
        navigate("/home");
      } catch (error) {
        notificationService.error(error);
      }
    }
    if (registerModel.type === ClientType.CUSTOMER) {
      try {
        const customer = new CustomerModel(
          0,
          registerModel.firstName,
          registerModel.lastName,
          registerModel.email,
          registerModel.password,
          registerModel.type
        );
        authService.customerRegister(customer);
        navigate("/home");
        notificationService.success("register complete,white for aprove");
      } catch (error) {
        notificationService.error(error);
      }
    }
  }
  return (
    <div className="Register">
      <br />
      <h2>Register</h2>
      <br />
      <br />
      <form className="RegisterForm" onSubmit={handleSubmit(send)}>
        <FormControl fullWidth>
          <InputLabel id="client-type">Client type</InputLabel>
          <Select
            {...register("type", {
              required: { value: true, message: "Missing type" },
            })}
            defaultValue=""
            labelId="client-type"
            label="Client type"
          >
            <MenuItem value={ClientType.CUSTOMER}>customer</MenuItem>
            <MenuItem value={ClientType.COMPANY}>company</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <span className="errorSpan">{formState.errors?.type?.message}</span>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
          <Input
            {...register("firstName", {
              required: { value: true, message: "Missing firstName" },
            })}
          />
        </FormControl>
        <span className="errorSpan">
          {formState.errors?.firstName?.message}
        </span>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            lastname
          </InputLabel>
          <Input placeholder="only for customers" {...register("lastName")} />
        </FormControl>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            {...register("email", {
              required: { value: true, message: "Missing email" },
            })}
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.email?.message}</span>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            {...register("password", {
              required: { value: true, message: "Missing password" },
            })}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.password?.message}</span>
        <br />
        <br />
        <br />
        <Button variant="contained" type="submit" startIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default Register;
