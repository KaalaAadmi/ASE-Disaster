import React, { useState } from 'react';
import axios from "axios";

const DisasterResponse = (props) => {
  const [requestData, setRequestData] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleChange = (event) => {
    setRequestData(event.target.value);
  };


  const handleClick = async () => {
    try {
      const data = { string: requestData };
      const response = await axios.post('http://127.0.0.1:8000/api/v1/getDisasterResponse', data);
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={requestData} onChange={handleChange} />
      <button onClick={handleClick}>Interpret Message!</button>
      {responseData && <p>{JSON.stringify(responseData)}</p>}
    </div>
  );
};

export default DisasterResponse;