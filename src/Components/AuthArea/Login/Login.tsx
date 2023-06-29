import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import CredentialsModel from "../../../Models/CredentialsModel";
import "./Login.css";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import notificationService from "../../../Services/NotificationService";

function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      navigate("/home");

      notificationService.success("Welcome Back!");
    } catch (error) {
      notificationService.error(error);
    }
  }
  return (
    <div className="Login ">
      <form onSubmit={handleSubmit(send)}>
        <br />
        <h2>Login</h2>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Client type</InputLabel>
          <Select
            {...register("type", {
              required: { value: true, message: "Missing clientType" },
            })}
            defaultValue=""
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="company">Company</MenuItem>
          </Select>
          {}
        </FormControl>
        <br />
        <br />
        <span className="errorSpan">{formState.errors?.type?.message}</span>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input {...register("email")} />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            {...register("password")}
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
        <br />
        <br />
        <br />
        <br />

        <Button
          color="info"
          variant="contained"
          type="submit"
          startIcon={<SendIcon />}
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default Login;
