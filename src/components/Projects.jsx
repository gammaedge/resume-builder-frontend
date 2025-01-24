import React, { useState } from "react";
import { FaLaptopCode, FaPlus, FaEdit, FaTimes } from "react-icons/fa";
import ContentEditable from "react-contenteditable";

const Project = ({ projectDetails }) => {
  const [projects, setProjects] = useState(projectDetails);
  const [roles, setRoles] = useState(projects.map(() => "Software Developer"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    name: "",
    technologies: "",
    role: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
 const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonHovered2, setIsButtonHovered2] = useState(false);

  // File CSS
  const styles = {
    section: {
      margin: "20px 0",
      padding: "0 20px",
      // pageBreakBefore: "always"
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
    icon: {
      fontSize: "0.9rem",
      verticalAlign: "middle",
      marginRight: "5px",
      paddingBottom:"5px"
    },
    list: {
      marginTop: "5px",
      fontSize:"14px"
    },
    listItem: {
      marginBottom: "5px",
    },
    projects: {
      marginLeft: "20px",
    },
    projectItem: {
      marginBottom: "15px",
    },
    subheading: {
      fontSize: "16px",
      fontWeight: "600",
      margin: "10px 0",
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
      marginLeft: "10px",
      cursor: "pointer",
      fontSize: "1rem",
      color: "#007bff",
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
    headInput: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      margin: "0",
      fontSize :"14px" 
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      minWidth: "400px",
    },
    card: {
      padding: "10px 35px",
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

  // CRUD  Operations

  const handleAddOrEditProject = () => {
    const trimmedName = currentProject.name.trim();
    const trimmedTechnologies = currentProject.technologies.trim();
    const trimmedDescription = currentProject.description.trim();

    if (!trimmedName || !trimmedTechnologies || !trimmedDescription) {
      alert("All fields are required.");
      return;
    }

    const updatedProjects = [...projects];
    const formattedProject = {
      name: trimmedName,
      roles_and_responsibilities: {
        roles_and_responsibilities: trimmedDescription.split("\n"),
        tech_stack: trimmedTechnologies.split(","),
      },
    };

    if (editingIndex !== null) {
      updatedProjects[editingIndex] = formattedProject;
    } else {
      updatedProjects.push(formattedProject);
    }

    setProjects(updatedProjects);
    setIsModalOpen(false);
    setCurrentProject({
      name: "",
      technologies: "",
      role: "",
      description: "",
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setCurrentProject({
      ...project,
      description:
        project.roles_and_responsibilities.roles_and_responsibilities.join(
          "\n"
        ),
      technologies: project.roles_and_responsibilities.tech_stack.join(", "),
    });
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleRoleChange = (event, index) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = event.target.value;
    setRoles(updatedRoles);
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        <FaLaptopCode style={styles.icon} /> Projects
        <div
          className="no-print"
          style={styles.addIcon}
          onClick={() => {
            setCurrentProject({
              name: "",
              technologies: "",
              role: "",
              description: "",
            });
            setEditingIndex(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus />
        </div>
      </h2>
      <div style={styles.projects}>
        {projects.map((project, index) => (
          <div key={index} style={styles.projectItem}>
            <p style={styles.subheading}>{project.name}</p>
            <p style={{ margin: "0",fontSize :"14px" }}>
              {" "}
              <b>Technologies used : </b>
              {project.roles_and_responsibilities.tech_stack.join(", ")}
            </p>
            <p style={styles.headInput}>
              {" "}
              <b>Role: </b>{" "}
              <ContentEditable
                html={roles[index]}
                tagName="p"
                onChange={(e) =>
                  handleRoleChange({ target: { value: e.target.value } }, index)
                }
                style={{ padding: "5px", margin: "0", fontSize :"14px" }}
              />
            </p>
            <ul style={styles.list}>
              {Array.isArray(
                project.roles_and_responsibilities.roles_and_responsibilities
              ) &&
                project.roles_and_responsibilities.roles_and_responsibilities.map(
                  (desc, idx) => (
                    <li style={styles.listItem} key={idx}>
                      {desc}
                    </li>
                  )
                )}
            </ul>
            <FaEdit
              className="no-print"
              style={styles.actionIcons}
              onClick={() => handleEdit(index)}
              title="Edit Project"
            />
            <FaTimes
              className="no-print"
              style={{ ...styles.actionIcons, color: "#ff4d4d" }}
              onClick={() => handleDelete(index)}
              title="Delete Project"
            />
          </div>
        ))}
      </div>

      {/* Add Project Modal */}

      {isModalOpen && (
        <>
          <div
            className="no-print"
            style={styles.overlay}
            onClick={() => setIsModalOpen(false)}
          />
          <div className="no-print" style={styles.modal}>
            <div style={styles.card}>
            <button
                style={styles.closeButton}
                onClick={() =>setIsModalOpen(false)}
              >
                &times;
              </button>
              <span style={styles.card__title}>
                {editingIndex !== null ? "Edit Project" : "Add New Project"}
              </span>
              <div style={styles.card__form}>
              <input
                style={styles.input}
                value={currentProject.name}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, name: e.target.value })
                }
                placeholder="Project Name"
              />
              <input
                style={styles.input}
                value={currentProject.technologies}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    technologies: e.target.value,
                  })
                }
                placeholder="Technologies Used (comma separated)"
              />
              <textarea
                style={styles.textarea}
                value={currentProject.description
                  .split("\n")
                  // .filter((line) => line.trim() !== "")
                  .map((line) => (line.trim() ? `• ${line.trim()}` : ""))
                  .join("\n")}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    description: e.target.value
                      .split("\n")
                      // .filter((line) => line.trim() !== "")
                      .map((line) => line.replace(/^•\s*/, "").trim())
                      .join("\n"), 
                  })
                }
                placeholder="Roles and Responsibilities (Enter each point in a new line)"
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
                    onClick={handleAddOrEditProject}
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
  );
};

export default Project;
