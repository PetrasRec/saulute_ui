import { React } from "react";
import { Badge, Button } from "react-bootstrap";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import "./styles.scss";

const FuturedBet = ({ title, bet, ...props }) => {
    return (
        <div {...props} className="popular_bet__card">
            <div className="header">
                <Badge>&#8226; Popular</Badge>
                <div className="date">
                    21 Apr in <span>19:00</span>
                </div>
                <IoIosHelpCircleOutline size={24}></IoIosHelpCircleOutline>
            </div>
            <div className="body">
                <h1>{bet?.title}</h1>
                <div className="info">+{bet?.betOptions?.length} custom options</div>
                <div className="author">
                    Created by <span>{bet?.user?.userName}</span>
                </div>
            </div>
            <div className="bet_btn__container">
                <div className="bet__btn mr-2">
                    <Button variant="warning">Bet details</Button>
                </div>
            </div>
        </div>
    );
};

export default FuturedBet;
