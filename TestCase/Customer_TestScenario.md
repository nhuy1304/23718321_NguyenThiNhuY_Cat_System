# TEST SCENARIO - CUSTOMER MANAGEMENT

## 1. Phạm vi kiểm thử

Các Test Scenario được xây dựng dựa trên:

* SRS của CAB System
* Customer Use Case
* Customer API
* Business Process BP01 - Quản lý khách hàng

Các chức năng gồm:

| Use Case | Chức năng                  |
| -------- | -------------------------- |
| UC01     | Đăng ký tài khoản          |
| UC02     | Đăng nhập                  |
| UC03     | Cập nhật thông tin cá nhân |
| UC06     | Xem lịch sử chuyến         |
| UC08     | Đánh giá Driver            |

> Lưu ý: SRS có mô tả các chức năng Customer trong Scope, Business Process và Use Case nhưng bảng Functional Requirement FR01-FR26 chưa gán FR riêng cho đăng ký, đăng nhập và cập nhật hồ sơ. Đây là một Traceability Gap cần ghi nhận.

---

# 2. Test Scenario

| Scenario ID | Test Scenario                       | Căn cứ     | API                                      | Positive cần kiểm thử                               | Negative cần kiểm thử                                                                                |
| ----------- | ----------------------------------- | ---------- | ---------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| TS_CUS_01   | Customer đăng ký tài khoản          | UC01, BP01 | POST /api/customers/register             | Đăng ký với name, phone, password hợp lệ            | Thiếu name; thiếu phone; thiếu password; phone không hợp lệ; tài khoản đã tồn tại                    |
| TS_CUS_02   | Customer đăng nhập                  | UC02, BP01 | POST /api/customers/login                | Đăng nhập với phone và password chính xác           | Sai phone; sai password; thiếu phone; thiếu password; cả hai để trống                                |
| TS_CUS_03   | Customer xem thông tin cá nhân      | UC03       | GET /api/customers/{customerId}          | customerId tồn tại                                  | customerId không tồn tại; customerId rỗng/không hợp lệ                                               |
| TS_CUS_04   | Customer cập nhật thông tin cá nhân | UC03, BP01 | PUT /api/customers/{customerId}          | Cập nhật name, phone, email hợp lệ                  | Email sai định dạng; phone không hợp lệ; Customer không tồn tại; dữ liệu thiếu/không hợp lệ          |
| TS_CUS_05   | Customer xem lịch sử chuyến         | UC06       | GET /api/customers/{customerId}/trips    | Customer có lịch sử chuyến; Customer chưa có chuyến | Customer không tồn tại                                                                               |
| TS_CUS_06   | Customer đánh giá Driver sau chuyến | UC08       | POST /api/customers/{customerId}/ratings | Đánh giá chuyến đã hoàn thành với rating hợp lệ     | Chuyến chưa hoàn thành; rating ngoài phạm vi; thiếu rating; Trip không tồn tại; Driver không tồn tại |

---

# 3. Dự kiến số Test Case sinh từ từng Scenario

| Scenario                     | Positive | Negative |     Tổng dự kiến |
| ---------------------------- | -------: | -------: | ---------------: |
| TS_CUS_01 - Đăng ký          |        1 |        5 |                6 |
| TS_CUS_02 - Đăng nhập        |        1 |        5 |                6 |
| TS_CUS_03 - Xem Profile      |        1 |        2 |                3 |
| TS_CUS_04 - Cập nhật Profile |        1 |        4 |                5 |
| TS_CUS_05 - Xem lịch sử Trip |        2 |        1 |                3 |
| TS_CUS_06 - Đánh giá Driver  |        1 |        5 |                6 |
| **Tổng**                     |    **7** |   **22** | **29 Test Case** |

---

# 4. API Input/Output chính

## TS_CUS_01 - Register Customer

### API

```http
POST /api/customers/register
```

### Input hợp lệ

```json
{
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "password": "123456"
}
```

### Expected Output thành công

```json
{
  "customerId": "C001",
  "message": "Registration successful"
}
```

### Một số input sai cần sinh Test Case

Thiếu name:

```json
{
  "phone": "0901234567",
  "password": "123456"
}
```

Thiếu phone:

```json
{
  "name": "Nguyen Van A",
  "password": "123456"
}
```

Thiếu password:

```json
{
  "name": "Nguyen Van A",
  "phone": "0901234567"
}
```

---

## TS_CUS_02 - Customer Login

### API

```http
POST /api/customers/login
```

### Input đúng

```json
{
  "phone": "0901234567",
  "password": "123456"
}
```

### Expected Output

```json
{
  "customerId": "C001",
  "message": "Login successful"
}
```

### Input sai password

```json
{
  "phone": "0901234567",
  "password": "wrongPassword"
}
```

### Input sai phone

```json
{
  "phone": "0999999999",
  "password": "123456"
}
```

### Thiếu phone

```json
{
  "password": "123456"
}
```

### Thiếu password

```json
{
  "phone": "0901234567"
}
```

---

## TS_CUS_03 - Get Customer Profile

### API

```http
GET /api/customers/{customerId}
```

Input đúng:

```text
customerId = C001
```

Expected Output:

```json
{
  "customerId": "C001",
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "email": "nguyenvana@example.com"
}
```

Input sai:

```text
customerId = C999
```

Expected Result:

* Không trả thông tin của Customer hợp lệ.
* Không trả nhầm Customer khác.
* System thông báo hoặc từ chối vì Customer không tồn tại.

---

## TS_CUS_04 - Update Customer Profile

### API

```http
PUT /api/customers/{customerId}
```

### Input đúng

```json
{
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "email": "nguyenvana@example.com"
}
```

### Expected Output

```json
{
  "message": "Customer information updated successfully"
}
```

### Input email sai

```json
{
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "email": "abc-invalid-email"
}
```

Expected Result:

* Không lưu email không hợp lệ.
* Dữ liệu hợp lệ trước đó không bị thay đổi sai.
* System từ chối hoặc thông báo dữ liệu không hợp lệ.

---

## TS_CUS_05 - Get Customer Trip History

### API

```http
GET /api/customers/{customerId}/trips
```

Input:

```text
customerId = C001
```

Expected Output mẫu:

```json
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
```

Một trường hợp Positive khác:

Customer tồn tại nhưng chưa có chuyến.

Expected:

```json
{
  "customerId": "C002",
  "trips": []
}
```

---

## TS_CUS_06 - Rate Driver

### API

```http
POST /api/customers/{customerId}/ratings
```

### Input hợp lệ

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "rating": 5,
  "comment": "Good service"
}
```

### Expected Output

```json
{
  "message": "Driver rating submitted successfully"
}
```

### Trường hợp sai cần kiểm thử

Rating vượt phạm vi:

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "rating": 6,
  "comment": "Good service"
}
```

Rating nhỏ hơn phạm vi:

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "rating": 0,
  "comment": "Bad service"
}
```

Thiếu rating:

```json
{
  "tripId": "T001",
  "driverId": "D001",
  "comment": "Good service"
}
```

Expected Result:

* Không ghi nhận đánh giá không hợp lệ.
* Không tạo dữ liệu rating sai.
* System trả kết quả lỗi phù hợp.

---

# 5. Quy tắc sinh Test Case từ bây giờ

Một Test Scenario không còn mặc định chỉ sinh một Test Case.

Ví dụ:

**Test Scenario: Customer đăng nhập**

Sẽ sinh:

| Test Case ID     | Trường hợp                  | Loại     |
| ---------------- | --------------------------- | -------- |
| TC-CUS-LOGIN-001 | Phone và password đúng      | Positive |
| TC-CUS-LOGIN-002 | Phone không tồn tại         | Negative |
| TC-CUS-LOGIN-003 | Password sai                | Negative |
| TC-CUS-LOGIN-004 | Thiếu phone                 | Negative |
| TC-CUS-LOGIN-005 | Thiếu password              | Negative |
| TC-CUS-LOGIN-006 | Phone và password đều trống | Negative |

Khi viết file Test Case chi tiết, mỗi dòng sẽ theo đúng cấu trúc Excel của giảng viên:

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

---

# 6. Lưu ý về Expected Result

Customer API hiện chủ yếu mô tả response thành công.

Các trường hợp sai chưa định nghĩa đầy đủ:

* HTTP Status Code.
* Error response.
* Validation rule cho phone.
* Validation rule cho password.
* Validation rule cho email.
* Phạm vi rating chính thức trong API.
* Xử lý tài khoản trùng.

Do đó không tự giả định chính thức các mã 400, 401 hoặc 404 nếu API/SRS chưa xác nhận.

Test Case Negative kiểm tra trước hết ở mức nghiệp vụ:

* Không tạo/lưu dữ liệu sai.
* Không đăng nhập khi thông tin sai.
* Không trả nhầm dữ liệu.
* Không cập nhật resource không tồn tại.
* Không ghi nhận rating không hợp lệ.
