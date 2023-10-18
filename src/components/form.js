import { useState } from "react";
import NavBar from "./navbar";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    cellphoneNo: "",
    telephoneNo: "",
    houseNo: "",
    street: "",
    complaintType: "",
    proofParagraph: "",
    proofImageVideo: "",
  });


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/saveData/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });


      if (response.ok) {
        // Data saved successfully
        console.log("Data saved successfully");

        // Optionally, you can clear the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          middleName: "",
          cellphoneNo: "",
          telephoneNo: "",
          houseNo: "",
          street: "",
          complaintType: "",
          proofParagraph: "",
          proofImageVideo: "",
        });

      } else {
        // Handle errors
        console.error("Error saving data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Use type assertion to handle checkboxes
    const inputValue = type === "checkbox" ? e.target.checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };


  return (
    <>
      <NavBar />
      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom03" className="form-label">Middle Name</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="validationCustom04" className="form-label">Cellphone No</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom04"
            name="cellphoneNo"
            value={formData.cellphoneNo}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom05" className="form-label">Telephone No</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            name="telephoneNo"
            value={formData.telephoneNo}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="validationCustom06" className="form-label">House No</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom06"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom07" className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom07"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-12">
          <label htmlFor="validationCustom08" className="form-label">Complaint Type</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom08"
            name="complaintType"
            value={formData.complaintType}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-12">
          <label htmlFor="validationCustom09" className="form-label">Proof (paragraph and image or video)</label>
          <textarea
            className="form-control"
            id="validationCustom09"
            name="proofParagraph"
            value={formData.proofParagraph}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-12">
          <label htmlFor="validationCustom10" className="form-label">Proof (image or video file name or URL)</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom10"
            name="proofImageVideo"
            value={formData.proofImageVideo}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">Submit form</button>
        </div>
      </form>

    </>
  );
}

export default Form;
