import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "../../axiosConfig";

const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState({});

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = await axios.post("/users", user);
            console.log(req);
            if (req.status === 200) {
                history.push("login");
            }
        } catch (e) {
            // FIX: server returns 200 status when error occurs in validation
            // TODO: add error messages
        }
    };

    const updateUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Sveiki atvyke į senelių priežiūros puslapį</h1>
            <Form onSubmit={onFormSubmit}>
                <div className="d-flex">
                    <Form.Group className="mr-3">
                        <Form.Control
                            type="text"
                            name="Name"
                            placeholder="First name"
                            onChange={updateUser}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="Surname"
                            placeholder="Last name"
                            onChange={updateUser}
                            required
                        />
                    </Form.Group>
                </div>

                <Form.Group>
                    <Form.Control
                        type="email"
                        name="Email"
                        placeholder="Enter email"
                        onChange={updateUser}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="password"
                        name="Password"
                        placeholder="Create Password"
                        onChange={updateUser}
                        required
                    />
                </Form.Group>
                <p className="text-muted text-center agreement">
                    By signing up, you confirm that you accept our <span>Terms of Use</span> and{" "}
                    <span>Privacy policy</span>
                </p>
                <Button variant="primary" type="submit" block>
                    Register
                </Button>
                <Button variant="secondary" onClick={() => history.push("login")} block>
                    Back
                </Button>
            </Form>
        </div>
    );
};

export default Register;
