import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./PurchaseCoupon.css";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import couponService from "../../../Services/couponService";
import notificationService from "../../../Services/NotificationService";
import CouponModel from "../../../Models/CouponModel";
import { authCustomerStore } from "../../../Redux/AuthStateCustomer";
import adminService from "../../../Services/AdminService";

interface Props {
  email: string;
}

function PurchaseCoupon(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<Props>();
  const params = useParams();
  const couponId = +params.couponId;

  const [coupon, setCoupon] = useState<CouponModel>();

  useEffect(() => {
    couponService.getOneCouponById(couponId).then(
      (c) => setCoupon(c),
      (e) => notificationService.error(e)
    );
  }, []);
  function f() {
    navigate("/loginFromBuy/" + couponId);
  }

  async function send(props: Props) {
    if (authCustomerStore.getState().user.email === props.email) {
      couponService
        .buyCoupon(couponId, authCustomerStore.getState().user.id)
        .then(
          () => {
            notificationService.success("Purchase success");
            navigate("/home");
          },
          (err) => notificationService.error(err)
        );
    } else {
      notificationService.error("Incorrect email");
    }
  }

  return (
    <div className="PurchaseCoupon">
      <div id="PurchaseCouponDiv">
        <form onSubmit={handleSubmit(send)}>
          {coupon && (
            <div id="couponDiv">
              <div id="detailsDiv">
                <h2>Buy it now</h2>
                <span>Name : {coupon.title}</span>
                <span>Price : {coupon.price}$</span>
                <span>amount : {coupon.amount}</span>
                <br />
                <br />
                <br />
                <br />
                {!localStorage.getItem("adminToken") &&
                  !localStorage.getItem("customerToken") &&
                  !localStorage.getItem("companyToken") && (
                    <>
                      <br />
                      <br />
                      <br />
                      <Button
                        color="info"
                        variant="contained"
                        type="submit"
                        startIcon={<ShoppingCartOutlinedIcon />}
                        onClick={f}
                      >
                        login
                      </Button>
                    </>
                  )}

                {localStorage.getItem("customerToken") && (
                  <>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-adornment-password">
                        Email
                      </InputLabel>
                      <Input {...register("email")} />
                    </FormControl>
                    <Button
                      color="info"
                      variant="contained"
                      type="submit"
                      startIcon={<ShoppingCartOutlinedIcon />}
                    >
                      Buy
                    </Button>
                  </>
                )}
              </div>
              <img src={coupon.image} alt="" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PurchaseCoupon;
