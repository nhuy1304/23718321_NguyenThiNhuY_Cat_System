# TEST CASE - PAYMENT MANAGEMENT

## 1. Căn cứ xây dựng Test Case

Test Case được xây dựng dựa trên:

* FR14 - Tính cước chuyến đi
* FR15 - Thanh toán tiền mặt
* FR16 - Thanh toán điện tử
* FR17 - Xử lý thanh toán thất bại
* AC11 - AC14
* BRULE07 - Tính cước sau khi chuyến hoàn thành
* BRULE08 - Không lưu thông tin thanh toán nhạy cảm
* BRULE09 - Thanh toán điện tử phải thông qua nhà cung cấp bên ngoài
* BRULE10 - Thanh toán thất bại phải thông báo và cho phép xử lý lại
* BRULE12 - Người dùng phải được xác thực
* EX04 - Thanh toán điện tử thất bại
* EX06 - Mất kết nối mạng
* Payment API
* Mẫu Excel Test Case của giảng viên

Các nhóm coverage:

`VALID`, `INVALID`, `EMPTY`, `NULL`, `BOUNDARY`, `EXCEPTION`, `BUSINESS RULE`.

---

# 2. Test Data chung

| Dữ liệu                | Giá trị |
| ---------------------- | ------- |
| Customer hợp lệ        | C001    |
| Customer không tồn tại | C999    |
| Trip hoàn thành        | T001    |
| Trip chưa hoàn thành   | T002    |
| Trip không tồn tại     | T999    |
| Payment hợp lệ         | P001    |
| Payment không tồn tại  | P999    |
| Số tiền hợp lệ         | 120000  |
| Cash Method            | CASH    |
| Electronic Method      | BANKING |

---

# 3. TS_PAY_01 - Tạo Payment với dữ liệu hợp lệ

| Test Case ID      | Test Scenario | Test Case                                                     | Preconditions                               | Test Steps                                                         | Test Data                                    | Expected Result                                                                                                  | Priority |
| ----------------- | ------------- | ------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| TC-PAY-CREATE-001 | Tạo Payment   | [VALID] Tạo Payment tiền mặt cho Trip đã hoàn thành           | C001 đã xác thực; T001 tồn tại và COMPLETED | 1. POST /api/payments; 2. Gửi dữ liệu hợp lệ; 3. Kiểm tra response | tripId=T001; customerId=C001; method=CASH    | Tạo Payment thành công; có paymentId; amount được System xác định; method=CASH; status=PENDING                   | High     |
| TC-PAY-CREATE-002 | Tạo Payment   | [VALID] Tạo Payment với phương thức thanh toán điện tử hợp lệ | C001 đã xác thực; T001 COMPLETED            | Gửi POST /api/payments với phương thức điện tử hợp lệ              | tripId=T001; customerId=C001; method=BANKING | Payment được tạo cho Trip hợp lệ; không xử lý thanh toán điện tử trước khi có Payment                            | High     |
| TC-PAY-CREATE-003 | Tạo Payment   | [EMPTY] tripId là chuỗi rỗng                                  | C001 đã xác thực                            | POST /api/payments                                                 | tripId=""; customerId=C001; method=CASH      | System không tạo Payment hợp lệ; không sinh paymentId thành công                                                 | High     |
| TC-PAY-CREATE-004 | Tạo Payment   | [NULL] tripId bằng null                                       | C001 đã xác thực                            | Gửi Create Payment với tripId=null                                 | tripId=null; customerId=C001; method=CASH    | System xử lý null an toàn; không tạo Payment không gắn Trip                                                      | High     |
| TC-PAY-CREATE-005 | Tạo Payment   | [EMPTY] customerId rỗng                                       | Trip hợp lệ                                 | Gửi request với customerId=""                                      | tripId=T001; customerId=""; method=CASH      | Không tạo Payment khi không xác định được Customer                                                               | High     |
| TC-PAY-CREATE-006 | Tạo Payment   | [NULL] customerId=null                                        | Trip hợp lệ                                 | Gửi request                                                        | tripId=T001; customerId=null; method=CASH    | Không tạo Payment hợp lệ; không gán Payment nhầm Customer                                                        | High     |
| TC-PAY-CREATE-007 | Tạo Payment   | [EMPTY] method rỗng                                           | T001 COMPLETED                              | Gửi method=""                                                      | method=""                                    | System không tạo Payment với phương thức rỗng                                                                    | High     |
| TC-PAY-CREATE-008 | Tạo Payment   | [NULL] method=null                                            | T001 COMPLETED                              | Gửi method=null                                                    | method=null                                  | System không tạo Payment không có phương thức thanh toán hợp lệ                                                  | High     |
| TC-PAY-CREATE-009 | Tạo Payment   | [INVALID] method không được hỗ trợ                            | T001 COMPLETED                              | Gửi phương thức ngoài phạm vi hiện tại                             | method=CRYPTO                                | System không xử lý phương thức ngoài tiền mặt/điện tử; không tạo dữ liệu sai                                     | High     |
| TC-PAY-CREATE-010 | Tạo Payment   | [INVALID] Trip không tồn tại                                  | C001 hợp lệ                                 | Gửi Create Payment cho T999                                        | tripId=T999                                  | Không tạo Payment cho Trip không tồn tại; không ảnh hưởng Trip khác                                              | High     |
| TC-PAY-CREATE-011 | Tạo Payment   | [INVALID] Customer không tồn tại                              | T001 tồn tại                                | Gửi Create Payment với C999                                        | customerId=C999                              | Không tạo Payment gắn với Customer không tồn tại                                                                 | High     |
| TC-PAY-CREATE-012 | Tạo Payment   | [BUSINESS RULE] Customer chưa xác thực tạo Payment            | T001 COMPLETED; C001 chưa authentication    | Gửi POST /api/payments                                             | unauthenticated                              | System từ chối chức năng yêu cầu tài khoản theo BRULE12                                                          | High     |
| TC-PAY-CREATE-013 | Tạo Payment   | [BUSINESS/DATA] Tạo Payment lần hai cho cùng Trip             | T001 đã có Payment P001                     | Gửi lại POST /api/payments cho T001                                | tripId=T001                                  | Không được sinh Payment trùng trái với mô hình một Trip có tối đa một Payment; cần xác nhận cách phản hồi cụ thể | High     |
| TC-PAY-CREATE-014 | Tạo Payment   | [EXCEPTION] Lỗi lưu dữ liệu khi tạo Payment                   | T001 COMPLETED                              | Gửi request hợp lệ và giả lập lỗi lưu                              | database exception                           | Không báo tạo Payment thành công nếu chưa lưu; không tạo bản ghi dở dang                                         | High     |
| TC-PAY-CREATE-015 | Tạo Payment   | [EXCEPTION] Mất mạng ngay lúc tạo Payment                     | Request hợp lệ                              | Gửi request rồi ngắt mạng trước response                           | network disconnected                         | Không tạo Payment trùng do retry; sau reconnect phải kiểm tra trạng thái thực tế trước khi gửi lại               | High     |

---

# 4. TS_PAY_02 - Thanh toán tiền mặt

| Test Case ID    | Test Scenario       | Test Case                                                       | Preconditions                              | Test Steps                           | Test Data            | Expected Result                                                                                | Priority |
| --------------- | ------------------- | --------------------------------------------------------------- | ------------------------------------------ | ------------------------------------ | -------------------- | ---------------------------------------------------------------------------------------------- | -------- |
| TC-PAY-CASH-001 | Thanh toán tiền mặt | [VALID] Xác nhận Cash Payment đang PENDING                      | P001 tồn tại; method=CASH; status=PENDING  | POST /api/payments/P001/cash         | paymentId=P001       | Payment chuyển thành COMPLETED; trả thông báo Cash payment completed successfully              | High     |
| TC-PAY-CASH-002 | Thanh toán tiền mặt | [INVALID] paymentId không tồn tại                               | P999 không tồn tại                         | POST /api/payments/P999/cash         | paymentId=P999       | Không tạo/cập nhật Payment khác; không trả COMPLETED cho P999                                  | High     |
| TC-PAY-CASH-003 | Thanh toán tiền mặt | [EMPTY] paymentId rỗng                                          | System hoạt động                           | Gọi endpoint không có ID hợp lệ      | paymentId=""         | Request không được xử lý như Payment hợp lệ                                                    | Medium   |
| TC-PAY-CASH-004 | Thanh toán tiền mặt | [NULL] paymentId=null                                           | System hoạt động                           | Gọi Cash API với null                | paymentId=null       | Không hoàn tất Payment hợp lệ nào                                                              | Medium   |
| TC-PAY-CASH-005 | Thanh toán tiền mặt | [INVALID STATE] Payment đã COMPLETED được xác nhận Cash lần nữa | P001 đã COMPLETED                          | Gọi Cash lần hai                     | paymentId=P001       | Không được tạo giao dịch/thanh toán trùng; trạng thái vẫn nhất quán                            | High     |
| TC-PAY-CASH-006 | Thanh toán tiền mặt | [BUSINESS RULE] Customer chưa xác thực xác nhận Payment         | P001 tồn tại; Customer chưa authentication | Gọi Cash Payment                     | unauthenticated      | Nếu thao tác thuộc Customer account, System thực thi BRULE12; không thay đổi trái phép Payment | High     |
| TC-PAY-CASH-007 | Thanh toán tiền mặt | [EXCEPTION] Mất kết nối khi xác nhận Cash                       | P001 PENDING                               | Gọi Cash rồi mất mạng trước response | network disconnected | Không ghi nhận thanh toán tiền mặt hai lần do retry; cần đọc lại Payment sau reconnect         | High     |

---

# 5. TS_PAY_03 - Thanh toán điện tử

| Test Case ID    | Test Scenario      | Test Case                                                        | Preconditions                              | Test Steps                                                     | Test Data                            | Expected Result                                                                                            | Priority |
| --------------- | ------------------ | ---------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | -------- |
| TC-PAY-ELEC-001 | Thanh toán điện tử | [VALID] Thanh toán BANKING với amount hợp lệ                     | P001 tồn tại và PENDING                    | POST /api/payments/P001/electronic                             | paymentMethod=BANKING; amount=120000 | Provider xử lý thành công; Payment chuyển COMPLETED                                                        | High     |
| TC-PAY-ELEC-002 | Thanh toán điện tử | [BUSINESS RULE] Kiểm tra giao dịch phải đi qua external provider | P001 PENDING                               | Thực hiện Electronic Payment; theo dõi lời gọi tích hợp        | paymentMethod=BANKING                | CAB phải gửi yêu cầu đến Payment Provider trước khi ghi nhận thành công theo BRULE09                       | High     |
| TC-PAY-ELEC-003 | Thanh toán điện tử | [BUSINESS RULE] Không lưu dữ liệu thanh toán nhạy cảm            | Có dữ liệu thanh toán do Provider xử lý    | Thực hiện Electronic Payment; kiểm tra DB/log CAB              | sensitive payment data               | CAB không lưu trực tiếp thông tin thẻ/tài khoản nhạy cảm theo BRULE08                                      | High     |
| TC-PAY-ELEC-004 | Thanh toán điện tử | [EMPTY] paymentMethod=""                                         | P001 PENDING                               | Gửi request với paymentMethod rỗng                             | paymentMethod=""; amount=120000      | Không xử lý thanh toán thành công                                                                          | High     |
| TC-PAY-ELEC-005 | Thanh toán điện tử | [NULL] paymentMethod=null                                        | P001 PENDING                               | Gửi request                                                    | paymentMethod=null; amount=120000    | Không gọi/không ghi nhận Provider transaction thành công với method null                                   | High     |
| TC-PAY-ELEC-006 | Thanh toán điện tử | [INVALID] paymentMethod không hợp lệ                             | P001 PENDING                               | Gửi method ngoài phạm vi                                       | paymentMethod=ABC                    | System từ chối dữ liệu hoặc Provider không được coi là xử lý thành công                                    | High     |
| TC-PAY-ELEC-007 | Thanh toán điện tử | [EMPTY] amount là chuỗi rỗng                                     | P001 PENDING                               | Gửi amount=""                                                  | amount=""                            | Không xử lý thanh toán với amount không hợp lệ                                                             | High     |
| TC-PAY-ELEC-008 | Thanh toán điện tử | [NULL] amount=null                                               | P001 PENDING                               | Gửi amount=null                                                | amount=null                          | Không chuyển Payment thành COMPLETED                                                                       | High     |
| TC-PAY-ELEC-009 | Thanh toán điện tử | [BOUNDARY/INVALID] amount=0                                      | P001 có amount phải trả >0                 | Gửi Electronic Payment                                         | amount=0                             | Không ghi nhận thanh toán thành công với số tiền 0 cho Payment có số tiền phải trả                         | High     |
| TC-PAY-ELEC-010 | Thanh toán điện tử | [BOUNDARY/INVALID] amount âm                                     | P001 PENDING                               | Gửi amount=-1                                                  | amount=-1                            | Không xử lý số tiền âm; Payment không chuyển COMPLETED                                                     | High     |
| TC-PAY-ELEC-011 | Thanh toán điện tử | [BUSINESS] amount không khớp số tiền System đã tính              | P001 amount=120000                         | Gửi amount khác                                                | amount=100000                        | Không được coi P001 đã thanh toán đủ nếu amount không khớp số tiền cần trả; cách xử lý cụ thể cần xác nhận | High     |
| TC-PAY-ELEC-012 | Thanh toán điện tử | [NULL] paymentId=null                                            | System hoạt động                           | Gọi Electronic API với null                                    | paymentId=null                       | Không thanh toán Payment hợp lệ nào                                                                        | Medium   |
| TC-PAY-ELEC-013 | Thanh toán điện tử | [BUSINESS RULE] Customer chưa xác thực                           | P001 tồn tại; Customer chưa authentication | Gọi Electronic Payment                                         | unauthenticated                      | System từ chối chức năng yêu cầu tài khoản theo BRULE12                                                    | High     |
| TC-PAY-ELEC-014 | Thanh toán điện tử | [EXCEPTION] Payment Provider không phản hồi/timeout              | P001 PENDING                               | Gửi request; giả lập Provider timeout                          | provider timeout                     | Không chuyển Payment thành COMPLETED khi chưa có xác nhận thành công từ Provider                           | High     |
| TC-PAY-ELEC-015 | Thanh toán điện tử | [EXCEPTION] Mất mạng sau khi gửi yêu cầu tới Provider            | P001 PENDING                               | Gửi request; Provider có thể đã xử lý; mất mạng trước response | network disconnected                 | Không tự động charge lần hai khi retry; phải xác minh kết quả giao dịch trước khi xử lý lại                | High     |

---

# 6. TS_PAY_04 - Xử lý Payment thất bại

| Test Case ID    | Test Scenario             | Test Case                                                  | Preconditions                     | Test Steps                                         | Test Data      | Expected Result                                                                               | Priority |
| --------------- | ------------------------- | ---------------------------------------------------------- | --------------------------------- | -------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------- | -------- |
| TC-PAY-FAIL-001 | Xử lý thanh toán thất bại | [VALID/EXCEPTION] Electronic Payment thất bại              | P001 đang được thanh toán điện tử | POST /api/payments/P001/failure                    | paymentId=P001 | Payment chuyển FAILED; trả message Payment failed                                             | High     |
| TC-PAY-FAIL-002 | Xử lý thanh toán thất bại | [BUSINESS RULE] Customer phải được thông báo               | P001 vừa FAILED                   | Ghi nhận failure; kiểm tra notification            | P001 FAILED    | Customer được thông báo thanh toán thất bại theo BRULE10/EX04                                 | High     |
| TC-PAY-FAIL-003 | Xử lý thanh toán thất bại | [BUSINESS RULE] Cho phép xử lý lại sau failure             | P001 FAILED                       | Thực hiện lại payment theo policy                  | paymentId=P001 | System cho phép retry theo chính sách doanh nghiệp; chính sách retry cụ thể cần xác nhận      | High     |
| TC-PAY-FAIL-004 | Xử lý thanh toán thất bại | [INVALID] Payment không tồn tại                            | P999 không tồn tại                | POST /api/payments/P999/failure                    | paymentId=P999 | Không tạo Payment FAILED giả; không thay đổi Payment khác                                     | High     |
| TC-PAY-FAIL-005 | Xử lý thanh toán thất bại | [NULL] paymentId=null                                      | System hoạt động                  | Gọi failure với null                               | paymentId=null | Không cập nhật Payment hợp lệ nào                                                             | Medium   |
| TC-PAY-FAIL-006 | Xử lý thanh toán thất bại | [INVALID STATE] Gọi failure cho Payment Cash đã hoàn thành | P001 method=CASH và COMPLETED     | Gọi /failure                                       | paymentId=P001 | Không biến Cash Payment hợp lệ đã hoàn thành thành failed do sự kiện electronic không phù hợp | High     |
| TC-PAY-FAIL-007 | Xử lý thanh toán thất bại | [EXCEPTION] Lỗi khi cập nhật trạng thái FAILED             | Provider đã báo thất bại          | Giả lập database/network error khi CAB ghi failure | exception      | Không báo đã xử lý failure nếu trạng thái chưa được lưu; dữ liệu phải nhất quán               | High     |

---

# 7. TS_PAY_05 - Tra cứu Payment tồn tại

| Test Case ID   | Test Scenario   | Test Case                                                        | Preconditions                | Test Steps                 | Test Data            | Expected Result                                                                           | Priority |
| -------------- | --------------- | ---------------------------------------------------------------- | ---------------------------- | -------------------------- | -------------------- | ----------------------------------------------------------------------------------------- | -------- |
| TC-PAY-GET-001 | Tra cứu Payment | [VALID] Lấy Payment tồn tại                                      | P001 tồn tại                 | GET /api/payments/P001     | paymentId=P001       | Trả đúng paymentId, tripId, amount, method, status                                        | High     |
| TC-PAY-GET-002 | Tra cứu Payment | [EMPTY] paymentId rỗng                                           | API hoạt động                | Gọi URL không có ID hợp lệ | paymentId=""         | Không trả nhầm Payment khác                                                               | Medium   |
| TC-PAY-GET-003 | Tra cứu Payment | [NULL] paymentId=null                                            | API hoạt động                | GET với null               | paymentId=null       | Không trả một Payment hợp lệ                                                              | Medium   |
| TC-PAY-GET-004 | Tra cứu Payment | [BUSINESS RULE] Chưa xác thực truy cập Payment yêu cầu tài khoản | Customer chưa authentication | GET Payment                | unauthenticated      | System thực thi BRULE12 nếu Payment Information là chức năng Customer account             | High     |
| TC-PAY-GET-005 | Tra cứu Payment | [EXCEPTION] Mất mạng khi lấy Payment                             | P001 tồn tại                 | Gửi GET rồi ngắt mạng      | network disconnected | Không làm thay đổi Payment; client không coi request chưa hoàn tất là response thành công | Low      |

---

# 8. TS_PAY_06 - Xem lịch sử Payment của Customer

| Test Case ID   | Test Scenario   | Test Case                                                  | Preconditions                   | Test Steps                           | Test Data            | Expected Result                                                                     | Priority |
| -------------- | --------------- | ---------------------------------------------------------- | ------------------------------- | ------------------------------------ | -------------------- | ----------------------------------------------------------------------------------- | -------- |
| TC-PAY-HIS-001 | Lịch sử Payment | [VALID] Customer có nhiều Payment                          | C001 tồn tại và có lịch sử      | GET /api/customers/C001/payments     | customerId=C001      | Trả đúng danh sách Payment của C001                                                 | High     |
| TC-PAY-HIS-002 | Lịch sử Payment | [VALID] Customer tồn tại nhưng chưa có Payment             | C002 tồn tại và chưa thanh toán | GET Payment History                  | customerId=C002      | Trả danh sách rỗng hoặc kết quả tương đương; không coi là Payment của Customer khác | Medium   |
| TC-PAY-HIS-003 | Lịch sử Payment | [INVALID] Customer không tồn tại                           | C999 không tồn tại              | GET /api/customers/C999/payments     | C999                 | Không trả lịch sử của Customer khác                                                 | High     |
| TC-PAY-HIS-004 | Lịch sử Payment | [EMPTY] customerId rỗng                                    | API hoạt động                   | Gọi path không có Customer ID hợp lệ | customerId=""        | Không trả danh sách Payment hợp lệ                                                  | Medium   |
| TC-PAY-HIS-005 | Lịch sử Payment | [NULL] customerId=null                                     | API hoạt động                   | GET với null                         | customerId=null      | System xử lý null an toàn; không trả nhầm dữ liệu                                   | Medium   |
| TC-PAY-HIS-006 | Lịch sử Payment | [BUSINESS RULE] Customer chưa xác thực xem Payment History | C001 chưa authentication        | Gọi History                          | unauthenticated      | System từ chối theo BRULE12                                                         | High     |
| TC-PAY-HIS-007 | Lịch sử Payment | [EXCEPTION] Mất kết nối khi tải lịch sử                    | Customer đã xác thực            | Gọi GET rồi mất mạng                 | network disconnected | Không thay đổi dữ liệu; không hiển thị kết quả mới như thể request thành công       | Low      |

---

# 9. TS_PAY_07 - Kiểm tra BRULE07: chỉ tính cước/thanh toán sau khi Trip hoàn thành

| Test Case ID      | Test Scenario                        | Test Case                              | Preconditions       | Test Steps          | Test Data                  | Expected Result                                        | Priority |
| ----------------- | ------------------------------------ | -------------------------------------- | ------------------- | ------------------- | -------------------------- | ------------------------------------------------------ | -------- |
| TC-PAY-RULE07-001 | Tạo Payment khi Trip chưa hoàn thành | [BUSINESS RULE] Trip PENDING           | T002=PENDING        | POST /api/payments  | tripId=T002                | System không tạo Payment vì Trip chưa hoàn thành       | High     |
| TC-PAY-RULE07-002 | Tạo Payment khi Trip chưa hoàn thành | [BUSINESS RULE] Trip ARRIVED/PICKED_UP | Trip đang thực hiện | POST Create Payment | trip status chưa COMPLETED | Không tính cước/thanh toán trước khi chuyến hoàn thành | High     |
| TC-PAY-RULE07-003 | Tạo Payment khi Trip chưa hoàn thành | [BUSINESS RULE] Trip IN_PROGRESS       | T002=IN_PROGRESS    | POST Create Payment | tripId=T002                | Không tạo Payment; tuân thủ BRULE07                    | High     |
| TC-PAY-RULE07-004 | Tạo Payment khi Trip hoàn thành      | [VALID BUSINESS RULE] Trip COMPLETED   | T001=COMPLETED      | POST Create Payment | tripId=T001                | System được phép xác định số tiền và tạo Payment       | High     |

---

# 10. TS_PAY_08 - Electronic Payment với Payment không tồn tại

| Test Case ID        | Test Scenario                   | Test Case                | Preconditions      | Test Steps                         | Test Data                            | Expected Result                                                             | Priority |
| ------------------- | ------------------------------- | ------------------------ | ------------------ | ---------------------------------- | ------------------------------------ | --------------------------------------------------------------------------- | -------- |
| TC-PAY-INV-ELEC-001 | Electronic Payment không hợp lệ | [INVALID] paymentId=P999 | P999 không tồn tại | POST /api/payments/P999/electronic | paymentMethod=BANKING; amount=120000 | Không gọi quy trình thanh toán thành công cho P999; không tạo COMPLETED giả | High     |
| TC-PAY-INV-ELEC-002 | Electronic Payment không hợp lệ | [NULL] paymentId=null    | API hoạt động      | Gửi request với ID null            | paymentId=null                       | Không thực hiện thanh toán cho Payment hợp lệ nào                           | High     |

---

# 11. TS_PAY_09 - Tra cứu Payment không tồn tại

| Test Case ID        | Test Scenario         | Test Case                            | Preconditions      | Test Steps               | Test Data      | Expected Result                                               | Priority |
| ------------------- | --------------------- | ------------------------------------ | ------------------ | ------------------------ | -------------- | ------------------------------------------------------------- | -------- |
| TC-PAY-NOTFOUND-001 | Payment không tồn tại | [INVALID] GET P999                   | P999 không tồn tại | GET /api/payments/P999   | paymentId=P999 | Không trả Payment khác; trả kết quả không tồn tại phù hợp     | High     |
| TC-PAY-NOTFOUND-002 | Payment không tồn tại | [INVALID] ID có định dạng bất thường | API hoạt động      | GET với ID không phù hợp | paymentId=@@@  | Không crash; không trả nhầm dữ liệu; xử lý input có kiểm soát | Medium   |

---

# 12. TS_PAY_10 - Retry sau Electronic Payment thất bại

| Test Case ID     | Test Scenario | Test Case                                                  | Preconditions                           | Test Steps                       | Test Data                     | Expected Result                                                                        | Priority |
| ---------------- | ------------- | ---------------------------------------------------------- | --------------------------------------- | -------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------- | -------- |
| TC-PAY-RETRY-001 | Retry Payment | [VALID/BUSINESS] Retry và Provider trả thành công          | P001 đang FAILED; policy cho phép retry | POST electronic lại              | paymentId=P001; amount=120000 | Provider xử lý thành công; Payment chuyển COMPLETED                                    | High     |
| TC-PAY-RETRY-002 | Retry Payment | [EXCEPTION] Retry nhưng Provider tiếp tục thất bại         | P001 FAILED                             | Gửi retry                        | provider failure              | Payment không được đánh dấu COMPLETED; Customer tiếp tục nhận kết quả thất bại phù hợp | High     |
| TC-PAY-RETRY-003 | Retry Payment | [BUSINESS RULE] Retry phải theo chính sách doanh nghiệp    | P001 FAILED                             | Thực hiện retry theo policy      | paymentId=P001                | System chỉ xử lý theo policy đã được xác nhận; policy hiện là Requirement Gap          | High     |
| TC-PAY-RETRY-004 | Retry Payment | [EXCEPTION] Mất mạng khi retry                             | P001 FAILED                             | Retry rồi mất kết nối            | network disconnected          | Không charge trùng; phải xác minh Provider/Payment trước lần retry tiếp theo           | High     |
| TC-PAY-RETRY-005 | Retry Payment | [BUSINESS RULE] Kiểm tra notification sau retry thành công | P001 retry thành công                   | Kiểm tra Payment và notification | status=COMPLETED              | Customer được nhận kết quả thanh toán theo FR20/AC16                                   | Medium   |

---

# 13. Coverage Matrix

| Scenario                     | Valid | Invalid | Empty   | Null | Boundary | Exception        | Business Rule             |
| ---------------------------- | ----- | ------- | ------- | ---- | -------- | ---------------- | ------------------------- |
| TS_PAY_01 Create Payment     | Có    | Có      | Có      | Có   | N/A      | Có               | BRULE12 + dữ liệu Trip    |
| TS_PAY_02 Cash               | Có    | Có      | Path ID | Có   | N/A      | Có               | BRULE12                   |
| TS_PAY_03 Electronic         | Có    | Có      | Có      | Có   | Có       | Có               | BRULE08, BRULE09, BRULE12 |
| TS_PAY_04 Failure            | Có    | Có      | Path ID | Có   | N/A      | Có               | BRULE10                   |
| TS_PAY_05 Get Payment        | Có    | Có      | Có      | Có   | N/A      | Có               | BRULE12                   |
| TS_PAY_06 History            | Có    | Có      | Có      | Có   | N/A      | Có               | BRULE12                   |
| TS_PAY_07 Trip Completion    | Có    | Có      | N/A     | N/A  | State    | N/A              | BRULE07                   |
| TS_PAY_08 Invalid Electronic | N/A   | Có      | Path ID | Có   | N/A      | N/A              | BRULE09                   |
| TS_PAY_09 Not Found          | N/A   | Có      | N/A     | N/A  | N/A      | Có kiểm soát lỗi | N/A                       |
| TS_PAY_10 Retry              | Có    | Có      | N/A     | N/A  | N/A      | Có               | BRULE10                   |

---

# 14. Tổng số Test Case

| Scenario      |     Số Test Case |
| ------------- | ---------------: |
| TS_PAY_01     |               15 |
| TS_PAY_02     |                7 |
| TS_PAY_03     |               15 |
| TS_PAY_04     |                7 |
| TS_PAY_05     |                5 |
| TS_PAY_06     |                7 |
| TS_PAY_07     |                4 |
| TS_PAY_08     |                2 |
| TS_PAY_09     |                2 |
| TS_PAY_10     |                5 |
| **Tổng cộng** | **69 Test Case** |

---

# 15. Requirement/API Gap

## GAP-PAY-01 - Công thức tính cước chưa xác định

FR14 yêu cầu System xác định số tiền dựa trên:

* Loại dịch vụ.
* Thông tin chuyến đi.

Nhưng SRS ghi rõ **cách tính cước cụ thể cần được xác nhận với Customer**.

Do đó chưa thể tạo Boundary Test chính xác cho:

* Khoảng cách.
* Đơn giá.
* Phí tối thiểu.
* Phí tối đa.
* Phụ phí.

Không tự đặt công thức.

---

## GAP-PAY-02 - Retry Policy chưa xác định

FR17, BRULE10 và EX04 cho phép xử lý lại Payment thất bại.

Tuy nhiên chưa xác định:

* Số lần retry tối đa.
* Thời gian chờ giữa các lần retry.
* Có cho đổi Payment Method hay không.
* Khi nào Payment bị khóa hoàn toàn.

Các testcase Retry phải giữ lại nhưng kết quả chi tiết cần xác nhận.

---

## GAP-PAY-03 - Error Response chưa xác định

Payment API hiện mô tả response thành công nhưng chưa định nghĩa đầy đủ:

* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* Provider Error
* Validation Error

Vì vậy testcase không tự đặt HTTP Status Code chính thức.

---

## GAP-PAY-04 - Authentication chưa được mô tả trong Payment API

BRULE12 yêu cầu Customer phải được xác thực trước khi dùng chức năng yêu cầu tài khoản.

Payment API hiện chưa mô tả:

* Token
* Authorization Header
* Session
* Response Unauthorized

Vì vậy các testcase Authentication được kiểm tra ở mức Business Rule.

---

# 16. Nguyên tắc PASS / FAIL

### VALID

PASS khi dữ liệu hợp lệ được xử lý đúng và trạng thái Payment đúng.

### INVALID / EMPTY / NULL

PASS khi System:

* Không crash.
* Không lưu dữ liệu sai.
* Không cập nhật nhầm Payment.
* Không trả kết quả thành công giả.

### BOUNDARY

PASS khi giá trị ngoài miền hợp lý như `amount <= 0` không được ghi nhận thành thanh toán thành công.

### EXCEPTION

PASS khi:

* System giữ dữ liệu nhất quán.
* Không charge trùng.
* Không tạo Payment trùng.
* Không báo thành công nếu kết quả chưa được xác minh.

### BUSINESS RULE

PASS khi hành vi thực tế đúng với BRULE07 - BRULE10 và BRULE12.

Nếu Requirement yêu cầu nhưng API không đủ khả năng kiểm tra thì ghi:

`FAIL / GAP - Requirement/API chưa thống nhất hoặc chưa đầy đủ.`
