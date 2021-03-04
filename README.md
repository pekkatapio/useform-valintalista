# Valintalistan toteutus React Hooksien avulla

Tässä mallikoodissa on esimerkki valintalistasta, josta voidaan valita valinta päälle tai pois. Valitut alkiot tallentuvat taulukkoon. Koodissa hyödynnetään useForm-hooksiin lisättyä handleListChange-toiminnallisuutta, jota kutsutaan lista-alkion arvolla.

Määrittele ensin taulukko, joka sisältää listalle tulevat alkiot.

```
const urheilut = ["juoksu", "kävely", "ryömintä", "räpyttely", "snorklaaminen"];
```

Määrittele submit-toiminnallisuuden käsittelijä. Tässä esimerkissä tulostetaan lomakkeen tiedot konsolille.

```
  const submit = () => {
    console.log(values);
  }
```

Ota useForm-hooks käyttöön. Huomaa, että urheilu-avaimen arvoksi on määritelty taulukko. Taulukkomäärittely on pakollinen, jotta listan valinta toimii.

```
const { values, handleSubmit, handleChange, handleListChange } = useForm(submit, {teksti: "", urheilu: []}, false);
```

Jos haluat, että listassa on tietyt valinnat valittuna lähtökohtaisesti, niin laita niiden 
arvot taulukon alkioiksi.

```
const { values, handleSubmit, handleChange, handleListChange } = useForm(submit, {teksti: "", urheilu: [urheilut[1],urheilut[3]]}, false);
```

Tämän jälkeen voit luoda valinnat urheilut-taulukosta map-funktion avulla. Tässä esimerkissä input-elementti on kääritty div-elementin sisälle, jotta valintalaatikon perään saa tulostettua valinnan arvon. Huomaa, että name-ominaisuuden arvon tulee täsmätä lomakkeelle tallennetun taulukon nimeä. Samoin defaultChecked-arvon määrittely kannattaa tehdä huolella.

```
  const valintalista = urheilut.map(item =>     
    <div key={item}>
      <input type="checkbox" 
             name="urheilu" 
             defaultChecked={values.urheilu.includes(item)} 
             onChange={(event) => handleListChange(event, item)}               
      /> {item}
    </div>
  );
```

Edellä muodostettu valintalista sijoitetaan return-lauseessa normaalilla tavalla. 

```
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="lista">
          { valintalista }
        </div>
        <input type="submit" value="lähetä"/>
      </form>                
    </div>
  );
```

Edellä olevassa esimerkissä valintalista on kääritty lista-nimisen div-luokan sisälle, jotta listan arvot saa helpommin jaettua CSS:n grid-ominaisuuden avulla.

```
.lista {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```