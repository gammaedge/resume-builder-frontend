import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";



Modal.setAppElement("#root");

const Startmodal = ({ isOpen, onSubmit}) => {
  const [projectList, setProjectList] = useState([]);
  const [candidatename, setCandidatename] = useState("");
  const [realCandidatename, setRealCandidatename] = useState("");
  const [designation, setDesignation] = useState("");
  const [jd, setJd] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [includeEducation, setIncludeEducation] = useState(false);
  const [includeInterests, setIncludeInterests] = useState(false);
  const [includeExperiance, setIncludeExperiance] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (!isAuthenticated) {
  //     navigate("/"); 
  //   }
  // }, [navigate]);
  
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = (field) => {
    if (field === "candidatename" && !candidatename) {
      setFocusedField("");
    }
    if (field === "designation" && !designation) {
      setFocusedField("");
    }
    if (field === "experience" && !experience) {
      setFocusedField("");
    }
    if (field === "jd" && !jd) {
      setFocusedField("");
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles = {
    createbutton: {
      position: "fixed", 
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor:'#074799',
      borderradius: "7px",
      border: "2px solid transparent",
      textshadow: "1px 1px 1px #00000040",
      boxshadow: "8px 8px 20px 0px #45090059",
      padding: "10px 40px",
      lineheight: "20px",
      cursor: "pointer",
      transition: "all 0.3s",
      color: "white",
      fontsize: "20px",
      fontweight: "800",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "400px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "0px 20px",
      width: "350px",
      display: "flex",
      flexDirection: "column",
    },
    form: {
      marginTop: "15px",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "600",
    },
    group: {
      position: "relative",
    },
    inputarea: {
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      outline: "none",
      width: "100%",
      backgroundColor: "transparent",
      transition: "border-color 0.3s ease",
      caretColor: "auto",
      color: "black",
    },
    label: {
      fontSize: "14px",
      color: "rgba(99, 102, 102, 0.8)",
      position: "absolute",
      top: "10px",
      left: "10px",
      backgroundColor: "#fff",
      transition: "all 0.3s ease",
      padding: "0 4px",
      pointerEvents: "none",
    },
    labelFloating: {
      top: "-5px",
      left: "10px",
      backgroundColor: "#fff",
      color: "#3366cc",
      fontWeight: "600",
      fontSize: "10px",
    },
    inputFocus: {
      borderColor: "#3366cc",
      outline: "none",
    },
    textarea: {
      resize: "none",
      height: "100px",
      marginBottom: "5px",
    },
    button: {
      backgroundColor: "#3366cc",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "8px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "5px",
      width: "50%",
    },
    buttonHover: {
      backgroundColor: "#27408b",
    },
    pjtitle: {
      textAlign: "center",
      fontSize: "15px",
      fontWeight: "600",
    },
    projectGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      padding: "0px 5px",
      justifyContent: "flex-start",
      marginBottom:"10px"
    },
    project: {
      fontSize: "13px",
      fontWeight: "400",
      display: "flex",
      alignItems: "center",
    },
    checks: {
      display: "flex",
      alignItems: "center",
    },
    eduwork: {
      fontSize: "13px",
      fontWeight: "400",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    candidateinput:{
      marginTop:'50px',
      backgroundColor:'pink'
    }
  };

  const fetchProjectlist = async () => {
    try {
      const response = await fetch(
        "https://fastapi-app-latest-dtka.onrender.com/list-projects"
      );
      const data = await response.json();
      setProjectList(data.projects || []);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchProjectlist();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  onSubmit(candidatename, designation, jd, experience, selectedProjects, realCandidatename, {
    includeEducation,
    includeInterests,
    includeExperiance,
  });
  handleClose(); 
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); 
    navigate("/"); 
  };

  return (
    <div>
    <React.Fragment>
    {(isOpen) && <button style={styles.createbutton} onClick={handleClickOpen}>Create Resume</button>}

    <Dialog
      open={open}
      onClose={handleClose} 
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    > 
  <DialogContent>
  <div style={styles.card}>
           <span style={styles.title}>Enter Resume Details</span>
            <form style={styles.form} onSubmit={handleFormSubmit}>
              <div style={styles.group}>
                <input
                  style={{
                    ...styles.inputarea,
                    ...(focusedField === "candidatename" || candidatename
                      ? styles.inputareaFocus
                      : {}),
                  }}
                  value={candidatename}
                  type="text"
                  onChange={(e) => setCandidatename(e.target.value)}
                  onFocus={() => handleFocus("candidatename")}
                  onBlur={() => handleBlur("candidatename")}
                />
                <label
                  style={{
                    ...styles.label,
                    ...(focusedField === "candidatename" || candidatename
                      ? styles.labelFloating
                      : {}),
                  }}
                >
                  Name
                </label>
              </div>

              <div style={styles.group}>
                <input
                  style={{
                    ...styles.inputarea,
                    ...(focusedField === "designation" || designation
                      ? styles.inputareaFocus
                      : {}),
                  }}
                  value={designation}
                  type="text"
                  onChange={(e) => setDesignation(e.target.value)}
                  onFocus={() => handleFocus("designation")}
                  onBlur={() => handleBlur("designation")}
                />
                <label
                  style={{
                    ...styles.label,
                    ...(focusedField === "designation" || designation
                      ? styles.labelFloating
                      : {}),
                  }}
                >
                  Designation
                </label>
              </div>

              <div style={styles.group}>
                <input
                  style={{
                    ...styles.inputarea,
                    ...(focusedField === "experience" || experience
                      ? styles.inputareaFocus
                      : {}),
                  }}
                  value={experience}
                  type="text"
                  onChange={(e) => setExperience(e.target.value)}
                  onFocus={() => handleFocus("experience")}
                  onBlur={() => handleBlur("experience")}
                />
                <label
                  style={{
                    ...styles.label,
                    ...(focusedField === "experience" || experience
                      ? styles.labelFloating
                      : {}),
                  }}
                >
                  Experience
                </label>
              </div>
              <div style={styles.eduwork}>
                <div>
                  <label style={styles.checks}>
                    <input
                      type="checkbox"
                      checked={includeEducation}
                      onChange={(e) => setIncludeEducation(e.target.checked)}
                    />
                    Include Education
                  </label>
                  {includeEducation && (
                    <>
                      {/* <textarea
                  placeholder="Enter Max Degree college Name"
                  value={educationDetails}
                  onChange={(e) => setEducationDetails(e.target.value)}
                  required
                /> */}
                      <div>
                        <label style={styles.checks} >
                          <input
                            type="checkbox"
                            checked={includeInterests}
                            onChange={(e) =>
                              setIncludeInterests(e.target.checked)
                            }
                          />
                          Include Interests
                        </label>
                        {/* {includeInterests && (
                <textarea
                  placeholder="Enter Interest Details"
                  value={interestDetails}
                  onChange={(e) => setInterestDetails(e.target.value)}
                  required
                />
              )} */}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <label style={styles.checks}>
                    <input
                      type="checkbox"
                      checked={includeExperiance}
                      onChange={(e) => setIncludeExperiance(e.target.checked)}
                    />
                    Include Experiance
                  </label>
                </div>
              </div>
              <div style={styles.group}>
                <textarea
                  style={{
                    ...styles.inputarea,
                    ...styles.textarea,
                    ...(focusedField === "jd" || jd
                      ? styles.inputareaFocus
                      : {}),
                  }}
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  onFocus={() => handleFocus("jd")}
                  onBlur={() => handleBlur("jd")}
                />
                <label
                  style={{
                    ...styles.label,
                    ...(focusedField === "jd" || jd
                      ? styles.labelFloating
                      : {}),
                  }}
                >
                  Job Description (JD)
                </label>
              </div>
              <div style={styles.pjtitle}>Add Projects</div>
              <div style={styles.projectGrid}>
                {projectList.map((project) => (
                  <div style={styles.project} key={project._id.$oid}>
                    <input
                      type="checkbox"
                      id={project._id.$oid}
                      checked={selectedProjects.includes(project._id.$oid)}
                      onChange={() =>
                        setSelectedProjects((prev) =>
                          prev.includes(project._id.$oid)
                            ? prev.filter((id) => id !== project._id.$oid)
                            : [...prev, project._id.$oid]
                        )
                      }
                    />
                    <label htmlFor={project._id.$oid}>{project.name}</label>
                  </div>
                ))}
              </div>
              <div style={styles.group}>
                <input
                  style={{
                    ...styles.inputarea,
                    ...(focusedField === "realCandidatename" || realCandidatename
                      ? styles.inputareaFocus
                      : {}),
                  }}
                  className="candidate-input"
                  value={realCandidatename}
                  type="text"
                  onChange={(e) => setRealCandidatename(e.target.value)}
                  onFocus={() => handleFocus("realCandidatename")}
                  onBlur={() => handleBlur("realCandidatename")}
                />
                <label
                  style={{
                    ...styles.label,
                    ...(focusedField === "realCandidatename" || realCandidatename
                      ? styles.labelFloating
                      : {}),
                  }}
                >
                  Remark
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(isButtonHovered ? styles.buttonHover : {}),
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  onClick={handleClose}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
  </DialogContent>
</Dialog>
  </React.Fragment>
  {isOpen && (
        <button
          onClick={handleLogout}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#ff4d4d",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
  </div>
  );
};

export default Startmodal;
