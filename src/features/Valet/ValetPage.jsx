import React, { useState } from 'react';
import { Button, Box, Typography, TextField, Grid, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ValetPage = () => {
    // Initial mock account data
    const initialMockAccount = {
        cardNumber: '1234567891011121',
        balance: 1500.75,
        accountStatus: 'Active'
    };

    // Initial mock transactions data
    const initialMockTransactions = [
        { amount: 500, date: '2024-12-01', type: 'Deposit' },
        { amount: -100, date: '2024-12-02', type: 'Withdraw' },
        { amount: 200, date: '2024-12-03', type: 'Deposit' },
    ];

    // State to manage account info and transactions
    const [mockAccount, setMockAccount] = useState(initialMockAccount);
    const [transactions, setTransactions] = useState(initialMockTransactions);
    const [transactionAmount, setTransactionAmount] = useState('');

    // State for adding card number functionality
    const [newCardNumber, setNewCardNumber] = useState('');
    const [openCardDialog, setOpenCardDialog] = useState(false);

    // Handle deposit
    const handleDeposit = () => {
        const amount = parseFloat(transactionAmount);
        if (amount > 0) {
            const newBalance = mockAccount.balance + amount;
            setMockAccount({ ...mockAccount, balance: newBalance });
            setTransactions([
                ...transactions,
                { amount: amount, date: new Date().toLocaleDateString(), type: 'Deposit' },
            ]);
            setTransactionAmount('');
        } else {
            alert('Please enter a valid amount for deposit.');
        }
    };

    // Handle withdraw
    const handleWithdraw = () => {
        const amount = parseFloat(transactionAmount);
        if (amount > 0 && amount <= mockAccount.balance) {
            const newBalance = mockAccount.balance - amount;
            setMockAccount({ ...mockAccount, balance: newBalance });
            setTransactions([
                ...transactions,
                { amount: -amount, date: new Date().toLocaleDateString(), type: 'Withdraw' },
            ]);
            setTransactionAmount('');
        } else {
            alert('Insufficient balance or invalid amount for withdrawal.');
        }
    };

    // Handle adding card number
    const handleAddCard = () => {
        if (newCardNumber.length === 16 && /^\d+$/.test(newCardNumber)) {
            const updatedAccount = {
                ...mockAccount, // Keep the current balance and status
                cardNumber: newCardNumber, // Update the card number
            };

            setMockAccount(updatedAccount);
            setOpenCardDialog(false);
            setNewCardNumber('');
        } else {
            alert('Please enter a valid 16-digit card number.');
        }
    };

    return (
        <Box sx={{ width: '100%', margin: '100px 200px', padding: 3, maxWidth: 1100 }}>
            {/* Account Information Section */}
            <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h5">Account Information</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1">Card Number: {mockAccount.cardNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1">Balance: ${mockAccount.balance.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1">Account Status: {mockAccount.accountStatus}</Typography>
                        </Grid>
                    </Grid>
                    {/* Button to open dialog for adding card number */}
                    <Button variant="outlined" color="primary" onClick={() => setOpenCardDialog(true)}>
                        Add Card Number
                    </Button>
                </CardContent>
            </Card>

            {/* Deposit and Withdraw Section */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                    label="Amount"
                    type="number"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleDeposit} sx={{ alignSelf: 'flex-end' }}>
                    Deposit
                </Button>
                <Button variant="contained" color="secondary" onClick={handleWithdraw} sx={{ alignSelf: 'flex-end' }}>
                    Withdraw
                </Button>
            </Box>

            {/* Transaction History Section */}
            <Card>
                <CardContent>
                    <Typography variant="h5">Transaction History</Typography>
                    <Box sx={{ marginTop: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}><Typography variant="body1">Amount</Typography></Grid>
                            <Grid item xs={4}><Typography variant="body1">Date</Typography></Grid>
                            <Grid item xs={4}><Typography variant="body1">Type</Typography></Grid>
                        </Grid>
                        {transactions.map((transaction, index) => (
                            <Grid container spacing={1} key={index} sx={{ marginTop: 1 }}>
                                <Grid item xs={4}><Typography variant="body2">{transaction.amount}</Typography></Grid>
                                <Grid item xs={4}><Typography variant="body2">{transaction.date}</Typography></Grid>
                                <Grid item xs={4}><Typography variant="body2">{transaction.type}</Typography></Grid>
                            </Grid>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Dialog for adding a card number */}
            <Dialog open={openCardDialog} onClose={() => setOpenCardDialog(false)}>
                <DialogTitle>Add Card Number</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New Card Number"
                        value={newCardNumber}
                        onChange={(e) => setNewCardNumber(e.target.value)}
                        variant="outlined"
                        fullWidth
                        inputProps={{ maxLength: 16 }} // Restrict to 16 characters
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
        </Box>
    );
};

export default ValetPage;
