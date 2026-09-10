# TEST CASE - PAYMENT

## 1. Mục đích

Tài liệu này xây dựng các Test Case từ các Test Scenario của chức năng Payment.

Test Case được xây dựng dựa trên:

* FR14 - Tính cước chuyến đi
* FR15 - Thanh toán tiền mặt
* FR16 - Thanh toán điện tử
* FR17 - Xử lý thanh toán thất bại
* AC11 - AC14
* Payment API

---

## 2. Test Data

Sử dụng dữ liệu mẫu sau trong quá trình kiểm thử:

| Tham số          | Giá trị mẫu | Mô tả                     |
| ---------------- | ----------- | ------------------------- |
| customerId       | C001        | Customer hợp lệ           |
| tripId           | T001        | Chuyến đi đã hoàn thành   |
| incompleteTripId | T002        | Chuyến đi chưa hoàn thành |
| paymentId        | P001        | Payment tồn tại           |
| invalidPaymentId | P999        | Payment không tồn tại     |
| amount           | 120000      | Số tiền cần thanh toán    |
| cashMethod       | CASH        | Thanh toán tiền mặt       |
| electronicMethod | BANKING     | Thanh toán điện tử        |

---

# 3. Test Cases

## TC_PAY_01 - Tạo Payment cho chuyến đã hoàn thành

| Thuộc tính              | Nội dung                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| **Test Case ID**        | TC_PAY_01                                                                                    |
| **Scenario ID**         | TS_PAY_01                                                                                    |
| **Requirement**         | FR14, FR15                                                                                   |
| **Acceptance Criteria** | AC11, AC12                                                                                   |
| **Mục đích**            | Kiểm tra hệ thống có tạo Payment và xác định số tiền cần thanh toán cho chuyến đã hoàn thành |
| **Tiền điều kiện**      | Customer C001 tồn tại; Trip T001 tồn tại và đã hoàn thành                                    |
| **API**                 | POST /api/payments                                                                           |

### Input

```json
{
  "tripId": "T001",
  "customerId": "C001",
  "method": "CASH"
}
```

### Các bước thực hiện

1. Gửi request `POST /api/payments`.
2. Truyền `tripId = T001`.
3. Truyền `customerId = C001`.
4. Truyền `method = CASH`.
5. Nhận response từ System.

### Expected Output

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

### Điều kiện đạt

* Payment được tạo.
* Có `paymentId`.
* `tripId` đúng bằng `T001`.
* System xác định được `amount`.
* `method` là `CASH`.
* Trạng thái ban đầu là `PENDING`.

---

## TC_PAY_02 - Thanh toán tiền mặt thành công

| Thuộc tính              | Nội dung                                          |
| ----------------------- | ------------------------------------------------- |
| **Test Case ID**        | TC_PAY_02                                         |
| **Scenario ID**         | TS_PAY_02                                         |
| **Requirement**         | FR15                                              |
| **Acceptance Criteria** | AC12                                              |
| **Mục đích**            | Kiểm tra Customer có thể thanh toán bằng tiền mặt |
| **Tiền điều kiện**      | Payment P001 tồn tại và đang ở trạng thái PENDING |
| **API**                 | POST /api/payments/{paymentId}/cash               |

### Input

```text
paymentId = P001
```

### Các bước thực hiện

1. Chọn Payment `P001`.
2. Gửi request:

```http
POST /api/payments/P001/cash
```

3. Nhận kết quả xử lý thanh toán.

### Expected Output

```json
{
  "paymentId": "P001",
  "status": "COMPLETED",
  "message": "Cash payment completed successfully"
}
```

### Điều kiện đạt

* Đúng Payment `P001` được cập nhật.
* Payment chuyển từ `PENDING` sang `COMPLETED`.
* Hệ thống xác nhận thanh toán tiền mặt thành công.

---

## TC_PAY_03 - Thanh toán điện tử thành công

| Thuộc tính              | Nội dung                                          |
| ----------------------- | ------------------------------------------------- |
| **Test Case ID**        | TC_PAY_03                                         |
| **Scenario ID**         | TS_PAY_03                                         |
| **Requirement**         | FR16                                              |
| **Acceptance Criteria** | AC12, AC13                                        |
| **Mục đích**            | Kiểm tra thanh toán điện tử được xử lý thành công |
| **Tiền điều kiện**      | Payment P001 tồn tại và đang chờ thanh toán       |
| **API**                 | POST /api/payments/{paymentId}/electronic         |

### Input

Path Parameter:

```text
paymentId = P001
```

Request Body:

```json
{
  "paymentMethod": "BANKING",
  "amount": 120000
}
```

### Các bước thực hiện

1. Chọn Payment `P001`.
2. Chọn phương thức thanh toán điện tử `BANKING`.
3. Gửi request:

```http
POST /api/payments/P001/electronic
```

4. System gửi yêu cầu xử lý thông qua nhà cung cấp thanh toán bên ngoài.
5. Nhà cung cấp trả kết quả thành công.
6. System trả kết quả cho Customer.

### Expected Output

```json
{
  "paymentId": "P001",
  "status": "COMPLETED",
  "message": "Electronic payment completed successfully"
}
```

### Điều kiện đạt

* Thanh toán được xử lý thành công.
* Payment chuyển thành `COMPLETED`.
* Payment đúng là `P001`.
* Thanh toán điện tử được xử lý thông qua Payment Provider.

---

## TC_PAY_04 - Thanh toán điện tử thất bại

| Thuộc tính              | Nội dung                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| **Test Case ID**        | TC_PAY_04                                                         |
| **Scenario ID**         | TS_PAY_04                                                         |
| **Requirement**         | FR17                                                              |
| **Acceptance Criteria** | AC14                                                              |
| **Mục đích**            | Kiểm tra System xử lý đúng khi thanh toán điện tử thất bại        |
| **Tiền điều kiện**      | Payment P001 tồn tại; giao dịch điện tử được xác định là thất bại |
| **API**                 | POST /api/payments/{paymentId}/failure                            |

### Input

```text
paymentId = P001
```

### Các bước thực hiện

1. Thực hiện thanh toán điện tử cho Payment `P001`.
2. Payment Provider trả kết quả thất bại.
3. System gọi xử lý payment failure.
4. Kiểm tra trạng thái Payment.

### Expected Output

```json
{
  "paymentId": "P001",
  "status": "FAILED",
  "message": "Payment failed"
}
```

### Điều kiện đạt

* Payment chuyển thành `FAILED`.
* Payment thất bại được ghi nhận.
* Customer nhận được kết quả thanh toán thất bại.
* System không đánh dấu giao dịch là `COMPLETED`.

---

## TC_PAY_05 - Tra cứu Payment tồn tại

| Thuộc tính              | Nội dung                                   |
| ----------------------- | ------------------------------------------ |
| **Test Case ID**        | TC_PAY_05                                  |
| **Scenario ID**         | TS_PAY_05                                  |
| **Requirement**         | FR15, FR16                                 |
| **Acceptance Criteria** | AC12                                       |
| **Mục đích**            | Kiểm tra có thể lấy đúng thông tin Payment |
| **Tiền điều kiện**      | Payment P001 tồn tại                       |
| **API**                 | GET /api/payments/{paymentId}              |

### Input

```text
paymentId = P001
```

### Các bước thực hiện

1. Gửi request:

```http
GET /api/payments/P001
```

2. Nhận thông tin Payment.
3. Đối chiếu dữ liệu trả về với Payment `P001`.

### Expected Output

```json
{
  "paymentId": "P001",
  "tripId": "T001",
  "amount": 120000,
  "method": "CASH",
  "status": "COMPLETED"
}
```

### Điều kiện đạt

* Trả đúng `paymentId`.
* Trả đúng chuyến tương ứng.
* Có số tiền thanh toán.
* Có phương thức thanh toán.
* Có trạng thái Payment.

---

## TC_PAY_06 - Xem lịch sử thanh toán của Customer

| Thuộc tính              | Nội dung                                                |
| ----------------------- | ------------------------------------------------------- |
| **Test Case ID**        | TC_PAY_06                                               |
| **Scenario ID**         | TS_PAY_06                                               |
| **Requirement**         | FR15, FR16                                              |
| **Acceptance Criteria** | AC12                                                    |
| **Mục đích**            | Kiểm tra hệ thống trả đúng lịch sử Payment của Customer |
| **Tiền điều kiện**      | Customer C001 tồn tại và đã có lịch sử thanh toán       |
| **API**                 | GET /api/customers/{customerId}/payments                |

### Input

```text
customerId = C001
```

### Các bước thực hiện

1. Gửi request:

```http
GET /api/customers/C001/payments
```

2. System tìm các Payment thuộc Customer `C001`.
3. Nhận danh sách Payment.

### Expected Output

```json
{
  "customerId": "C001",
  "payments": [
    {
      "paymentId": "P001",
      "tripId": "T001",
      "amount": 120000,
      "method": "CASH",
      "status": "COMPLETED"
    },
    {
      "paymentId": "P002",
      "tripId": "T002",
      "amount": 90000,
      "method": "BANKING",
      "status": "COMPLETED"
    }
  ]
}
```

### Điều kiện đạt

* `customerId` trả về đúng `C001`.
* System trả danh sách Payment của Customer.
* Mỗi Payment có đầy đủ:

  * paymentId
  * tripId
  * amount
  * method
  * status

---

## TC_PAY_07 - Tạo Payment khi chuyến chưa hoàn thành

| Thuộc tính              | Nội dung                                                                        |
| ----------------------- | ------------------------------------------------------------------------------- |
| **Test Case ID**        | TC_PAY_07                                                                       |
| **Scenario ID**         | TS_PAY_07                                                                       |
| **Requirement**         | FR14                                                                            |
| **Acceptance Criteria** | AC11                                                                            |
| **Mục đích**            | Kiểm tra System không thực hiện tính cước/thanh toán khi chuyến chưa hoàn thành |
| **Tiền điều kiện**      | Trip T002 tồn tại nhưng chưa ở trạng thái hoàn thành                            |
| **API**                 | POST /api/payments                                                              |

### Input

```json
{
  "tripId": "T002",
  "customerId": "C001",
  "method": "CASH"
}
```

### Các bước thực hiện

1. Xác định Trip `T002` chưa hoàn thành.
2. Gửi request `POST /api/payments`.
3. Kiểm tra kết quả.

### Expected Output

* System từ chối tạo Payment.
* Không sinh `paymentId` hợp lệ cho yêu cầu này.
* Không đánh dấu Payment là `PENDING` hoặc `COMPLETED`.
* System thông báo rằng chuyến chưa đủ điều kiện để thanh toán.

> Lưu ý: Payment API hiện tại chưa quy định cụ thể HTTP Status Code và nội dung error message cho trường hợp này, nên Test Case kiểm tra kết quả nghiệp vụ theo FR14 và AC11.

---

## TC_PAY_08 - Thanh toán điện tử với Payment không tồn tại

| Thuộc tính              | Nội dung                                                         |
| ----------------------- | ---------------------------------------------------------------- |
| **Test Case ID**        | TC_PAY_08                                                        |
| **Scenario ID**         | TS_PAY_08                                                        |
| **Requirement**         | FR16                                                             |
| **Acceptance Criteria** | AC13                                                             |
| **Mục đích**            | Kiểm tra System không xử lý thanh toán cho Payment không tồn tại |
| **Tiền điều kiện**      | Payment P999 không tồn tại                                       |
| **API**                 | POST /api/payments/{paymentId}/electronic                        |

### Input

Path Parameter:

```text
paymentId = P999
```

Request Body:

```json
{
  "paymentMethod": "BANKING",
  "amount": 120000
}
```

### Các bước thực hiện

1. Gửi request:

```http
POST /api/payments/P999/electronic
```

2. System kiểm tra Payment.
3. Kiểm tra kết quả trả về.

### Expected Output

* System từ chối xử lý Payment `P999`.
* Không tạo thanh toán thành công.
* Không trả trạng thái `COMPLETED`.
* Có thông báo lỗi cho biết Payment không hợp lệ hoặc không tồn tại.

> API hiện chưa quy định HTTP Status Code và error response cụ thể cho trường hợp Payment không tồn tại.

---

## TC_PAY_09 - Tra cứu Payment không tồn tại

| Thuộc tính              | Nội dung                                         |
| ----------------------- | ------------------------------------------------ |
| **Test Case ID**        | TC_PAY_09                                        |
| **Scenario ID**         | TS_PAY_09                                        |
| **Requirement**         | FR15, FR16                                       |
| **Acceptance Criteria** | AC12                                             |
| **Mục đích**            | Kiểm tra xử lý khi tìm một Payment không tồn tại |
| **Tiền điều kiện**      | Không tồn tại Payment có ID P999                 |
| **API**                 | GET /api/payments/{paymentId}                    |

### Input

```text
paymentId = P999
```

### Các bước thực hiện

1. Gửi request:

```http
GET /api/payments/P999
```

2. System tìm Payment theo ID.
3. Kiểm tra kết quả.

### Expected Output

* Không trả về thông tin của một Payment hợp lệ.
* Không trả nhầm Payment khác.
* System trả thông báo Payment không tồn tại.

> HTTP Status Code và cấu trúc error response chưa được quy định trong Payment API hiện tại.

---

## TC_PAY_10 - Thử thanh toán lại sau khi thanh toán điện tử thất bại

| Thuộc tính              | Nội dung                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| **Test Case ID**        | TC_PAY_10                                                                        |
| **Scenario ID**         | TS_PAY_10                                                                        |
| **Requirement**         | FR17                                                                             |
| **Acceptance Criteria** | AC14                                                                             |
| **Mục đích**            | Kiểm tra Customer có thể xử lý lại thanh toán sau khi giao dịch điện tử thất bại |
| **Tiền điều kiện**      | Payment P001 tồn tại; lần thanh toán trước của P001 đã thất bại                  |
| **API**                 | POST /api/payments/{paymentId}/electronic                                        |

### Input

Path Parameter:

```text
paymentId = P001
```

Request Body:

```json
{
  "paymentMethod": "BANKING",
  "amount": 120000
}
```

### Các bước thực hiện

1. Payment `P001` có trạng thái thanh toán thất bại.
2. Customer thực hiện lại thanh toán theo chính sách.
3. Gửi lại:

```http
POST /api/payments/P001/electronic
```

4. Payment Provider xử lý lại giao dịch.
5. Giả lập Payment Provider trả kết quả thành công.
6. Kiểm tra kết quả.

### Expected Output

```json
{
  "paymentId": "P001",
  "status": "COMPLETED",
  "message": "Electronic payment completed successfully"
}
```

### Điều kiện đạt

* System cho phép Payment được xử lý lại.
* Payment Provider được gọi để thực hiện lại giao dịch.
* Khi lần thử lại thành công, Payment chuyển sang `COMPLETED`.
* Customer nhận được kết quả thanh toán.
