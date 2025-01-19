import React from "react";
import { FaBriefcase } from "react-icons/fa";

const Workexperience = () => {
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
    listItem: {
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        <FaBriefcase style={styles.icon} /> Work Experience
      </h2>
      <h3>Senior Software Engineer, CubeXo Software Solutions</h3>
      <p>
        <em>Oct 2018 – Present | Indore</em>
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          Evaluated new tools, technologies, and design patterns by creating
          POCs to come up with trustable solutions for the clients which led to
          60% more client conversions.
        </li>
        <li style={styles.listItem}>
          Communicated and collaborated with multi-disciplinary teams of
          engineers, clients, and stakeholders daily.
        </li>
        <li style={styles.listItem}>
          Mentored and led the team to develop high quality, maintainable,
          robust, scalable, and user-facing solutions with the highest code
          coverage and standardization.
        </li>
        <li style={styles.listItem}>
          Developed a centralized system to monitor health, logging, and alerts
          about any breakdown for all the systems delivered and managed by the
          company, which led to more satisfied clients.
        </li>
        <li style={styles.listItem}>
          Learned various technologies and managed teams working in different
          domains.
        </li>
      </ul>
    </div>
  );
};

export default Workexperience;
