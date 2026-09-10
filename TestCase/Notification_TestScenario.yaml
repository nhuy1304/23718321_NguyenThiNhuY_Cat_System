# TEST SCENARIO - NOTIFICATION MANAGEMENT

## 1. Phạm vi kiểm thử

Test Scenario được xây dựng dựa trên Functional Requirement, Acceptance Criteria và Notification API.

Phạm vi gồm:

* Gửi thông báo khi yêu cầu đặt chuyến được tiếp nhận
* Thông báo các thay đổi liên quan đến chuyến
* Thông báo khi Driver đến điểm đón
* Thông báo khi chuyến hoàn thành
* Gửi thông báo chuyến mới cho Driver
* Thông báo kết quả thanh toán
* Thông báo khi thanh toán thất bại
* Xem danh sách thông báo của Customer
* Đánh dấu thông báo đã đọc

---

# 2. Requirement liên quan

| FR   | Nội dung                                                                                       | AC liên quan |
| ---- | ---------------------------------------------------------------------------------------------- | ------------ |
| FR18 | Gửi thông báo khi yêu cầu đặt xe được tiếp nhận và khi Driver nhận chuyến                      | AC15         |
| FR19 | Gửi thông báo khi Driver đến điểm đón, chuyến hoàn thành hoặc có thay đổi liên quan đến chuyến | AC15, AC17   |
| FR20 | Thông báo cho Customer khi thanh toán có kết quả                                               | AC16         |

---

# 3. Acceptance Criteria

| AC   | Tiêu chí chấp nhận                                                                                                           |
| ---- | ---------------------------------------------------------------------------------------------------------------------------- |
| AC15 | Customer nhận được thông báo khi yêu cầu đặt xe được tiếp nhận, Driver nhận chuyến, Driver đến điểm đón và chuyến hoàn thành |
| AC16 | Customer nhận được thông báo về kết quả thanh toán                                                                           |
| AC17 | Driver nhận được thông báo về chuyến mới hoặc thay đổi liên quan đến chuyến đang thực hiện                                   |

---

# 4. Test Scenarios

| Scenario ID | Test Scenario                                                           | FR               | AC         | API liên quan                                 | Expected Result                                                                        |
| ----------- | ----------------------------------------------------------------------- | ---------------- | ---------- | --------------------------------------------- | -------------------------------------------------------------------------------------- |
| TS_NOTI_01  | Gửi thông báo cho Customer khi yêu cầu đặt chuyến được tiếp nhận        | FR18             | AC15       | POST /api/notifications/booking               | Notification được tạo và gửi thành công với trạng thái SENT                            |
| TS_NOTI_02  | Kiểm tra thông báo cho Customer khi Driver nhận chuyến                  | FR18             | AC15       | Notification API                              | Customer phải nhận được thông báo Driver đã nhận chuyến                                |
| TS_NOTI_03  | Gửi thông báo khi Driver đến điểm đón                                   | FR19             | AC15       | POST /api/notifications/trip-status           | Customer nhận được thông báo và notification có trạng thái SENT                        |
| TS_NOTI_04  | Gửi thông báo khi chuyến hoàn thành                                     | FR19             | AC15       | POST /api/notifications/trip-status           | Customer nhận được thông báo chuyến đã hoàn thành                                      |
| TS_NOTI_05  | Gửi thông báo chuyến mới cho Driver                                     | FR19             | AC17       | POST /api/notifications/driver-trip-request   | Driver nhận được notification về chuyến mới với trạng thái SENT                        |
| TS_NOTI_06  | Kiểm tra Driver có được thông báo khi chuyến đang thực hiện có thay đổi | FR19             | AC17       | Notification API                              | Driver phải nhận được thông báo về thay đổi liên quan đến chuyến                       |
| TS_NOTI_07  | Gửi thông báo thanh toán thành công cho Customer                        | FR20             | AC16       | POST /api/notifications/payment               | Customer nhận thông báo kết quả thanh toán COMPLETED                                   |
| TS_NOTI_08  | Gửi thông báo khi thanh toán điện tử thất bại                           | FR20             | AC16       | POST /api/notifications/payment-failure       | Customer nhận thông báo thanh toán thất bại                                            |
| TS_NOTI_09  | Customer xem danh sách các notification của mình                        | FR18, FR19, FR20 | AC15, AC16 | GET /api/customers/{customerId}/notifications | System trả đúng danh sách notification thuộc Customer                                  |
| TS_NOTI_10  | Customer đánh dấu một notification chưa đọc thành đã đọc                | FR18, FR19, FR20 | AC15, AC16 | PUT /api/notifications/{notificationId}/read  | Notification chuyển sang trạng thái READ                                               |
| TS_NOTI_11  | Gửi booking notification nhưng thiếu customerId                         | FR18             | AC15       | POST /api/notifications/booking               | System không được gửi notification hợp lệ khi không xác định được Customer nhận        |
| TS_NOTI_12  | Đánh dấu đã đọc với notification không tồn tại                          | FR18, FR19, FR20 | AC15, AC16 | PUT /api/notifications/{notificationId}/read  | System không được cập nhật nhầm notification khác và phải từ chối yêu cầu không hợp lệ |

---

# 5. API và dữ liệu dùng cho Test Scenario

## 5.1 Send Booking Notification

**API**

```http
POST /api/notifications/booking
```

### Input

```json
{
  "customerId": "C001",
  "tripId": "T001",
  "type": "BOOKING",
  "content": "Your trip booking has been created successfully."
}
```

### Expected Output

```json
{
  "notificationId": "N001",
  "status": "SENT",
  "message": "Booking notification sent successfully"
}
```

---

# 5.2 Send Driver Trip Request

**API**

```http
POST /api/notifications/driver-trip-request
```

### Input

```json
{
  "driverId": "D001",
  "tripId": "T001",
  "content": "You have received a new trip request."
}
```

### Expected Output

```json
{
  "notificationId": "N002",
  "driverId": "D001",
  "tripId": "T001",
  "status": "SENT",
  "message": "Trip request notification sent successfully"
}
```

---

# 5.3 Send Trip Status Notification

**API**

```http
POST /api/notifications/trip-status
```

### Input mẫu khi Driver đến điểm đón

```json
{
  "customerId": "C001",
  "tripId": "T001",
  "status": "DRIVER_ARRIVED",
  "content": "Your driver has arrived."
}
```

### Expected Output

```json
{
  "notificationId": "N003",
  "status": "SENT",
  "message": "Trip status notification sent successfully"
}
```

---

# 5.4 Send Payment Notification

**API**

```http
POST /api/notifications/payment
```

### Input

```json
{
  "customerId": "C001",
  "paymentId": "P001",
  "status": "COMPLETED",
  "content": "Your payment has been completed successfully."
}
```

### Expected Output

```json
{
  "notificationId": "N005",
  "status": "SENT",
  "message": "Payment notification sent successfully"
}
```

---

# 5.5 Send Payment Failure Notification

**API**

```http
POST /api/notifications/payment-failure
```

### Input

```json
{
  "customerId": "C001",
  "paymentId": "P001",
  "content": "Your electronic payment has failed. Please try again."
}
```

### Expected Output

```json
{
  "notificationId": "N006",
  "status": "SENT",
  "message": "Payment failure notification sent successfully"
}
```

---

# 5.6 Get Customer Notifications

**API**

```http
GET /api/customers/{customerId}/notifications
```

Ví dụ:

```http
GET /api/customers/C001/notifications
```

### Expected Output

```json
{
  "customerId": "C001",
  "notifications": [
    {
      "notificationId": "N001",
      "type": "BOOKING",
      "content": "Your trip booking has been created successfully.",
      "status": "READ"
    },
    {
      "notificationId": "N003",
      "type": "TRIP_STATUS",
      "content": "Your driver has arrived.",
      "status": "UNREAD"
    }
  ]
}
```

---

# 5.7 Mark Notification as Read

**API**

```http
PUT /api/notifications/{notificationId}/read
```

Ví dụ:

```http
PUT /api/notifications/N001/read
```

### Expected Output

```json
{
  "notificationId": "N001",
  "status": "READ",
  "message": "Notification marked as read"
}
```

---

# 6. Requirement/API Gap cần kiểm tra

## GAP 01 - Thông báo khi Driver nhận chuyến

AC15 yêu cầu Customer nhận được thông báo khi:

1. Yêu cầu đặt xe được tiếp nhận.
2. Driver nhận chuyến.
3. Driver đến điểm đón.
4. Chuyến hoàn thành.

Notification API hiện có:

* `/notifications/booking`
* `/notifications/trip-status`
* `/notifications/driver-trip-request`

Tuy nhiên API chưa mô tả rõ một request/response riêng cho việc **thông báo Customer khi Driver nhận chuyến**.

Do đó TS_NOTI_02 phải kiểm tra xem hệ thống có thực sự đáp ứng phần này của AC15 hay không.

Nếu hệ thống không tạo được notification tương ứng:

**Kết quả: FAIL - chưa đáp ứng đầy đủ AC15.**

---

## GAP 02 - Thông báo thay đổi chuyến cho Driver

AC17 yêu cầu Driver nhận được:

* Thông báo về chuyến mới.
* Thông báo khi có thay đổi liên quan đến chuyến đang thực hiện.

API `/notifications/driver-trip-request` đáp ứng trường hợp chuyến mới.

Tuy nhiên Notification API hiện chưa mô tả rõ endpoint hoặc dữ liệu dùng để gửi **thay đổi chuyến đang thực hiện cho Driver**.

Do đó TS_NOTI_06 được dùng để phát hiện trường hợp này.

Nếu không có cơ chế gửi notification cho Driver:

**Kết quả: FAIL - chưa đáp ứng đầy đủ AC17.**

---

# 7. Lưu ý đối với Test Case âm

Notification API hiện chưa quy định rõ HTTP Status Code và error response cho các trường hợp:

* Thiếu customerId.
* Thiếu driverId.
* Notification không tồn tại.
* Trip hoặc Payment không tồn tại.
* Dữ liệu request không hợp lệ.

Vì vậy Test Scenario không tự giả định các mã như 400 hoặc 404.

Expected Result được kiểm tra ở mức nghiệp vụ:

* Không tạo notification hợp lệ.
* Không gửi nhầm người nhận.
* Không cập nhật nhầm notification.
* System từ chối yêu cầu không hợp lệ.
