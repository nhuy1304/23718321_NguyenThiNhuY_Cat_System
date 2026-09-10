# TEST SCENARIO - DRIVER MANAGEMENT

## 1. Phạm vi kiểm thử

Test Scenario được xây dựng dựa trên:

* SRS CAB System
* Driver Use Case UC09 - UC13
* FR08, FR09, FR13
* AC05, AC06, AC10
* Business Rules
* Exceptions
* Driver API
* Yêu cầu coverage Test Case của giảng viên

Mỗi Test Scenario khi sinh Test Case phải xem xét đầy đủ:

* VALID - dữ liệu hợp lệ
* INVALID - dữ liệu không hợp lệ
* EMPTY - giá trị rỗng
* NULL - giá trị null
* EXCEPTION - ngoại lệ/lỗi phát sinh
* BUSINESS RULE - quy tắc nghiệp vụ
* BOUNDARY - giá trị biên nếu có miền dữ liệu phù hợp

---

# 2. Use Case và Requirement liên quan

| Use Case / FR | Nội dung                                                                | AC / Business Rule liên quan               |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------ |
| UC09          | Driver đăng ký tài khoản                                                | Luồng thay thế: dữ liệu không hợp lệ       |
| UC10          | Driver cập nhật hồ sơ và phương tiện                                    | Luồng thay thế: dữ liệu không hợp lệ       |
| UC11          | Driver cập nhật trạng thái sẵn sàng                                     | BRULE01, BRULE12                           |
| FR08 / UC12   | Driver nhận và xử lý yêu cầu chuyến                                     | AC05, BRULE01, BRULE05                     |
| FR09 / UC12   | Driver từ chối hoặc không phản hồi                                      | AC06, BRULE03, BRULE04, EX01, EX02, EX07   |
| FR13 / UC13   | Driver thực hiện và cập nhật trạng thái chuyến                          | AC10, EX05                                 |
| BRULE12       | Driver phải được xác thực trước khi sử dụng chức năng yêu cầu tài khoản | Áp dụng các chức năng Driver cần đăng nhập |
| EX06          | Mất kết nối mạng                                                        | Cần kiểm thử ngoại lệ kết nối              |

---

# 3. Test Scenario

| Scenario ID | Test Scenario                                  | Căn cứ                 | API                                                | Coverage cần sinh                                     |
| ----------- | ---------------------------------------------- | ---------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| TS_DRV_01   | Driver đăng ký tài khoản                       | UC09                   | POST /api/drivers/register                         | Valid, Invalid, Empty, Null, Exception                |
| TS_DRV_02   | Driver cập nhật hồ sơ và thông tin phương tiện | UC10, BRULE12          | PUT /api/drivers/{driverId}                        | Valid, Invalid, Empty, Null, Exception, Business Rule |
| TS_DRV_03   | Driver cập nhật trạng thái sẵn sàng            | UC11, BRULE01, BRULE12 | PUT /api/drivers/{driverId}/status                 | Valid, Invalid, Empty, Null, Exception, Business Rule |
| TS_DRV_04   | Lấy thông tin Driver                           | UC10, UC11, BRULE12    | GET /api/drivers/{driverId}                        | Valid, Invalid, Empty, Null, Exception, Business Rule |
| TS_DRV_05   | Driver chấp nhận chuyến                        | FR08, UC12             | POST /api/drivers/{driverId}/trips/{tripId}/accept | Valid, Invalid, Null, Exception, Business Rule        |
| TS_DRV_06   | Driver từ chối chuyến                          | FR09, UC12             | POST /api/drivers/{driverId}/trips/{tripId}/reject | Valid, Invalid, Null, Exception, Business Rule        |
| TS_DRV_07   | Driver cập nhật trạng thái chuyến              | FR13, UC13             | PUT /api/drivers/{driverId}/trips/{tripId}/status  | Valid, Invalid, Empty, Null, Exception, Business Rule |

---

# 4. Chi tiết coverage từng Scenario

## TS_DRV_01 - Driver đăng ký tài khoản

### Positive

Driver đăng ký với đầy đủ:

```json
{
  "name": "Tran Van B",
  "phone": "0912345678",
  "password": "123456"
}
```

Expected:

```json
{
  "driverId": "D001",
  "message": "Driver registration successful"
}
```

### Negative cần sinh

* `name` không hợp lệ.
* `phone` không hợp lệ.
* `password` không hợp lệ.
* Thông tin tài khoản đã tồn tại nếu System áp dụng unique account.

### Empty cần sinh

```json
{
  "name": "",
  "phone": "0912345678",
  "password": "123456"
}
```

```json
{
  "name": "Tran Van B",
  "phone": "",
  "password": "123456"
}
```

```json
{
  "name": "Tran Van B",
  "phone": "0912345678",
  "password": ""
}
```

### Null cần sinh

```json
{
  "name": null,
  "phone": "0912345678",
  "password": "123456"
}
```

```json
{
  "name": "Tran Van B",
  "phone": null,
  "password": "123456"
}
```

```json
{
  "name": "Tran Van B",
  "phone": "0912345678",
  "password": null
}
```

### Exception

* Mất kết nối trong quá trình đăng ký.
* Lỗi lưu tài khoản.
* Không được tạo dữ liệu dở dang hoặc tạo trùng khi retry.

---

# 5. TS_DRV_02 - Driver cập nhật Profile và Vehicle

## API

```http
PUT /api/drivers/{driverId}
```

### Input hợp lệ

```json
{
  "name": "Tran Van B",
  "phone": "0912345678",
  "vehicleType": "CAR",
  "licensePlate": "51A-12345"
}
```

### Expected Output

```json
{
  "message": "Driver information updated successfully"
}
```

### Positive

* Driver tồn tại.
* Driver đã được xác thực.
* Profile hợp lệ.
* Vehicle hợp lệ.

### Invalid

* `driverId` không tồn tại.
* `phone` không hợp lệ.
* `vehicleType` không hợp lệ.
* `licensePlate` không hợp lệ.
* Thông tin phương tiện không phù hợp.

### Empty

Kiểm thử lần lượt:

```text
name = ""
phone = ""
vehicleType = ""
licensePlate = ""
```

### Null

Kiểm thử:

```text
name = null
phone = null
vehicleType = null
licensePlate = null
driverId = null
```

### Business Rule

Driver chưa được xác thực nhưng gọi API cập nhật Profile.

Expected:

* System không cho phép sử dụng chức năng yêu cầu tài khoản.
* Dữ liệu Driver không bị thay đổi.

### Exception

* Mất mạng khi cập nhật.
* Lỗi lưu dữ liệu Profile/Vehicle.
* Không để Profile và Vehicle ở trạng thái cập nhật một phần.

---

# 6. TS_DRV_03 - Driver cập nhật trạng thái sẵn sàng

## API

```http
PUT /api/drivers/{driverId}/status
```

### Input hợp lệ

```json
{
  "status": "AVAILABLE"
}
```

### Expected Output

```json
{
  "driverId": "D001",
  "status": "AVAILABLE",
  "message": "Driver status updated successfully"
}
```

### Positive

#### Driver chuyển sang AVAILABLE

Expected:

* Status được cập nhật.
* Driver có thể được đưa vào danh sách nhận chuyến.

#### Driver chuyển sang không sẵn sàng

Theo UC11:

* System cập nhật trạng thái.
* Driver không được đưa vào danh sách tìm chuyến.

### Invalid

```json
{
  "status": "ABC"
}
```

Expected:

* Không cập nhật status thành giá trị không hợp lệ.

### Empty

```json
{
  "status": ""
}
```

### Null

```json
{
  "status": null
}
```

và:

```text
driverId = null
```

### Business Rule

#### BRULE01

Chỉ Driver đang sẵn sàng mới được nhận yêu cầu chuyến.

Test phải kiểm tra:

```text
status = AVAILABLE
→ có thể nhận chuyến
```

và:

```text
status != AVAILABLE
→ không được nhận chuyến
```

#### BRULE12

Driver chưa xác thực:

```text
PUT /api/drivers/D001/status
```

Expected:

* System từ chối cập nhật.

### Exception

* Mất kết nối trong lúc cập nhật status.
* Không được để trạng thái trên client và System sai lệch mà báo thành công giả.

---

# 7. TS_DRV_04 - Lấy thông tin Driver

## API

```http
GET /api/drivers/{driverId}
```

### Positive

Input:

```text
driverId = D001
```

Expected:

```json
{
  "driverId": "D001",
  "name": "Tran Van B",
  "phone": "0912345678",
  "status": "AVAILABLE",
  "location": "District 1"
}
```

### Invalid

```text
driverId = D999
```

Expected:

* Không trả dữ liệu Driver hợp lệ.
* Không trả nhầm Driver khác.

### Empty

```text
driverId = ""
```

### Null

```text
driverId = null
```

### Business Rule

Nếu đây là chức năng yêu cầu tài khoản thì Driver phải được xác thực theo BRULE12.

### Exception

* Mất kết nối khi tải thông tin Driver.
* System/client phải xử lý lỗi mà không hiển thị dữ liệu mới như thể request thành công.

---

# 8. TS_DRV_05 - Driver chấp nhận chuyến

## API

```http
POST /api/drivers/{driverId}/trips/{tripId}/accept
```

### Positive

Điều kiện:

```text
driverId = D001
status = AVAILABLE
tripId = T001
Trip đang chờ Driver phản hồi
```

Expected:

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "message": "Trip accepted successfully"
}
```

### Invalid

* `driverId` không tồn tại.
* `tripId` không tồn tại.
* Trip không còn ở trạng thái có thể nhận.
* Driver không phải Driver được gửi yêu cầu chuyến.

### Null

Kiểm thử:

```text
driverId = null
```

```text
tripId = null
```

### Business Rule 01

Driver không `AVAILABLE` cố Accept Trip.

Expected:

* System không cho Driver nhận chuyến.

### Business Rule 05

Trip `T001` đã được Driver `D001` chấp nhận.

Driver `D002` tiếp tục gọi:

```http
POST /api/drivers/D002/trips/T001/accept
```

Expected:

* System không gán thêm Driver `D002`.
* Trip chỉ có một Driver được xác nhận.

### Business Rule 12

Driver chưa xác thực gọi Accept.

Expected:

* System từ chối chức năng.

### Exception

* Mất kết nối ngay lúc Driver Accept.
* System không được gán hai Driver do Driver gửi lại request sau khi mất mạng.
* Cần kiểm tra trạng thái Trip thực tế trước khi retry.

---

# 9. TS_DRV_06 - Driver từ chối chuyến

## API

```http
POST /api/drivers/{driverId}/trips/{tripId}/reject
```

### Positive

Input:

```text
driverId = D001
tripId = T001
```

Expected:

```json
{
  "tripId": "T001",
  "message": "Trip rejected. System will find another driver."
}
```

### Invalid

* Driver không tồn tại.
* Trip không tồn tại.
* Driver không phải Driver đang được gửi request.
* Trip đã được hoàn thành/hủy nhưng Driver vẫn Reject.

### Null

```text
driverId = null
```

```text
tripId = null
```

### Business Rule 03

Driver từ chối chuyến.

Expected:

* Customer không phải tạo lại yêu cầu.
* System tiếp tục xử lý cùng yêu cầu hiện tại theo BRULE03.

### Exception EX01

Driver Reject.

Expected:

* System ghi nhận Driver từ chối.
* Chuyến không được gán cho Driver đó.
* Quy trình tiếp tục theo SRS.

### Exception EX02 / EX07

Trường hợp Driver không phản hồi hoặc quá thời gian phản hồi không được gọi trực tiếp bằng Reject API, nhưng testcase nghiệp vụ phải kiểm tra:

* System xem đây là trường hợp không phản hồi.
* System tiếp tục xử lý theo requirement.
* Customer không phải tạo lại yêu cầu.

### Exception EX06

Mất kết nối trong lúc Reject:

* System không được trả trạng thái mâu thuẫn.
* Cần xác minh Trip thực tế trước khi gửi lại request.

---

# 10. TS_DRV_07 - Driver cập nhật trạng thái Trip

## API

```http
PUT /api/drivers/{driverId}/trips/{tripId}/status
```

## Các status API cho phép

```text
ARRIVED
PICKED_UP
IN_PROGRESS
COMPLETED
```

---

## Valid Case 1

```json
{
  "status": "ARRIVED"
}
```

Expected:

```json
{
  "tripId": "T001",
  "status": "ARRIVED",
  "message": "Trip status updated successfully"
}
```

## Valid Case 2

```json
{
  "status": "PICKED_UP"
}
```

## Valid Case 3

```json
{
  "status": "IN_PROGRESS"
}
```

## Valid Case 4

```json
{
  "status": "COMPLETED"
}
```

### Invalid

```json
{
  "status": "RUNNING"
}
```

Expected:

* System không cập nhật status không thuộc danh sách cho phép.

### Empty

```json
{
  "status": ""
}
```

### Null

```json
{
  "status": null
}
```

Ngoài ra kiểm thử:

```text
driverId = null
tripId = null
```

### Business Rule / Precondition

UC13 yêu cầu:

```text
Driver đã nhận chuyến
```

Do đó Driver chưa nhận Trip nhưng cố cập nhật status:

Expected:

* System không cho phép cập nhật.

### Business Rule 12

Driver chưa xác thực:

Expected:

* Không được cập nhật Trip.

### Invalid State Transition

Ví dụ:

```text
Trip hiện tại = ARRIVED
request status = COMPLETED
```

Cần kiểm tra System có cho phép bỏ qua `PICKED_UP` và `IN_PROGRESS` hay không.

> SRS/API hiện chưa xác định rõ state transition rule, vì vậy testcase này dùng để phát hiện và yêu cầu xác nhận rule, không tự khẳng định hệ thống bắt buộc phải từ chối.

### Exception EX05

Chuyến bị lỗi khi đang thực hiện.

Expected theo SRS:

* Trip không bị coi là hoàn thành giả.
* Operations Staff có thể hỗ trợ xử lý chuyến lỗi.

### Exception EX06

Mất kết nối khi Driver cập nhật status:

* Không báo thành công nếu chưa xác nhận System đã lưu.
* Sau khi kết nối lại phải kiểm tra trạng thái thực tế.
* Không tạo trạng thái chuyến không nhất quán.

---

# 11. Coverage Matrix

| Scenario                     | Valid | Invalid | Empty      | Null | Exception | Business Rule                  | Boundary              |
| ---------------------------- | ----- | ------- | ---------- | ---- | --------- | ------------------------------ | --------------------- |
| TS_DRV_01 Register           | Có    | Có      | Có         | Có   | Có        | Có điều kiện tài khoản         | Chưa có rule biên     |
| TS_DRV_02 Update Profile     | Có    | Có      | Có         | Có   | Có        | Có - BRULE12                   | Chưa có rule biên     |
| TS_DRV_03 Availability       | Có    | Có      | Có         | Có   | Có        | Có - BRULE01, BRULE12          | Enum validation       |
| TS_DRV_04 Get Driver         | Có    | Có      | Path param | Có   | Có        | Có - BRULE12                   | Không áp dụng         |
| TS_DRV_05 Accept Trip        | Có    | Có      | Path param | Có   | Có        | Có - BRULE01, BRULE05, BRULE12 | Không áp dụng         |
| TS_DRV_06 Reject Trip        | Có    | Có      | Path param | Có   | Có        | Có - BRULE03, BRULE04          | Không áp dụng         |
| TS_DRV_07 Update Trip Status | Có    | Có      | Có         | Có   | Có        | Có - UC13, BRULE12             | Enum/state validation |

---

# 12. Requirement/API Gaps cần ghi nhận

## GAP-DRV-01 - Không có Driver Login API

SRS yêu cầu:

* UC11 có tiền điều kiện Driver đã đăng nhập.
* BRULE12 yêu cầu Driver phải được xác thực trước khi sử dụng các chức năng yêu cầu tài khoản.

Tuy nhiên Driver API hiện chưa mô tả endpoint:

```text
POST /api/drivers/login
```

Do đó chưa thể hiện rõ cách Driver xác thực.

**Không tự tạo API mới.**

Khi test thực tế cần xác nhận cơ chế Authentication của Driver.

---

## GAP-DRV-02 - API chưa mô tả Authentication

Các API như:

```text
PUT /api/drivers/{driverId}
PUT /api/drivers/{driverId}/status
POST /api/drivers/{driverId}/trips/{tripId}/accept
POST /api/drivers/{driverId}/trips/{tripId}/reject
PUT /api/drivers/{driverId}/trips/{tripId}/status
```

chưa mô tả:

* Authorization Header
* Token
* Session
* Response khi chưa xác thực

Trong khi BRULE12 yêu cầu xác thực.

---

## GAP-DRV-03 - Validation dữ liệu Driver chưa rõ

API chưa xác định:

* Format phone.
* Độ dài password.
* Format license plate.
* Các giá trị vehicleType hợp lệ.
* Phone/licensePlate có unique hay không.
* Các trạng thái availability hợp lệ ngoài ví dụ AVAILABLE.

Do đó testcase Invalid/Boundary phải giữ lại để xác minh khi triển khai.

---

## GAP-DRV-04 - Quy tắc chuyển trạng thái Trip chưa đầy đủ

API cho phép:

```text
ARRIVED
PICKED_UP
IN_PROGRESS
COMPLETED
```

nhưng chưa nói rõ các transition như:

```text
ARRIVED → PICKED_UP → IN_PROGRESS → COMPLETED
```

có bắt buộc theo đúng thứ tự hay không.

Cần có testcase để kiểm tra và xác nhận requirement.

---

# 13. Quy tắc khi sinh Driver Test Case

Mỗi dòng Test Case sau này phải theo đúng mẫu Excel:

```text
Test Case ID
Test Scenario
Test Case
Preconditions
Test Steps
Test Data
Expected Result
Priority
```

Ví dụ một Scenario Accept Trip sẽ không chỉ có một Test Case mà phải tách thành:

```text
VALID        Driver AVAILABLE nhận Trip hợp lệ
INVALID      Trip không tồn tại
INVALID      Driver không tồn tại
NULL         driverId null
NULL         tripId null
BUSINESS     Driver UNAVAILABLE cố nhận Trip
BUSINESS     Trip đã có Driver khác
BUSINESS     Driver chưa xác thực
EXCEPTION    Mất mạng khi Accept
```

Như vậy mới đáp ứng yêu cầu coverage của giảng viên.
