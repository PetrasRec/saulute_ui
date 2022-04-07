import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addUser, editUser } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const UserForm = ({ userData, onUsersChange, toggleModal, roles }) => {

    const [selectedImage, setSelectedImage] = useState(null);


    const [user, setUser] = useState(userData ? userData : {
        userName: "",
        name: "",
        surname: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setUser({...user, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let result = null;
        if (userData) {
            result = await editUser(userData.id, user);
            messageHandling("success", "Successfuly updated user");
        } else {
            result = await addUser(user);
            messageHandling("success", "Successfuly added new user");
        }
        toggleModal();
        onUsersChange(result.data);
    };

    return (
        <Form onSubmit={onSubmit}>
            <div>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />

    </div>
  

            <Form.Group>
                <Form.Label class="names">Name</Form.Label>
                <Form.Control
                    name="name"
                    onChange={onChange}
                    value={user.name}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label class="names">Surname</Form.Label>
                <Form.Control
                    name="surname"
                    onChange={onChange}
                    value={user.surname}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" >
                {userData ? "Update" : "Add" }
            </Button>
        </Form>
    )
}

export default UserForm;