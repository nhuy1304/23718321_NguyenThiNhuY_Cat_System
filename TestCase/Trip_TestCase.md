# TEST CASE - TRIP MANAGEMENT

## 1. Mục đích

Tài liệu xây dựng các Test Case chi tiết từ các Test Scenario của chức năng quản lý chuyến đi.

Test Case được xây dựng dựa trên:

* FR01 - Nhập thông tin chuyến
* FR02 - Chọn loại xe
* FR03 - Gửi yêu cầu đặt chuyến
* FR11 - Theo dõi Driver
* FR12 - Theo dõi trạng thái chuyến
* FR13 - Cập nhật trạng thái chuyến
* AC01 - AC03
* AC08 - AC10
* Trip API

> Không kiểm thử chức năng tìm và lựa chọn Driver trong tài liệu này.

---

# 2. Test Data

| Tham số        | Giá trị mẫu          | Mô tả                      |
| -------------- | -------------------- | -------------------------- |
| customerId     | C001                 | Customer hợp lệ            |
| tripId         | T001                 | Trip tồn tại               |
| invalidTripId  | T999                 | Trip không tồn tại         |
| pickupLocation | District 1           | Điểm đón                   |
| destination    | Tan Son Nhat Airport | Điểm đến                   |
| vehicleType    | CAR                  | Loại xe                    |
| driverId       | D001                 | Driver đã nhận chuyến      |
| driverLocation | District 3           | Vị trí hiện tại của Driver |

---

# 3. Test Cases

## TC_TRIP_01 - Tạo chuyến với đầy đủ thông tin hợp lệ

| Thuộc tính              | Nội dung                                                                 |
| ----------------------- | ------------------------------------------------------------------------ |
| **Test Case ID**        | TC_TRIP_01                                                               |
| **Scenario ID**         | TS_TRIP_01                                                               |
| **Requirement**         | FR01, FR02, FR03                                                         |
| **Acceptance Criteria** | AC01, AC02, AC03                                                         |
| **Mục đích**            | Kiểm tra Customer có thể nhập đầy đủ thông tin và gửi yêu cầu đặt chuyến |
| **Tiền điều kiện**      | Customer C001 tồn tại và có thể thực hiện đặt chuyến                     |
| **API**                 | POST /api/trips                                                          |

### Input

```json
{
  "customerId": "C001",
  "pickupLocation": "District 1",
  "destination": "Tan Son Nhat Airport",
  "vehicleType": "CAR"
}
```

### Các bước thực hiện

1. Customer nhập điểm đón `District 1`.
2. Customer nhập điểm đến `Tan Son Nhat Airport`.
3. Customer chọn loại xe `CAR`.
4. Gửi request `POST /api/trips`.
5. Nhận response từ System.

### Expected Output

```json
{
  "tripId": "T001",
  "status": "PENDING",
  "message": "Trip booking created successfully"
}
```

### Điều kiện đạt

* System tiếp nhận yêu cầu.
* Trip mới được tạo.
* Response có `tripId`.
* Trạng thái ban đầu là `PENDING`.
* Customer nhận được kết quả tiếp nhận yêu cầu.

---

## TC_TRIP_02 - Tạo chuyến thiếu pickupLocation

| Thuộc tính              | Nội dung                                                      |
| ----------------------- | ------------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_02                                                    |
| **Scenario ID**         | TS_TRIP_02                                                    |
| **Requirement**         | FR01                                                          |
| **Acceptance Criteria** | AC01                                                          |
| **Mục đích**            | Kiểm tra việc đặt chuyến khi Customer không cung cấp điểm đón |
| **Tiền điều kiện**      | Customer C001 tồn tại                                         |
| **API**                 | POST /api/trips                                               |

### Input

```json
{
  "customerId": "C001",
  "destination": "Tan Son Nhat Airport",
  "vehicleType": "CAR"
}
```

### Các bước thực hiện

1. Không cung cấp `pickupLocation`.
2. Nhập điểm đến.
3. Chọn loại xe.
4. Gửi request `POST /api/trips`.
5. Kiểm tra response.

### Expected Output

* System không tạo một Trip hợp lệ.
* Không sinh `tripId` thành công cho request này.
* System thông báo dữ liệu chuyến chưa đầy đủ hoặc không hợp lệ.

> Trip API hiện chưa định nghĩa cụ thể HTTP Status Code và error response cho trường hợp thiếu `pickupLocation`.

---

## TC_TRIP_03 - Tạo chuyến thiếu destination

| Thuộc tính              | Nội dung                                                      |
| ----------------------- | ------------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_03                                                    |
| **Scenario ID**         | TS_TRIP_03                                                    |
| **Requirement**         | FR01                                                          |
| **Acceptance Criteria** | AC01                                                          |
| **Mục đích**            | Kiểm tra việc đặt chuyến khi Customer không cung cấp điểm đến |
| **Tiền điều kiện**      | Customer C001 tồn tại                                         |
| **API**                 | POST /api/trips                                               |

### Input

```json
{
  "customerId": "C001",
  "pickupLocation": "District 1",
  "vehicleType": "CAR"
}
```

### Các bước thực hiện

1. Nhập điểm đón.
2. Không cung cấp `destination`.
3. Chọn loại xe.
4. Gửi request.
5. Kiểm tra response.

### Expected Output

* System không tạo một Trip hợp lệ.
* Không sinh `tripId` thành công.
* System thông báo dữ liệu chuyến chưa đầy đủ hoặc không hợp lệ.

> Trip API chưa định nghĩa cụ thể HTTP Status Code và error response cho trường hợp này.

---

## TC_TRIP_04 - Tạo chuyến thiếu vehicleType

| Thuộc tính              | Nội dung                                                |
| ----------------------- | ------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_04                                              |
| **Scenario ID**         | TS_TRIP_04                                              |
| **Requirement**         | FR02                                                    |
| **Acceptance Criteria** | AC01                                                    |
| **Mục đích**            | Kiểm tra việc đặt chuyến khi Customer chưa chọn loại xe |
| **Tiền điều kiện**      | Customer C001 tồn tại                                   |
| **API**                 | POST /api/trips                                         |

### Input

```json
{
  "customerId": "C001",
  "pickupLocation": "District 1",
  "destination": "Tan Son Nhat Airport"
}
```

### Các bước thực hiện

1. Nhập điểm đón.
2. Nhập điểm đến.
3. Không cung cấp `vehicleType`.
4. Gửi request.
5. Kiểm tra response.

### Expected Output

* System không tạo một Trip hợp lệ.
* Không sinh `tripId` thành công.
* System yêu cầu dữ liệu loại xe hợp lệ.

> Trip API hiện chưa định nghĩa error response cụ thể cho trường hợp thiếu `vehicleType`.

---

## TC_TRIP_05 - Lấy thông tin chuyến tồn tại

| Thuộc tính              | Nội dung                                                                 |
| ----------------------- | ------------------------------------------------------------------------ |
| **Test Case ID**        | TC_TRIP_05                                                               |
| **Scenario ID**         | TS_TRIP_05                                                               |
| **Requirement**         | FR12                                                                     |
| **Acceptance Criteria** | AC09                                                                     |
| **Mục đích**            | Kiểm tra Customer có thể xem thông tin và trạng thái hiện tại của chuyến |
| **Tiền điều kiện**      | Trip T001 tồn tại                                                        |
| **API**                 | GET /api/trips/{tripId}                                                  |

### Input

```text
tripId = T001
```

### Các bước thực hiện

1. Gửi request:

```http
GET /api/trips/T001
```

2. System tìm Trip có ID `T001`.
3. Nhận thông tin Trip.
4. Kiểm tra trạng thái hiện tại.

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

### Điều kiện đạt

* Trả đúng `tripId = T001`.
* Trả đúng Customer của chuyến.
* Có điểm đón và điểm đến.
* Có loại xe.
* Có trạng thái hiện tại của chuyến.
* Không trả dữ liệu của Trip khác.

---

## TC_TRIP_06 - Theo dõi Driver của chuyến

| Thuộc tính              | Nội dung                                                |
| ----------------------- | ------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_06                                              |
| **Scenario ID**         | TS_TRIP_06                                              |
| **Requirement**         | FR11                                                    |
| **Acceptance Criteria** | AC08                                                    |
| **Mục đích**            | Kiểm tra Customer có thể theo dõi Driver đã nhận chuyến |
| **Tiền điều kiện**      | Trip T001 tồn tại và đã có Driver D001                  |
| **API**                 | GET /api/trips/{tripId}/tracking                        |

### Input

```text
tripId = T001
```

### Các bước thực hiện

1. Gửi request:

```http
GET /api/trips/T001/tracking
```

2. System xác định Trip `T001`.
3. System lấy thông tin Driver của chuyến.
4. Nhận dữ liệu tracking.
5. Kiểm tra dữ liệu trả về.

### Expected Output theo API hiện tại

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "driverLocation": "District 3",
  "status": "IN_PROGRESS"
}
```

### Điều kiện kiểm tra

* Có đúng `tripId`.
* Có `driverId`.
* Có vị trí hiện tại của Driver.
* Có trạng thái hiện tại của chuyến.
* Theo AC08 còn phải có thời gian dự kiến Driver đến.

---

## TC_TRIP_07 - Kiểm tra thời gian dự kiến Driver đến

| Thuộc tính              | Nội dung                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_07                                                             |
| **Scenario ID**         | TS_TRIP_07                                                             |
| **Requirement**         | FR11                                                                   |
| **Acceptance Criteria** | AC08                                                                   |
| **Mục đích**            | Kiểm tra API tracking có cung cấp đầy đủ thông tin theo AC08 hay không |
| **Tiền điều kiện**      | Trip T001 tồn tại; Driver D001 đã nhận chuyến                          |
| **API**                 | GET /api/trips/{tripId}/tracking                                       |

### Input

```text
tripId = T001
```

### Các bước thực hiện

1. Gửi:

```http
GET /api/trips/T001/tracking
```

2. Nhận response.
3. Kiểm tra `driverId`.
4. Kiểm tra vị trí Driver.
5. Kiểm tra có dữ liệu về thời gian dự kiến Driver đến hay không.
6. Đối chiếu kết quả với AC08.

### Response API hiện tại

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "driverLocation": "District 3",
  "status": "IN_PROGRESS"
}
```

### Expected Output theo Requirement

Response phải cho Customer biết:

* Driver nào đã nhận chuyến.
* Thời gian dự kiến Driver đến.

### Actual theo tài liệu API

* Có `driverId`.
* Có `driverLocation`.
* Không có trường thể hiện thời gian dự kiến Driver đến.

### Kết quả

**FAIL - API hiện tại chưa đáp ứng đầy đủ AC08.**

### Ghi nhận

Requirement yêu cầu thông tin thời gian dự kiến Driver đến nhưng Trip API hiện chưa mô tả trường dữ liệu này.

Đây là **Requirement/API Gap** cần được ghi nhận.

---

## TC_TRIP_08 - Cập nhật trạng thái ARRIVED

| Thuộc tính              | Nội dung                                                   |
| ----------------------- | ---------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_08                                                 |
| **Scenario ID**         | TS_TRIP_08                                                 |
| **Requirement**         | FR13                                                       |
| **Acceptance Criteria** | AC10                                                       |
| **Mục đích**            | Kiểm tra Driver có thể cập nhật trạng thái đã đến điểm đón |
| **Tiền điều kiện**      | Trip T001 tồn tại và đang được thực hiện                   |
| **API**                 | PUT /api/trips/{tripId}/status                             |

### Input

Path Parameter:

```text
tripId = T001
```

Request Body:

```json
{
  "status": "ARRIVED"
}
```

### Các bước thực hiện

1. Driver chọn Trip `T001`.
2. Gửi:

```http
PUT /api/trips/T001/status
```

3. Truyền `status = ARRIVED`.
4. System cập nhật trạng thái.
5. Kiểm tra response.

### Expected Output

```json
{
  "tripId": "T001",
  "status": "ARRIVED",
  "message": "Trip status updated successfully"
}
```

### Điều kiện đạt

* Đúng Trip `T001` được cập nhật.
* Status mới là `ARRIVED`.
* System xác nhận cập nhật thành công.

---

## TC_TRIP_09 - Cập nhật trạng thái PICKED_UP

| Thuộc tính              | Nội dung                                                   |
| ----------------------- | ---------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_09                                                 |
| **Scenario ID**         | TS_TRIP_09                                                 |
| **Requirement**         | FR13                                                       |
| **Acceptance Criteria** | AC10                                                       |
| **Mục đích**            | Kiểm tra Driver có thể cập nhật trạng thái đã đón Customer |
| **Tiền điều kiện**      | Trip T001 tồn tại và Driver đã đến điểm đón                |
| **API**                 | PUT /api/trips/{tripId}/status                             |

### Input

```json
{
  "status": "PICKED_UP"
}
```

### Các bước thực hiện

1. Chọn Trip `T001`.
2. Gửi:

```http
PUT /api/trips/T001/status
```

3. Truyền `status = PICKED_UP`.
4. Kiểm tra response.

### Expected Output

```json
{
  "tripId": "T001",
  "status": "PICKED_UP",
  "message": "Trip status updated successfully"
}
```

### Điều kiện đạt

* Trip được cập nhật thành `PICKED_UP`.
* System ghi nhận Customer đã được đón.
* Không thay đổi `tripId`.

---

## TC_TRIP_10 - Cập nhật trạng thái IN_PROGRESS

| Thuộc tính              | Nội dung                                                         |
| ----------------------- | ---------------------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_10                                                       |
| **Scenario ID**         | TS_TRIP_10                                                       |
| **Requirement**         | FR13                                                             |
| **Acceptance Criteria** | AC10                                                             |
| **Mục đích**            | Kiểm tra Driver có thể cập nhật trạng thái chuyến đang di chuyển |
| **Tiền điều kiện**      | Trip T001 tồn tại và Customer đã được đón                        |
| **API**                 | PUT /api/trips/{tripId}/status                                   |

### Input

```json
{
  "status": "IN_PROGRESS"
}
```

### Các bước thực hiện

1. Chọn Trip `T001`.
2. Gửi:

```http
PUT /api/trips/T001/status
```

3. Truyền `status = IN_PROGRESS`.
4. Kiểm tra trạng thái sau cập nhật.

### Expected Output

```json
{
  "tripId": "T001",
  "status": "IN_PROGRESS",
  "message": "Trip status updated successfully"
}
```

### Điều kiện đạt

* Trip chuyển sang `IN_PROGRESS`.
* Customer có thể biết chuyến đang diễn ra.
* Response trả đúng Trip.

---

## TC_TRIP_11 - Cập nhật trạng thái COMPLETED

| Thuộc tính              | Nội dung                                             |
| ----------------------- | ---------------------------------------------------- |
| **Test Case ID**        | TC_TRIP_11                                           |
| **Scenario ID**         | TS_TRIP_11                                           |
| **Requirement**         | FR13                                                 |
| **Acceptance Criteria** | AC10                                                 |
| **Mục đích**            | Kiểm tra Driver có thể đánh dấu chuyến đã hoàn thành |
| **Tiền điều kiện**      | Trip T001 đang ở trạng thái IN_PROGRESS              |
| **API**                 | PUT /api/trips/{tripId}/status                       |

### Input

```json
{
  "status": "COMPLETED"
}
```

### Các bước thực hiện

1. Driver hoàn thành chuyến.
2. Gửi:

```http
PUT /api/trips/T001/status
```

3. Truyền `status = COMPLETED`.
4. System cập nhật Trip.
5. Kiểm tra response.

### Expected Output

```json
{
  "tripId": "T001",
  "status": "COMPLETED",
  "message": "Trip status updated successfully"
}
```

### Điều kiện đạt

* Trạng thái Trip trở thành `COMPLETED`.
* Trip không còn được xem là đang thực hiện.
* Response trả đúng trạng thái mới.

---

## TC_TRIP_12 - Cập nhật status không hợp lệ

| Thuộc tính              | Nội dung                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **Test Case ID**        | TC_TRIP_12                                                                           |
| **Scenario ID**         | TS_TRIP_12                                                                           |
| **Requirement**         | FR13                                                                                 |
| **Acceptance Criteria** | AC10                                                                                 |
| **Mục đích**            | Kiểm tra System không chấp nhận một trạng thái không thuộc danh sách trạng thái Trip |
| **Tiền điều kiện**      | Trip T001 tồn tại                                                                    |
| **API**                 | PUT /api/trips/{tripId}/status                                                       |

### Input

```json
{
  "status": "RUNNING"
}
```

### Các bước thực hiện

1. Chọn Trip `T001`.
2. Gửi:

```http
PUT /api/trips/T001/status
```

3. Truyền `status = RUNNING`.
4. System kiểm tra giá trị status.
5. Kiểm tra trạng thái Trip sau request.

### Expected Output

* System từ chối `RUNNING`.
* Trip không được cập nhật thành `RUNNING`.
* Trạng thái hợp lệ trước đó của Trip không bị thay đổi.
* System trả thông tin cho biết request cập nhật không hợp lệ.

### Giải thích

Theo Trip API, các status được mô tả gồm:

```text
PENDING
ACCEPTED
ARRIVED
PICKED_UP
IN_PROGRESS
COMPLETED
CANCELLED
```

`RUNNING` không thuộc danh sách này.

> Trip API hiện chưa mô tả HTTP Status Code hoặc cấu trúc error response cụ thể cho trường hợp status không hợp lệ nên Test Case không tự giả định mã lỗi.
