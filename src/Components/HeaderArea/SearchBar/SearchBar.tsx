import { useForm } from "react-hook-form";
import "./SearchBar.css";
import SearchBarModel from "../../../Models/SearchBarModel";
import couponService from "../../../Services/couponService";
import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { useNavigate } from "react-router-dom";

function SearchBar(): JSX.Element {
  const [select,setSelect]=useState("");
  const { register, handleSubmit } = useForm<SearchBarModel>();
  const navigate = useNavigate();
  function send(searchBar: SearchBarModel) {
    couponService.couponSerched(searchBar);
    navigate("/search");
  }

  return (
    <div className="SearchBar Box">
      <form action="">
        <input type="text" placeholder="Search" {...register("input")} />
        <select name="" id="select" onChange={(e)=>{
          setSelect(e.target.value);
        }}{...register("select")}>
          <option value="maxPrice">By Max price</option>
          <option value="category">
            By Category
          </option>
          <option value="name">By Name</option>
        </select>
        
        <button onClick={handleSubmit(send)}>Search</button>
      </form>
      {select&&
      <>
      ddddd
      </>
      }
    </div>
  );
}

export default SearchBar;
