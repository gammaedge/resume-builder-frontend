import "./App.css";
import React, { useEffect, useState } from "react";
import EducationAndOther from "./components/EducationAndOther";
import Header from "./components/Header";
import Project from "./components/Projects";
import Workexperience from "./components/Workexperience";
// import html2pdf from "html2pdf.js";
// import { FaDownload } from "react-icons/fa";
import { useRef } from "react";
import Careerandprofile from "./components/Careerandprofile";
import Startmodal from "./StartPage/Startmodal";
import { ClipLoader } from "react-spinners";

function App() {
  const ref = useRef();
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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [eduhobby, setEduhobby] = useState({
    edu: false,
    hobby: false,
    experiance: false,
  });
  
  useEffect(() => {
    const { name, role } = candidateDetails;
    if (name && role) {
      document.title = `${name}_${role}_Resume`;
    } else {
      document.title = "Resume_Builder";
    }
  }, [candidateDetails]);

  const fetchProjects = async (jd, experience, selectedProjects) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://fastapi-app-latest-dtka.onrender.com/generate-roles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jd: jd,
            experience: experience,
            projects: selectedProjects,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRolesAndResponsibilities(data.roles_and_responsibilities);
      setProjectDetails(data.project_details);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const generatePdf = () => {
  //   const element = ref.current;
  //   const options = {
  //     margin: [0, 0],
  //     filename: "resume.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: {
  //       scale: 2,
  //       logging: true,
  //       useCORS: true,
  //     },
  //     jsPDF: {
  //       unit: "mm",
  //       format: "a4",
  //       orientation: "portrait",
  //     },
  //   };
  //   html2pdf().from(element).set(options).save();
  // };

  const handleModalSubmit = (
    candidatename,
    designation,
    jd,
    experience,
    selectedProjects,
    { includeEducation, includeInterests, includeExperiance }
  ) => {
    if (jd && experience && selectedProjects.length > 0) {
      setIsModalOpen(false);
      fetchProjects(jd, experience, selectedProjects);
      setEduhobby({
        edu: includeEducation,
        hobby: includeInterests,
        experiance: includeExperiance,
      });
      setCandidateDetails({ name: candidatename, role: designation });
    } else {
      alert("Please fill out all fields before submitting.");
    }

  };

  return (
    <>
      <div ref={ref} className="App">
        {loading ? (
          <div className="loader">
            <ClipLoader color="#20ddc0" size={50} />
          </div>
        ) : (
          !isModalOpen && (
            <>
              <div className="section avoid-break">
                <Header
                  candidateDetails={candidateDetails}
                  rolesAndResponsibilities={rolesAndResponsibilities}
                />
              </div>

              <div className="section page-break">
                <Careerandprofile
                  rolesAndResponsibilities={
                    rolesAndResponsibilities.bullet_points
                  }
                />
              </div>
              {eduhobby.experiance && (
                <div className="section page-break">
                  <Workexperience />
                </div>
              )}

              <div className="section page-break">
                <Project projectDetails={projectDetails} />
              </div>

              {eduhobby.edu && (
                <div className="section page-break">
                  <EducationAndOther includeInterests={eduhobby.hobby} />
                </div>
              )}
            </>
          )
        )}
      </div>
      {/* {!isModalOpen && (
        <div className="btndownContainer">
          <button className="btndown" onClick={generatePdf}>
            <FaDownload /> Download
          </button>
        </div>
      )} */}
      <Startmodal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}

export default App;
