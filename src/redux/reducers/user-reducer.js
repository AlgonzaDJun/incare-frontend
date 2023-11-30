const initialState = {};

function userReducer(state = initialState, action){
    switch (action.type){
        case "GETALL_USER_REQUEST":
            return {
                loading: true
            };
        case "GET_USERBYID_REQUEST":
            return {
                loading: true,
                error: null,
            };
        case "GETALL_USER_SUCCESS":
            return{
                users: action.payload
            };
        case "GET_USERBYID_SUCCESS":
            return{
                ...state,
                user: action.payload
            };
        case "GETALL_USER_FAILURE":
            return{
                error: action.error
            };
        case "GET_USERBYID_FAILURE":
            return{
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default userReducer;

