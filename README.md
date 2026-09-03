# 23718321_NguyenThiNhuY_Cab_System

# CAB System - API Documentation

## 1. Overview

This repository contains the API documentation for the CAB online ride-booking system.

The system supports customers, drivers, trip management, payment processing, notifications, and operational management.

---

## 2. API Documents

### Customer API
API for customer account and profile management.

File: `Customer_API.md`

Main functions:
- Register customer
- Login
- Update customer profile
- Get customer information

### Driver API
API for driver account, availability, and trip processing.

File: `Driver_API.md`

Main functions:
- Register driver
- Update driver profile
- Update driver availability
- Accept trip
- Reject trip
- Update trip status
- Get driver information

### Trip API
API for trip booking and trip management.

File: `Trip_API.md`

Main functions:
- Create trip
- Get trip information
- Cancel trip
- Track trip
- Get trip history
- Update trip status
- Calculate trip fare
- Rate driver

### Payment API
API for trip payment processing.

File: `Payment_API.md`

Main functions:
- Create payment
- Get payment information
- Process cash payment
- Process electronic payment
- Handle payment failure
- Get payment history

### Notification API
API for sending and managing system notifications.

File: `Notification_API.md`

Main functions:
- Booking notifications
- Driver trip request notifications
- Trip status notifications
- No-driver notifications
- Payment notifications
- Payment failure notifications
- Get customer notifications
- Mark notification as read

### Operations API
API for operational management.

File: `Operations_API.md`

Main functions:
- Manage customers
- Manage drivers
- Manage vehicles
- Manage trips
- Look up transactions
- Get activity reports
- Update driver status
- Update trip status

---

## 3. API Base Path

All API endpoints use the following base path:

`/api`

Example:

`POST /api/customers/register`

---

## 4. HTTP Methods

| Method | Description |
|---|---|
| GET | Retrieve information |
| POST | Create or process data |
| PUT | Update existing data |
| DELETE | Delete data |

---

## 5. Common Response Format

Successful responses generally contain:

- Resource identifier
- Current status
- Relevant information
- Message describing the result

Example:

{
  "tripId": "T001",
  "status": "COMPLETED",
  "message": "Trip completed successfully"
}

---

## 6. Main System Modules

The API documentation covers the following modules:

1. Customer Management
2. Driver Management
3. Vehicle Management
4. Trip Management
5. Payment Management
6. Notification Management
7. Operations Management
