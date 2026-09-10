# TEST CASE - NOTIFICATION MANAGEMENT

## 1. Mục đích

Tài liệu xây dựng các Test Case chi tiết từ Test Scenario của chức năng Notification.

Test Case được xây dựng dựa trên:

* FR18 - Gửi thông báo đặt xe
* FR19 - Gửi thông báo chuyến đi
* FR20 - Gửi thông báo thanh toán
* AC15 - Thông báo cho Customer về các sự kiện của chuyến
* AC16 - Thông báo kết quả thanh toán cho Customer
* AC17 - Thông báo chuyến mới hoặc thay đổi chuyến cho Driver
* Notification API

---

# 2. Test Data

| Tham số               | Giá trị mẫu | Mô tả                      |
| --------------------- | ----------- | -------------------------- |
| customerId            | C001        | Customer tồn tại           |
| driverId              | D001        | Driver tồn tại             |
| tripId                | T001        | Trip tồn tại               |
| paymentId             | P001        | Payment tồn tại            |
| notificationId        | N001        | Notification tồn tại       |
| invalidNotificationId | N999        | Notification không tồn tại |

---

# 3. Test Cases

## TC_NOTI_01 - Gửi thông báo khi yêu cầu đặt chuyến được tiếp nhận

| Thuộc tính              | Nội dung                                                                       |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Test Case ID**        | TC_NOTI_01                                                                     |
| **Scenario ID**         | TS_NOTI_01                                                                     |
| **Requirement**         | FR18                                                                           |
| **Acceptance Criteria** | AC15                                                                           |
| **Mục đích**            | Kiểm tra Customer nhận được notification khi yêu cầu đặt chuyến được tiếp nhận |
| **Tiền điều kiện**      | Customer C001 tồn tại; Trip T001 đã được tạo                                   |
| **API**                 | POST /api/notifications/booking                                                |

### Input

```json
{
  "customerId": "C001",
  "tripId": "T001",
  "type": "BOOKING",
  "content": "Your trip booking has been created successfully."
}
```

### Các bước thực hiện

1. Customer tạo Trip `T001`.
2. System tiếp nhận yêu cầu đặt chuyến.
3. Gửi request:

```http
POST /api/notifications/booking
```

4. Truyền thông tin Customer và Trip.
5. Kiểm tra response.

### Expected Output

```json
{
  "notificationId": "N001",
  "status": "SENT",
  "message": "Booking notification sent successfully"
}
```

### Điều kiện đạt

* Notification được tạo.
* Có `notificationId`.
* Notification được gửi cho đúng Customer.
* Status của việc gửi notification là `SENT`.

---

## TC_NOTI_02 - Thông báo cho Customer khi Driver nhận chuyến

| Thuộc tính              | Nội dung                                              |
| ----------------------- | ----------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_02                                            |
| **Scenario ID**         | TS_NOTI_02                                            |
| **Requirement**         | FR18                                                  |
| **Acceptance Criteria** | AC15                                                  |
| **Mục đích**            | Kiểm tra Customer được thông báo khi Driver nhận Trip |
| **Tiền điều kiện**      | Customer C001 có Trip T001; Driver D001 đã nhận Trip  |
| **API**                 | Notification API                                      |

### Input

```text
customerId = C001
tripId = T001
driverId = D001
event = DRIVER_ACCEPTED
```

### Các bước thực hiện

1. Trip `T001` tồn tại.
2. Driver `D001` nhận Trip `T001`.
3. System phát sinh sự kiện Driver nhận chuyến.
4. Kiểm tra notification của Customer `C001`.
5. Kiểm tra Customer có nhận được thông tin Driver đã nhận chuyến hay không.

### Expected Output theo AC15

Customer `C001` phải nhận được notification cho biết Driver đã nhận Trip `T001`.

Notification phải có tối thiểu:

* Customer nhận đúng là `C001`.
* Liên kết đúng Trip `T001`.
* Nội dung thể hiện Driver đã nhận chuyến.
* Notification được gửi thành công.

### Kiểm tra với API hiện tại

Notification API chưa mô tả rõ endpoint riêng hoặc request body cụ thể để gửi notification cho Customer khi Driver nhận chuyến.

Nếu System không có cơ chế tạo notification này:

**Kết quả: FAIL - chưa đáp ứng đầy đủ AC15.**

---

## TC_NOTI_03 - Gửi thông báo khi Driver đến điểm đón

| Thuộc tính              | Nội dung                                                 |
| ----------------------- | -------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_03                                               |
| **Scenario ID**         | TS_NOTI_03                                               |
| **Requirement**         | FR19                                                     |
| **Acceptance Criteria** | AC15                                                     |
| **Mục đích**            | Kiểm tra Customer được thông báo khi Driver đến điểm đón |
| **Tiền điều kiện**      | Trip T001 tồn tại; Driver đã đến điểm đón                |
| **API**                 | POST /api/notifications/trip-status                      |

### Input

```json
{
  "customerId": "C001",
  "tripId": "T001",
  "status": "DRIVER_ARRIVED",
  "content": "Your driver has arrived."
}
```

### Các bước thực hiện

1. Driver đến điểm đón của Trip `T001`.
2. Gửi request:

```http
POST /api/notifications/trip-status
```

3. Truyền `status = DRIVER_ARRIVED`.
4. Kiểm tra response.

### Expected Output

```json
{
  "notificationId": "N003",
  "status": "SENT",
  "message": "Trip status notification sent successfully"
}
```

### Điều kiện đạt

* Notification được gửi thành công.
* Customer nhận đúng notification.
* Notification liên kết đúng Trip.
* Nội dung thể hiện Driver đã đến điểm đón.

---

## TC_NOTI_04 - Gửi thông báo khi chuyến hoàn thành

| Thuộc tính              | Nội dung                                                  |
| ----------------------- | --------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_04                                                |
| **Scenario ID**         | TS_NOTI_04                                                |
| **Requirement**         | FR19                                                      |
| **Acceptance Criteria** | AC15                                                      |
| **Mục đích**            | Kiểm tra Customer nhận notification khi chuyến hoàn thành |
| **Tiền điều kiện**      | Trip T001 đã hoàn thành                                   |
| **API**                 | POST /api/notifications/trip-status                       |

### Input

```json
{
  "customerId": "C001",
  "tripId": "T001",
  "status": "COMPLETED",
  "content": "Your trip has been completed."
}
```

### Các bước thực hiện

1. Trip `T001` chuyển thành `COMPLETED`.
2. Gửi:

```http
POST /api/notifications/trip-status
```

3. Truyền thông tin Customer, Trip và trạng thái.
4. Kiểm tra response.

### Expected Output

```json
{
  "notificationId": "N004",
  "status": "SENT",
  "message": "Trip status notification sent successfully"
}
```

### Điều kiện đạt

* Customer nhận notification.
* Notification liên quan đúng Trip `T001`.
* Nội dung thông báo chuyến đã hoàn thành.
* Status gửi là `SENT`.

---

## TC_NOTI_05 - Gửi thông báo chuyến mới cho Driver

| Thuộc tính              | Nội dung                                                 |
| ----------------------- | -------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_05                                               |
| **Scenario ID**         | TS_NOTI_05                                               |
| **Requirement**         | FR19                                                     |
| **Acceptance Criteria** | AC17                                                     |
| **Mục đích**            | Kiểm tra Driver nhận được notification về một chuyến mới |
| **Tiền điều kiện**      | Driver D001 tồn tại; Trip T001 tồn tại                   |
| **API**                 | POST /api/notifications/driver-trip-request              |

### Input

```json
{
  "driverId": "D001",
  "tripId": "T001",
  "content": "You have received a new trip request."
}
```

### Các bước thực hiện

1. System có một Trip `T001` cần gửi thông tin tới Driver.
2. Gửi:

```http
POST /api/notifications/driver-trip-request
```

3. Truyền `driverId = D001`.
4. Truyền `tripId = T001`.
5. Kiểm tra response.

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

### Điều kiện đạt

* Notification được gửi cho đúng `D001`.
* Notification liên quan đúng Trip `T001`.
* Status là `SENT`.
* Driver nhận được thông tin chuyến mới.

---

## TC_NOTI_06 - Thông báo cho Driver khi chuyến đang thực hiện có thay đổi

| Thuộc tính              | Nội dung                                                                |
| ----------------------- | ----------------------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_06                                                              |
| **Scenario ID**         | TS_NOTI_06                                                              |
| **Requirement**         | FR19                                                                    |
| **Acceptance Criteria** | AC17                                                                    |
| **Mục đích**            | Kiểm tra Driver nhận notification khi chuyến đang thực hiện có thay đổi |
| **Tiền điều kiện**      | Driver D001 đang thực hiện Trip T001                                    |
| **API**                 | Notification API                                                        |

### Input

```text
driverId = D001
tripId = T001
event = TRIP_CHANGED
```

### Các bước thực hiện

1. Driver `D001` đang thực hiện Trip `T001`.
2. Thông tin của Trip có thay đổi.
3. System phát sinh sự kiện thay đổi chuyến.
4. Kiểm tra notification gửi đến Driver.
5. Đối chiếu với AC17.

### Expected Output theo AC17

Driver `D001` phải nhận được notification về thay đổi của Trip `T001`.

Notification cần xác định:

* Đúng Driver nhận.
* Đúng Trip.
* Nội dung thay đổi liên quan đến Trip.
* Notification được gửi thành công.

### Kiểm tra với API hiện tại

API hiện có `/notifications/driver-trip-request` cho **chuyến mới**, nhưng chưa mô tả rõ API dùng để thông báo **thay đổi của chuyến đang thực hiện** cho Driver.

Nếu không có cơ chế thực hiện:

**Kết quả: FAIL - chưa đáp ứng đầy đủ AC17.**

---

## TC_NOTI_07 - Thông báo thanh toán thành công

| Thuộc tính              | Nội dung                                                  |
| ----------------------- | --------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_07                                                |
| **Scenario ID**         | TS_NOTI_07                                                |
| **Requirement**         | FR20                                                      |
| **Acceptance Criteria** | AC16                                                      |
| **Mục đích**            | Kiểm tra Customer nhận được kết quả thanh toán thành công |
| **Tiền điều kiện**      | Payment P001 tồn tại và đã thanh toán thành công          |
| **API**                 | POST /api/notifications/payment                           |

### Input

```json
{
  "customerId": "C001",
  "paymentId": "P001",
  "status": "COMPLETED",
  "content": "Your payment has been completed successfully."
}
```

### Các bước thực hiện

1. Payment `P001` được xử lý thành công.
2. Gửi:

```http
POST /api/notifications/payment
```

3. Truyền trạng thái `COMPLETED`.
4. Kiểm tra response.

### Expected Output

```json
{
  "notificationId": "N005",
  "status": "SENT",
  "message": "Payment notification sent successfully"
}
```

### Điều kiện đạt

* Customer nhận notification.
* Notification liên quan đúng Payment `P001`.
* Nội dung thể hiện thanh toán thành công.
* Notification có status `SENT`.

---

## TC_NOTI_08 - Thông báo thanh toán điện tử thất bại

| Thuộc tính              | Nội dung                                                         |
| ----------------------- | ---------------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_08                                                       |
| **Scenario ID**         | TS_NOTI_08                                                       |
| **Requirement**         | FR20                                                             |
| **Acceptance Criteria** | AC16                                                             |
| **Mục đích**            | Kiểm tra Customer nhận thông báo khi thanh toán điện tử thất bại |
| **Tiền điều kiện**      | Payment P001 tồn tại; thanh toán điện tử thất bại                |
| **API**                 | POST /api/notifications/payment-failure                          |

### Input

```json
{
  "customerId": "C001",
  "paymentId": "P001",
  "content": "Your electronic payment has failed. Please try again."
}
```

### Các bước thực hiện

1. Payment `P001` xử lý thất bại.
2. Gửi:

```http
POST /api/notifications/payment-failure
```

3. Truyền Customer và Payment tương ứng.
4. Kiểm tra response.

### Expected Output

```json
{
  "notificationId": "N006",
  "status": "SENT",
  "message": "Payment failure notification sent successfully"
}
```

### Điều kiện đạt

* Customer nhận được notification.
* Notification liên quan đúng `P001`.
* Nội dung thể hiện thanh toán thất bại.
* Customer được thông báo kết quả theo AC16.

---

## TC_NOTI_09 - Xem danh sách Notification của Customer

| Thuộc tính              | Nội dung                                                 |
| ----------------------- | -------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_09                                               |
| **Scenario ID**         | TS_NOTI_09                                               |
| **Requirement**         | FR18, FR19, FR20                                         |
| **Acceptance Criteria** | AC15, AC16                                               |
| **Mục đích**            | Kiểm tra System trả đúng các notification thuộc Customer |
| **Tiền điều kiện**      | Customer C001 tồn tại và đã có notification              |
| **API**                 | GET /api/customers/{customerId}/notifications            |

### Input

```text
customerId = C001
```

### Các bước thực hiện

1. Gửi:

```http
GET /api/customers/C001/notifications
```

2. System tìm notification của Customer.
3. Nhận response.
4. Kiểm tra từng notification.

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

### Điều kiện đạt

* Trả đúng `customerId = C001`.
* Có danh sách `notifications`.
* Notification thuộc đúng Customer.
* Có `notificationId`.
* Có `type`.
* Có `content`.
* Có trạng thái `READ` hoặc `UNREAD`.

---

## TC_NOTI_10 - Đánh dấu Notification là đã đọc

| Thuộc tính              | Nội dung                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_10                                                        |
| **Scenario ID**         | TS_NOTI_10                                                        |
| **Requirement**         | FR18, FR19, FR20                                                  |
| **Acceptance Criteria** | AC15, AC16                                                        |
| **Mục đích**            | Kiểm tra một notification có thể được chuyển sang trạng thái READ |
| **Tiền điều kiện**      | Notification N001 tồn tại                                         |
| **API**                 | PUT /api/notifications/{notificationId}/read                      |

### Input

```text
notificationId = N001
```

### Các bước thực hiện

1. Chọn Notification `N001`.
2. Gửi:

```http
PUT /api/notifications/N001/read
```

3. System cập nhật trạng thái.
4. Kiểm tra response.

### Expected Output

```json
{
  "notificationId": "N001",
  "status": "READ",
  "message": "Notification marked as read"
}
```

### Điều kiện đạt

* Đúng Notification `N001` được cập nhật.
* Status trở thành `READ`.
* Notification khác không bị thay đổi.

---

## TC_NOTI_11 - Gửi Booking Notification thiếu customerId

| Thuộc tính              | Nội dung                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_11                                                                       |
| **Scenario ID**         | TS_NOTI_11                                                                       |
| **Requirement**         | FR18                                                                             |
| **Acceptance Criteria** | AC15                                                                             |
| **Mục đích**            | Kiểm tra System xử lý request notification khi không xác định được Customer nhận |
| **Tiền điều kiện**      | Trip T001 tồn tại                                                                |
| **API**                 | POST /api/notifications/booking                                                  |

### Input

```json
{
  "tripId": "T001",
  "type": "BOOKING",
  "content": "Your trip booking has been created successfully."
}
```

### Các bước thực hiện

1. Không truyền `customerId`.
2. Gửi:

```http
POST /api/notifications/booking
```

3. System kiểm tra request.
4. Kiểm tra kết quả.

### Expected Output

* System không tạo một booking notification hợp lệ.
* Không gửi notification khi không xác định được người nhận.
* Không sinh kết quả `SENT` cho notification không có Customer hợp lệ.
* System từ chối hoặc thông báo request không hợp lệ.

> Notification API hiện chưa định nghĩa cụ thể HTTP Status Code và error response cho trường hợp thiếu `customerId`, vì vậy testcase không tự giả định mã 400 hoặc cấu trúc JSON lỗi.

---

## TC_NOTI_12 - Đánh dấu đã đọc với Notification không tồn tại

| Thuộc tính              | Nội dung                                                                     |
| ----------------------- | ---------------------------------------------------------------------------- |
| **Test Case ID**        | TC_NOTI_12                                                                   |
| **Scenario ID**         | TS_NOTI_12                                                                   |
| **Requirement**         | FR18, FR19, FR20                                                             |
| **Acceptance Criteria** | AC15, AC16                                                                   |
| **Mục đích**            | Kiểm tra System không cập nhật nhầm dữ liệu khi notificationId không tồn tại |
| **Tiền điều kiện**      | Không tồn tại Notification N999                                              |
| **API**                 | PUT /api/notifications/{notificationId}/read                                 |

### Input

```text
notificationId = N999
```

### Các bước thực hiện

1. Gửi:

```http
PUT /api/notifications/N999/read
```

2. System tìm Notification `N999`.
3. Không tìm thấy Notification.
4. Kiểm tra response và dữ liệu hiện tại.

### Expected Output

* Không có Notification hợp lệ nào được chuyển sang `READ`.
* System không cập nhật nhầm Notification khác.
* Không trả kết quả thành công cho `N999`.
* System thông báo hoặc từ chối yêu cầu vì Notification không tồn tại.

> API hiện chưa định nghĩa HTTP Status Code và error response cụ thể cho Notification không tồn tại.

---

# 4. Tổng hợp kết quả mong đợi

| Test Case  | Nội dung                   | Kết quả mong đợi                                     |
| ---------- | -------------------------- | ---------------------------------------------------- |
| TC_NOTI_01 | Booking notification       | PASS nếu Customer nhận notification                  |
| TC_NOTI_02 | Driver nhận chuyến         | Phải đáp ứng AC15; ghi nhận Gap nếu API không hỗ trợ |
| TC_NOTI_03 | Driver đến điểm đón        | PASS nếu notification SENT                           |
| TC_NOTI_04 | Chuyến hoàn thành          | PASS nếu Customer nhận notification                  |
| TC_NOTI_05 | Chuyến mới cho Driver      | PASS nếu Driver nhận notification                    |
| TC_NOTI_06 | Thay đổi chuyến cho Driver | Phải đáp ứng AC17; ghi nhận Gap nếu API không hỗ trợ |
| TC_NOTI_07 | Payment thành công         | PASS nếu notification SENT                           |
| TC_NOTI_08 | Payment thất bại           | PASS nếu notification SENT                           |
| TC_NOTI_09 | Xem danh sách notification | PASS nếu trả đúng dữ liệu Customer                   |
| TC_NOTI_10 | Mark as Read               | PASS nếu status chuyển thành READ                    |
| TC_NOTI_11 | Thiếu customerId           | PASS nếu System từ chối request không hợp lệ         |
| TC_NOTI_12 | Notification không tồn tại | PASS nếu System không cập nhật dữ liệu sai           |

---

# 5. Requirement/API Gap

## GAP 01 - Customer notification khi Driver nhận chuyến

FR18 và AC15 yêu cầu Customer phải nhận được thông báo khi Driver nhận chuyến.

Notification API hiện chưa mô tả rõ endpoint riêng hoặc cấu trúc request dùng để gửi sự kiện này cho Customer.

**Cần kiểm tra khi triển khai hệ thống.**

---

## GAP 02 - Driver notification khi chuyến đang thực hiện thay đổi

FR19 và AC17 yêu cầu Driver nhận được notification khi có thay đổi liên quan đến chuyến đang thực hiện.

API hiện mô tả việc gửi chuyến mới đến Driver nhưng chưa mô tả rõ API thông báo thay đổi chuyến cho Driver.

**Cần kiểm tra khi triển khai hệ thống.**

---

# 6. Lưu ý

Các Test Case âm trong tài liệu không tự giả định HTTP Status Code nếu API chưa quy định.

Khi triển khai và chạy API thực tế, cần bổ sung kiểm tra:

* HTTP Status Code.
* Response Body.
* Dữ liệu sau request.
* Notification có được lưu đúng hay không.
* Notification có gửi đúng Customer/Driver hay không.
* Không tạo dữ liệu sai khi input không hợp lệ.
