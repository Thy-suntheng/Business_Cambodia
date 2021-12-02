export const Category = (state = null, action: { type: any; categories: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CATEGORY':
            return action.categories;
        case 'CATEGORY_ERROR':
            return action.error;
        default:
            return state;
    }
}

export const CategoryTitle = (state = null, action: any) => {
    switch (action.type) {
        case 'LOAD_CATEGORY_TITLE':
            return action.category_title;
        case 'CATEGORY_ERROR':
            return action.error;
        default:
            return state;
    }
}