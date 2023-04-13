import React from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = React.useState("Hello");
  React.useEffect(() => {
    const getData = async () => {
      try {
		 const res = await axios.get("http://127.0.0.1:8000/api/v1/hello");
        //const res = await axios.get("http://100.26.18.111:8000/api/v1/hello");
        setData(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div>Home</div>
      <div>{data}</div>
    </div>
  );
}
