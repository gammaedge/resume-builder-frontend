import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import EducationAndOther from "./EditResume/EducationAndOther";
import Header from "./EditResume/Header";
import Project from "./EditResume/Projects";
import Workexperience from "./EditResume/Workexperience";
import { useRef } from "react";
import Careerandprofile from "./EditResume/Careerandprofile";
// import { ClipLoader } from "react-spinners";

function ViewResume({ resume, onClose,fetchResumes }) {
  const ref = useRef();
  const experienceRef = useRef();
  const educationRef = useRef();
  const [rolesAndResponsibilities, setRolesAndResponsibilities] = useState({
    summary: "",
    tools_and_technologies: [],
    bullet_points: [
      "Worked on end-to-end development with agile methodology; from requirement analysis to documentation, designing, development, debugging, implementation, and post-production issues.",
      "Hands-on experience in troubleshooting and debugging issues under high load in the production environment.",
      "Experienced in reviewing code written in multiple languages on GitHub, GitLab, and BitBucket to catch critical issues and ensure code quality and security measures before deployments.",
      "Learned various technologies on the go and managed teams working in different technologies and domains.",
      "Developed simple and maintainable solutions for complex problems to achieve solutions with reliable quality.",
    ],
  });

  const [projectDetails, setProjectDetails] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    role: "",
  });
  const [eduhobby, setEduhobby] = useState({
    edu: false,
    hobby: false,
    experiance: false,
  });
    const [realcandidatename, setRealCandidatename] = useState("");
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educationData, setEducationData] = useState({
    clgname: "",
    clgyear: "",
  });
  
  useEffect(() => {
    const { name, role } = resume.candidateDetails;
    if (name && role) {
      document.title = `${name}_${role}_Resume`;
    } else {
      document.title = "Resume_Builder";
    }
  }, [resume.candidateDetails]);

  useEffect(() => {
    if (resume) {
      setCandidateDetails(resume.candidateDetails || { name: "", role: "" });
      setRolesAndResponsibilities(resume.rolesAndResponsibilities || {
        summary: "",
        tools_and_technologies: [],
        bullet_points: [],
      });
      setProjectDetails(resume.projectDetails || []);
      setWorkExperiences(resume.workExperiences || []);
      setEducationData(resume.educationData || { clgname: "", clgyear: "" });
      setEduhobby(resume.eduhobby || { edu: false, hobby: false, experiance: false });
      setRealCandidatename(resume.realcandidatename || '')

      if (resume.candidateDetails?.name && resume.candidateDetails?.role) {
        document.title = `${resume.candidateDetails.name}_${resume.candidateDetails.role}_Resume`;
      } else {
        document.title = "Resume_Builder";
      }
    }
  }, [resume]);

  // const fetchProjects = async (jd, experience, selectedProjects) => {
  //   try {
  //     // setLoading(true);
  //     const response = await fetch(
  //       "https://fastapi-app-latest-dtka.onrender.com/generate-roles",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           jd: jd,
  //           experience: experience,
  //           projects: selectedProjects,
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setRolesAndResponsibilities(data.roles_and_responsibilities);
  //     setProjectDetails(data.project_details);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  const saveResume = async () => {
    const updatedResumeData = {
      candidateDetails,
      rolesAndResponsibilities,
      projectDetails,
      eduhobby,
      workExperiences,
      educationData,
      realcandidatename,
      parentId: resume._id || null,
    };

    console.log("Saving updated resume data:", updatedResumeData);

    try {
      const response = await fetch("http://localhost:8000/api/save_resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedResumeData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Resume saved successfully:", result);
        fetchResumes();
      } else {
        console.error("Error saving resume:", result.detail);
      }
    } catch (error) {
      console.error("Network error:", error); 
    }
  };

  const handleCandidateUpdate = (updatedData) => {
    setCandidateDetails(updatedData);
  };

  const handleRoleUpdate = (updatedData) => {
    setRolesAndResponsibilities(updatedData);
  };

  const handleProjectUpdate = (updatedData) => {
    setProjectDetails(updatedData);
  };

  const updateBulletPoints = (updatedData) => {
    setRolesAndResponsibilities((prevState) => ({
      ...prevState,
      bullet_points: updatedData,
    }));
  };
  const handleEducationUpdate = useCallback(
    (updatedEducation) => {
      if (
        updatedEducation.clgname !== educationData.clgname ||
        updatedEducation.clgyear !== educationData.clgyear
      ) {
        setEducationData(updatedEducation);
      }
    },
    [educationData]
  );

  const handleWorkExperiencesUpdate = (updatedWorkExperiences) => {
    setWorkExperiences(updatedWorkExperiences);
  };

  return (
    <>
      <div
        ref={ref}
        className="App"
        style={{
          marginTop: "-1000px",
        }}
      >
            <>
              <div className="section avoid-break">
              </div>
              <div className="section avoid-break">
                <Header
                  candidateDetails={candidateDetails}
                  rolesAndResponsibilities={resume.rolesAndResponsibilities}
                  onCandidateUpdate={handleCandidateUpdate}
                  onRoleUpdate={handleRoleUpdate}
                  resume={resume}
                />
              </div>
              <div className="section page-break">
                <Careerandprofile
                  rolesAndResponsibilities={
                    rolesAndResponsibilities.bullet_points
                  }
                  onRoleUpdate={updateBulletPoints}
                  resume={resume}
                />
              </div>
              <div className="section page-break" ref={experienceRef}>
                <Workexperience
                  onWorkExperiencesUpdate={handleWorkExperiencesUpdate}
                  resume={resume}
                />
              </div>

              <div className="section page-break">
                <Project
                  projectDetails={projectDetails}
                  onProjectUpdate={handleProjectUpdate}
                  resume={resume}
                />
              </div>

              <div className="section page-break" ref={educationRef}>
                <EducationAndOther
                  onEducationUpdate={handleEducationUpdate}
                  resume={resume}
                />
              </div>
            </>
        <div className="btndownContainer no-print">
          <button
              onClick={saveResume}
            className="save-btn"
          >
            Save
          </button>
          <button
            onClick={() => {
              fetchResumes(); 
              onClose();
            }}
            className="save-btn"
            style={{ marginLeft: "10px" }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewResume;
