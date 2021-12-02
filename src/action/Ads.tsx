export const loadAds = (ads: any) => {
    return (dispatch: any) => {
        dispatch({ type: 'LOAD_ADS', ads })
    }
}

export const loadPopUpHomeAds = (pop_up_ads_home: any) => {
    return (dispatch: any) => {
        dispatch({ type: 'LOAD_POPUP_ADS_ADS', pop_up_ads_home })
    }
}