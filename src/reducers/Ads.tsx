export const Ads = (state = null, action: { type: any; ads: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_ADS':
            return action.ads;
        case 'ADS_ERROR':
            return action.error;
        default:
            return state;
    }
}