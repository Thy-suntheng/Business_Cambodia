export const loadCategory = (categories: any) => {
    return (dispatch: any) => {
        dispatch({ type: 'LOAD_CATEGORY', categories })
    }
}

export const loadCategoryTitle = (category_title: any) => {
    return (dispatch: any) => {
        dispatch({ type: 'LOAD_CATEGORY_TITLE', category_title })
    }
}