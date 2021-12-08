import { combineReducers } from "redux";
import { Ads } from "./Ads";
import { Category, CategoryTitle } from "./Category";
import { DetailAds } from "./detailAds";
import { Home } from "./Home";
import { HomeAds } from "./HomeAds";



const LoadingStyles = (state = [], action: { type: any; style: any; error: any; }) => {
    switch (action.type) {
        case 'LOAD_STYLES':
            return action.style
        case 'LOAD_STYLES_ERROR':
            return action.error;
        default:
            break;
    }
    return state;
}

const ChangeSize = (state = 14, action: { type: any; size: any; error: any; }) => {
    switch (action.type) {
        case 'LOAD_SIZE':
            return action.size
        default:
            break;
    }
    return state;
}

const noConnection = (state = false, action: { type: any; value: any; error: any; }) => {
    switch (action.type) {
        case 'LOAD_NO_CONNECTION':
            return action.value
        case 'LOAD__NO_CONNECTION_ERROR':
            return action.error;
        default:
            break;
    }
    return state;
}

const rootReducers = combineReducers({
    home: Home,
    category_title: CategoryTitle,
    categories: Category,
    ads: Ads,
    pop_up_ads_home: HomeAds,
    pop_up_detail_ads: DetailAds,
    no_connection: noConnection
});

export default rootReducers;