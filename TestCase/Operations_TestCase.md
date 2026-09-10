# TEST CASE - OPERATIONS MANAGEMENT

## 1. Mục đích

Tài liệu xây dựng các Test Case chi tiết từ Test Scenario của chức năng Operations.

Căn cứ:

* FR21 - Quản lý Customer
* FR22 - Quản lý Driver
* FR23 - Quản lý phương tiện
* FR24 - Quản lý chuyến đi
* FR25 - Tra cứu giao dịch
* FR26 - Xem báo cáo hoạt động
* AC18 - AC21
* Operations API

---

# 2. Test Data

| Tham số             | Giá trị mẫu      | Mô tả                            |
| ------------------- | ---------------- | -------------------------------- |
| customerId          | C001             | Customer tồn tại                 |
| driverId            | D001             | Driver tồn tại                   |
| vehicleId           | V001             | Vehicle tồn tại                  |
| tripId              | T001             | Trip tồn tại                     |
| invalidTripId       | T999             | Trip không tồn tại               |
| validDriverStatus   | UNAVAILABLE      | Trạng thái Driver hợp lệ         |
| invalidDriverStatus | BUSY_NOW         | Trạng thái kiểm thử không hợp lệ |
| validTripStatus     | CANCELLED        | Trạng thái Trip hợp lệ           |
| authorizedRole      | OPERATIONS_STAFF | Người có quyền quản trị          |
| unauthorizedRole    | CUSTOMER         | Người không có quyền quản trị    |

---

# 3. Test Cases

## TC_OP_01 - Xem danh sách Customer

| Thuộc tính              | Nội dung                                                |
| ----------------------- | ------------------------------------------------------- |
| **Test Case ID**        | TC_OP_01                                                |
| **Scenario ID**         | TS_OP_01                                                |
| **Requirement**         | FR21                                                    |
| **Acceptance Criteria** | AC18                                                    |
| **Mục đích**            | Kiểm tra Operations Staff có thể xem danh sách Customer |
| **Tiền điều kiện**      | Có dữ liệu Customer trong System                        |
| **API**                 | GET /api/operations/customers                           |

### Input

Không có Request Body.

```http
GET /api/operations/customers
```

### Các bước thực hiện

1. Operations Staff truy cập chức năng quản lý Customer.
2. Gửi request `GET /api/operations/customers`.
3. System lấy danh sách Customer.
4. Kiểm tra dữ liệu response.

### Expected Output

```json
{
  "customers": [
    {
      "customerId": "C001",
      "name": "Nguyen Van A",
      "phone": "0901234567",
      "email": "nguyenvana@email.com"
    }
  ]
}
```

### Điều kiện đạt

* Có danh sách `customers`.
* Có đúng thông tin Customer.
* Mỗi Customer có `customerId`, `name`, `phone`, `email`.
* Không trả dữ liệu sai cấu trúc.

---

## TC_OP_02 - Xem danh sách Driver và trạng thái

| Thuộc tính              | Nội dung                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| **Test Case ID**        | TC_OP_02                                                           |
| **Scenario ID**         | TS_OP_02                                                           |
| **Requirement**         | FR22                                                               |
| **Acceptance Criteria** | AC18, AC19                                                         |
| **Mục đích**            | Kiểm tra Operations Staff có thể xem Driver và trạng thái hiện tại |
| **Tiền điều kiện**      | Có Driver trong System                                             |
| **API**                 | GET /api/operations/drivers                                        |

### Input

```http
GET /api/operations/drivers
```

### Các bước thực hiện

1. Gửi request.
2. System lấy danh sách Driver.
3. Kiểm tra thông tin từng Driver.
4. Kiểm tra trạng thái và vị trí.

### Expected Output

```json
{
  "drivers": [
    {
      "driverId": "D001",
      "name": "Tran Van B",
      "phone": "0912345678",
      "status": "AVAILABLE",
      "location": "District 1"
    }
  ]
}
```

### Điều kiện đạt

* Trả danh sách Driver.
* Có `driverId`.
* Có trạng thái Driver.
* Có vị trí Driver.
* Operations Staff có thể xác định Driver đang ở trạng thái nào.

---

## TC_OP_03 - Xem danh sách Vehicle

| Thuộc tính              | Nội dung                                                   |
| ----------------------- | ---------------------------------------------------------- |
| **Test Case ID**        | TC_OP_03                                                   |
| **Scenario ID**         | TS_OP_03                                                   |
| **Requirement**         | FR23                                                       |
| **Acceptance Criteria** | AC18                                                       |
| **Mục đích**            | Kiểm tra Operations Staff có thể xem thông tin phương tiện |
| **Tiền điều kiện**      | Có Vehicle trong System                                    |
| **API**                 | GET /api/operations/vehicles                               |

### Input

```http
GET /api/operations/vehicles
```

### Các bước thực hiện

1. Operations Staff mở chức năng Vehicle.
2. Gửi request.
3. System lấy danh sách Vehicle.
4. Kiểm tra response.

### Expected Output

```json
{
  "vehicles": [
    {
      "vehicleId": "V001",
      "vehicleType": "CAR",
      "licensePlate": "51A-12345",
      "driverId": "D001"
    }
  ]
}
```

### Điều kiện đạt

* Có danh sách `vehicles`.
* Có `vehicleId`.
* Có `vehicleType`.
* Có `licensePlate`.
* Có Driver tương ứng.

---

## TC_OP_04 - Xem danh sách Trip

| Thuộc tính              | Nội dung                                                 |
| ----------------------- | -------------------------------------------------------- |
| **Test Case ID**        | TC_OP_04                                                 |
| **Scenario ID**         | TS_OP_04                                                 |
| **Requirement**         | FR24                                                     |
| **Acceptance Criteria** | AC18, AC19                                               |
| **Mục đích**            | Kiểm tra Operations Staff có thể theo dõi danh sách Trip |
| **Tiền điều kiện**      | Có Trip trong System                                     |
| **API**                 | GET /api/operations/trips                                |

### Input

```http
GET /api/operations/trips
```

### Các bước thực hiện

1. Gửi request.
2. System lấy danh sách Trip.
3. Kiểm tra thông tin và status của từng Trip.

### Expected Output

```json
{
  "trips": [
    {
      "tripId": "T001",
      "customerId": "C001",
      "driverId": "D001",
      "pickupLocation": "District 1",
      "destination": "Tan Son Nhat Airport",
      "status": "COMPLETED",
      "fare": 120000
    }
  ]
}
```

### Điều kiện đạt

* Có danh sách Trip.
* Có Customer và Driver tương ứng.
* Có điểm đón và điểm đến.
* Có trạng thái Trip.
* Có fare.

---

## TC_OP_05 - Xem chi tiết Trip tồn tại

| Thuộc tính              | Nội dung                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| **Test Case ID**        | TC_OP_05                                                           |
| **Scenario ID**         | TS_OP_05                                                           |
| **Requirement**         | FR24                                                               |
| **Acceptance Criteria** | AC18, AC19                                                         |
| **Mục đích**            | Kiểm tra Operations Staff lấy đúng thông tin chi tiết của một Trip |
| **Tiền điều kiện**      | Trip T001 tồn tại                                                  |
| **API**                 | GET /api/operations/trips/{tripId}                                 |

### Input

```text
tripId = T001
```

### Các bước thực hiện

1. Gửi:

```http
GET /api/operations/trips/T001
```

2. System tìm Trip `T001`.
3. Kiểm tra response.

### Expected Output

```json
{
  "tripId": "T001",
  "customerId": "C001",
  "driverId": "D001",
  "pickupLocation": "District 1",
  "destination": "Tan Son Nhat Airport",
  "vehicleType": "CAR",
  "status": "COMPLETED",
  "fare": 120000
}
```

### Điều kiện đạt

* Trả đúng `T001`.
* Không trả nhầm Trip.
* Có đầy đủ thông tin chi tiết được API mô tả.

---

## TC_OP_06 - Tra cứu lịch sử giao dịch

| Thuộc tính              | Nội dung                                                     |
| ----------------------- | ------------------------------------------------------------ |
| **Test Case ID**        | TC_OP_06                                                     |
| **Scenario ID**         | TS_OP_06                                                     |
| **Requirement**         | FR25                                                         |
| **Acceptance Criteria** | AC19                                                         |
| **Mục đích**            | Kiểm tra Operations Staff có thể tra cứu lịch sử Transaction |
| **Tiền điều kiện**      | System có dữ liệu giao dịch                                  |
| **API**                 | GET /api/operations/transactions                             |

### Input

```http
GET /api/operations/transactions
```

### Các bước thực hiện

1. Operations Staff mở chức năng tra cứu giao dịch.
2. Gửi request.
3. System lấy danh sách Transaction.
4. Kiểm tra dữ liệu.

### Expected Output

```json
{
  "transactions": [
    {
      "transactionId": "TX001",
      "transactionType": "PAYMENT",
      "status": "COMPLETED",
      "transactionTime": "2026-09-03T10:30:00"
    }
  ]
}
```

### Điều kiện đạt

* Có danh sách Transaction.
* Có `transactionId`.
* Có `transactionType`.
* Có `status`.
* Có `transactionTime`.

---

## TC_OP_07 - Xem báo cáo hoạt động

| Thuộc tính              | Nội dung                                                        |
| ----------------------- | --------------------------------------------------------------- |
| **Test Case ID**        | TC_OP_07                                                        |
| **Scenario ID**         | TS_OP_07                                                        |
| **Requirement**         | FR26                                                            |
| **Acceptance Criteria** | AC20                                                            |
| **Mục đích**            | Kiểm tra System cung cấp báo cáo hoạt động cho Operations Staff |
| **Tiền điều kiện**      | Có dữ liệu hoạt động trong System                               |
| **API**                 | GET /api/operations/reports                                     |

### Input

```http
GET /api/operations/reports
```

### Các bước thực hiện

1. Operations Staff yêu cầu xem báo cáo.
2. Gửi request.
3. System tổng hợp dữ liệu.
4. Kiểm tra response.

### Expected Output theo API

```json
{
  "reportDate": "2026-09-03",
  "totalTrips": 120,
  "completedTrips": 110,
  "cancelledTrips": 10,
  "totalRevenue": 15000000
}
```

### Điều kiện đạt ở mức API

* Có ngày báo cáo.
* Có tổng số chuyến.
* Có số chuyến hoàn thành.
* Có số chuyến hủy.
* Có tổng doanh thu.

> Việc kiểm tra đầy đủ AC20 được thực hiện ở TC_OP_15.

---

## TC_OP_08 - Cập nhật trạng thái Driver hợp lệ

| Thuộc tính              | Nội dung                                                             |
| ----------------------- | -------------------------------------------------------------------- |
| **Test Case ID**        | TC_OP_08                                                             |
| **Scenario ID**         | TS_OP_08                                                             |
| **Requirement**         | FR22                                                                 |
| **Acceptance Criteria** | AC18, AC21                                                           |
| **Mục đích**            | Kiểm tra Operations Staff có quyền có thể thay đổi trạng thái Driver |
| **Tiền điều kiện**      | Driver D001 tồn tại; người thực hiện có quyền                        |
| **API**                 | PUT /api/operations/drivers/{driverId}/status                        |

### Input

Path Parameter:

```text
driverId = D001
```

Request Body:

```json
{
  "status": "UNAVAILABLE"
}
```

### Các bước thực hiện

1. Đăng nhập/giả lập người dùng có quyền Operations Staff.
2. Chọn Driver `D001`.
3. Gửi:

```http
PUT /api/operations/drivers/D001/status
```

4. Truyền `status = UNAVAILABLE`.
5. Kiểm tra response.

### Expected Output

```json
{
  "driverId": "D001",
  "status": "UNAVAILABLE",
  "message": "Driver status updated successfully"
}
```

### Điều kiện đạt

* Đúng Driver được cập nhật.
* Status trở thành `UNAVAILABLE`.
* Không thay đổi Driver khác.
* System xác nhận cập nhật thành công.

---

## TC_OP_09 - Cập nhật trạng thái Trip hợp lệ

| Thuộc tính              | Nội dung                                                |
| ----------------------- | ------------------------------------------------------- |
| **Test Case ID**        | TC_OP_09                                                |
| **Scenario ID**         | TS_OP_09                                                |
| **Requirement**         | FR24                                                    |
| **Acceptance Criteria** | AC18, AC21                                              |
| **Mục đích**            | Kiểm tra Operations Staff có quyền có thể cập nhật Trip |
| **Tiền điều kiện**      | Trip T001 tồn tại; người thực hiện có quyền             |
| **API**                 | PUT /api/operations/trips/{tripId}/status               |

### Input

```json
{
  "status": "CANCELLED"
}
```

### Các bước thực hiện

1. Chọn Trip `T001`.
2. Gửi:

```http
PUT /api/operations/trips/T001/status
```

3. Truyền `status = CANCELLED`.
4. Kiểm tra response.

### Expected Output

```json
{
  "tripId": "T001",
  "status": "CANCELLED",
  "message": "Trip status updated successfully"
}
```

### Điều kiện đạt

* Đúng Trip được cập nhật.
* Status là `CANCELLED`.
* Không cập nhật nhầm Trip khác.

---

## TC_OP_10 - Cập nhật Driver bằng status không hợp lệ

| Thuộc tính              | Nội dung                                                       |
| ----------------------- | -------------------------------------------------------------- |
| **Test Case ID**        | TC_OP_10                                                       |
| **Scenario ID**         | TS_OP_10                                                       |
| **Requirement**         | FR22                                                           |
| **Acceptance Criteria** | AC18                                                           |
| **Mục đích**            | Kiểm tra System không chấp nhận trạng thái Driver không hợp lệ |
| **Tiền điều kiện**      | Driver D001 tồn tại                                            |
| **API**                 | PUT /api/operations/drivers/{driverId}/status                  |

### Input

```json
{
  "status": "BUSY_NOW"
}
```

### Các bước thực hiện

1. Ghi nhận status hiện tại của Driver D001.
2. Gửi:

```http
PUT /api/operations/drivers/D001/status
```

3. Truyền `BUSY_NOW`.
4. Kiểm tra response.
5. Kiểm tra lại Driver D001.

### Expected Output

* System không cập nhật Driver thành `BUSY_NOW`.
* Status hợp lệ trước đó không bị thay đổi.
* System từ chối request hoặc thông báo dữ liệu không hợp lệ.
* Driver khác không bị ảnh hưởng.

> Operations API chưa quy định danh sách đầy đủ status hoặc error response cụ thể nên không tự giả định HTTP Status Code.

---

## TC_OP_11 - Xem Trip không tồn tại

| Thuộc tính              | Nội dung                                            |
| ----------------------- | --------------------------------------------------- |
| **Test Case ID**        | TC_OP_11                                            |
| **Scenario ID**         | TS_OP_11                                            |
| **Requirement**         | FR24                                                |
| **Acceptance Criteria** | AC18, AC19                                          |
| **Mục đích**            | Kiểm tra System xử lý đúng khi tripId không tồn tại |
| **Tiền điều kiện**      | Trip T999 không tồn tại                             |
| **API**                 | GET /api/operations/trips/{tripId}                  |

### Input

```text
tripId = T999
```

### Các bước thực hiện

1. Gửi:

```http
GET /api/operations/trips/T999
```

2. System tìm Trip.
3. Không tìm thấy `T999`.
4. Kiểm tra response.

### Expected Output

* Không trả dữ liệu Trip hợp lệ cho `T999`.
* Không trả nhầm Trip khác.
* System thông báo hoặc từ chối do Trip không tồn tại.

> API chưa mô tả cụ thể HTTP Status Code/error response.

---

## TC_OP_12 - Người không có quyền cập nhật Driver

| Thuộc tính              | Nội dung                                                                |
| ----------------------- | ----------------------------------------------------------------------- |
| **Test Case ID**        | TC_OP_12                                                                |
| **Scenario ID**         | TS_OP_12                                                                |
| **Requirement**         | FR22                                                                    |
| **Acceptance Criteria** | AC21                                                                    |
| **Mục đích**            | Kiểm tra thao tác quản trị Driver chỉ được thực hiện bởi người có quyền |
| **Tiền điều kiện**      | Driver D001 tồn tại; người thực hiện không có quyền Operations Staff    |
| **API**                 | PUT /api/operations/drivers/{driverId}/status                           |

### Input

```text
Role = CUSTOMER
driverId = D001
```

```json
{
  "status": "UNAVAILABLE"
}
```

### Các bước thực hiện

1. Ghi nhận status ban đầu của Driver D001.
2. Sử dụng người dùng không có quyền quản trị.
3. Gửi:

```http
PUT /api/operations/drivers/D001/status
```

4. Kiểm tra response.
5. Kiểm tra lại Driver.

### Expected Output theo AC21

* System từ chối thao tác.
* Driver `D001` không bị thay đổi.
* Người không có quyền không thể cập nhật status.
* Không ảnh hưởng Driver khác.

### Ghi chú

Operations API hiện chưa mô tả:

* Authentication.
* Authorization Header.
* Token.
* Role.
* Error response khi thiếu quyền.

Do đó Test Case này kiểm tra ở mức Requirement.

Nếu API cho phép người không có quyền thay đổi Driver:

**Kết quả: FAIL - không đáp ứng AC21.**

---

## TC_OP_13 - Người không có quyền cập nhật Trip

| Thuộc tính              | Nội dung                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| **Test Case ID**        | TC_OP_13                                                              |
| **Scenario ID**         | TS_OP_13                                                              |
| **Requirement**         | FR24                                                                  |
| **Acceptance Criteria** | AC21                                                                  |
| **Mục đích**            | Kiểm tra thao tác quản trị Trip chỉ được thực hiện bởi người có quyền |
| **Tiền điều kiện**      | Trip T001 tồn tại; người thực hiện không có quyền quản trị            |
| **API**                 | PUT /api/operations/trips/{tripId}/status                             |

### Input

```text
Role = CUSTOMER
tripId = T001
```

```json
{
  "status": "CANCELLED"
}
```

### Các bước thực hiện

1. Ghi nhận status hiện tại của `T001`.
2. Sử dụng người dùng không có quyền.
3. Gửi request cập nhật Trip.
4. Kiểm tra response.
5. Kiểm tra lại status Trip.

### Expected Output

* System từ chối thao tác.
* Trip `T001` không chuyển thành `CANCELLED`.
* Dữ liệu Trip không bị thay đổi trái phép.

Nếu người không có quyền vẫn cập nhật được:

**Kết quả: FAIL - không đáp ứng AC21.**

---

## TC_OP_14 - Kiểm tra đầy đủ chức năng quản lý Customer và Vehicle

| Thuộc tính              | Nội dung                                                     |
| ----------------------- | ------------------------------------------------------------ |
| **Test Case ID**        | TC_OP_14                                                     |
| **Scenario ID**         | TS_OP_14                                                     |
| **Requirement**         | FR21, FR23                                                   |
| **Acceptance Criteria** | AC18                                                         |
| **Mục đích**            | Đối chiếu yêu cầu "quản lý" Customer/Vehicle với API hiện có |
| **Tiền điều kiện**      | Operations Staff có quyền truy cập                           |
| **API**                 | Operations API                                               |

### Các bước thực hiện

1. Đối chiếu FR21 và AC18.
2. Kiểm tra API dành cho Customer.
3. Đối chiếu FR23 và AC18.
4. Kiểm tra API dành cho Vehicle.
5. Xác định API có hỗ trợ thay đổi dữ liệu hay chỉ đọc danh sách.

### API hiện tại

Customer:

```http
GET /api/operations/customers
```

Vehicle:

```http
GET /api/operations/vehicles
```

### Expected Output theo Requirement

Operations Staff phải có khả năng **quản lý** Customer và Vehicle trong phạm vi nghiệp vụ đã được xác nhận.

### Actual theo API hiện tại

API hiện mô tả:

* Xem danh sách Customer.
* Xem danh sách Vehicle.

Chưa mô tả rõ API để:

* Cập nhật Customer.
* Cập nhật Vehicle.
* Thực hiện các thao tác quản trị khác với Customer/Vehicle.

### Kết quả

**GAP - API hiện tại chưa thể hiện đầy đủ phạm vi “quản lý” của FR21, FR23 và AC18.**

> Đây là Requirement/API Gap, không tự tạo thêm endpoint vì tài liệu chưa quy định.

---

## TC_OP_15 - Kiểm tra báo cáo đáp ứng đầy đủ AC20

| Thuộc tính              | Nội dung                                              |
| ----------------------- | ----------------------------------------------------- |
| **Test Case ID**        | TC_OP_15                                              |
| **Scenario ID**         | TS_OP_15                                              |
| **Requirement**         | FR26                                                  |
| **Acceptance Criteria** | AC20                                                  |
| **Mục đích**            | Kiểm tra báo cáo có đủ toàn bộ thông tin AC20 yêu cầu |
| **Tiền điều kiện**      | System có dữ liệu hoạt động                           |
| **API**                 | GET /api/operations/reports                           |

### Input

```http
GET /api/operations/reports
```

### Các bước thực hiện

1. Gửi request lấy báo cáo.
2. Nhận response.
3. Kiểm tra tổng số chuyến.
4. Kiểm tra doanh thu.
5. Kiểm tra tỷ lệ hoàn thành.
6. Kiểm tra tỷ lệ hủy.
7. Kiểm tra hiệu quả hoạt động của Driver.
8. Đối chiếu với AC20.

### Response API hiện tại

```json
{
  "reportDate": "2026-09-03",
  "totalTrips": 120,
  "completedTrips": 110,
  "cancelledTrips": 10,
  "totalRevenue": 15000000
}
```

### Expected Output theo AC20

Report phải cung cấp được:

| Thông tin        | Yêu cầu |
| ---------------- | ------- |
| Số lượng chuyến  | Có      |
| Doanh thu        | Có      |
| Tỷ lệ hoàn thành | Có      |
| Tỷ lệ hủy        | Có      |
| Hiệu quả Driver  | Có      |

### Đối chiếu API hiện tại

| Thông tin            | API hiện tại             |
| -------------------- | ------------------------ |
| Số lượng chuyến      | Có - `totalTrips`        |
| Doanh thu            | Có - `totalRevenue`      |
| Số chuyến hoàn thành | Có - `completedTrips`    |
| Số chuyến hủy        | Có - `cancelledTrips`    |
| Tỷ lệ hoàn thành     | Chưa mô tả trường cụ thể |
| Tỷ lệ hủy            | Chưa mô tả trường cụ thể |
| Hiệu quả Driver      | Chưa có                  |

### Kết quả

Nếu response thực tế chỉ có các trường được mô tả trong API:

**FAIL / GAP - chưa đáp ứng đầy đủ AC20.**

### Ghi chú

Có thể tính:

```text
Completion Rate = completedTrips / totalTrips × 100
Cancellation Rate = cancelledTrips / totalTrips × 100
```

Tuy nhiên AC20 yêu cầu System **cung cấp báo cáo**, nên cần xác nhận việc client tự tính từ dữ liệu thô có được chấp nhận hay System phải trả trực tiếp các chỉ số này.

Riêng **Driver Performance** hiện không có dữ liệu tương ứng trong response mẫu.

---

# 4. Tổng hợp Test Case

| Test Case | Nội dung chính                     | Loại                |
| --------- | ---------------------------------- | ------------------- |
| TC_OP_01  | Danh sách Customer                 | Positive            |
| TC_OP_02  | Danh sách Driver                   | Positive            |
| TC_OP_03  | Danh sách Vehicle                  | Positive            |
| TC_OP_04  | Danh sách Trip                     | Positive            |
| TC_OP_05  | Chi tiết Trip                      | Positive            |
| TC_OP_06  | Lịch sử Transaction                | Positive            |
| TC_OP_07  | Báo cáo hoạt động                  | Positive            |
| TC_OP_08  | Cập nhật Driver status             | Positive            |
| TC_OP_09  | Cập nhật Trip status               | Positive            |
| TC_OP_10  | Driver status không hợp lệ         | Negative            |
| TC_OP_11  | Trip không tồn tại                 | Negative            |
| TC_OP_12  | Không có quyền cập nhật Driver     | Authorization       |
| TC_OP_13  | Không có quyền cập nhật Trip       | Authorization       |
| TC_OP_14  | Thiếu API quản lý Customer/Vehicle | Requirement/API Gap |
| TC_OP_15  | Report thiếu dữ liệu AC20          | Requirement/API Gap |

---

# 5. Lưu ý khi chạy Test Case thực tế

Hiện Operations API chủ yếu mô tả response thành công.

Một số trường hợp chưa có đặc tả rõ về:

* HTTP Status Code lỗi.
* Error response.
* Authentication.
* Authorization.
* Token.
* Role.
* Driver status hợp lệ.
* Xử lý resource không tồn tại.

Vì vậy không tự giả định các mã:

```text
400
401
403
404
```

Khi chạy API thực tế cần ghi thêm:

| Trường                | Nội dung                |
| --------------------- | ----------------------- |
| Actual HTTP Status    | Mã thực tế API trả về   |
| Actual Response       | Response thực tế        |
| Actual Database State | Dữ liệu sau khi gọi API |
| Result                | PASS / FAIL             |
| Note                  | Lỗi hoặc Gap phát hiện  |

---

# 6. Requirement/API Gaps

## GAP-OP-01

FR21, FR23 và AC18 dùng khái niệm **quản lý Customer và Vehicle**, nhưng Operations API hiện mới mô tả API đọc danh sách.

Cần xác nhận phạm vi "quản lý".

## GAP-OP-02

AC20 yêu cầu:

* Tỷ lệ hoàn thành.
* Tỷ lệ hủy.
* Hiệu quả Driver.

Response báo cáo hiện chưa thể hiện đầy đủ các thông tin trên.

## GAP-OP-03

AC21 yêu cầu kiểm soát quyền đối với các chức năng quản trị nhạy cảm nhưng Operations API chưa mô tả cơ chế authorization.

Các Test Case TC_OP_12 và TC_OP_13 phải được giữ lại khi triển khai test thực tế.
