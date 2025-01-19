import React,{useState} from "react";
import { FaGraduationCap, FaBook } from "react-icons/fa";
import ContentEditable from "react-contenteditable";
const EducationAndOther = (props) => {
  const [clgname, setClgname] = useState(
    " Bachelor of Computer Science and Engineering, MIT Mandsaur"
  );
  const [clgyear, setClgyear] = useState(
    "2015 – 2019 | Mandsaur, MP"
  );
  const sanitizeInput = (input) => input.replace(/<\/?[^>]+(>|$)/g, "");
  const handleNameChange = (event) => {
    setClgname(sanitizeInput(event.target.value));
  };
  const handleYearChange = (event) => {
    setClgyear(sanitizeInput(event.target.value));
  };

  const styles = {
    section: {
      margin: "20px 0",
      padding: "0 20px",
      //   pageBreakBefore: "always"
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
    educationContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    eduDegree: {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    eduLocation: {
      color: "#666",
      fontSize: "0.9rem",
    },
    eduYear: {
      color: "#666",
      fontSize: "0.9rem",
    },
  };
  
  return (
    <>
      {/* Education Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <FaGraduationCap style={styles.icon} /> Education
        </h2>
        <div style={styles.educationContent}>
          <div>
            <p style={styles.eduDegree}>
              <ContentEditable
                html={clgname}
                onChange={handleNameChange}
                style={{padding: "5px"}}
              />
            </p>
          </div>
          <p style={styles.eduYear}>
          <ContentEditable
                html={clgyear}
                onChange={handleYearChange}
                style={{padding: "5px"}}
              />
          </p>
        </div>
      </div>

      {/* Interests Section */}
      {props.includeInterests && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <FaBook style={styles.icon} /> Interests
          </h2>
          <p>Cycling | Reading | Automating Stuff with Code</p>
        </div>
      )}
    </>
  );
};

export default EducationAndOther;
