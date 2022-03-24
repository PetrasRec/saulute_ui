import axios from "../axiosConfig";

const getAllBets = async () => axios.get("/bets", null);

const getAllActiveBets = async () => axios.get("/bets/active");

const addNewBet = async(betData) => axios.post("/bets", betData);

const updateBet = async(id, betData) => axios.put(`/bets/${id}`, betData);

const deleteBet = async(id) => axios.delete(`/bets/${id}`);

const deleteBetOption = async(betId, optionId) => axios.delete(`/bets/${betId}/options/${optionId}`);

const finishBet = async(bet_id, option_id) => axios.post(`/bets/${bet_id}/finish/${option_id}`);

export {
    getAllBets,
    addNewBet,
    updateBet,
    deleteBet,
    deleteBetOption,
    finishBet,
    getAllActiveBets,
};
