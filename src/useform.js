import {useState} from 'react';

const useForm = (callback, initialState={}, resetOnSubmit=true) => {

  /* Esitellään useState-hook,
  johon käyttäjän lomakkeelle syöttämä tieto tallennetaan */
  const [values, setValues] = useState(initialState);

  /* Submit-käsittelijä joka estää oletustoiminnon
  ja kutsuu määriteltyä callback-funktiota */
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      }
    callback();
    if (resetOnSubmit) resetValues();
  }

  // Syötekäsittelijä tallentaa kentän tiedot sen nimellä state-muuttujaan
  const handleChange = (event) => {
    event.persist();
    // Tallennetaan kenttään syötetty arvo välimuuttujaan
    let value = event.target.value;
    // Tallennnetaan uusi arvo state-muuttujaan
    setValues(values => ({...values, [event.target.name]: value}));
  }

  // Syötekäsittelijä tallentaa kentän tiedot sen nimellä state-muuttujan taulukkoon
  const handleListChange = (event, listvalue) => {
    event.persist();
    // Tallennetaan kentän valinta välimuuttujaan
    let selected = event.target.checked;   
    // Tallennetaan nykyinen lista välimuuttujaan.
    let listValues = values[event.target.name];
    // Tarkistetaan onko valinnan arvo päällä. Jos on, 
    // lisätään kutsun yhteydessä tullut listValue 
    // listan jatkoksi, muuten poistetaan ko. arvo
    // listasta.
    if (selected) {
      listValues.push(listvalue);
    } else {      
      listValues = listValues.filter((item) => item !== listvalue);
    }
    // Päivitetään uusi listan sisältl state-muuttujaan.
    setValues({...values, [event.target.name]: listValues});
  }

  // Funktio palauttaa lomakkeen tiedot alkutilanteeseen
  const resetValues = () => {
    setValues(initialState);
  }

  /* Palauta luonnin yhteydessä
  sekä käsittelijä että state-muuttuja */
  return {
    handleSubmit,
    handleChange,
    handleListChange,
    resetValues,
    setValues,
    values
  };

}

export default useForm;