import { SET_BET } from "./bet.types";

export const setBet = (bet) => ({
    type: SET_BET,
    payload: {
        bet
    }
})