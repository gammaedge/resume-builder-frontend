import "./App.css";
import React, { useEffect, useState ,useCallback} from "react";
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
import ButtonContainer from "./components/ButtonContainer";
// import { saveAs } from "file-saver";
import ResumeTable from "./components/ResumeTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./StartPage/AuthPage";

function App() {
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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [eduhobby, setEduhobby] = useState({
    edu: false,
    hobby: false,
    experiance: false,
  });
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educationData, setEducationData] = useState({
    clgname: "",
    clgyear: "",  
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
  const handleStateChange = ({ experience, education }) => {
    setEduhobby({
      edu: education,
      hobby: false,
      experiance: experience,
    });
    if (experience && experienceRef.current) {
      experienceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (education && educationRef.current) {
      educationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const saveResume = async () => {
    // Prepare the updated resume data
    const updatedResumeData = {
      candidateDetails,
      rolesAndResponsibilities,
      projectDetails,
      eduhobby,
      workExperiences,
      educationData,
      parentId: 'null',
    };
  
    console.log("Saving updated resume data:", updatedResumeData);
  
    try {
      // Sending the resume data to the server
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

        //  const jsonBlob = new Blob([JSON.stringify(updatedResumeData, null, 2)], { type: "application/json" });
        //  saveAs(jsonBlob, "resume.json");  

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
      // setEducationData(updatedEducation);
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


  // const handleCreateButtonClick = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // Close Create Resume modal
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleViewResume = (resume) => {
  //   setIsViewing(true); // Switch to viewing mode
  // };

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
                  onCandidateUpdate={handleCandidateUpdate}
                  onRoleUpdate={handleRoleUpdate}
                />
              </div>

              <div className="section page-break">
                <Careerandprofile
                  rolesAndResponsibilities={
                    rolesAndResponsibilities.bullet_points
                  }
                  onRoleUpdate={updateBulletPoints}
                />
              </div>
              {eduhobby.experiance && (
                <div className="section page-break"   ref={experienceRef}>
                  <Workexperience
                   experiance={eduhobby.experiance}
                   onWorkExperiencesUpdate={handleWorkExperiencesUpdate} />
                </div>
              )}

              <div className="section page-break">
                <Project projectDetails={projectDetails} 
                        onProjectUpdate={handleProjectUpdate}/>
              </div>

              {eduhobby.edu && (
                <div className="section page-break"  ref={educationRef}>
                  <EducationAndOther
                   includeInterests={eduhobby.hobby}
                   onEducationUpdate={handleEducationUpdate}
                   />
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
      {!isModalOpen && (
        <div className="btndownContainer no-print">
          <ButtonContainer onStateChange={handleStateChange} />
          <button onClick={saveResume} className="save-btn">
            Save
          </button>
        </div>
      )}

<Router>
  <Routes>
    <Route path="/" element={<AuthPage />} />
    <Route
      path="/resume-builder"
      element={
        <>
          <Startmodal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
          />
          {isModalOpen && <ResumeTable isOpen={isModalOpen} />}
        </>
      }
    />
  </Routes>
</Router>
      {/* <Startmodal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}  
      /> */}
      {/* {isModalOpen && <ResumeTable isOpen={isModalOpen} />} */}
      {/* {isModalOpen  && (
  <ResumeTable
    isOpen={isModalOpen}
    onViewClick={handleViewClick}
  />
)} */}
    </>
  );
}

export default App;
