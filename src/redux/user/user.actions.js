import { SET_USER } from "./user.types";

export const setUser = username => ({
    type: SET_USER,
    payload: {
        username
    }
})