import React from 'react';
import './Researcher.css';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddResearcher(props) {
    const [showModal, setShowModal] = React.useState(true);

    const silentClose = () => {
        setShowModal(false);
        props.onHideAction();
    };

    const handleClose = (msg) => {
        setShowModal(false);
        props.onHideAction(msg);
    };

    const [AddResearcherFirstName, setAddResearcherFirstName] = React.useState("");
    const [AddResearcherLastName, setAddResearcherLastName] = React.useState("");
    const [AddResearcherEmail, setAddResearcherEmail] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "researcherSurname": AddResearcherFirstName,
            "researcherName": AddResearcherLastName,
            "researcherEmail": AddResearcherEmail
        };

        Axios.post("http://localhost:9000/AddResearcher", data)
            .then(response => {
                const researcherId = response.data.researcherId;
                const msg = {
                    "researcherAdded": response.data,
                    "successMsg": "Researcher ajoute avec un id " + researcherId,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Researcher non ajoute, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    return (
        <div>
            <Modal show={showModal} onHide={() => silentClose()}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Ajouter un chercheur
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            Prénom du chercheur
                        </label>
                        <input
                            placeholder='Prénom'
                            className='input-container'
                            name="AddResearcherFirstName"
                            type="AddResearcherFirstName"
                            value={AddResearcherFirstName}
                            onChange={e => setAddResearcherFirstName(e.target.value)}
                            required/>
                        <label className='label'>
                            Nom du chercheur
                        </label>
                        <input
                            placeholder='Nom'
                            className='input-container'
                            name="AddResearcherLastName"
                            type="AddResearcherLastName"
                            value={AddResearcherLastName}
                            onChange={e => setAddResearcherLastName(e.target.value)}
                            required/>

                        <label className='label'>
                            Email du chercheur
                        </label>
                        <input
                            placeholder='Email'
                            className='input-container'
                            name="AddResearcherEmail"
                            type="AddResearcherEmail"
                            value={AddResearcherEmail}
                            onChange={e => setAddResearcherEmail(e.target.value)}
                            required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => silentClose()}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"}>
                            Ajouter
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default AddResearcher;
