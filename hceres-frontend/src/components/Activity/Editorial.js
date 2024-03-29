import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'

function Editorial() {
    const [chercheur, setChercheur] = React.useState("");
    const [impactFactor, setImpactFactor] = React.useState("");
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [journalName, setJournalName] = React.useState("");
    const [functionName, setFunctionName] = React.useState("");
    const [formattedStartDate, setFormattedStartDate] = React.useState(null);
    const [formattedEndDate, setFormattedEndDate] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            researcherId: chercheur,
            impactFactor: impactFactor,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            journalName: "monde",
            functionName: functionName
        };

        console.log(data);
        Axios.post("http://localhost:9000/Api/AddEditorial", data)
            .then(res => {
            })
            window.location.reload();
    }


    const handleStartDate = (event) => {
        let formattedDate = `${event.getFullYear()}-${event.getMonth() + 1
            }-${event.getDate()}`;
        setFormattedStartDate(formattedDate);
        setStartDate(event);
    }

    const handleEndDate = (event) => {
        let formattedDate = `${event.getFullYear()}-${event.getMonth() + 1
            }-${event.getDate()}`;
        setFormattedEndDate(formattedDate);
        setEndDate(event);
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>EDITION</h3>
                <label className='label' >
                    Chercheur
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="nom"
                    type="nom"
                    value={chercheur}
                    onChange={e => setChercheur(e.target.value)}
                    required />
                
                <label className='label' >
                    Facteur d'impact
                </label>
                <input
                    placeholder="Facteur d'impact"
                    className='input-container'
                    name="impactFactor"
                    type="impactFactor"
                    value={impactFactor}
                    onChange={e => setImpactFactor(e.target.value)}
                    required />

                <label className='label'>
                    Date de départ
                </label>
                <DatePicker
                    className='datePicker'
                    selected={startDate}
                    onChange={handleStartDate}
                    withPortal
                    placeholderText="Choix de date" />

                <label className='label'>
                    Date de fin
                </label>
                <DatePicker
                    className='datePicker'
                    selected={endDate}
                    onChange={handleEndDate}
                    withPortal
                    placeholderText="Choix de date" />

                <label className='label' >
                    Nom du journal
                </label>
                <input
                    placeholder='Nom du journal '
                    className='input-container'
                    name="journalName"
                    type="journalName"
                    value={journalName}
                    onChange={e => setJournalName(e.target.value)}
                    required />

                <label className='label' >
                    Nom de la fonction editoriale
                </label>
                <input
                    placeholder='Nom de la fonction'
                    className='input-container'
                    name="functionName"
                    type="functionName"
                    value={functionName}
                    onChange={e => setFunctionName(e.target.value)}
                    required />
                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default Editorial;