import React, { useState } from "react";
import "./DropBox.css";

function DropBox() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [img, setImg] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file); // Store selected file
    if (file) {
      setImg(URL.createObjectURL(file)); // Generate a temporary URL for preview
    }
    setRes(null)
  }

  async function uploadImage(e) {
    e.preventDefault(); // Prevent default behavior

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      "http://localhost:8000/process-prescription/",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const parsedMedicines = JSON.parse(data);
    setRes(parsedMedicines);
  }

  return (
    <>
      <div id="background-div">
        <div className="overlay" style={{ paddingTop: "15px" }}>
          <div className="dropBox-container">
            <h2> Upload or Drop the prescription here</h2>
            <div className="input-group mb-3">
              <div id="drop">
                <input
                  type="file"
                  className="form-control"
                  id="drop_in"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  onChange={handleFileChange}
                />
                <div id="display">
                  <div>
                    {img && (
                      <img
                        src={img}
                        alt="Preview"
                        style={{
                          width: "200px",
                          marginTop: "10px"
                        }}
                      />
                    )}
                  </div>
                
              
              <div style={{marginTop : "10px"}}>
                {res?.medicines ? (
                  res.medicines.map((e, index) => <p key={index}>{e}</p>)
                ) : (
                  <p></p>
                )}
              </div></div>
              </div>
              <button
                className="btn btn-outline-secondary"
                id = "bt"
                type="button"
               
                onClick={uploadImage}
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropBox;
