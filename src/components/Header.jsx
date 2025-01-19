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

const Header = ({candidateDetails, rolesAndResponsibilities }) => {
  console.log(rolesAndResponsibilities, "dkakddka");
  const [name, setName] = useState("Ayush Bairagi");
  const [role, setRole] = useState("Full Stack Python Engineer");
  const [about, setAbout] = useState(rolesAndResponsibilities.summary);
  const [skills, setSkills] = useState(rolesAndResponsibilities.tools_and_technologies);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill("");
    setIsModalOpen(false);
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
    skills: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
    },
    skillItem: {
      backgroundColor: "#f4f4f4",
      padding: "5px 10px",
      borderRadius: "5px",
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
      padding: "20px",
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
    button: {
      padding: "5px 10px",
      fontSize: "1rem",
      cursor: "pointer",
      marginRight: "10px",
    },
    input: {
      width: "90%",
      padding: "10px",
      marginBottom: "10px",
      fontSize: "1rem",
    },
    removeIcon: {
      marginLeft: "10px",
      color: "#000",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  return (
    <>
      <div style={styles.header}>
        <ContentEditable
          html={candidateDetails.name}
          tagName="h1"
          onChange={handleNameChange}
          style={styles.h1}
        />
        <ContentEditable
          html={candidateDetails.role}
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
        <style>
          {`
          @media print {
            .no-print {
              display: none !important;
            }
          }
        `}
        </style>
        <h2 style={styles.sectionTitle}>
          <FaTools style={styles.icon} /> Skills
          <div
            className="no-print"
            style={styles.addIcon}
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
          </div>
        </h2>
        <div style={styles.skills}>
          {skills.map((skill, index) => (
            <div key={index} style={styles.skillItem}>
              {skill}
              <FaTimes
                className="no-print"
                style={styles.removeIcon}
                onClick={() => handleRemoveSkill(index)}
                title="Remove skill"
              />
            </div>
          ))}
        </div>

        {/* Add skill box */}
        {isModalOpen && (
          <>
            <div style={styles.overlay} onClick={() => setIsModalOpen(false)} />
            <div style={styles.modal}>
              <h3>Add New Skill</h3>
              <input
                type="text"
                style={styles.input}
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill name"
              />
              <div>
                <button style={styles.button} onClick={handleAddSkill}>
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
