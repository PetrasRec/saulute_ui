import { SET_BET } from "./bet.types";

const INITIAL_STATE = {
    username: "",
};

const betReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_BET:
            return {...INITIAL_STATE, ...action.payload};
        default:
            return state;
    }
};

export default betReducer;
