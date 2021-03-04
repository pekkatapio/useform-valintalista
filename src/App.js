import './App.css';
import useForm from './useform.js';

function App() {

  const submit = () => {
    console.log(values);
  }

  const urheilut = ["juoksu", "kävely", "ryömintä", "räpyttely", "snorklaaminen"];

  const { values, handleSubmit, handleChange, handleListChange } = useForm(submit, {teksti: "", urheilu: [urheilut[1],urheilut[3]]}, false);

  const valintalista = urheilut.map(item =>     
    <div key={item}>
      <input type="checkbox" 
             name="urheilu" 
             defaultChecked={values.urheilu.includes(item)} 
             onChange={(event) => handleListChange(event, item)}               
      /> {item}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
          <form onSubmit={handleSubmit}>
            Teksti: <input type="text" name="teksti" onChange={handleChange} value={values.teksti} />
            <div className="lista">
              { valintalista }
            </div>
            <input type="submit" value="lähetä"/>
          </form>          
      </header>
    </div>
  );
}

export default App;
