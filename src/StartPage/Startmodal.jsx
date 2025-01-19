import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";

Modal.setAppElement("#root");

const Startmodal = ({ isOpen, onClose, onSubmit }) => {
  const [projectList, setProjectList] = useState([]);
  const [candidatename, setCandidatename] = useState("");
  const [designation, setDesignation] = useState("");
  const [jd, setJd] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [includeEducation, setIncludeEducation] = useState(false);
  //   const [educationDetails, setEducationDetails] = useState({});
  const [includeInterests, setIncludeInterests] = useState(false);
  //   const [interestDetails, setInterestDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = {
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
    heading: {
      textAlign: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectlist();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(candidatename, designation,jd, experience, selectedProjects, {
      includeEducation,
      //   educationDetails,
      includeInterests,
      //   interestDetails,
    });
  };

  return (
    <>
      {loading ? (
        <div style={styles.loader}>
          <ClipLoader color="#20ddc0" size={50} />
        </div>
      ) : (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          shouldCloseOnOverlayClick={false}
          contentLabel="Project Form"
          style={{
            content: styles.content,
            overlay: {
              background: "#fff",
            },
          }}
        >
          <h2 style={styles.heading}>Enter Your Details</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
                <label style={styles.label}>Name : </label>
                <input
                    value={candidatename}
                    type="text"
                    onChange={(e) => setCandidatename(e.target.value)}
                  />
            </div>
            <div>
                <label style={styles.label}>Designation : </label>
                <input
                    value={designation}
                    type="text"
                    onChange={(e) => setDesignation(e.target.value)}
                  />
            </div>
            <div>
              <label>Job Description (JD):</label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Experience:</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Select Projects:</label>
              {projectList.map((project) => (
                <div key={project._id.$oid}>
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
            <div>
              <label>
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
                    <label>
                      <input
                        type="checkbox"
                        checked={includeInterests}
                        onChange={(e) => setIncludeInterests(e.target.checked)}
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

            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Startmodal;
