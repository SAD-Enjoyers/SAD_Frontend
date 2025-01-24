import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const RegisterTicket = ({ serviceId }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  console.log(serviceId);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "/api/v1/common/register-ticket",
        {
          serviceId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-role": role,
          },
        }
      );
      setResponse(result.data);
      setError(null);
      setSnackbarMessage("Ticket registered successfully!");
      setSeverity("success");
    } catch (err) {
      setError(
        err.response
          ? err.response.data
          : "An error occurred while submitting the ticket."
      );
      setResponse(null);
      setSnackbarMessage(
        "Your ticket has been sended to Support team, please wait to checked."
      );
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#333", textAlign: "center" }}>
        Register a Support Ticket
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label htmlFor="message" style={{ fontSize: "16px", color: "#555" }}>
            Your Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "100%",
              minHeight: "150px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Ticket
        </button>
      </form>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterTicket;

// import React from "react";
// import RegisterTicket from "./RegisterTicket";

// const SomePage = () => {
//   const serviceId = 1; // Example serviceId, dynamically passed in a real app

//   return (
//     <div>
//       <h1>Service Feedback</h1>
//       <RegisterTicket serviceId={serviceId} />
//     </div>
//   );
// };

// export default SomePage;
