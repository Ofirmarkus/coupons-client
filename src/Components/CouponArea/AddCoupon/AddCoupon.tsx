import { useNavigate } from "react-router-dom";
import "./AddCoupon.css";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import couponService from "../../../Services/couponService";
import notificationService from "../../../Services/NotificationService";

function AddCoupon(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<CouponModel>();
  const navigate = useNavigate();
    async function send(coupon:CouponModel) {

      couponService.addCoupon(coupon).then(
        ()=>{},
        (err)=>notificationService.error(err)
      );
      notificationService.success("Coupon added")

        navigate("/home");
      }
    return (
        <div className="AddCoupon">
            <br />
			  <h2>New coupon</h2>
        <br /><br />
        <form className="AddCouponForm" onSubmit={handleSubmit(send)}>
       
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          
          
          label="Age"
          {...register("category" ,{required: {value: true, message:"Missing category"}})}
          defaultValue=""
        >
          <MenuItem  value="FOOD" >food</MenuItem>
          <MenuItem value="VACATION">Vacation</MenuItem>
          <MenuItem value="RESTAURANT">Restaurant</MenuItem>
          <MenuItem value="ELECTRICITY">Electricity</MenuItem>
        </Select>
      </FormControl><br /><br />
      <span className="errorSpan">{formState.errors?.category?.message}</span>
          
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Title</InputLabel>
          <Input
          {...register("title",{required: {value: true, message:"Missing title"}})}
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.title?.message}</span>

            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Description</InputLabel>
          <Input placeholder="only for customers"
          
          {...register("description" ,{required: {value: true, message:"Missing description"}})}
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.description?.message}</span>
       

           

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <p>Start date</p>
          <InputLabel htmlFor="standard-adornment-password"></InputLabel>
          <Input
          placeholder="start date"
          type="date"
          
         {...register("startDate",{required: {value: true, message:"Missing startDate"}})}
          />
          </FormControl>
          <span className="errorSpan">{formState.errors?.startDate?.message}</span>
          <p>End date</p>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password"></InputLabel>
          <Input
          type="date"
          
         {...register("endDate",{required: {value: true, message:"Missing endDate"}})}
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.endDate?.message}</span>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Amount</InputLabel>
          <Input
        
         {...register("amount",{required: {value: true, message:"Missing amount"}})}
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.amount?.message}</span>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Price</InputLabel>
          <Input
          
         {...register("price",{required: {value: true, message:"Missing Price"}})}
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.price?.message}</span>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Image</InputLabel>
          <Input
          
         {...register("image",{required: {value: true, message:"Missing Image"}})}
          />
        </FormControl>
        <span className="errorSpan">{formState.errors?.image?.message}</span>
          
            
        <br />
        <br />
        <br />
            <Button variant="contained" type="submit" startIcon={<SendIcon/>}>Send</Button>
          
      </form>
        </div>
    );
}

export default AddCoupon;
