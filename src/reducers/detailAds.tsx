export const DetailAds = (state = null, action: { type: any; pop_up_detail_ads: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_POPUP_DETAIL_ADS':
            return action.pop_up_detail_ads;
        case 'ADS_ERROR':
            return action.error;
        default:
            return state;
    }
}