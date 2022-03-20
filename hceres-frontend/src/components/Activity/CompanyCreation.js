import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CompanyCreation() {
  const [companytitle, setCompanytitle] = React.useState("");
  const [companyActive, setCompanyActive] = React.useState("");
  const [date, setDate] = React.useState(null);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
        companytitle: companytitle,
        companyActive: companyActive,
        companyCreationDate: date};
    
    console.log(data);
    Axios.post("http://localhost:9000/AddCompanyCreation", data)
        .then(res => {
            console.log(res.data)
            navigate('/Home');
        }).catch(err => alert(err))
  }

  const handleDate = (event) =>{
    let date = `${event.getFullYear()}-${
        event.getMonth() +1
      }-${event.getDate()}`;
      setDate(date);
      setDate(event);
    }


  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <a href="/Activity" class="close-button">&#10006;</a>
        <h3 className='title'>Création d'entreprise</h3>
        <label className='label'>
          Le nom de l'entreprise
        </label>
        <input
          placeholder="Nom de l'entreprise"
          className='input-container'
          name="company"
          type="company"
          value={companytitle}
          onChange={e => setCompanytitle(e.target.value)}
          required />

        <label className='label'>
          Date de création
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label' >
          L'entreprise est active ?
        </label>
        <input
          placeholder='oui/non'
          className='input-container'
          name="CompanyActive"
          type="CompanyActive"
          value={companyActive}
          onChange={e => setCompanyActive(e.target.value)}
          required />


        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default CompanyCreation;