# TEST CASE - CUSTOMER MANAGEMENT

## 1. Quy tắc Coverage

Các Test Case phải bao phủ:

* VALID: dữ liệu hợp lệ.
* INVALID: dữ liệu không hợp lệ.
* EMPTY: giá trị chuỗi rỗng `""`.
* NULL: giá trị `null`.
* EXCEPTION: ngoại lệ trong quá trình xử lý.
* BUSINESS RULE: các quy tắc nghiệp vụ liên quan.
* BOUNDARY: giá trị biên nếu trường dữ liệu có miền giá trị.

Cấu trúc Test Case tuân theo mẫu Excel:

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
| ------------ | ------------- | --------- | ------------- | ---------- | --------- | --------------- | -------- |

---

# TS_CUS_01 - Customer đăng ký tài khoản

| Test Case ID   | Test Scenario              | Test Case                                            | Preconditions                                      | Test Steps                                                                                    | Test Data                                               | Expected Result                                                                                                                                                                 | Priority |
| -------------- | -------------------------- | ---------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TC-CUS-REG-001 | Customer đăng ký tài khoản | [VALID] Đăng ký với đầy đủ dữ liệu hợp lệ            | Customer chưa có tài khoản                         | 1. Gửi POST /api/customers/register 2. Nhập name, phone, password hợp lệ 3. Kiểm tra response | name: Nguyen Van A; phone: 0901234567; password: 123456 | Đăng ký thành công; System tạo Customer mới; response có customerId và thông báo thành công                                                                                     | High     |
| TC-CUS-REG-002 | Customer đăng ký tài khoản | [EMPTY] Phone là chuỗi rỗng                          | Customer chưa có tài khoản                         | 1. Gửi request Register 2. Truyền phone rỗng 3. Kiểm tra kết quả                              | name: Nguyen Van A; phone: ""; password: 123456         | Không tạo Customer hợp lệ; System từ chối dữ liệu hoặc trả lỗi validation; không trả kết quả đăng ký thành công                                                                 | High     |
| TC-CUS-REG-003 | Customer đăng ký tài khoản | [NULL] Phone bằng null                               | Customer chưa có tài khoản                         | 1. Gửi request Register 2. Truyền phone = null 3. Kiểm tra kết quả                            | name: Nguyen Van A; phone: null; password: 123456       | Không tạo Customer; không sinh customerId thành công; System xử lý null an toàn và trả kết quả lỗi phù hợp                                                                      | High     |
| TC-CUS-REG-004 | Customer đăng ký tài khoản | [EMPTY] Password là chuỗi rỗng                       | Customer chưa có tài khoản                         | 1. Gửi Register 2. Truyền password rỗng 3. Kiểm tra                                           | name: Nguyen Van A; phone: 0901234567; password: ""     | Không tạo tài khoản với password rỗng; không trả Registration successful                                                                                                        | High     |
| TC-CUS-REG-005 | Customer đăng ký tài khoản | [NULL] Name bằng null                                | Customer chưa có tài khoản                         | 1. Gửi Register 2. Truyền name = null 3. Kiểm tra                                             | name: null; phone: 0901234567; password: 123456         | System không tạo Customer có thông tin đăng ký không hợp lệ; trả lỗi phù hợp                                                                                                    | High     |
| TC-CUS-REG-006 | Customer đăng ký tài khoản | [INVALID] Dữ liệu phone không hợp lệ                 | Customer chưa có tài khoản                         | 1. Gửi Register 2. Truyền giá trị phone không phù hợp 3. Kiểm tra                             | name: Nguyen Van A; phone: abc@@@; password: 123456     | System không chấp nhận dữ liệu phone không hợp lệ nếu validation được áp dụng; không tạo dữ liệu sai                                                                            | Medium   |
| TC-CUS-REG-007 | Customer đăng ký tài khoản | [INVALID/BUSINESS] Đăng ký bằng tài khoản đã tồn tại | Đã có Customer sử dụng thông tin đăng ký tương ứng | 1. Gửi Register với dữ liệu đã tồn tại 2. Kiểm tra dữ liệu sau request                        | phone: 0901234567 đã tồn tại                            | System không được tạo tài khoản trùng nếu phone được dùng làm định danh đăng nhập; trả kết quả phù hợp                                                                          | High     |
| TC-CUS-REG-008 | Customer đăng ký tài khoản | [EXCEPTION] Mất kết nối khi đang đăng ký             | System đang xử lý request Register                 | 1. Gửi Register hợp lệ 2. Giả lập mất kết nối trong quá trình xử lý 3. Kiểm tra dữ liệu       | Dữ liệu hợp lệ; network disconnected                    | System không hiển thị thành công giả; không tạo dữ liệu Customer dở dang/trùng do retry; thông báo lỗi kết nối hoặc kết quả phù hợp. Cách xử lý chi tiết cần xác nhận theo EX06 | High     |

---

# TS_CUS_02 - Customer đăng nhập

| Test Case ID     | Test Scenario      | Test Case                                                        | Preconditions                                 | Test Steps                                                                            | Test Data                                  | Expected Result                                                                                                                              | Priority |
| ---------------- | ------------------ | ---------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TC-CUS-LOGIN-001 | Customer đăng nhập | [VALID] Đăng nhập bằng phone và password chính xác               | Customer đã có tài khoản                      | 1. POST /api/customers/login 2. Nhập phone 3. Nhập password đúng 4. Kiểm tra response | phone: 0901234567; password: 123456        | Đăng nhập thành công; trả đúng customerId; System cho phép Customer truy cập chức năng yêu cầu tài khoản                                     | High     |
| TC-CUS-LOGIN-002 | Customer đăng nhập | [INVALID] Phone không tồn tại                                    | System đang hoạt động                         | 1. Gửi Login 2. Nhập phone không tồn tại 3. Nhập password 4. Kiểm tra                 | phone: 0999999999; password: 123456        | Đăng nhập thất bại; không xác thực Customer; không cho truy cập chức năng bảo vệ                                                             | High     |
| TC-CUS-LOGIN-003 | Customer đăng nhập | [INVALID] Password không đúng                                    | Customer tồn tại                              | 1. Nhập phone đúng 2. Nhập password sai 3. Gửi Login                                  | phone: 0901234567; password: wrongPassword | Đăng nhập thất bại; không xác thực Customer                                                                                                  | High     |
| TC-CUS-LOGIN-004 | Customer đăng nhập | [EMPTY] Phone rỗng                                               | Đang thực hiện Login                          | 1. Gửi Login với phone rỗng 2. Kiểm tra                                               | phone: ""; password: 123456                | System không đăng nhập; trả validation phù hợp                                                                                               | High     |
| TC-CUS-LOGIN-005 | Customer đăng nhập | [NULL] Phone bằng null                                           | API Login hoạt động                           | 1. Gửi request 2. Truyền phone = null 3. Kiểm tra                                     | phone: null; password: 123456              | System xử lý null an toàn; đăng nhập thất bại; không trả customerId thành công                                                               | High     |
| TC-CUS-LOGIN-006 | Customer đăng nhập | [EMPTY] Password rỗng                                            | Customer tồn tại                              | 1. Nhập phone 2. Password để rỗng 3. Gửi Login                                        | phone: 0901234567; password: ""            | Không đăng nhập; System yêu cầu dữ liệu password hợp lệ                                                                                      | High     |
| TC-CUS-LOGIN-007 | Customer đăng nhập | [NULL] Password bằng null                                        | Customer tồn tại                              | 1. Gửi Login 2. Password = null 3. Kiểm tra                                           | phone: 0901234567; password: null          | Không xác thực Customer; không trả Login successful                                                                                          | High     |
| TC-CUS-LOGIN-008 | Customer đăng nhập | [NULL] Phone và password đều null                                | API Login hoạt động                           | 1. Gửi request với cả hai field null 2. Kiểm tra                                      | phone: null; password: null                | System không xảy ra lỗi không kiểm soát; từ chối request; không authentication                                                               | High     |
| TC-CUS-LOGIN-009 | Customer đăng nhập | [EXCEPTION] Mất kết nối khi Login                                | Customer tồn tại                              | 1. Gửi Login hợp lệ 2. Ngắt kết nối trước khi nhận response 3. Kiểm tra               | Network disconnected                       | System không báo đăng nhập thành công giả; phía client nhận được trạng thái lỗi kết nối phù hợp; cách phục hồi cụ thể cần xác nhận theo EX06 | Medium   |
| TC-CUS-LOGIN-010 | Customer đăng nhập | [BUSINESS RULE] Login thất bại rồi truy cập API yêu cầu xác thực | Customer chưa được xác thực do Login thất bại | 1. Login bằng password sai 2. Gọi chức năng cần tài khoản 3. Kiểm tra                 | Login invalid; sau đó GET profile/history  | System từ chối truy cập chức năng yêu cầu tài khoản vì Customer chưa được xác thực theo BRULE12                                              | High     |

---

# TS_CUS_03 - Customer xem thông tin cá nhân

| Test Case ID       | Test Scenario                  | Test Case                                     | Preconditions           | Test Steps                                                    | Test Data                         | Expected Result                                                                                                            | Priority |
| ------------------ | ------------------------------ | --------------------------------------------- | ----------------------- | ------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| TC-CUS-PROFILE-001 | Customer xem thông tin cá nhân | [VALID] Xem Profile bằng customerId tồn tại   | Customer đã đăng nhập   | 1. GET /api/customers/C001 2. Kiểm tra response               | customerId: C001                  | Trả đúng customerId, name, phone, email của C001; không trả nhầm Customer khác                                             | High     |
| TC-CUS-PROFILE-002 | Customer xem thông tin cá nhân | [INVALID] customerId không tồn tại            | Customer đã đăng nhập   | 1. GET /api/customers/C999 2. Kiểm tra                        | customerId: C999                  | Không trả thông tin Customer hợp lệ; không trả nhầm dữ liệu; trả kết quả resource không tồn tại phù hợp                    | High     |
| TC-CUS-PROFILE-003 | Customer xem thông tin cá nhân | [EMPTY] customerId rỗng                       | Customer đã đăng nhập   | 1. Gọi API với path không chứa giá trị customerId 2. Kiểm tra | customerId: empty                 | Request không được xử lý như một Customer hợp lệ; không trả nhầm Profile                                                   | Medium   |
| TC-CUS-PROFILE-004 | Customer xem thông tin cá nhân | [NULL] customerId có giá trị null             | Customer đã đăng nhập   | 1. Gọi API với customerId=null 2. Kiểm tra                    | customerId: null                  | Không trả Profile hợp lệ; System xử lý input không hợp lệ an toàn                                                          | Medium   |
| TC-CUS-PROFILE-005 | Customer xem thông tin cá nhân | [BUSINESS RULE] Xem Profile khi chưa xác thực | Customer chưa đăng nhập | 1. Gọi API Profile khi chưa authentication 2. Kiểm tra        | customerId: C001; unauthenticated | System từ chối chức năng yêu cầu tài khoản theo BRULE12; không để người chưa xác thực sử dụng chức năng                    | High     |
| TC-CUS-PROFILE-006 | Customer xem thông tin cá nhân | [EXCEPTION] Mất kết nối khi tải Profile       | Customer đã đăng nhập   | 1. Gửi GET Profile 2. Giả lập mất kết nối 3. Kiểm tra         | network disconnected              | Không hiển thị dữ liệu mới như thể request thành công; System/client xử lý lỗi kết nối phù hợp; không làm thay đổi Profile | Medium   |

---

# TS_CUS_04 - Customer cập nhật thông tin cá nhân

| Test Case ID   | Test Scenario                       | Test Case                                                   | Preconditions                     | Test Steps                                                                               | Test Data                                                                                             | Expected Result                                                                                                           | Priority |
| -------------- | ----------------------------------- | ----------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| TC-CUS-UPD-001 | Customer cập nhật thông tin cá nhân | [VALID] Cập nhật Profile với dữ liệu hợp lệ                 | Customer C001 đã đăng nhập        | 1. PUT /api/customers/C001 2. Gửi dữ liệu hợp lệ 3. Kiểm tra response 4. Lấy lại Profile | name: Nguyen Van A; phone: 0901234567; email: [nguyenvana@example.com](mailto:nguyenvana@example.com) | System cập nhật thành công; dữ liệu đọc lại khớp dữ liệu mới                                                              | High     |
| TC-CUS-UPD-002 | Customer cập nhật thông tin cá nhân | [EMPTY] Name rỗng                                           | Customer đã đăng nhập             | 1. PUT Profile 2. name="" 3. Kiểm tra                                                    | name: ""; phone: 0901234567; email: [nguyenvana@example.com](mailto:nguyenvana@example.com)           | Nếu name là dữ liệu bắt buộc, System không lưu giá trị rỗng và yêu cầu chỉnh sửa theo UC03                                | High     |
| TC-CUS-UPD-003 | Customer cập nhật thông tin cá nhân | [NULL] Phone bằng null                                      | Customer đã đăng nhập             | 1. PUT Profile 2. phone=null 3. Kiểm tra                                                 | name: Nguyen Van A; phone: null; email: [nguyenvana@example.com](mailto:nguyenvana@example.com)       | System không ghi dữ liệu không hợp lệ; dữ liệu trước đó không bị hỏng                                                     | High     |
| TC-CUS-UPD-004 | Customer cập nhật thông tin cá nhân | [INVALID] Email sai định dạng                               | Customer đã đăng nhập             | 1. PUT Profile 2. Nhập email không hợp lệ 3. Kiểm tra                                    | email: abc-invalid-email                                                                              | System yêu cầu chỉnh sửa thông tin không hợp lệ theo luồng thay thế UC03; không lưu email sai nếu validation được áp dụng | Medium   |
| TC-CUS-UPD-005 | Customer cập nhật thông tin cá nhân | [EMPTY/NULL] Các thông tin cập nhật không có giá trị hợp lệ | Customer đã đăng nhập             | 1. Gửi PUT 2. Truyền empty/null 3. Kiểm tra dữ liệu sau request                          | name:""; phone:null; email:""                                                                         | System không ghi đè Profile hợp lệ bằng toàn bộ dữ liệu trống/null; trả lỗi phù hợp                                       | High     |
| TC-CUS-UPD-006 | Customer cập nhật thông tin cá nhân | [BUSINESS RULE] Cập nhật Profile khi chưa đăng nhập         | Customer C001 chưa authentication | 1. PUT /api/customers/C001 2. Gửi dữ liệu hợp lệ 3. Kiểm tra                             | unauthenticated                                                                                       | System từ chối cập nhật theo BRULE12; Profile C001 không thay đổi                                                         | High     |
| TC-CUS-UPD-007 | Customer cập nhật thông tin cá nhân | [INVALID] Cập nhật Customer không tồn tại                   | Customer đã đăng nhập             | 1. PUT /api/customers/C999 2. Kiểm tra                                                   | customerId: C999                                                                                      | Không tạo Profile mới ngoài ý muốn; không cập nhật Customer khác; trả lỗi phù hợp                                         | High     |
| TC-CUS-UPD-008 | Customer cập nhật thông tin cá nhân | [EXCEPTION] Lỗi/mất kết nối trong lúc lưu Profile           | Customer đã đăng nhập             | 1. Gửi PUT hợp lệ 2. Giả lập lỗi kết nối/lỗi lưu 3. Kiểm tra dữ liệu                     | network/database exception                                                                            | Không để Profile ở trạng thái cập nhật dở dang; không thông báo thành công nếu việc lưu thất bại; dữ liệu phải nhất quán  | High     |

---

# TS_CUS_05 - Customer xem lịch sử chuyến

| Test Case ID   | Test Scenario               | Test Case                                             | Preconditions                                     | Test Steps                                             | Test Data                         | Expected Result                                                                                                      | Priority |
| -------------- | --------------------------- | ----------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| TC-CUS-HIS-001 | Customer xem lịch sử chuyến | [VALID] Customer có lịch sử chuyến                    | Customer đã đăng nhập và có Trip                  | 1. GET /api/customers/C001/trips 2. Kiểm tra danh sách | customerId: C001                  | System trả danh sách Trip đúng của C001; mỗi Trip có thông tin được API mô tả                                        | High     |
| TC-CUS-HIS-002 | Customer xem lịch sử chuyến | [VALID] Customer tồn tại nhưng chưa có lịch sử chuyến | Customer C002 đã đăng nhập và chưa thực hiện Trip | 1. GET /api/customers/C002/trips 2. Kiểm tra           | customerId: C002                  | System không coi đây là lỗi; trả danh sách rỗng hoặc thông báo chưa có chuyến theo UC06                              | Medium   |
| TC-CUS-HIS-003 | Customer xem lịch sử chuyến | [INVALID] Customer không tồn tại                      | Customer đã đăng nhập                             | 1. GET /api/customers/C999/trips 2. Kiểm tra           | customerId: C999                  | Không trả lịch sử của Customer khác; trả kết quả không tồn tại phù hợp                                               | High     |
| TC-CUS-HIS-004 | Customer xem lịch sử chuyến | [NULL] customerId = null                              | Có phiên đăng nhập                                | 1. Gửi request với customerId=null 2. Kiểm tra         | customerId: null                  | Không trả danh sách Trip hợp lệ; xử lý giá trị null an toàn                                                          | Medium   |
| TC-CUS-HIS-005 | Customer xem lịch sử chuyến | [BUSINESS RULE] Xem lịch sử khi chưa đăng nhập        | Customer chưa authentication                      | 1. Gọi API Trip History 2. Kiểm tra                    | customerId: C001; unauthenticated | System từ chối truy cập theo BRULE12                                                                                 | High     |
| TC-CUS-HIS-006 | Customer xem lịch sử chuyến | [EXCEPTION] Mất kết nối khi lấy lịch sử               | Customer đã đăng nhập                             | 1. Gửi GET 2. Giả lập network exception 3. Kiểm tra    | network disconnected              | Không hiển thị dữ liệu mới như request thành công; không làm thay đổi dữ liệu lịch sử; thông báo lỗi kết nối phù hợp | Medium   |

---

# TS_CUS_06 - Customer đánh giá Driver

| Test Case ID    | Test Scenario            | Test Case                                            | Preconditions                                                      | Test Steps                                                           | Test Data                                                    | Expected Result                                                                                                            | Priority |
| --------------- | ------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| TC-CUS-RATE-001 | Customer đánh giá Driver | [VALID] Đánh giá Driver sau chuyến hoàn thành        | Customer đã đăng nhập; Trip T001 đã COMPLETED; D001 thực hiện Trip | 1. POST /api/customers/C001/ratings 2. Gửi rating hợp lệ 3. Kiểm tra | tripId:T001; driverId:D001; rating:5; comment:"Good service" | Rating được ghi nhận; System trả Driver rating submitted successfully                                                      | High     |
| TC-CUS-RATE-002 | Customer đánh giá Driver | [BUSINESS RULE] Đánh giá khi Trip chưa hoàn thành    | Customer đã đăng nhập; Trip T002 chưa COMPLETED                    | 1. Gửi Rating cho T002 2. Kiểm tra                                   | tripId:T002; driverId:D001; rating:5                         | System không ghi nhận đánh giá vì UC08 yêu cầu chuyến đã hoàn thành                                                        | High     |
| TC-CUS-RATE-003 | Customer đánh giá Driver | [EMPTY] Rating để rỗng                               | Trip đã hoàn thành                                                 | 1. Gửi Rating 2. Không cung cấp giá trị rating hợp lệ 3. Kiểm tra    | rating: empty                                                | System không ghi nhận rating thiếu giá trị; trả validation phù hợp                                                         | High     |
| TC-CUS-RATE-004 | Customer đánh giá Driver | [NULL] Rating bằng null                              | Trip đã hoàn thành                                                 | 1. Gửi request 2. rating=null 3. Kiểm tra                            | rating:null                                                  | Không ghi nhận đánh giá null; không trả thành công giả                                                                     | High     |
| TC-CUS-RATE-005 | Customer đánh giá Driver | [BOUNDARY/INVALID] Rating nhỏ hơn miền cho phép      | Trip đã hoàn thành                                                 | 1. Gửi rating dưới giá trị nhỏ nhất 2. Kiểm tra                      | rating:0                                                     | Nếu thang rating được xác nhận là 1–5, System phải từ chối rating 0. Miền rating cần được xác nhận vì API hiện chưa ghi rõ | Medium   |
| TC-CUS-RATE-006 | Customer đánh giá Driver | [BOUNDARY/INVALID] Rating lớn hơn miền cho phép      | Trip đã hoàn thành                                                 | 1. Gửi rating lớn hơn giá trị tối đa 2. Kiểm tra                     | rating:6                                                     | Nếu thang rating là 1–5, System phải từ chối rating 6; không lưu dữ liệu ngoài miền                                        | Medium   |
| TC-CUS-RATE-007 | Customer đánh giá Driver | [NULL] tripId bằng null                              | Customer đã đăng nhập                                              | 1. Gửi rating với tripId=null 2. Kiểm tra                            | tripId:null; driverId:D001; rating:5                         | System không ghi nhận rating vì không xác định được Trip đã hoàn thành                                                     | High     |
| TC-CUS-RATE-008 | Customer đánh giá Driver | [INVALID] Trip không tồn tại                         | Customer đã đăng nhập                                              | 1. Gửi Rating cho T999 2. Kiểm tra                                   | tripId:T999; driverId:D001; rating:5                         | Không ghi nhận rating cho Trip không tồn tại; không ảnh hưởng Trip/Driver khác                                             | High     |
| TC-CUS-RATE-009 | Customer đánh giá Driver | [INVALID] Driver không tồn tại hoặc không thuộc Trip | Customer đã đăng nhập; Trip tồn tại                                | 1. Gửi rating cho Driver không hợp lệ 2. Kiểm tra                    | tripId:T001; driverId:D999; rating:5                         | System không ghi nhận đánh giá sai Driver; không cập nhật Driver khác                                                      | High     |
| TC-CUS-RATE-010 | Customer đánh giá Driver | [BUSINESS RULE] Đánh giá khi chưa xác thực           | Trip đã hoàn thành; Customer chưa đăng nhập                        | 1. Gửi POST Rating 2. Kiểm tra                                       | customerId:C001; unauthenticated                             | System từ chối chức năng yêu cầu tài khoản theo BRULE12; rating không được ghi nhận                                        | High     |
| TC-CUS-RATE-011 | Customer đánh giá Driver | [EXCEPTION] Mất kết nối/lỗi hệ thống khi ghi Rating  | Customer đã đăng nhập; Trip hoàn thành                             | 1. Gửi rating hợp lệ 2. Giả lập lỗi trong lúc lưu 3. Kiểm tra        | rating:5; network/database exception                         | Không tạo rating dở dang hoặc trùng do retry; không báo thành công nếu việc ghi nhận thất bại                              | Medium   |

---

# 4. Coverage Matrix

| Scenario                   | Valid | Invalid | Empty                 | Null | Exception | Business Rule                                   | Boundary                      |
| -------------------------- | ----- | ------- | --------------------- | ---- | --------- | ----------------------------------------------- | ----------------------------- |
| TS_CUS_01 - Register       | Có    | Có      | Có                    | Có   | Có        | Có trường hợp tài khoản trùng cần xác nhận rule | Không áp dụng rõ              |
| TS_CUS_02 - Login          | Có    | Có      | Có                    | Có   | Có        | Có - BRULE12                                    | Không áp dụng rõ              |
| TS_CUS_03 - Get Profile    | Có    | Có      | Có                    | Có   | Có        | Có - BRULE12                                    | Không áp dụng                 |
| TS_CUS_04 - Update Profile | Có    | Có      | Có                    | Có   | Có        | Có - BRULE12                                    | Chưa có rule biên cụ thể      |
| TS_CUS_05 - Trip History   | Có    | Có      | Không có Request Body | Có   | Có        | Có - BRULE12                                    | Không áp dụng                 |
| TS_CUS_06 - Rating         | Có    | Có      | Có                    | Có   | Có        | Có - Trip phải hoàn thành + BRULE12             | Có - cần xác nhận miền rating |

---

# 5. Các điểm chưa được Requirement/API xác định rõ

Các Test Case vẫn phải được giữ để phát hiện vấn đề, nhưng không tự đặt quy tắc chính thức nếu tài liệu chưa quy định.

## Validation chưa xác định

Customer API chưa quy định cụ thể:

* Độ dài tối thiểu/tối đa của name.
* Định dạng phone chính thức.
* Độ dài/quy tắc password.
* Định dạng và độ dài email.
* Phone có bắt buộc unique hay không.
* Rating chính thức có phải từ 1 đến 5 hay không.

Vì vậy các Test Case liên quan những rule trên được xem là testcase xác minh validation và cần đối chiếu thêm khi requirement được xác nhận.

## Error Response chưa xác định

API chưa mô tả đầy đủ:

* HTTP Status Code khi lỗi.
* Error message/schema.
* Resource not found.
* Validation error.
* Authentication error.

Do đó Expected Result hiện tập trung vào nghiệp vụ:

* Không xử lý dữ liệu sai.
* Không tạo/cập nhật nhầm dữ liệu.
* Không trả kết quả thành công giả.
* Không cho người chưa xác thực sử dụng chức năng yêu cầu tài khoản.

## Exception

EX06 trong SRS xác định trường hợp mất kết nối mạng nhưng cách xử lý cụ thể vẫn cần được khách hàng xác nhận.

Vì vậy testcase Exception kiểm tra tối thiểu:

* Không báo thành công nếu request chưa hoàn tất.
* Không làm hỏng dữ liệu.
* Không tạo dữ liệu trùng/dở dang do retry.
* Có phản hồi hoặc trạng thái lỗi phù hợp.
