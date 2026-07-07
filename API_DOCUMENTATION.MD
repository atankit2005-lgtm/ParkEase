# ParkEase Backend API Documentation

## Base URL

```
http://localhost:5000
```

---

# Authentication

## Register User

POST /api/auth/register

Authentication: No

### Request

```json
{
  "name": "Rana",
  "email": "rana@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "User Registered Successfully"
}
```

---

## Login User

POST /api/auth/login

Authentication: No

Returns JWT Token.

---

# Parking

## Create Parking

POST /api/parking

Authentication: Bearer Token

## Get All Parking

GET /api/parking

Authentication: No

## Get Parking By ID

GET /api/parking/:id

Authentication: No

## Update Parking

PUT /api/parking/:id

Authentication: Bearer Token

## Delete Parking

DELETE /api/parking/:id

Authentication: Bearer Token

---

# Booking

## Create Booking

POST /api/bookings

Authentication: Bearer Token

## Get User Bookings

GET /api/bookings/user/:userId

Authentication: Bearer Token

## Cancel Booking

PUT /api/bookings/:id/cancel

Authentication: Bearer Token

---

# Payment

## Create Payment

POST /api/payments

Authentication: Bearer Token

## Get All Payments

GET /api/payments

Authentication: Bearer Token

## Get Payment By ID

GET /api/payments/:id

Authentication: Bearer Token

---

# Dashboard

## Get Dashboard Statistics

GET /api/dashboard

Authentication: Bearer Token