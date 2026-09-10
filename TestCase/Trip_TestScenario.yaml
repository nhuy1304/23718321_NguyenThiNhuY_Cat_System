# TEST SCENARIO - TRIP MANAGEMENT

## 1. Phạm vi kiểm thử

Test Scenario được xây dựng dựa trên Functional Requirement, Acceptance Criteria và Trip API.

Phạm vi gồm:

* Tạo yêu cầu đặt chuyến
* Nhập điểm đón và điểm đến
* Chọn loại xe
* Theo dõi thông tin chuyến đi
* Theo dõi Driver đã nhận chuyến
* Theo dõi trạng thái chuyến
* Cập nhật trạng thái chuyến

> Không kiểm thử chức năng tìm và lựa chọn Driver trong tài liệu này.

---

# 2. Requirement liên quan

| FR   | Nội dung                                                                | AC liên quan |
| ---- | ----------------------------------------------------------------------- | ------------ |
| FR01 | Customer nhập điểm đón và điểm đến                                      | AC01         |
| FR02 | Customer lựa chọn loại xe trước khi đặt chuyến                          | AC01         |
| FR03 | Customer gửi yêu cầu đặt chuyến đến System                              | AC02, AC03   |
| FR11 | Customer biết Driver nào đã nhận chuyến và thời gian dự kiến Driver đến | AC08         |
| FR12 | Customer theo dõi trạng thái hiện tại của chuyến                        | AC09         |
| FR13 | Driver cập nhật trạng thái chuyến                                       | AC10         |

---

# 3. Acceptance Criteria

| AC   | Tiêu chí chấp nhận                                                                 |
| ---- | ---------------------------------------------------------------------------------- |
| AC01 | Customer có thể nhập điểm đón, điểm đến và chọn loại xe                            |
| AC02 | Customer có thể gửi yêu cầu đặt chuyến và System tiếp nhận                         |
| AC03 | Sau khi tiếp nhận yêu cầu, System thông báo trạng thái tiếp nhận cho Customer      |
| AC08 | Customer có thể xem Driver đã nhận chuyến và thời gian dự kiến Driver đến          |
| AC09 | Customer có thể xem trạng thái hiện tại của chuyến                                 |
| AC10 | Driver có thể cập nhật các trạng thái ARRIVED, PICKED_UP, IN_PROGRESS và COMPLETED |

---

# 4. Test Scenarios

| Scenario ID | Test Scenario                                                            | FR               | AC               | API                              | Expected Result                                                                      |
| ----------- | ------------------------------------------------------------------------ | ---------------- | ---------------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| TS_TRIP_01  | Customer tạo chuyến với đầy đủ thông tin hợp lệ                          | FR01, FR02, FR03 | AC01, AC02, AC03 | POST /api/trips                  | System tiếp nhận yêu cầu, tạo Trip và trả tripId cùng trạng thái PENDING             |
| TS_TRIP_02  | Customer tạo chuyến nhưng thiếu pickupLocation                           | FR01             | AC01             | POST /api/trips                  | System không được tạo chuyến hợp lệ vì thiếu điểm đón                                |
| TS_TRIP_03  | Customer tạo chuyến nhưng thiếu destination                              | FR01             | AC01             | POST /api/trips                  | System không được tạo chuyến hợp lệ vì thiếu điểm đến                                |
| TS_TRIP_04  | Customer tạo chuyến nhưng thiếu vehicleType                              | FR02             | AC01             | POST /api/trips                  | System không được tạo chuyến hợp lệ vì chưa chọn loại xe                             |
| TS_TRIP_05  | Customer lấy thông tin một chuyến tồn tại                                | FR12             | AC09             | GET /api/trips/{tripId}          | System trả đúng thông tin chuyến và trạng thái hiện tại                              |
| TS_TRIP_06  | Customer theo dõi Driver của chuyến đang thực hiện                       | FR11             | AC08             | GET /api/trips/{tripId}/tracking | System phải trả Driver đã nhận chuyến, vị trí Driver và thời gian dự kiến Driver đến |
| TS_TRIP_07  | Kiểm tra dữ liệu tracking khi API không trả thời gian dự kiến Driver đến | FR11             | AC08             | GET /api/trips/{tripId}/tracking | Test không đạt AC08 nếu response không có thông tin thời gian dự kiến Driver đến     |
| TS_TRIP_08  | Driver cập nhật trạng thái chuyến thành ARRIVED                          | FR13             | AC10             | PUT /api/trips/{tripId}/status   | Trạng thái chuyến được cập nhật thành ARRIVED                                        |
| TS_TRIP_09  | Driver cập nhật trạng thái chuyến thành PICKED_UP                        | FR13             | AC10             | PUT /api/trips/{tripId}/status   | Trạng thái chuyến được cập nhật thành PICKED_UP                                      |
| TS_TRIP_10  | Driver cập nhật trạng thái chuyến thành IN_PROGRESS                      | FR13             | AC10             | PUT /api/trips/{tripId}/status   | Trạng thái chuyến được cập nhật thành IN_PROGRESS                                    |
| TS_TRIP_11  | Driver cập nhật trạng thái chuyến thành COMPLETED                        | FR13             | AC10             | PUT /api/trips/{tripId}/status   | Trạng thái chuyến được cập nhật thành COMPLETED                                      |
| TS_TRIP_12  | Cập nhật chuyến bằng một status không nằm trong danh sách cho phép       | FR13             | AC10             | PUT /api/trips/{tripId}/status   | System phải từ chối status không hợp lệ và không cập nhật sai trạng thái chuyến      |

---

# 5. API và dữ liệu dùng cho các Scenario

## 5.1 Create Trip

**API**

```http
POST /api/trips
```

### Input hợp lệ

```json
{
  "customerId": "C001",
  "pickupLocation": "District 1",
  "destination": "Tan Son Nhat Airport",
  "vehicleType": "CAR"
}
```

### Expected Output

```json
{
  "tripId": "T001",
  "status": "PENDING",
  "message": "Trip booking created successfully"
}
```

---

## 5.2 Get Trip Information

**API**

```http
GET /api/trips/{tripId}
```

Ví dụ:

```http
GET /api/trips/T001
```

### Expected Output

```json
{
  "tripId": "T001",
  "customerId": "C001",
  "driverId": "D001",
  "pickupLocation": "District 1",
  "destination": "Tan Son Nhat Airport",
  "vehicleType": "CAR",
  "status": "IN_PROGRESS",
  "fare": 120000
}
```

---

## 5.3 Track Trip

**API**

```http
GET /api/trips/{tripId}/tracking
```

### Response hiện được mô tả trong Trip API

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "driverLocation": "District 3",
  "status": "IN_PROGRESS"
}
```

### Kiểm tra với AC08

AC08 yêu cầu Customer có thể xem:

* Driver đã nhận chuyến
* Thời gian dự kiến Driver đến

Response hiện tại có:

* `driverId` → Có
* `driverLocation` → Có
* `status` → Có
* Thời gian dự kiến Driver đến → Chưa có

Vì vậy:

**Nếu response thực tế đúng như API hiện tại thì TS_TRIP_07 không đáp ứng đầy đủ AC08.**

Đây là một Requirement/API Gap cần được ghi nhận.

---

## 5.4 Update Trip Status

**API**

```http
PUT /api/trips/{tripId}/status
```

### Các trạng thái API cho phép

```text
PENDING
ACCEPTED
ARRIVED
PICKED_UP
IN_PROGRESS
COMPLETED
CANCELLED
```

### Input ARRIVED

```json
{
  "status": "ARRIVED"
}
```

### Input PICKED_UP

```json
{
  "status": "PICKED_UP"
}
```

### Input IN_PROGRESS

```json
{
  "status": "IN_PROGRESS"
}
```

### Input COMPLETED

```json
{
  "status": "COMPLETED"
}
```

### Expected Output mẫu

```json
{
  "tripId": "T001",
  "status": "IN_PROGRESS",
  "message": "Trip status updated successfully"
}
```

---

## 5.5 Invalid Status

Ví dụ input không hợp lệ:

```json
{
  "status": "RUNNING"
}
```

Expected Result:

* System không cập nhật trạng thái thành `RUNNING`.
* Trạng thái cũ của Trip không bị thay đổi.
* System trả kết quả cho biết yêu cầu cập nhật không hợp lệ.

> Trip API hiện chưa định nghĩa HTTP Status Code và cấu trúc error response cho trường hợp status không hợp lệ nên không tự giả định 400/404.
