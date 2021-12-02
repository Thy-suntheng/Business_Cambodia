export const HomeAds = (state = null, action: { type: any; pop_up_ads_home: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_POPUP_ADS_ADS':
            return action.pop_up_ads_home;
        case 'ADS_ERROR':
            return action.error;
        default:
            return state;
    }
}