import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { FaBriefcase, FaPlus, FaEdit, FaTimes } from "react-icons/fa";

const Workexperience = () => {
  const [workExperiences, setWorkExperiences] = useState([
    {
      company: "Designation, Company name",
      experience: "Time Period | Location",
      workPoints: [
        "Evaluated new tools, technologies, and design patterns by creating POCs to come up with trustable solutions for the clients which led to 60% more client conversions.",
        "Communicated and collaborated with multi-disciplinary teams of engineers, clients, and stakeholders daily.",
        "Mentored and led the team to develop high-quality, maintainable, robust, scalable, and user-facing solutions with the highest code coverage and standardization.",
        "Developed a centralized system to monitor health, logging, and alerts about any breakdown for all the systems delivered and managed by the company, which led to more satisfied clients.",
        "Learned various technologies and managed teams working in different domains.",
      ],
    },
  ]);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] =
    useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [newWorkPoints, setNewWorkPoints] = useState("");
  const [currentPoint, setCurrentPoint] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonHovered2, setIsButtonHovered2] = useState(false);

  const handleAddExperience = () => {
    const trimmedCompany = newCompany.trim();
    const trimmedExperience = newExperience.trim();
    const trimmedPoints = newWorkPoints
      .split("\n")
      .map((point) => point.trim())
      .filter((point) => point);

    if (!trimmedCompany || !trimmedExperience || trimmedPoints.length === 0) {
      alert("All fields are required.");
      return;
    }

    setWorkExperiences([
      ...workExperiences,
      {
        company: trimmedCompany,
        experience: trimmedExperience,
        workPoints: trimmedPoints,
      },
    ]);

    setNewCompany("");
    setNewExperience("");
    setNewWorkPoints("");
    setIsAddExperienceModalOpen(false);
  };

  const handleEditPoint = (index, workExperienceIndex) => {
    setCurrentPoint(workExperiences[workExperienceIndex].workPoints[index]);
    setEditingIndex({ index, workExperienceIndex });
    setIsModalOpen(true);
  };

  const handleAddOrEditPoint = () => {
    const trimmedPoint = currentPoint.trim();
    if (!trimmedPoint) {
      alert("Point cannot be empty.");
      return;
    }

    const updatedWorkExperiences = [...workExperiences];
    const { index, workExperienceIndex } = editingIndex;
    updatedWorkExperiences[workExperienceIndex].workPoints[index] =
      trimmedPoint;

    setWorkExperiences(updatedWorkExperiences);
    setCurrentPoint("");
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleDeleteExperience = (index) => {
    const updatedWorkExperiences = workExperiences.filter(
      (_, i) => i !== index
    );
    setWorkExperiences(updatedWorkExperiences);
  };

  const handleEditCompany = (event, index) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[index].company = event.target.value;
    setWorkExperiences(updatedWorkExperiences);
  };

  const handleEditExperience = (event, index) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[index].experience = event.target.value;
    setWorkExperiences(updatedWorkExperiences);
  };

  const styles = {
    section: {
      margin: "20px 0",
      padding: "0 20px",
    },
    sectionTitle: {
      fontSize: "18px",
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
    },
    addIcon: {
      color: "#000",
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
      marginLeft: "10px",
      width: "25px",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      borderRadius: "20px",
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
      padding: "35px 35px",
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
      fontSize: "25px",
      fontWeight: "900",
      color: "#333",
    },
    card__form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    icon:{
      fontSize: "0.9rem",
      verticalAlign: "middle",
      marginRight: "5px",
      paddingBottom :"5px"
    },
    input: {
      marginTop: "10px",
      outline: "0",
      background: "rgb(255, 255, 255)",
      boxShadow: "transparent 0px 0px 0px 1px inset",
      padding: "1em",
      borderRadius: "5px",
      border: "1px solid #333",
      color: "black",
    },
    textarea: {
      marginTop: "10px",
      minWidth: "45rem",
      outline: "0",
      background: "rgb(255, 255, 255)",
      boxShadow: "transparent 0px 0px 0px 1px inset",
      padding: "0.6em",
      borderRadius: "5px",
      border: "1px solid #333",
      color: "black",
      resize: "none",
    },
    button: {
      border: "0",
      background: "#111",
      color: "#fff",
      padding: "0.68em",
      borderRadius: "5px",
      fontWeight: "bold",
      flexBasis: "50%",
      fontSize: "15px",
      cursor: "pointer",
    },
    buttonHover: {
      opacity: "0.9",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "35px",
      fontWeight: "900",
      cursor: "pointer",
      color: "#333",
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        <FaBriefcase style={styles.icon}/> Work Experience
        <FaPlus
          className="no-print"
          style={styles.addIcon}
          onClick={() => setIsAddExperienceModalOpen(true)}
        />
      </h2>

      {workExperiences.map((workExperience, workExperienceIndex) => (
        <div key={workExperienceIndex}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: "0" }}>
              <ContentEditable
                html={workExperience.company}
                onChange={(e) => handleEditCompany(e, workExperienceIndex)}
                style={{ padding: "5px", fontSize:"16px"}}
              />
            </h3>
            <FaTimes
              className="no-print"
              style={{ ...styles.actionIcons, color: "#ff4d4d" }}
              onClick={() => handleDeleteExperience(workExperienceIndex)}
            />
          </div>
          <p style={{ margin: "0" }}>
            <ContentEditable
              html={workExperience.experience}
              onChange={(e) => handleEditExperience(e, workExperienceIndex)}
              style={{ padding: "5px",fontSize:"16px" }}
            />
          </p>
          <ul>
            {workExperience.workPoints.map((point, index) => (
              <div key={index} style={{ display: "flex",fontSize:"14px"   }}>
                <li style={styles.listItem}>
                  <span>{point}</span>
                </li>
                <FaEdit
                  className="no-print"
                  style={styles.actionIcons}
                  onClick={() => handleEditPoint(index, workExperienceIndex)}
                />
                <FaTimes
                  className="no-print"
                  style={{ ...styles.actionIcons, color: "#ff4d4d" }}
                  onClick={() => {
                    const updatedExperiences = [...workExperiences];
                    updatedExperiences[workExperienceIndex].workPoints.splice(
                      index,
                      1
                    );
                    setWorkExperiences(updatedExperiences);
                  }}
                />
              </div>
            ))}
          </ul>
        </div>
      ))}

      {isAddExperienceModalOpen && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setIsAddExperienceModalOpen(false)}
          />
          <div style={styles.modal}>
            <div style={styles.card}>
              <button
                style={styles.closeButton}
                onClick={() => setIsAddExperienceModalOpen(false)}
              >
                &times;
              </button>
              <span style={styles.card__title}>Add New Experience</span>
              <div style={styles.card__form}>
                <input
                  style={styles.input}
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Company Name & Job Title"
                />
                <input
                  style={styles.input}
                  value={newExperience}
                  onChange={(e) => setNewExperience(e.target.value)}
                  placeholder="Duration & Location"
                />
                <textarea
                  style={styles.textarea}
                  value={newWorkPoints}
                  onChange={(e) => setNewWorkPoints(e.target.value)}
                  placeholder="Work Points (separate by new lines)"
                  rows={16}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    style={{
                      ...styles.button,
                      ...(isButtonHovered2 ? styles.buttonHover : {}),
                    }}
                    onMouseEnter={() => setIsButtonHovered2(true)}
                    onMouseLeave={() => setIsButtonHovered2(false)}
                    onClick={() => setIsAddExperienceModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      ...styles.button,
                      ...(isButtonHovered ? styles.buttonHover : {}),
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    onClick={handleAddExperience}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <>
          <div style={styles.overlay} onClick={() => setIsModalOpen(false)} />
          <div style={styles.modal}>
            <div style={styles.card}>
            <button
                style={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <span style={styles.card__title}>Edit Work Point</span>
              <div style={styles.card__form}>
                <textarea
                  style={styles.textarea}
                  value={currentPoint}
                  onChange={(e) => setCurrentPoint(e.target.value)}
                  placeholder="Edit Work Point"
                  rows={10}
                />
                 <div
                  style={{
                    display: "flex",
                    gap: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    style={{
                      ...styles.button,
                      ...(isButtonHovered2 ? styles.buttonHover : {}),
                    }}
                    onMouseEnter={() => setIsButtonHovered2(true)}
                    onMouseLeave={() => setIsButtonHovered2(false)}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      ...styles.button,
                      ...(isButtonHovered ? styles.buttonHover : {}),
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    onClick={handleAddOrEditPoint}
                  >
                    Save
                  </button>
                </div>
               
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Workexperience;
