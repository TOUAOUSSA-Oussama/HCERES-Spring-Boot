import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'

function PostDoctorat() {
  //const [chercheur, setChercheur] = React.useState("");
  const [chercheur, setResearcherId] = React.useState("");
  const [superviseur, setSuperviseur] = React.useState("");
  const [titre, setTitre] = React.useState("");
  const [duree, setDuree] = React.useState("");
  const [nationality, setNationalite] = React.useState("");
  const [labo, setLabo] = React.useState("");
  const [associatedFunding, setAssociatedFunding] = React.useState("");
  const [associatedPubliRef, setAssociatedPubliRef] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState(null);
  const [departureDate, setDepartureDate] = React.useState(null);
  const [formattedArrivalDate, setFormattedArrivalDate] = React.useState(null);
  const [formattedDepartureDate, setFormattedDepartureDate] = React.useState(null);

  const [researchers, setResearchers] = React.useState([]);

  async function componentDidMount() {

    const url = "http://localhost:9000/Researchers";
    const response = await fetch(url);

    const listeChercheurs = await response.json();

    setResearchers(listeChercheurs)
    console.log(researchers);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      chercheur: chercheur,
      postDocName: titre,
      supervisorName: superviseur,
      arrivalDate: formattedArrivalDate,
      departureDate: formattedDepartureDate,
      duration: duree,
      nationality: nationality,
      originalLab: labo,
      associationFunding: associatedFunding,
      associatedPubliRef: associatedPubliRef,
    };

    console.log(data);
    Axios.post("http://localhost:9000/Api/AddPostDoc", data)
      .then(res => {
        console.log(res.data)
        window.location.reload();
      })
  }

  const handleArrivalDate = (event) => {
    let formattedArrivalDate = `${event.getFullYear()}-${event.getMonth() + 1
      }-${event.getDate()}`;
    setFormattedArrivalDate(formattedArrivalDate);
    setArrivalDate(event);
  }

  const handleDepartureDate = (event) => {
    let formattedDepartureDate = `${event.getFullYear()}-${event.getMonth() + 1
      }-${event.getDate()}`;
    setFormattedDepartureDate(formattedDepartureDate);
    setDepartureDate(event);
  }

  const handleChange = e => setResearcherId(e.target.value);

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <a href="/Activity" class="close-button">&#10006;</a>
        <h3 className='title'>POST DOCTORAT</h3>
        <label className='label' >
          Chercheur
        </label>
        <select onClick={componentDidMount} onChange={handleChange}>
          {researchers.map(item => {
            return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
          })}
        </select>
        <label className='label' >
          Titre du post-doctorat
        </label>
        <input
          placeholder='Titre'
          className='input-container'
          name="titre"
          type="titre"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          required />

        <label className='label' >
          Superviseur
        </label>
        <input
          placeholder='Nom'
          className='input-container'
          name="superviseur"
          type="superviseur"
          value={superviseur}
          onChange={e => setSuperviseur(e.target.value)}
          required />


        <label className='label'>
          Date d'arriv??
        </label>
        <DatePicker
          className='datePicker'
          selected={arrivalDate}
          onChange={handleArrivalDate}
          withPortal
          placeholderText="Choix de date" />

        <label className='label'>
          Date de d??part
        </label>
        <DatePicker
          className='datePicker'
          selected={departureDate}
          onChange={handleDepartureDate}
          withPortal
          placeholderText="Choix de date" />


        <label className='label' >
          Dur??e
        </label>
        <input
          placeholder='Formation'
          className='input-container'
          name="duree"
          type="duree"
          value={duree}
          onChange={e => setDuree(e.target.value)}
          required />


        <label className='label' >
          Nationalit??
        </label>
        <input
          placeholder='Nationalit??'
          className='input-container'
          name="nationalite"
          type="nationalite"
          value={nationality}
          onChange={e => setNationalite(e.target.value)}
          required />

        <label className='label' >
          Laboratoire d'origine
        </label>
        <input
          placeholder='Nom du laboratoire'
          className='input-container'
          name="labo"
          type="labo"
          value={labo}
          onChange={e => setLabo(e.target.value)}
          required />

        <label className='label' >
          Les financements associ??es
        </label>
        <input
          placeholder='Nom du laboratoire'
          className='input-container'
          name="associatedFunding"
          type="associatedFunding"
          value={associatedFunding}
          onChange={e => setAssociatedFunding(e.target.value)}
          required />

        <label className='label' >
          les r??f??rences des publications associ??es
        </label>
        <input
          placeholder='Nom du laboratoire'
          className='input-container'
          name="labo"
          type="labo"
          value={associatedPubliRef}
          onChange={e => setAssociatedPubliRef(e.target.value)}
          required />

        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default PostDoctorat;