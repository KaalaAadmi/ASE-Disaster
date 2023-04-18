import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

function Table(props) {
  const [data, setData] = useState(props.data);
  useEffect(() => {
    setData(props.data);
  }, [props]);

  return (
    <table>
      <thead>
        <tr>
          <th className="table-header">Description</th>
          <th className="table-header">Type</th>
          <th className="table-header">Verified</th>
          <th className="table-header">Spam</th>
          <th className="table-header">Reports</th>
          <th className="table-header">Location</th>
          <th className="table-header">Creation Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className="table-cell">{row.detail}</td>
            <td className="table-cell">{row.type}</td>
            <td className="table-cell">
              <input type="checkbox" checked={row.isResponder} />
            </td>
            <td className="table-cell">
              <input type="checkbox" checked={row.isSpam}/>
            </td>
            <td className="table-cell">{row.disaster?.reports?.length ?? "0"}</td>
            <td className="table-cell">{row.site}</td>
            <td className="table-cell">
              {format(parseISO(row.created_at), "dd MMM, yyyy")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
