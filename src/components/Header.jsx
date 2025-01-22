import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import {
  // FaMapMarkerAlt,
  // FaEnvelope,
  // FaPhone,
  // FaGlobe,
  // FaTwitter,
  // FaLinkedin,
  // FaGithub,
  FaUser,
  FaTools,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const Header = ({ candidateDetails, rolesAndResponsibilities }) => {
  const [name, setName] = useState(candidateDetails.name);
  const [role, setRole] = useState(candidateDetails.role);
  const [about, setAbout] = useState(rolesAndResponsibilities.summary);
  const [skills, setSkills] = useState(
    rolesAndResponsibilities.tools_and_technologies
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isButtonHovered2, setIsButtonHovered2] = useState(false);
  const sanitizeInput = (input) => input.replace(/<\/?[^>]+(>|$)/g, "");

  const handleNameChange = (event) => {
    setName(sanitizeInput(event.target.value));
  };

  const handleRoleChange = (event) => {
    setRole(sanitizeInput(event.target.value));
  };
  const handleAboutChange = (event) => {
    setAbout(sanitizeInput(event.target.value));
  };

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      alert("Enter the Skill Please");
      return;
    }
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill("");
    setIsModalOpen(false);
  };
  const handleEditSkill = (event, index) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = event.target.value;
    setSkills(updatedSkills);
  };
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const styles = {
    header: {
      textAlign: "center",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    h1: {
      margin: "0",
      fontSize: "28px",
      textAlign: "center",
    },
    p: {
      margin: "5px 0",
      fontSize: "15px",
      color: "#555",
    },
    contact: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      columnGap: "20px",
      fontSize: "14px",
      color: "#666",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      margin: "5px 0",
      gap: "10px",
    },
    link: {
      textDecoration: "none",
      color: "#444",
    },
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
    icon: {
      fontSize: "0.9rem",
      verticalAlign: "middle",
      marginRight: "5px",
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
      borderRadius: "20px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      minWidth: "275px",
    },
    card: {
      height: "250px",
      width: "300px",
      padding: "0 35px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "15px",
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
      gap: "25px",
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
    list: {
      fontSize: "14px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "25px",
      padding: "0 1rem",
      margin: 0,
      listStyleType: "disc",
    },
    listItem: {
      margin: 0,
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
    input: {
      marginTop: "10px",
      outline: "0",
      background: "rgb(255, 255, 255)",
      boxShadow: "transparent 0px 0px 0px 1px inset",
      padding: "0.9em 0.6em",
      minWidth: "280px",
      borderRadius: "5px",
      border: "1px solid #333",
      color: "black",
    },
    removeIcon: {
      color: "#000",
      cursor: "pointer",
      fontSize: "14px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "25px",
      fontWeight: "900",
      cursor: "pointer",
      color: "#333",
    },
  };

  return (
    <>
      <div style={styles.header}>
        <ContentEditable
          html={name}
          tagName="h1"
          onChange={handleNameChange}
          style={styles.h1}
        />
        <ContentEditable
          html={role}
          tagName="p"
          onChange={handleRoleChange}
          style={styles.p}
        />
        {/* <div style={styles.contact}>
          <div style={styles.contactItem}>
            <FaMapMarkerAlt />
            <span>Indore, India</span>
          </div>
          <div style={styles.contactItem}>
            <FaEnvelope />
            <span>abairagi311@gmail.com</span>
          </div>
          <div style={styles.contactItem}>
            <FaPhone />
            <span>+91 9131038495</span>
          </div>
          <div style={styles.contactItem}>
            <FaGlobe />
            <a
              href="https://ayushbairagi.com"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              ayushbairagi.com
            </a>
          </div>
          <div style={styles.contactItem}>
            <FaTwitter />
            <a
              href="https://twitter.com/ayush3298"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              @ayush3298
            </a>
          </div>
          <div style={styles.contactItem}>
            <FaLinkedin />
            <a
              href="https://linkedin.com/in/ayush3298"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ayush Bairagi
            </a>
          </div>
          <div style={styles.contactItem}>
            <FaGithub />
            <a
              href="https://github.com/ayush3298"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              ayush3298
            </a>
          </div>
        </div> */}
      </div>

      {/* About Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <FaUser style={styles.icon} />
          About Me
        </h2>
        <ContentEditable
          html={about}
          tagName="p"
          onChange={handleAboutChange}
          style={styles.p}
        />
      </div>

      {/* Skills Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <FaTools style={styles.icon} /> Skills
          <div style={styles.addIcon} onClick={() => setIsModalOpen(true)}>
            <FaPlus className="no-print" />
          </div>
        </h2>

        <ul style={styles.list}>
          {skills.map((skill, index) => (
            <li key={index} style={styles.listItem}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <ContentEditable
                  html={skill}
                  onChange={(e) => handleEditSkill(e, index)}
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
                <FaTimes
                  className="no-print"
                  style={styles.removeIcon}
                  onClick={() => handleRemoveSkill(index)}
                  title="Remove skill"
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Add skill box */}
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
                <span style={styles.card__title}>Add New Skill</span>
                <div style={styles.card__form}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter skill name"
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
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
                      onClick={handleAddSkill}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
