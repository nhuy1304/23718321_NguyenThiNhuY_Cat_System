const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'CAB System API is running'
    });
});

app.post('/api/customers/register', (req, res) => {
    res.status(201).json({
        customerId: 'C001',
        message: 'Registration successful'
    });
});

app.post('/api/customers/login', (req, res) => {
    res.json({
        message: 'Login successful',
        customerId: 'C001'
    });
});

app.post('/api/trips', (req, res) => {
    res.status(201).json({
        tripId: 'T001',
        message: 'Trip booking successful'
    });
});

app.get('/api/trips/:tripId', (req, res) => {
    res.json({
        tripId: req.params.tripId,
        status: 'BOOKED',
        message: 'Trip information retrieved successfully'
    });
});

app.post('/api/payments', (req, res) => {
    res.status(201).json({
        paymentId: 'P001',
        message: 'Payment created successfully'
    });
});

app.get('/api/customers/:customerId', (req, res) => {
    res.json({
        customerId: req.params.customerId,
        name: 'Nguyen Van A',
        phone: '0901234567'
    });
});

app.listen(PORT, () => {
    console.log(`CAB System API is running on http://localhost:${PORT}`);
});