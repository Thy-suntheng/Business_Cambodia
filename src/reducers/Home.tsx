export const Home = (state = null, action: { type: any; home: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_HOME':
            return action.home;
        case 'HOME_ERROR':
            return action.error;
        default:
            return state;
    }
}