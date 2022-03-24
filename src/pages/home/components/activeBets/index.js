import { React } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

import "./styles.scss";

const ActiveBets = ({ title, offers, ...props }) => {

    const drawTable = () => {
        if (offers?.length == 0) {
            return <h5> No active bets.</h5> 
        }
        return (
            <>
                {offers?.map((offer, i) => (
                    <ListGroup.Item key={i}>
                        <p className="mb-0">{offer.bet.title}</p>
                        <span className="bet_info">Bet amount: {offer.amount}</span>
                        <Badge variant="success ml-4">
                            <IoMdArrowUp color="white" className="mr-1" />
                            Active
                        </Badge>{" "}
                    </ListGroup.Item>
                ))}
            </>
        );
    }


    return (
        <div {...props} className="active_bets__card">
            <div className="header">Active Bets</div>
            <ListGroup variant="flush">
                {drawTable()}
            </ListGroup>
        </div>
    );
};

export default ActiveBets;
