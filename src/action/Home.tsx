export const loadHome = (home: any) => {
    return (dispatch: any) => {
        dispatch({ type: 'LOAD_HOME', home })
    }
}