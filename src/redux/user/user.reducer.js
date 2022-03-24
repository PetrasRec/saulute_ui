import { SET_USER } from "./user.types";

const INITIAL_STATE = {
    username: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {...INITIAL_STATE, ...action.payload};
        default:
            return state;
    }
};

export default userReducer;
