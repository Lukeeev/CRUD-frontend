import './App.css';
import { useState, useEffect } from "react";
import Axios from 'axios'

function App() {

  const [bandName, setBandName] = useState('');
  const [genre, setGenre] = useState('');
  const [bandList, setBandList] = useState([]);

  const [newGenre, setNewGenre] = useState('')


  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setBandList(response.data);
    })
  }, [])

  const submitBand = () => {
    Axios.post('http://localhost:3001/api/insert', { bandName: bandName, genre: genre })
    setBandList([...bandList, { bandName: bandName, genre: genre }])
  }

  const deleteReview = (band) => {
    const encodedBandName = encodeURIComponent(band)
    const url = `http://localhost:3001/api/delete?bandName=${encodedBandName}`

    Axios.delete(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateReview = (band) => {
    Axios.put('http://localhost:3001/api/update', { bandName: band, genre: newGenre })
    setNewGenre("")
  }

  return (
    <div className="App">
      <div className="form">
        <h1 className='title'>Band CRUD App</h1>
        <label htmlFor="">Input the name of a band: </label>
        <input type="text" name='bandName' onChange={(e) => setBandName(e.target.value)} />
        <label htmlFor="">Input the name of a band: </label>
        <input type="text" name='genre' onChange={(e) => setGenre(e.target.value)} />
        <button onClick={submitBand}>Submit</button>

        {bandList.map((val) => {
          return (
            <div className='card'>
              <h1>{val.bandName}</h1>
              <p>{val.genre}</p>
              <div className="actions">
                <button onClick={() => { deleteReview(val.bandName) }}>Delete</button>
                <input onChange={(e) => setNewGenre(e.target.value)} id='updateInput' type="text" />
                <button onClick={() => { updateReview(val.bandName) }}>Update genre</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default App;
