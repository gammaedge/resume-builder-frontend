import React, { useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(""); 


  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    setEmail(value);    
  
    if (!value.endsWith("@gammaedge.io")) {
      setEmailError("Email must be a @gammaedge.io account");
    } else {
      setEmailError("");
    }
  }, []);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const storedUser = JSON.parse(localStorage.getItem("user"));

  //   if (storedUser && storedUser.username === username && storedUser.password === password) {
  //     localStorage.setItem("isAuthenticated", "true");
  //     navigate("/resume-builder"); 
  //   } else {
  //     alert("Invalid credentials. Please try again or register.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
  
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      const data = await response.json();
      console.log("Received data:", data); 
  
      if (data.token) {
        console.log("Saving token:", data.token);
        localStorage.setItem("token", data.token);
        console.log("Navigating to /resume-builder");
        navigate("/resume-builder");
      } else {
        throw new Error("Token not received");
      }
  
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.message);
    }
  };

  
  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   if (!email.endsWith("@gammaedge.io")) {
  //     setEmailError("Please use an @gammaedge.io email");
  //     return;
  //   }

  //   const newUser = { username, password, email };
  //   localStorage.setItem("user", JSON.stringify(newUser));
  //   alert("Registration successful! You can now log in.");
  //   setIsRegistering(false);
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!email.endsWith("@gammaedge.io")) {
      setEmailError("Please use an @gammaedge.io email");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      alert("Registration successful! You can now log in.");
      setIsRegistering(false);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const styles = {
    authContainer: {
      alignItems: "center",
      backgroundColor: "#f3f4f6",
        marginTop:'-700px',
        minheight: '100vh',
        maxWidth: "350px",
        marginLeft:'40%'
    },
    form: {
      backgroundColor: "#fff",
      padding: "2rem",
      maxWidth: "350px",
      borderRadius: "0.5rem",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    formTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      textAlign: "center",
      color: "#000",
    },
    inputContainer: {
      position: "relative",
    },
    input: {
      width: "90%",
      padding: "1rem",
      fontSize: "0.875rem",
      border: "1px solid #e5e7eb",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      marginTop: "8px",
    },
    submit: {
      display: "block",
      padding: "0.75rem",
      backgroundColor: "#4F46E5",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: "500",
      width: "100%",
      borderRadius: "0.5rem",
      textTransform: "uppercase",
      border: "none",
      cursor: "pointer",
      marginTop: "12px",
      opacity: emailError ? 0.5 : 1,
    },
    submitHover: {
      backgroundColor: "#4338ca",
    },
    signupLink: {
      color: "#6B7280",
      fontSize: "0.875rem",
      textAlign: "center",
      marginTop: "10px",
    },
    signupLinkAnchor: {
      textDecoration: "underline",
      color: "#4F46E5",
      cursor: "pointer",
      background: "none",
      border: "none",
    },
  };

  return (
    <div style={styles.authContainer}>
      <form style={styles.form} onSubmit={isRegistering ? handleRegister : handleLogin}>
        <p style={styles.formTitle}>{isRegistering ? "Create an Account" : "Sign in to your account"}</p>
        
        {isRegistering && (
          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
            //   onChange={(e) => setEmail(e.target.value)}
              onChange={handleEmailChange}
              required
              style={styles.input}
            />
            {emailError && <span style={styles.error}>{emailError}</span>}
          </div>
        )}
        
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {authError && <p style={styles.error}>{authError}</p>}
        <button
          type="submit"
          style={styles.submit}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.submit.backgroundColor)}
        >
          {isRegistering ? "Register" : "Sign in"}
        </button>

        <p style={styles.signupLink}>
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button style={styles.signupLinkAnchor} onClick={() => setIsRegistering(false)}>Login</button>
            </>
          ) : (
            <>
              No account?{" "}
              {/* <button style={styles.signupLinkAnchor} onClick={() => setIsRegistering(true)}>Sign up</button> */}
              <button type="button" style={styles.signupLinkAnchor} onClick={() => setIsRegistering(true)}>Sign up</button>

            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;