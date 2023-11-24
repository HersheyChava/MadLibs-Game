import axios from "axios";
import React, { useState, useEffect } from "react";

function Result(){
    axios.defaults.baseURL = 'http://localhost:5000';
    const [data, setData] = useState([{}]);


    useEffect(() => {
        axios.get("/final")
          .then(response => {
            setData(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    return (
        <>
            <h1>{data['title']}</h1>
            <h3>{data['final_result']}</h3>
        </>
    )
}
export default Result;