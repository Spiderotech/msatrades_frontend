import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      <p style={styles.text}>
        We use cookies to improve your experience on MSAtrades. By continuing to browse the site, you agree to our use of cookies.{" "}
        <a href="/privacy-policy" style={styles.link}>Learn More</a>
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={handleDecline} style={{ ...styles.button, ...styles.decline }}>
          Decline
        </button>
        <button onClick={handleAccept} style={{ ...styles.button, ...styles.accept }}>
          Accept
        </button>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 9999,
    boxSizing: "border-box",
  },
  text: {
    textAlign: "center",
    margin: "0 0 0.5rem 0",
    fontSize: "0.9rem",
    lineHeight: "1.4",
  },
  link: {
    color: "#ff8c00",
    textDecoration: "underline",
  },
  buttonContainer: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    padding: "0.5rem 1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  accept: {
    backgroundColor: "#ff8c00",
    color: "#fff",
  },
  decline: {
    backgroundColor: "#555",
    color: "#fff",
  },
};

export default CookieConsent;
