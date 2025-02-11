import React, { useEffect, useState} from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt";
import ViewResume from "./ViewResume";

const ResumeTable = ({ isOpen}) => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  
  const fetchResumes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get_all_resumes"
        );
        const data = await response.json();
        console.log({data});
        
        setResumes(data);
      } catch (error) { 
        console.error("Error fetching resumes:", error);
      }
    };

    useEffect(() => {  
    fetchResumes();
  }, []);
  

  const handleDelete = async (resumeId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this resume?");
    if (!isConfirmed) {
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8000/delete_resume/${resumeId}`,
        {
          method: "DELETE", 
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log("Resume deleted successfully");
        if ($.fn.DataTable.isDataTable("#resumeTable")) {
          $("#resumeTable").DataTable().destroy();
        }
        setResumes(resumes.filter((resume) => resume._id !== resumeId));        
      } else {
        console.error(result.detail);
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };
  
  const handleEdit = async (resumeId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/get_resume_by_id/${resumeId}`);
      const data = await response.json();
      setSelectedResume(data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  useEffect(() => {
    if (resumes.length > 0) {
      if ($.fn.DataTable.isDataTable("#resumeTable")) {
        $("#resumeTable").DataTable().destroy();
      }
        $(document).ready(function () {
        $("#resumeTable").DataTable();
      });
    }
  }, [resumes, selectedResume]);  

  const styles = {
    container: {
      position: "fixed",
      top: "70px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "35%",
      margin: "20px auto",
      padding: "20px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
    },
    header: {
      backgroundColor: "#3366cc",
      color: "white",
      padding: "10px",
      textAlign: "left",
    },
    cell: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    button: {
      marginRight: "10px",
      padding: "5px 10px",
      border: "none",
      backgroundColor: "#20ddc0",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
    },
    buttonDelete: {
      padding: "5px 10px",
      border: "none",
      backgroundColor: "#ff4d4d",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
    },
  };


  return (
    <div>
      {selectedResume ? (
        <ViewResume resume={selectedResume} onClose={() => setSelectedResume(null) } 
        fetchResumes={fetchResumes}
        />
      ) : (
        <div style={styles.container}>
          <table id="resumeTable" className="display" style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>Name</th>
                <th style={styles.header}>Role</th>
                <th style={styles.header}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume, index) => (
                <tr key={index}>
                  <td style={styles.cell}>{resume.candidateDetails.name}</td>
                  <td style={styles.cell}>{resume.candidateDetails.role}</td>
                  <td style={styles.cell}>
                    {/* <button
                      style={styles.button}
                      onClick={() => {
                        handleView(resume._id);
                        
                      }}
                    >
                      View
                    </button> */}
                    <button style={styles.button} onClick={() => handleEdit(resume._id)}>Edit</button>
                    <button
                      style={styles.buttonDelete}
                      onClick={() => handleDelete(resume._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} 
    </div>
  );
};

export default ResumeTable;
