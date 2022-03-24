import { React, useState, useEffect } from "react";
import { Button, Form, ListGroup, Modal, Tab, Badge } from "react-bootstrap";
import "./styles.scss";

const BetForm = ({ show, onHide, onSubmit, bet, balance }) => {
    const [betInfo, setBetInfo] = useState({});

    const onBetOptionSelect = (e, i) => {
        e.preventDefault();
        console.log(`aaaaaaaaaaaaaaaaaaa ${i}`);
        setBetInfo({ ...betInfo, betOptionId: i });
    };

    const onAmountChange = (e) => {
        e.preventDefault();
        setBetInfo({ ...betInfo, amount: Number.parseInt(e.target.value) });
    };

    useEffect(() => {
        console.log("useeffect bet");
        console.log(bet);
        setBetInfo({ ...betInfo, bet: {id: bet.id}, amount: 0 });
    }, [bet]);

    return (
        <Modal show={show} onHide={onHide} centered className="bets__form">
            <Modal.Header closeButton>
                <Modal.Title>Make a bet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>Description:</label>
                    <p> {bet?.description} </p>
                </div>
                <hr />
                <h4> Bet options: </h4>
                <br/>
                <Form onSubmit={(e) => onSubmit(e, betInfo)}>
                    <Tab.Container defaultActiveKey="#bet0">
                        <Form.Group>
                            <ListGroup>
                                {bet?.betOptions?.map((option, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        active={option.id === betInfo.betOptionId}
                                        onClick={(e) => onBetOptionSelect(e, option.id)}
                                    >
                                        {option.title}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Form.Group>
                    </Tab.Container>
                    <Form.Group>
                        <Form.Control
                            name="bet size"
                            placeholder="Enter bet size"
                            onChange={onAmountChange}
                            type="number"
                            max={balance}
                            required
                        />
                        <p className="mt-2 float-right">Balance: {balance}</p>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Make Bet
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
               
            </Modal.Footer>
        </Modal>
    );
};

export default BetForm;
