import React, { useState } from 'react';
import axios from "axios";

const DisasterResponse = (props) => {
  const [inputValue, setInputValue] = React.useState();
  const [apiResponse, setApiResponse] = React.useState();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    //   const response = await fetch(`http://127.0.0.1:8000/api/v1/getDisasterResponse`);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/all-disaster-data"
      );
      // const data = await response.json();
      setApiResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{apiResponse}</p>
    </div>
  );
};

export default DisasterResponse;