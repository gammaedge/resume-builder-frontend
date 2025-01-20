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
 

  // File CSS
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
    icon: {
      fontSize: "0.9rem",
      verticalAlign: "middle",
      marginRight: "5px",
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
      fontWeight: "bold",
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
      marginLeft: "10px",
      cursor: "pointer",
      fontSize: "1rem",
      color: "#007bff",
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
      minWidth: "400px",
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
    input: {
      width: "90%",
      padding: "10px",
      marginBottom: "10px",
      fontSize: "1rem",
    },
    textarea: {
      width: "90%",
      padding: "10px",
      marginBottom: "10px",
      fontSize: "1rem",
      resize: "vertical",
    },
    button: {
      padding: "5px 10px",
      fontSize: "1rem",
      cursor: "pointer",
      marginRight: "10px",
    },
    headInput: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      margin:"0"
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
            <p>
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
                handleRoleChange(
                  { target: { value: e.target.value } }, 
                  index
                )
              } 
              style={{ padding: "5px", margin: "0" }}
            
            /> 
            </p>
            <ul style={styles.list}>
              {Array.isArray(
                project.roles_and_responsibilities.roles_and_responsibilities
              ) &&
                project.roles_and_responsibilities.roles_and_responsibilities.map(
                  (desc, idx) => <li style={styles.listItem} key={idx}>{desc}</li>
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
            <h3>
              {editingIndex !== null ? "Edit Project" : "Add New Project"}
            </h3>
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
              value={currentProject.description}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  description: e.target.value,
                })
              }
              placeholder="Roles and Responsibilities (Enter each point in a new line)"
              rows={6}
            />
            <div>
              <button style={styles.button} onClick={handleAddOrEditProject}>
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Project;
