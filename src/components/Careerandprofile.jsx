import React, { useState } from "react";
import { FaRegListAlt, FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import ContentEditable from "react-contenteditable";

const Careerandprofile = ({ rolesAndResponsibilities }) => {
  const [name, setName] = useState("Career Summary");
  const [careerPoints, setCareerPoints] = useState(rolesAndResponsibilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPoint, setCurrentPoint] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const sanitizeInput = (input) => input.replace(/<\/?[^>]+(>|$)/g, "");

  const styles = {
    section: {
      margin: "20px 0",
      padding: "0 20px",
      // pageBreakBefore: "always"
    },
    sectionTitle: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      borderBottom: "2px solid #ccc",
      paddingBottom: "5px",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    headInput: {
      padding: "5px",
    },
    icon: {
      fontSize: "0.9rem",
      verticalAlign: "middle",
      marginRight: "5px",
    },
    // list: {
    //   marginLeft: "20px",
    // },
    listItem: {
      marginBottom: "10px",
    },
    actionIcons: {
      marginLeft: "10px",
      cursor: "pointer",
      fontSize: "1rem",
      color: "#007bff",
    },
    addIcon: {
      color: "#000",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1rem",
      marginLeft: "10px",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      minWidth: "300px",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    card: {
      height: "254px",
      padding: "0 15px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "12px",
      background: "#fff",
      borderRadius: "20px",
    },
    card__title: {
      fontSize: "23px",
      fontWeight: "900",
      color: "#333",
    },
    card__form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems:"center"
    },
   
    button: {
      border: "0",
      background: "#111",
      color: "#fff",
      padding: "0.68em",
      borderRadius: "5px",
      fontWeight: "bold",
      width:"40%"
    },
    textarea: {
      marginTop: "10px",
      minWidth:"20rem",
      outline: "0",
      background: "rgb(255, 255, 255)",
      boxShadow: "transparent 0px 0px 0px 1px inset",
      padding: "0.6em",
      borderRadius: "5px",
      border: "1px solid #333",
      color: "black",
      resize: "none",
    },
  
  };

  const handleNameChange = (event) => {
    setName(sanitizeInput(event.target.value));
  };

  const handleAddOrEditPoint = () => {
    const trimmedpoint = currentPoint.trim();
    if (!trimmedpoint) {
      alert("All fields are required.");
      return;
    }

    if (editingIndex !== null) {
      const updatedPoints = [...careerPoints];
      updatedPoints[editingIndex] = currentPoint;
      setCareerPoints(updatedPoints);
    } else {
      setCareerPoints([...careerPoints, currentPoint]);
    }
    setCurrentPoint("");
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setCurrentPoint(careerPoints[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedPoints = careerPoints.filter((_, i) => i !== index);
    setCareerPoints(updatedPoints);
  };

  return (
    <>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <FaRegListAlt style={styles.icon} />
          <ContentEditable
            html={name}
            onChange={handleNameChange}
            style={styles.headInput}
          />
          <div
            className="no-print"
            style={styles.addIcon}
            onClick={() => {
              setCurrentPoint("");
              setEditingIndex(null);
              setIsModalOpen(true);
            }}
          >
            <FaPlus />
          </div>
        </h2>
        <ul style={styles.list}>
          {careerPoints.map((point, index) => (
            <li key={index} style={styles.listItem}>
              {point}
              <FaEdit
                className="no-print"
                style={styles.actionIcons}
                onClick={() => handleEdit(index)}
                title="Edit point"
              />
              <FaTimes
                className="no-print"
                style={{ ...styles.actionIcons, color: "#ff4d4d" }}
                onClick={() => handleDelete(index)}
                title="Delete point"
              />
            </li>
          ))}
        </ul>

        {/*Add Points modal */}
        {isModalOpen && (
          <>
            <div
              className="no-print"
              style={styles.overlay}
              onClick={() => setIsModalOpen(false)}
            />
            <div className="no-print" style={styles.modal}>
              <div style={styles.card}>
              <span style={styles.card__title}>
                  {editingIndex !== null ? "Edit Point" : "Add New Point"}
                </span>
                <div style={styles.card__form}>
                <textarea
                  style={styles.textarea}
                  value={currentPoint}
                  onChange={(e) => setCurrentPoint(e.target.value)}
                  placeholder="Enter career point"
                  rows={6}
                />
                  <button style={styles.button} onClick={handleAddOrEditPoint}>
                  + Add
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Careerandprofile;
