import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addPostDoc} from "../../../services/post-doc/PostDocActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function PostDocAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)
    const [researchers, setResearchers] = React.useState([]);

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [superviseur, setSuperviseur] = React.useState("");
    const [titre, setTitre] = React.useState("");
    const [duree, setDuree] = React.useState("");
    const [nationality, setNationality] = React.useState("");
    const [labo, setLabo] = React.useState("");
    const [associatedFunding, setAssociatedFunding] = React.useState("");
    const [associatedPubliRef, setAssociatedPubliRef] = React.useState("");
    const [arrivalDate, setArrivalDate] = React.useState(null);
    const [departureDate, setDepartureDate] = React.useState(null);


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    React.useEffect(() => {
        if (!targetResearcher)
            fetchListResearchers().then(list => {
                setResearchers(list);
                if (list.length > 0) {
                    setResearcherId(list.entries().next().value[1].researcherId)
                }
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            researcherId: researcherId,
            postDocName: titre,
            supervisorName: superviseur,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            duration: duree,
            nationality: nationality,
            originalLab: labo,
            associationFunding: associatedFunding,
            associatedPubliRef: associatedPubliRef,
        };

        addPostDoc(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "PostDoc ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur PostDoc non ajouté, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    const onReseacherSelection = id => setResearcherId(id.target.value);

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>PostDoc</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            Chercheur
                        </label>
                        {targetResearcher ?
                            <ListGroup.Item
                                variant={"primary"}>{targetResearcher.researcherName} {targetResearcher.researcherSurname}</ListGroup.Item> :

                            <select onChange={onReseacherSelection}>
                                {researchers.map(item => {
                                    return (<option key={item.researcherId}
                                                    value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                                })}
                            </select>
                        }
                        <label className='label'>
                            Titre du post-doctorat
                        </label>
                        <input
                            placeholder='Titre'
                            className='input-container'
                            name="titre"
                            type="titre"
                            value={titre}
                            onChange={e => setTitre(e.target.value)}
                            required/>

                        <label className='label'>
                            Superviseur
                        </label>
                        <input
                            placeholder='Nom'
                            className='input-container'
                            name="superviseur"
                            type="superviseur"
                            value={superviseur}
                            onChange={e => setSuperviseur(e.target.value)}
                            required/>


                        <label className='label'>
                            Date d'arrivé
                        </label>
                        <input
                            placeholder="Date d'arrivé"
                            className='input-container'
                            type="date"
                            onChange={e => setArrivalDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de départ
                        </label>
                        <input
                            placeholder="Date de départ"
                            className='input-container'
                            type="date"
                            onChange={e => setDepartureDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Durée
                        </label>
                        <input
                            placeholder='Formation'
                            className='input-container'
                            name="duree"
                            type="number"
                            value={duree}
                            onChange={e => setDuree(e.target.value)}
                            required/>


                        <label className='label'>
                            Nationalité
                        </label>
                        <input
                            placeholder='Nationalité'
                            className='input-container'
                            name="nationalite"
                            type="nationalite"
                            value={nationality}
                            onChange={e => setNationality(e.target.value)}
                            required/>

                        <label className='label'>
                            Laboratoire d'origine
                        </label>
                        <input
                            placeholder='Nom du laboratoire'
                            className='input-container'
                            name="labo"
                            type="labo"
                            value={labo}
                            onChange={e => setLabo(e.target.value)}
                            required/>

                        <label className='label'>
                            Les financements associées
                        </label>
                        <input
                            placeholder='Nom du laboratoire'
                            className='input-container'
                            name="associatedFunding"
                            type="associatedFunding"
                            value={associatedFunding}
                            onChange={e => setAssociatedFunding(e.target.value)}
                            required/>

                        <label className='label'>
                            les références des publications associées
                        </label>
                        <input
                            placeholder='Nom du laboratoire'
                            className='input-container'
                            name="labo"
                            type="labo"
                            value={associatedPubliRef}
                            onChange={e => setAssociatedPubliRef(e.target.value)}
                            required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
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

export default PostDocAdd;
