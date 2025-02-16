import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/lab";
import axios from "axios";
import { blue } from "@mui/material/colors";
import { format } from "date-fns";

const WalletPage = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [openCardDialog, setOpenCardDialog] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchAccountInformation = async () => {
      const apiUrl1 = "/api/v1/profile/wallet"; // Replace with your API URL

      // Make the GET request
      axios
        .get(apiUrl1, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            setAccountInfo(response.data.data);
          } else {
            throw new Error("No account data");
          }
        })
        .catch((error) => {
          console.error("Error fetching account information:", error);
          setSnackbarMessage("Failed to load account information.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    };

    const fetchTransactions = async () => {
      // URL of the API endpoint
      const apiUrl = "/api/v1/profile/transactions"; // Replace with your API URL

      // Make the GET request
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
        })
        .then(async (response) => {
          if (response?.data?.data) {
            const transformedTransactions = response.data.data.map((tx) => ({
              amount: tx.volume,
              date: format(new Date(tx.time), "MM/dd/yyyy HH:mm:ss"),
              type: tx.type,
            }));
            setTransactions(transformedTransactions);
          } else {
            throw new Error("No transactions data");
          }
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
          setSnackbarMessage("Failed to load transactions.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    };

    fetchAccountInformation();
    fetchTransactions();
  }, []);

  const handleDeposit = async () => {
    const amount = parseFloat(transactionAmount);
    if (amount > 0) {
      try {
        const response = await axios.post(
          "/api/v1/profile/deposit",
          { amount: amount },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "x-role": localStorage.getItem("role"),
            },
          }
        );

        if (response.status === 200) {
          setSnackbarMessage("Deposit successful!");
          setSnackbarSeverity("success");
        
        } else {
          throw new Error("Deposit failed");
        }
      } catch (error) {
        console.error("Deposit error:", error);
        setSnackbarMessage("Failed to deposit. Please try again.");
        setSnackbarSeverity("error");
      } finally {
        setOpenSnackbar(true);
        setTransactionAmount("");
      }
    } else {
      setSnackbarMessage("Please enter a valid deposit amount.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(transactionAmount);
    if (amount > 0 && amount <= (accountInfo?.balance || 0)) {
      try {
        const response = await fetch("/api/v1/profile/withdraw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-role": localStorage.getItem("role"),
          },
          body: JSON.stringify({ amount: amount }),
        });

        if (response.status === 200) {
          setSnackbarMessage("Withdrawal successful!");
          setSnackbarSeverity("success");
          
        } else {
          throw new Error("Withdrawal failed");
        }
      } catch (error) {
        console.error("Withdrawal error:", error);
        setSnackbarMessage("Failed to withdraw. Please try again.");
        setSnackbarSeverity("error");
      } finally {
        setOpenSnackbar(true);
        setTransactionAmount("");
      }
    } else {
      setSnackbarMessage("Insufficient balance or invalid withdrawal amount.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleAddCard = async () => {
    if (newCardNumber.length === 16 && /^\d+$/.test(newCardNumber)) {
      try {
        const response = await axios.post(
          "/api/v1/profile/cardNumber",
          { cardNumber: newCardNumber },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "x-role": localStorage.getItem("role"),
            },
          }
        );

        if (response.status === 200) {
          setSnackbarMessage("Card number updated successfully!");
          setSnackbarSeverity("success");
        } else {
          throw new Error("Failed to update card number");
        }
      } catch (error) {
        console.error("Card update error:", error);
        setSnackbarMessage("Failed to update card number. Please try again.");
        setSnackbarSeverity("error");
      } finally {
        setOpenSnackbar(true);
        setOpenCardDialog(false);
        setNewCardNumber("");
      }
    } else {
      setSnackbarMessage("Please enter a valid 16-digit card number.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          paddingTop: 70,
          maxWidth: 500,
          textAlign: "center",
          mt: 10,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Account Information Section */}
        <Card sx={{ marginBottom: 2, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Account Information
            </Typography>
            <Grid>
              <Grid item  sm={7}>
                <Typography variant="body1">
                  Card Number: {accountInfo?.cardNumber || "N/A"}
                </Typography>
              </Grid>
              <Grid item  sm={6}>
                <Typography variant="body1">
                  Balance: ${accountInfo?.balance || "0.00"}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCardDialog(true)}
            >
              Add Card Number
            </Button>
          </CardContent>
        </Card>

        {/* Deposit and Withdraw Section */}
        <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
          <TextField
            label="Amount"
            type="number"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" sx={{ backgroundColor: "green", borderRadius: 1 }} onClick={handleDeposit}>
            Deposit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </Box>

        {/* Transaction History Section */}
        <Card sx={{ 
          boxShadow: 4,
          overflowY: "auto",
          maxHeight: "350px",}}>
          <CardContent>
            <Typography variant="h5">Transaction History</Typography>
            <Box sx={{ marginTop: 2}}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="body1">Amount</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">Date</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">Type</Typography>
                </Grid>
              </Grid>
              {transactions.map((transaction, index) => (
                <Grid container spacing={1} key={index} sx={{ marginTop: 1 }}>
                  <Grid item xs={4}>
                    <Typography variant="body2">${transaction.amount}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">{transaction.date}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">{transaction.type}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Dialog for adding a card number */}
        <Dialog open={openCardDialog} onClose={() => setOpenCardDialog(false)}>
          <DialogContent sx={{ padding: "20px 20px 0px 20px" }}>
            <TextField
              label="New Card Number"
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 16 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCardDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddCard} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for feedback messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
  );
};

export default WalletPage;



