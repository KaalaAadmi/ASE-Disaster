import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getReports } from "../../api/Report";
const ViewReports = () => {
  const data = [
    {
      _id: "64298e50ab316b690c196ddb",
      latitude: "53.338879",
      longitude: "-6.233875",
      detail: "Fire in the gasworks office building",
      type: "Fire",
      radius: "500",
      size: "5",
      site: "building",
      isSpam: true,
      isResponder: false,
      status: "active",
      disaster: {
        _id: "64298e50ab316b690c196dd9",
        latitude: "53.338879",
        longitude: "-6.233875",
        title: "Fire in the gasworks office building",
        evacuation: false,
        status: "active",
        reports: ["64298e50ab316b690c196ddb"],
        type: "traffic accident",
        created_at: "2023-04-02T14:16:48.305Z",
        __v: 0,
        radius: "100",
        site: "city street",
        size: "20",
      },
      ambulance: 3,
      police: 7,
      fire: 2,
      bus: 1,
      helicopter: 0,
      created_at: "2023-04-02T14:16:48.341Z",
      __v: 0,
    },
  ];
  
  const [reportData, setReportData] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = getReports();
      setReportData(JSON.parse(res));
    };
    getData();
  }, []);

  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default ViewReports;