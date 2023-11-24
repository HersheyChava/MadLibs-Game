import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Game() {
  const [data, setData] = useState([{}]);
  const [wordNeeded, setWordNeeded] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [pos, setPos] = useState(1);
  const [length, setLength] = useState(0);
  axios.defaults.baseURL = 'http://localhost:5000';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/random")
      .then(response => {
        setData(response.data);
        console.log(response.data);
        setLength(response.data['blanks'].length)
        console.log(response.data['blanks'].length);
        setWordNeeded(response.data['blanks'][pos-1])
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //every time a word is entered do this
  //needs to post the word and clear the text box
  const wordEntered = () => {
    axios.post("/add", {inputVal}).then(response => {
        console.log(response.data);
        setPos(pos+1);
        console.log("check pos == length: " + pos + ' ' + length + ' ' + (pos == length));
        if (pos == length) {
            console.log("max elements done")
            navigate("/Result")
        }
        setWordNeeded(data['blanks'][pos])
    })
    .catch(error => {
        console.error('Error posting data:', error)
    })
    setInputVal('');
    
  };


  return (
    <>
        <h2>{wordNeeded} please</h2>
        <input 
            type="text" 
            value={inputVal} 
            onChange={(e) => setInputVal(e.target.value)} 
        />
        <button type="button" onClick={wordEntered}>Submit</button>
    </>
  );
}

export default Game;
