import { React } from "react";
import { Button } from "react-bootstrap";
import "./styles.scss";

const Banner = ({ title, description, ...props }) => {
    return (
        <div {...props}>
            <div className="bet__banner">
                <div className="text">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <Button>more details</Button>
                </div>
                <img className="img_front" src="/img/makackas-coin.png" alt="" />
                <img className="img_bg" src="/img/vacius-coin.png" alt="" />
            </div>
        </div>
    );
};

export default Banner;
