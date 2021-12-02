import { loadAds, loadPopUpHomeAds, loadPopUpDetailAds } from "../action/Ads";
import { loadCategory } from "../action/Category";
import { loadHome } from "../action/Home";
import { fetchBasicApi } from "./PTFunction";

export async function loadData(dispatch) {
    fetchBasicApi('ads-popup-home?').then((ads) => {
        dispatch(loadPopUpHomeAds(ads.data));
    })
    fetchBasicApi('ads-popup-page?').then((adss) => {
        dispatch(loadPopUpDetailAds(adss.data));
    })
    fetchBasicApi('ads-list-home?').then((ads) => {
        dispatch(loadAds(ads));
    })
    fetchBasicApi('category?').then((categories) => {
        dispatch(loadCategory(categories));
    })
    fetchBasicApi('home?').then((home) => {
        dispatch(loadHome(home));
    })

};