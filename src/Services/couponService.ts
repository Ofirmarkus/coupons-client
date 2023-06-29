import axios from "axios";
import CouponModel from "../Models/CouponModel";
import {
  couponsStore,
  fetchCouponsAction,
  updateCouponAction,
} from "../Redux/CouponsState";
import appConfig from "../Util/config";
import SearchBarModel from "../Models/SearchBarModel";
import {
  couponsSearchStore,
  searchCouponsAction,
} from "../Redux/CouponSearchState";
import {
  featchPurchaseHistoryAction,
  purchaseHistoryStore,
} from "../Redux/PurchaseHistoryState";
import {
  companyCouponsStore,
  featchCouponsAction,
} from "../Redux/CompanyCouponsStete";

class CouponService {
  public async getAllCoupons(): Promise<CouponModel[]> {
    if (couponsStore.getState().coupons.length === 0) {
      console.log(process.env.REACT_APP_SERVER);
      const response = await axios.get<CouponModel[]>(
        appConfig.getAllCouponsUrl
      );
      const coupons = response.data;
      couponsStore.dispatch(fetchCouponsAction(coupons));
      return coupons;
    }
    return couponsStore.getState().coupons;
  }
  public async getAllCouponsPurchase(id: number): Promise<CouponModel[]> {
    if (purchaseHistoryStore.getState().coupons.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.getAllPurchaseCoupons + id
      );
      const coupons = response.data;
      purchaseHistoryStore.dispatch(featchPurchaseHistoryAction(coupons));
      return coupons;
    }
    return purchaseHistoryStore.getState().coupons;
  }
  public async getAllCompanyCoupons(companId: number): Promise<CouponModel[]> {
    if (companyCouponsStore.getState().companyCoupons.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.getCompanyCoupons + companId
      );
      const coupons = response.data;
      companyCouponsStore.dispatch(featchCouponsAction(coupons));
      return coupons;
    }
    return companyCouponsStore.getState().companyCoupons;
  }
  public async addCoupon(coupon: CouponModel): Promise<void> {
    const response = await axios.post<CouponModel>(appConfig.addCoupon, coupon);
  }
  public async buyCoupon(couponId: number, customerId: number): Promise<void> {
    await axios.post(
      appConfig.buyCoupon + couponId + "&customerId=" + customerId
    );
  }

  public async getAllCouponsSearchd(): Promise<CouponModel[]> {
    return couponsSearchStore.getState().couponsSearchd;
  }
  public async updateCoupon(coupon: CouponModel): Promise<void> {
    const response = await axios.put(appConfig.updateCoupon, coupon);
    const updatedCoupon = response.data;
    couponsStore.dispatch(updateCouponAction(updatedCoupon));
  }

  public async getOneCouponById(id: number): Promise<CouponModel> {
    const coupon = couponsStore.getState().coupons.find((c) => c.id === id);
    return coupon;
  }

  public async getOneCouponByMaxPrice(maxPrice: number) {
    const coupons = couponsStore
      .getState()
      .coupons.filter((c) => c.price <= maxPrice);
    couponsSearchStore.dispatch(searchCouponsAction(coupons));
  }

  public async getCouponByCategory(category: string) {
    let input: string = category.toUpperCase();
    const coupons = couponsStore
      .getState()
      .coupons.filter((c) => c.category === input);
    couponsSearchStore.dispatch(searchCouponsAction(coupons));
  }
  public async getOneCouponByName(name: string) {
    let input: string = name.toLowerCase();
    const coupons: CouponModel[] = couponsStore
      .getState()
      .coupons.filter((c) => c.title === input);
    couponsSearchStore.dispatch(searchCouponsAction(coupons));
  }

  public couponSerched(searchBar: SearchBarModel) {
    switch (searchBar.select) {
      case "category":
        this.getCouponByCategory(searchBar.input);

        break;

      case "name":
        this.getOneCouponByName(searchBar.input);
        break;
      case "maxPrice":
        this.getOneCouponByMaxPrice(+searchBar.input);
        break;
    }
  }
}
const couponService = new CouponService();
export default couponService;
