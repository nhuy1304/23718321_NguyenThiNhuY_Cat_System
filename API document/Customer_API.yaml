# Customer API

## 1. Register Customer

Endpoint: POST /api/customers/register

Description: Register a new customer account.

Request Body:
{
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "password": "123456"
}

Response:
{
  "customerId": "C001",
  "message": "Registration successful"
}

---

## 2. Login Customer

Endpoint: POST /api/customers/login

Description: Authenticate customer account.

Request Body:
{
  "phone": "0901234567",
  "password": "123456"
}

Response:
{
  "customerId": "C001",
  "message": "Login successful"
}

---

## 3. Get Customer Profile

Endpoint: GET /api/customers/{customerId}

Description: Get customer information.

Response:
{
  "customerId": "C001",
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "email": "nguyenvana@example.com"
}

---

## 4. Update Customer Profile

Endpoint: PUT /api/customers/{customerId}

Description: Update customer personal information.

Request Body:
{
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "email": "nguyenvana@example.com"
}

Response:
{
  "message": "Customer information updated successfully"
}

---

## 5. Get Trip History

Endpoint: GET /api/customers/{customerId}/trips

Description: Get customer's trip history.

Response:
{
  "customerId": "C001",
  "trips": [
    {
      "tripId": "T001",
      "status": "COMPLETED",
      "pickupLocation": "University",
      "destination": "Home",
      "fare": 50000
    }
  ]
}

---

## 6. Rate Driver

Endpoint: POST /api/customers/{customerId}/ratings

Description: Customer rates a driver after completing a trip.

Request Body:
{
  "tripId": "T001",
  "driverId": "D001",
  "rating": 5,
  "comment": "Good service"
}

Response:
{
  "message": "Driver rating submitted successfully"
}
