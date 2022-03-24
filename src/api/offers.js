import axios from "../axiosConfig";

const getUserOffers = async () => axios.get("/offers", null, { withCredentials: true });

const createOffer = async(offerData) => axios.post(`/offers/${offerData.bet.id}`, offerData);

const getBetOffers = async(betId) => axios.get(`/offers/${betId}`);

export {
    getUserOffers,
    createOffer,
    getBetOffers,
}



