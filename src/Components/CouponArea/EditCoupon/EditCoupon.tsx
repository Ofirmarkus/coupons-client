import CouponModel from "../../../Models/CouponModel";
import "./EditCoupon.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import couponService from "../../../Services/couponService";
import notificationService from "../../../Services/NotificationService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function EditCoupon(): JSX.Element {
  const params = useParams();
  const couponId = +params.couponId;

  const { register, handleSubmit, setValue } =
  useForm<CouponModel>();
const navigate = useNavigate();

useEffect(() => {
  couponService
    .getOneCouponById(couponId)
    .then((c) => {
        setValue("category", c.category);
        setValue("amount", c.amount);
        setValue("description", c.description);
        setValue("endDate", c.endDate);
        setValue("id", c.id);
        setValue("image", c.image);
        setValue("price", c.price);
        setValue("startDate", c.startDate);
        setValue("title", c.title);
     
    })
    .catch((err) => notificationService.error(err));
}, []);

async function send(coupon: CouponModel) {
  couponService.updateCoupon(coupon).then(
    ()=>{notificationService.success("Coupon Updated")
    navigate("/home")}
  ).catch(
    (err)=>notificationService.error(err)
  )
  
}

 

  return (
    <div className="EditCoupon">
      
      		    <br />
      <h2>Edit coupon</h2>
      <br />
      <br />
      <form className="AddCouponForm" onSubmit={handleSubmit(send)}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select {...register("category")}>
            <MenuItem value="FOOD">food</MenuItem>
            <MenuItem value="VACATION">Vacation</MenuItem>
            <MenuItem value="RESTAURANT">Restaurant</MenuItem>
            <MenuItem value="ELECTRICITY">Electricity</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Title</InputLabel>
          <Input
            {...register("title", {
              required: { value: true, message: "Missing title" }
            })}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Description
          </InputLabel>
          <Input
            placeholder="only for customers"
            {...register("description", {
              required: { value: true, message: "Missing description" }
            })}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Start date
          </InputLabel>
          <Input
            placeholder="yyyy-mm-dd"
            {...register("startDate", {
              required: { value: true, message: "Missing startDate" }
            })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            End date
          </InputLabel>
          <Input
            placeholder="yyyy-mm-dd"
            {...register("endDate", {
              required: { value: true, message: "Missing endDate" }
            })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Amount</InputLabel>
          <Input
            {...register("amount", {
              required: { value: true, message: "Missing amount" }
            })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Price</InputLabel>
          <Input
            {...register("price", {
              required: { value: true, message: "Missing category" }
            })}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Image</InputLabel>
          <Input
            {...register("image", {
              required: { value: true, message: "Missing category" }
            })}
          />
        </FormControl>

        <br />
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          startIcon={<EditOutlinedIcon />}
        >
          Update
        </Button>
      </form>
      
    </div>
  );
}

export default EditCoupon;
