import React, { useState, useEffect } from "react";
// import './css/reportTable.css';

function ReportTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/reports")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div className="container mt-5">
      <div className="table-responsive d-md-flex flex-wrap mx-auto">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead>
            <tr className="align-middle">
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Cellphone No</th>
              <th scope="col">Telephone No</th>
              <th scope="col">House No</th>
              <th scope="col">Street</th>
              <th scope="col">Complaint Type</th>
              <th scope="col">Paragraph</th>
              <th scope="col">Image/Video</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.middle_name}</td>
                <td>{item.cellphone_no}</td>
                <td>{item.telephone_no}</td>
                <td>{item.house_no}</td>
                <td>{item.street}</td>
                <td>{item.complaint_type}</td>
                <td>
                  <div className="text-truncate" style={{ maxWidth: '100px' }}>
                    {item.proof_paragraph}
                  </div>
                </td>
                <td>
                  <a href={item.proof_imageVideo} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default ReportTable;
