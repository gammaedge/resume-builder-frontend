import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { FaBriefcase, FaPlus, FaEdit, FaTimes } from "react-icons/fa";

const Workexperience = () => {
  const [company, setCompany] = useState(
    "Senior Software Engineer, CubeXo Software Solutions"
  );
  const [experience, setExperience] = useState("Oct 2018 – Present | Indore");
  const [workPoints, setWorkPoints] = useState([
    "Evaluated new tools, technologies, and design patterns by creating POCs to come up with trustable solutions for the clients which led to 60% more client conversions.",
    "Communicated and collaborated with multi-disciplinary teams of engineers, clients, and stakeholders daily.",
    "Mentored and led the team to develop high-quality, maintainable, robust, scalable, and user-facing solutions with the highest code coverage and standardization.",
    "Developed a centralized system to monitor health, logging, and alerts about any breakdown for all the systems delivered and managed by the company, which led to more satisfied clients.",
    "Learned various technologies and managed teams working in different domains.",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPoint, setCurrentPoint] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const sanitizeInput = (input) => input.replace(/<\/?[^>]+(>|$)/g, "");

  const handleCompanyChange = (event) => {
    setCompany(sanitizeInput(event.target.value));
  };

  const handleExperienceChange = (event) => {
    setExperience(sanitizeInput(event.target.value));
  };

  const handleAddOrEditPoint = () => {
    const trimmedPoint = currentPoint.trim();
    if (!trimmedPoint) {
      alert("Point cannot be empty.");
      return;
    }

    if (editingIndex !== null) {
      const updatedPoints = [...workPoints];
      updatedPoints[editingIndex] = trimmedPoint;
      setWorkPoints(updatedPoints);
    } else {
      setWorkPoints([...workPoints, trimmedPoint]);
    }

    setCurrentPoint("");
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setCurrentPoint(workPoints[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedPoints = workPoints.filter((_, i) => i !== index);
    setWorkPoints(updatedPoints);
  };

  const styles = {
    section: {
      margin: "20px 0",
      padding: "0 20px",
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
    listItem: {
      marginBottom: "5px",
      // justifyContent: "space-between",
      // alignItems: "center",
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
    actionIcons: {
      cursor: "pointer",
      // fontSize: "1rem",
      marginLeft: "10px",
      width: "25px",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      borderRadius: "5px",
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

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        <FaBriefcase /> Work Experience
      </h2>
      <h3>
        <ContentEditable
          html={company}
          onChange={handleCompanyChange}
          style={{ padding: "5px" }}
        />
      </h3>
      <p>
        <div
          style={{
            display: "flex",
          }}
        >
          <em>
            <ContentEditable
              html={experience}
              onChange={handleExperienceChange}
              style={{ padding: "5px" }}
            />
          </em>
          <FaPlus
            className="no-print"
            style={styles.addIcon}
            onClick={() => {
              setCurrentPoint("");
              setEditingIndex(null);
              setIsModalOpen(true);
            }}
          />
        </div>
      </p>
      <ul>
        {workPoints.map((point, index) => (
          <>
            {" "}
            <div style={{ display: "flex" }}>
              <li key={index} style={styles.listItem}>
                <span>{point}</span>
              </li>

              <FaEdit
                className="no-print"
                style={styles.actionIcons}
                onClick={() => handleEdit(index)}
                title="Edit"
              />
              <FaTimes
                className="no-print"
                style={{ ...styles.actionIcons, color: "#ff4d4d" }}
                onClick={() => handleDelete(index)}
                title="Delete"
              />
            </div>
          </>
        ))}
      </ul>

      {/* Add/Edit Modal */}
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
                {" "}
                <textarea
                  style={styles.textarea}
                  value={currentPoint}
                  onChange={(e) => setCurrentPoint(e.target.value)}
                  placeholder="Enter work experience point"
                  rows={6}
                />
                <button style={styles.button} onClick={handleAddOrEditPoint}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Workexperience;
