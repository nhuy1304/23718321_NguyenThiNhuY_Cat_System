# TEST SCENARIO - PAYMENT

## 1. Requirement liên quan

| FR   | Nội dung                  | AC         |
| ---- | ------------------------- | ---------- |
| FR14 | Tính cước chuyến đi       | AC11       |
| FR15 | Thanh toán tiền mặt       | AC12       |
| FR16 | Thanh toán điện tử        | AC12, AC13 |
| FR17 | Xử lý thanh toán thất bại | AC14       |

---

## 2. Test Scenarios

| Scenario ID | Test Scenario                                              | FR         | AC         | API liên quan                             | Kết quả mong đợi                                                                                          |
| ----------- | ---------------------------------------------------------- | ---------- | ---------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| TS_PAY_01   | Tạo thanh toán cho chuyến đã hoàn thành với dữ liệu hợp lệ | FR14, FR15 | AC11, AC12 | POST /api/payments                        | Payment được tạo thành công, có paymentId, amount, method và status PENDING                               |
| TS_PAY_02   | Xác nhận thanh toán bằng tiền mặt thành công               | FR15       | AC12       | POST /api/payments/{paymentId}/cash       | Trạng thái Payment chuyển thành COMPLETED                                                                 |
| TS_PAY_03   | Thanh toán điện tử với thông tin hợp lệ                    | FR16       | AC12, AC13 | POST /api/payments/{paymentId}/electronic | Thanh toán được xử lý thông qua nhà cung cấp thanh toán và trạng thái chuyển thành COMPLETED              |
| TS_PAY_04   | Thanh toán điện tử thất bại                                | FR17       | AC14       | POST /api/payments/{paymentId}/failure    | Payment có trạng thái FAILED và hệ thống ghi nhận thanh toán thất bại                                     |
| TS_PAY_05   | Tra cứu thông tin một Payment tồn tại                      | FR15, FR16 | AC12       | GET /api/payments/{paymentId}             | Hệ thống trả đúng paymentId, tripId, amount, method và status                                             |
| TS_PAY_06   | Xem lịch sử thanh toán của Customer                        | FR15, FR16 | AC12       | GET /api/customers/{customerId}/payments  | Hệ thống trả danh sách các Payment của Customer                                                           |
| TS_PAY_07   | Tạo Payment khi chuyến chưa hoàn thành                     | FR14       | AC11       | POST /api/payments                        | Hệ thống không được xử lý thanh toán vì việc tính cước/thanh toán chỉ thực hiện sau khi chuyến hoàn thành |
| TS_PAY_08   | Thanh toán điện tử với Payment không tồn tại               | FR16       | AC13       | POST /api/payments/{paymentId}/electronic | Hệ thống từ chối xử lý, không tạo giao dịch thanh toán thành công                                         |
| TS_PAY_09   | Tra cứu Payment không tồn tại                              | FR15, FR16 | AC12       | GET /api/payments/{paymentId}             | Hệ thống không trả về thông tin Payment hợp lệ                                                            |
| TS_PAY_10   | Thanh toán điện tử thất bại và thực hiện xử lý lại         | FR17       | AC14       | POST /api/payments/{paymentId}/failure    | Hệ thống ghi nhận FAILED, thông báo kết quả và cho phép xử lý lại theo chính sách                         |

---

## 3. Các API dùng trong Test Scenario

### API 1 - Create Payment

```http
POST /api/payments
```

Input mẫu:

```json
{
  "tripId": "T001",
  "customerId": "C001",
  "method": "CASH"
}
```

Expected Output:

```json
{
  "paymentId": "P001",
  "tripId": "T001",
  "amount": 120000,
  "method": "CASH",
  "status": "PENDING",
  "message": "Payment created successfully"
}
```

---

### API 2 - Get Payment Information

```http
GET /api/payments/{paymentId}
```

Expected Output:

```json
{
  "paymentId": "P001",
  "tripId": "T001",
  "amount": 120000,
  "method": "CASH",
  "status": "COMPLETED"
}
```

---

### API 3 - Process Cash Payment

```http
POST /api/payments/{paymentId}/cash
```

Expected Output:

```json
{
  "paymentId": "P001",
  "status": "COMPLETED",
  "message": "Cash payment completed successfully"
}
```

---

### API 4 - Process Electronic Payment

```http
POST /api/payments/{paymentId}/electronic
```

Input:

```json
{
  "paymentMethod": "BANKING",
  "amount": 120000
}
```

Expected Output:

```json
{
  "paymentId": "P001",
  "status": "COMPLETED",
  "message": "Electronic payment completed successfully"
}
```

---

### API 5 - Handle Payment Failure

```http
POST /api/payments/{paymentId}/failure
```

Expected Output:

```json
{
  "paymentId": "P001",
  "status": "FAILED",
  "message": "Payment failed"
}
```

---

### API 6 - Get Customer Payment History

```http
GET /api/customers/{customerId}/payments
```

Expected Result:

* Trả đúng Customer.
* Trả danh sách các Payment của Customer.
* Mỗi Payment có paymentId, tripId, amount, method và status.
