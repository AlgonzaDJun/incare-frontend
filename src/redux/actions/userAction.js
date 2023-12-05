import axios from "axios"

function getAllUserRequest() {
    return {
        type: "GETALL_USER_REQUEST",
    } 
};

function getUserByIdRequest() {
    return {
        type: "GET_USERBYID_REQUEST"
    }
};

function getAllUserSucces(users) {
    return {
        type: "GETALL_USER_SUCCESS",
        payload: users
    }
};

function getUserByIdSuccess(user) {
    return {
        type: "GET_USERBYID_SUCCES",
        payload: user,
    }
};

function getAllUserFailure(error) {
    return {
        type: "GETALL_USER_FAILURE",
        payload: error,
    }
};

function getUserByIdFailure(error) {
    return {
        type: "GET_USERBYID_FAILURE",
        payload: error,
    }
};

//Fetch API dan mengambil seluruh daftar pengguna
export function allUsers() {
    return async function (dispatch) {
        dispatch(getAllUserRequest());
      try {
        const {users} = await axios("localhost:3000/users");

        dispatch (getAllUserSucces(users))
       } catch (error) {
        dispatch (getAllUserFailure(error.message))
       }
    }
}

export function userById() {
    return async function (dispatch) {
        dispatch(getUserByIdRequest());
      try{
        const {user} = await axios("localhost:3000/users/655f4975dce10db540026322");

        dispatch (getUserByIdSuccess(user))
       } catch (error) {
        dispatch (getUserByIdFailure(error.message))
       }
    }
}

const userAction = {
    getAllUserRequest,
    getAllUserSucces,
    getAllUserFailure,
    getUserByIdRequest,
    getUserByIdSuccess,
    getUserByIdFailure
}

export default userAction;