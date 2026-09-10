# TEST SCENARIO - OPERATIONS MANAGEMENT

## 1. Phạm vi kiểm thử

Test Scenario được xây dựng dựa trên Functional Requirement, Acceptance Criteria và Operations API.

Phạm vi gồm:

* Quản lý và xem thông tin Customer
* Quản lý và xem thông tin Driver
* Quản lý phương tiện
* Quản lý và theo dõi chuyến đi
* Xem chi tiết chuyến đi
* Tra cứu lịch sử giao dịch
* Xem báo cáo hoạt động
* Cập nhật trạng thái Driver
* Cập nhật trạng thái Trip
* Kiểm tra quyền truy cập đối với chức năng quản trị
* Phát hiện khoảng thiếu giữa Requirement và API

---

# 2. Requirement liên quan

| FR   | Nội dung                                                                                  | AC liên quan     |
| ---- | ----------------------------------------------------------------------------------------- | ---------------- |
| FR21 | Operations Staff quản lý thông tin Customer                                               | AC18, AC21       |
| FR22 | Operations Staff quản lý tài khoản, hồ sơ và trạng thái Driver                            | AC18, AC21       |
| FR23 | Operations Staff quản lý thông tin phương tiện                                            | AC18, AC21       |
| FR24 | Operations Staff quản lý và theo dõi các chuyến đi                                        | AC18, AC19, AC21 |
| FR25 | Operations Staff tra cứu lịch sử giao dịch                                                | AC19             |
| FR26 | Xem báo cáo về số lượng chuyến, doanh thu, tỷ lệ hoàn thành, tỷ lệ hủy và hiệu quả Driver | AC20             |

> Lưu ý: FR26 xuất hiện ngoài bảng Functional Requirement chính nhưng được sử dụng trong Requirement Traceability Matrix và có API tương ứng trong Operations API.

---

# 3. Acceptance Criteria

| AC   | Tiêu chí chấp nhận                                                                                    |
| ---- | ----------------------------------------------------------------------------------------------------- |
| AC18 | Operations Staff có thể quản lý Customer, Driver, phương tiện và chuyến đi                            |
| AC19 | Operations Staff có thể xem chuyến đang diễn ra, trạng thái Driver và tra cứu lịch sử giao dịch       |
| AC20 | System cung cấp báo cáo về số lượng chuyến, doanh thu, tỷ lệ hoàn thành, tỷ lệ hủy và hiệu quả Driver |
| AC21 | Các thao tác quản trị nhạy cảm chỉ được thực hiện bởi người có quyền                                  |

---

# 4. Test Scenarios

| Scenario ID | Test Scenario                                                | FR         | AC         | API liên quan                                 | Expected Result                                                                      |
| ----------- | ------------------------------------------------------------ | ---------- | ---------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| TS_OP_01    | Operations Staff xem danh sách Customer                      | FR21       | AC18       | GET /api/operations/customers                 | System trả danh sách Customer cùng thông tin quản lý                                 |
| TS_OP_02    | Operations Staff xem danh sách Driver và trạng thái hiện tại | FR22       | AC18, AC19 | GET /api/operations/drivers                   | System trả danh sách Driver, bao gồm trạng thái và vị trí                            |
| TS_OP_03    | Operations Staff xem danh sách phương tiện                   | FR23       | AC18       | GET /api/operations/vehicles                  | System trả danh sách phương tiện và Driver tương ứng                                 |
| TS_OP_04    | Operations Staff xem danh sách chuyến đi                     | FR24       | AC18, AC19 | GET /api/operations/trips                     | System trả danh sách Trip và trạng thái hiện tại của từng chuyến                     |
| TS_OP_05    | Operations Staff xem chi tiết một Trip tồn tại               | FR24       | AC18, AC19 | GET /api/operations/trips/{tripId}            | System trả đúng thông tin chi tiết của Trip                                          |
| TS_OP_06    | Operations Staff tra cứu lịch sử giao dịch                   | FR25       | AC19       | GET /api/operations/transactions              | System trả danh sách Transaction và trạng thái giao dịch                             |
| TS_OP_07    | Operations Staff xem báo cáo hoạt động                       | FR26       | AC20       | GET /api/operations/reports                   | System trả dữ liệu báo cáo hoạt động                                                 |
| TS_OP_08    | Operations Staff có quyền cập nhật trạng thái Driver         | FR22       | AC18, AC21 | PUT /api/operations/drivers/{driverId}/status | Trạng thái Driver được cập nhật thành công                                           |
| TS_OP_09    | Operations Staff có quyền cập nhật trạng thái Trip           | FR24       | AC18, AC21 | PUT /api/operations/trips/{tripId}/status     | Trạng thái Trip được cập nhật thành công                                             |
| TS_OP_10    | Cập nhật Driver bằng status không hợp lệ                     | FR22       | AC18       | PUT /api/operations/drivers/{driverId}/status | System từ chối status không hợp lệ và không cập nhật sai Driver                      |
| TS_OP_11    | Xem chi tiết một Trip không tồn tại                          | FR24       | AC18, AC19 | GET /api/operations/trips/{tripId}            | System không trả nhầm dữ liệu Trip khác và phải từ chối yêu cầu không hợp lệ         |
| TS_OP_12    | Người không có quyền cố cập nhật trạng thái Driver           | FR22       | AC21       | PUT /api/operations/drivers/{driverId}/status | System từ chối thao tác và Driver không bị thay đổi                                  |
| TS_OP_13    | Người không có quyền cố cập nhật trạng thái Trip             | FR24       | AC21       | PUT /api/operations/trips/{tripId}/status     | System từ chối thao tác và Trip không bị thay đổi                                    |
| TS_OP_14    | Kiểm tra khả năng quản lý Customer và phương tiện theo AC18  | FR21, FR23 | AC18       | Operations API                                | Kiểm tra API có đủ thao tác quản lý Customer và Vehicle hay chỉ hỗ trợ xem danh sách |
| TS_OP_15    | Kiểm tra báo cáo có đầy đủ dữ liệu theo AC20                 | FR26       | AC20       | GET /api/operations/reports                   | Báo cáo phải có số chuyến, doanh thu, tỷ lệ hoàn thành, tỷ lệ hủy và hiệu quả Driver |

---

# 5. API và dữ liệu dùng cho Test Scenario

## 5.1 Get Customer List

**API**

```http
GET /api/operations/customers
```

### Expected Output mẫu

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

Kiểm tra:

* Có danh sách `customers`.
* Mỗi Customer có `customerId`.
* Có tên.
* Có số điện thoại.
* Có email.

---

# 5.2 Get Driver List

**API**

```http
GET /api/operations/drivers
```

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

Kiểm tra:

* Có danh sách Driver.
* Có `driverId`.
* Có thông tin Driver.
* Có trạng thái hiện tại.
* Có vị trí hiện tại.

---

# 5.3 Get Vehicle List

**API**

```http
GET /api/operations/vehicles
```

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

Kiểm tra:

* Có `vehicleId`.
* Có loại xe.
* Có biển số.
* Có Driver quản lý phương tiện.

---

# 5.4 Get Trip List

**API**

```http
GET /api/operations/trips
```

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

Kiểm tra:

* Có danh sách Trip.
* Có Customer.
* Có Driver.
* Có điểm đón.
* Có điểm đến.
* Có trạng thái chuyến.
* Có fare.

---

# 5.5 Get Trip Details

**API**

```http
GET /api/operations/trips/{tripId}
```

Ví dụ:

```http
GET /api/operations/trips/T001
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
  "status": "COMPLETED",
  "fare": 120000
}
```

---

# 5.6 Get Transaction List

**API**

```http
GET /api/operations/transactions
```

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

Kiểm tra:

* Có danh sách Transaction.
* Có `transactionId`.
* Có loại giao dịch.
* Có trạng thái.
* Có thời gian giao dịch.

---

# 5.7 Get Activity Reports

**API**

```http
GET /api/operations/reports
```

### Response được mô tả trong API hiện tại

```json
{
  "reportDate": "2026-09-03",
  "totalTrips": 120,
  "completedTrips": 110,
  "cancelledTrips": 10,
  "totalRevenue": 15000000
}
```

### Theo AC20, báo cáo cần cung cấp

* Số lượng chuyến.
* Doanh thu.
* Tỷ lệ hoàn thành.
* Tỷ lệ hủy.
* Hiệu quả hoạt động của Driver.

### API hiện tại có

* `totalTrips` → Có.
* `completedTrips` → Có.
* `cancelledTrips` → Có.
* `totalRevenue` → Có.
* Tỷ lệ hoàn thành → Chưa có trường cụ thể.
* Tỷ lệ hủy → Chưa có trường cụ thể.
* Hiệu quả Driver → Chưa có.

Do đó TS_OP_15 dùng để kiểm tra khoảng thiếu giữa AC20 và API.

Nếu API thực tế chỉ trả đúng cấu trúc trên:

**Kết quả: FAIL - API chưa đáp ứng đầy đủ AC20.**

---

# 5.8 Update Driver Status

**API**

```http
PUT /api/operations/drivers/{driverId}/status
```

Ví dụ:

```http
PUT /api/operations/drivers/D001/status
```

### Input

```json
{
  "status": "UNAVAILABLE"
}
```

### Expected Output

```json
{
  "driverId": "D001",
  "status": "UNAVAILABLE",
  "message": "Driver status updated successfully"
}
```

---

# 5.9 Update Trip Status

**API**

```http
PUT /api/operations/trips/{tripId}/status
```

Ví dụ:

```http
PUT /api/operations/trips/T001/status
```

### Input

```json
{
  "status": "CANCELLED"
}
```

### Expected Output

```json
{
  "tripId": "T001",
  "status": "CANCELLED",
  "message": "Trip status updated successfully"
}
```

---

# 6. Requirement/API Gap

## GAP 01 - AC18 yêu cầu "quản lý" Customer và Vehicle

AC18 yêu cầu Operations Staff có thể quản lý:

* Customer
* Driver
* Vehicle
* Trip

Operations API hiện cung cấp:

### Customer

```http
GET /api/operations/customers
```

Hiện chỉ mô tả thao tác lấy danh sách Customer.

Chưa mô tả rõ các API Operations dùng để:

* Cập nhật Customer.
* Khóa/vô hiệu hóa Customer.
* Xóa hoặc thực hiện các thao tác quản lý khác.

### Vehicle

```http
GET /api/operations/vehicles
```

Hiện chỉ mô tả thao tác lấy danh sách Vehicle.

Chưa mô tả rõ API Operations dùng để cập nhật hoặc quản lý thông tin Vehicle.

Vì vậy TS_OP_14 được sử dụng để kiểm tra AC18.

Nếu phạm vi từ "quản lý" yêu cầu thao tác thay đổi dữ liệu nhưng System chỉ hỗ trợ xem:

**Kết quả: GAP - API chưa thể hiện đầy đủ FR21, FR23 và AC18.**

---

## GAP 02 - Báo cáo chưa đầy đủ AC20

AC20 yêu cầu:

1. Số lượng chuyến.
2. Doanh thu.
3. Tỷ lệ hoàn thành.
4. Tỷ lệ hủy.
5. Hiệu quả Driver.

Response `/api/operations/reports` hiện có:

```text
reportDate
totalTrips
completedTrips
cancelledTrips
totalRevenue
```

Chưa mô tả:

```text
completionRate
cancellationRate
driverPerformance
```

Do đó:

**TS_OP_15 có khả năng FAIL nếu API thực tế không cung cấp các thông tin này bằng trường trực tiếp hoặc cơ chế tương đương.**

---

## GAP 03 - Kiểm soát quyền quản trị

AC21 và Business Rule về quyền truy cập yêu cầu:

> Các thao tác quản trị nhạy cảm chỉ được thực hiện bởi người có quyền.

Các API cập nhật như:

```http
PUT /api/operations/drivers/{driverId}/status
PUT /api/operations/trips/{tripId}/status
```

là thao tác quản trị có thể thay đổi dữ liệu.

Tuy nhiên tài liệu Operations API hiện chưa mô tả rõ:

* Token xác thực.
* Authorization Header.
* Role của người dùng.
* Response khi người dùng không có quyền.

Vì vậy TS_OP_12 và TS_OP_13 phải được giữ lại để kiểm thử AC21.

Nếu API cho phép người không có quyền thực hiện thay đổi:

**Kết quả: FAIL - không đáp ứng AC21.**

---

# 7. Test Scenario âm

Đối với các trường hợp như:

* Trip không tồn tại.
* Driver không tồn tại.
* Status không hợp lệ.
* Người dùng không có quyền.
* Thiếu dữ liệu.

Operations API chưa quy định cụ thể HTTP Status Code và cấu trúc error response.

Vì vậy Test Scenario không tự giả định:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
```

Khi chạy API thực tế, cần ghi nhận HTTP Status Code thực tế và so sánh với đặc tả sau khi API được hoàn thiện.

Expected Result hiện kiểm tra ở mức nghiệp vụ:

* Không thay đổi dữ liệu sai.
* Không trả nhầm dữ liệu.
* Không cho người không có quyền thực hiện thao tác.
* Không chấp nhận giá trị không hợp lệ.
