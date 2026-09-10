# TEST CASE - DRIVER MANAGEMENT

## 1. Mục đích

Tài liệu xây dựng Test Case chi tiết cho Driver dựa trên:

* Driver API
* UC09 - UC13
* FR08, FR09, FR13
* AC05, AC06, AC10
* Business Rules
* Exceptions
* Mẫu Excel Test Case của giảng viên

Mỗi Test Scenario được kiểm tra theo các nhóm:

`VALID`, `INVALID`, `EMPTY`, `NULL`, `EXCEPTION`, `BUSINESS RULE`, `BOUNDARY/ENUM` nếu phù hợp.

Cấu trúc sử dụng đúng 8 cột:

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
| ------------ | ------------- | --------- | ------------- | ---------- | --------- | --------------- | -------- |

---

# 2. TS_DRV_01 - Driver đăng ký tài khoản

| Test Case ID   | Test Scenario            | Test Case                                            | Preconditions               | Test Steps                                                                                  | Test Data                                          | Expected Result                                                                          | Priority |
| -------------- | ------------------------ | ---------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| TC-DRV-REG-001 | Driver đăng ký tài khoản | [VALID] Đăng ký với đầy đủ dữ liệu hợp lệ            | Driver chưa có tài khoản    | 1. POST /api/drivers/register; 2. Nhập dữ liệu hợp lệ; 3. Gửi request; 4. Kiểm tra response | name=Tran Van B; phone=0912345678; password=123456 | Tạo Driver thành công; response có driverId; thông báo đăng ký thành công                | High     |
| TC-DRV-REG-002 | Driver đăng ký tài khoản | [EMPTY] Name rỗng                                    | Driver chưa có tài khoản    | Gửi Register với name rỗng                                                                  | name=""; phone=0912345678; password=123456         | Không tạo Driver hợp lệ; không trả kết quả đăng ký thành công                            | High     |
| TC-DRV-REG-003 | Driver đăng ký tài khoản | [EMPTY] Phone rỗng                                   | Driver chưa có tài khoản    | Gửi Register với phone rỗng                                                                 | name=Tran Van B; phone=""; password=123456         | System từ chối dữ liệu; không tạo Driver có phone rỗng                                   | High     |
| TC-DRV-REG-004 | Driver đăng ký tài khoản | [EMPTY] Password rỗng                                | Driver chưa có tài khoản    | Gửi Register với password rỗng                                                              | name=Tran Van B; phone=0912345678; password=""     | Không tạo tài khoản hợp lệ; không trả registration successful                            | High     |
| TC-DRV-REG-005 | Driver đăng ký tài khoản | [NULL] Name=null                                     | Driver chưa có tài khoản    | Truyền name=null và gửi request                                                             | name=null; phone=0912345678; password=123456       | System xử lý null an toàn; không tạo dữ liệu sai                                         | High     |
| TC-DRV-REG-006 | Driver đăng ký tài khoản | [NULL] Phone=null                                    | Driver chưa có tài khoản    | Truyền phone=null                                                                           | name=Tran Van B; phone=null; password=123456       | Không tạo Driver hợp lệ; trả kết quả lỗi phù hợp                                         | High     |
| TC-DRV-REG-007 | Driver đăng ký tài khoản | [NULL] Password=null                                 | Driver chưa có tài khoản    | Truyền password=null                                                                        | name=Tran Van B; phone=0912345678; password=null   | Không tạo tài khoản không có password                                                    | High     |
| TC-DRV-REG-008 | Driver đăng ký tài khoản | [INVALID] Phone có dữ liệu không hợp lệ              | Driver chưa có tài khoản    | Nhập phone không phù hợp và gửi Register                                                    | phone=abc@@@                                       | Nếu System có validation phone thì phải từ chối; không lưu dữ liệu sai                   | Medium   |
| TC-DRV-REG-009 | Driver đăng ký tài khoản | [BUSINESS] Đăng ký bằng dữ liệu tài khoản đã tồn tại | Đã tồn tại Driver tương ứng | Gửi lại Register với phone đang được sử dụng                                                | phone=0912345678 đã tồn tại                        | Nếu phone là định danh duy nhất, System không tạo Driver trùng; rule unique cần xác nhận | High     |
| TC-DRV-REG-010 | Driver đăng ký tài khoản | [EXCEPTION] Mất kết nối khi Register                 | Driver chưa có tài khoản    | 1. Gửi request hợp lệ; 2. Giả lập mất mạng; 3. Kiểm tra dữ liệu sau khi kết nối lại         | network disconnected                               | Không báo thành công giả; không tạo dữ liệu dở dang hoặc trùng khi retry                 | High     |

---

# 3. TS_DRV_02 - Driver cập nhật Profile và Vehicle

| Test Case ID   | Test Scenario                      | Test Case                                        | Preconditions                          | Test Steps                                                                | Test Data                                                                  | Expected Result                                                                                  | Priority |
| -------------- | ---------------------------------- | ------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------- |
| TC-DRV-UPD-001 | Driver cập nhật Profile và Vehicle | [VALID] Cập nhật đầy đủ dữ liệu hợp lệ           | Driver D001 tồn tại và đã xác thực     | PUT /api/drivers/D001 với dữ liệu hợp lệ; sau đó lấy lại dữ liệu kiểm tra | name=Tran Van B; phone=0912345678; vehicleType=CAR; licensePlate=51A-12345 | Cập nhật thành công; dữ liệu sau cập nhật khớp request                                           | High     |
| TC-DRV-UPD-002 | Driver cập nhật Profile và Vehicle | [INVALID] driverId không tồn tại                 | Driver đã xác thực                     | PUT /api/drivers/D999                                                     | driverId=D999                                                              | Không tạo Driver mới ngoài ý muốn; không cập nhật Driver khác                                    | High     |
| TC-DRV-UPD-003 | Driver cập nhật Profile và Vehicle | [EMPTY] Name rỗng                                | D001 tồn tại                           | Gửi PUT với name=""                                                       | name=""                                                                    | Nếu name bắt buộc, System không lưu giá trị rỗng                                                 | Medium   |
| TC-DRV-UPD-004 | Driver cập nhật Profile và Vehicle | [EMPTY] vehicleType rỗng                         | D001 tồn tại                           | Gửi PUT với vehicleType=""                                                | vehicleType=""                                                             | Không lưu loại xe không hợp lệ nếu field bắt buộc                                                | High     |
| TC-DRV-UPD-005 | Driver cập nhật Profile và Vehicle | [EMPTY] licensePlate rỗng                        | D001 tồn tại                           | Gửi PUT với licensePlate=""                                               | licensePlate=""                                                            | Không ghi đè biển số hợp lệ bằng dữ liệu rỗng nếu field bắt buộc                                 | High     |
| TC-DRV-UPD-006 | Driver cập nhật Profile và Vehicle | [NULL] Phone=null                                | D001 tồn tại                           | Truyền phone=null                                                         | phone=null                                                                 | Không làm hỏng dữ liệu Driver; xử lý null an toàn                                                | High     |
| TC-DRV-UPD-007 | Driver cập nhật Profile và Vehicle | [NULL] licensePlate=null                         | D001 tồn tại                           | Truyền licensePlate=null                                                  | licensePlate=null                                                          | Không cập nhật phương tiện bằng dữ liệu không hợp lệ                                             | High     |
| TC-DRV-UPD-008 | Driver cập nhật Profile và Vehicle | [INVALID] vehicleType không hợp lệ               | D001 tồn tại                           | Gửi loại xe không thuộc danh sách được hỗ trợ                             | vehicleType=SPACESHIP                                                      | System không lưu vehicleType không hợp lệ; danh sách chính thức cần xác nhận từ requirement/API  | Medium   |
| TC-DRV-UPD-009 | Driver cập nhật Profile và Vehicle | [INVALID] Biển số không hợp lệ                   | D001 tồn tại                           | Gửi licensePlate không phù hợp                                            | licensePlate=@@@                                                           | Nếu có validation biển số, System phải từ chối                                                   | Medium   |
| TC-DRV-UPD-010 | Driver cập nhật Profile và Vehicle | [BUSINESS RULE] Driver chưa xác thực cố cập nhật | D001 tồn tại nhưng chưa authentication | Gọi PUT /api/drivers/D001                                                 | unauthenticated                                                            | System từ chối chức năng yêu cầu tài khoản theo BRULE12; dữ liệu không thay đổi                  | High     |
| TC-DRV-UPD-011 | Driver cập nhật Profile và Vehicle | [EXCEPTION] Lỗi khi lưu Profile/Vehicle          | Driver đã xác thực                     | Gửi PUT hợp lệ và giả lập lỗi lưu                                         | database/network exception                                                 | Không để Profile cập nhật một phần còn Vehicle thất bại hoặc ngược lại; không báo thành công giả | High     |

---

# 4. TS_DRV_03 - Driver cập nhật trạng thái sẵn sàng

| Test Case ID   | Test Scenario                       | Test Case                                                             | Preconditions               | Test Steps                                               | Test Data            | Expected Result                                                             | Priority |
| -------------- | ----------------------------------- | --------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------- | -------- |
| TC-DRV-STS-001 | Driver cập nhật trạng thái sẵn sàng | [VALID] Chuyển sang AVAILABLE                                         | D001 tồn tại và đã xác thực | PUT /api/drivers/D001/status                             | status=AVAILABLE     | Status được cập nhật thành AVAILABLE                                        | High     |
| TC-DRV-STS-002 | Driver cập nhật trạng thái sẵn sàng | [VALID] Chuyển sang trạng thái không sẵn sàng                         | D001 đang AVAILABLE         | Gửi status không sẵn sàng hợp lệ theo API                | status=UNAVAILABLE   | Driver chuyển sang trạng thái không sẵn sàng                                | High     |
| TC-DRV-STS-003 | Driver cập nhật trạng thái sẵn sàng | [INVALID/ENUM] Status không hợp lệ                                    | D001 tồn tại                | PUT status=ABC                                           | status=ABC           | System không lưu status không thuộc miền hợp lệ                             | High     |
| TC-DRV-STS-004 | Driver cập nhật trạng thái sẵn sàng | [EMPTY] Status rỗng                                                   | D001 tồn tại                | PUT status=""                                            | status=""            | Không cập nhật thành trạng thái rỗng                                        | High     |
| TC-DRV-STS-005 | Driver cập nhật trạng thái sẵn sàng | [NULL] Status=null                                                    | D001 tồn tại                | PUT status=null                                          | status=null          | System xử lý null an toàn; trạng thái cũ không bị hỏng                      | High     |
| TC-DRV-STS-006 | Driver cập nhật trạng thái sẵn sàng | [NULL] driverId=null                                                  | Driver đã xác thực          | Gọi API với driverId=null                                | driverId=null        | Không cập nhật Driver hợp lệ nào                                            | Medium   |
| TC-DRV-STS-007 | Driver cập nhật trạng thái sẵn sàng | [BUSINESS RULE] Driver AVAILABLE có thể nhận yêu cầu chuyến           | D001 đã AVAILABLE           | 1. Cập nhật AVAILABLE; 2. Kiểm tra điều kiện nhận chuyến | status=AVAILABLE     | Driver đủ điều kiện về availability theo BRULE01                            | High     |
| TC-DRV-STS-008 | Driver cập nhật trạng thái sẵn sàng | [BUSINESS RULE] Driver không AVAILABLE không được nhận yêu cầu chuyến | D001 đang không AVAILABLE   | Kiểm tra xử lý request chuyến                            | status=UNAVAILABLE   | Driver không được xử lý như Driver sẵn sàng theo BRULE01                    | High     |
| TC-DRV-STS-009 | Driver cập nhật trạng thái sẵn sàng | [BUSINESS RULE] Chưa xác thực nhưng cập nhật status                   | D001 chưa authentication    | PUT /api/drivers/D001/status                             | unauthenticated      | System từ chối theo BRULE12                                                 | High     |
| TC-DRV-STS-010 | Driver cập nhật trạng thái sẵn sàng | [EXCEPTION] Mất kết nối lúc cập nhật                                  | Driver đã xác thực          | Gửi PUT rồi ngắt mạng trước response                     | network disconnected | Không hiển thị thành công giả; khi kết nối lại phải xác minh status thực tế | Medium   |

---

# 5. TS_DRV_04 - Lấy thông tin Driver

| Test Case ID   | Test Scenario        | Test Case                                                      | Preconditions              | Test Steps                  | Test Data            | Expected Result                                                      | Priority |
| -------------- | -------------------- | -------------------------------------------------------------- | -------------------------- | --------------------------- | -------------------- | -------------------------------------------------------------------- | -------- |
| TC-DRV-GET-001 | Lấy thông tin Driver | [VALID] Lấy Driver tồn tại                                     | D001 tồn tại               | GET /api/drivers/D001       | driverId=D001        | Trả đúng driverId, name, phone, status, location                     | High     |
| TC-DRV-GET-002 | Lấy thông tin Driver | [INVALID] Driver không tồn tại                                 | D999 không tồn tại         | GET /api/drivers/D999       | driverId=D999        | Không trả nhầm Driver khác; trả kết quả không tồn tại phù hợp        | High     |
| TC-DRV-GET-003 | Lấy thông tin Driver | [EMPTY] driverId rỗng                                          | API hoạt động              | Gọi URL không có giá trị ID | driverId=""          | Không xử lý như một Driver hợp lệ                                    | Medium   |
| TC-DRV-GET-004 | Lấy thông tin Driver | [NULL] driverId=null                                           | API hoạt động              | GET với path chứa null      | driverId=null        | Không trả Driver hợp lệ; xử lý input an toàn                         | Medium   |
| TC-DRV-GET-005 | Lấy thông tin Driver | [BUSINESS RULE] Chưa xác thực truy cập chức năng cần tài khoản | Driver chưa authentication | Gọi Get Driver              | unauthenticated      | Nếu endpoint thuộc chức năng tài khoản, System phải thực thi BRULE12 | High     |
| TC-DRV-GET-006 | Lấy thông tin Driver | [EXCEPTION] Mất kết nối khi tải Driver                         | Driver hợp lệ              | Gửi GET và ngắt mạng        | network disconnected | Không hiển thị response mới như thành công; không thay đổi dữ liệu   | Low      |

---

# 6. TS_DRV_05 - Driver chấp nhận chuyến

| Test Case ID   | Test Scenario           | Test Case                                        | Preconditions                                     | Test Steps                                          | Test Data                  | Expected Result                                                                   | Priority |
| -------------- | ----------------------- | ------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------- | -------- |
| TC-DRV-ACC-001 | Driver chấp nhận chuyến | [VALID] Driver AVAILABLE Accept Trip hợp lệ      | D001 AVAILABLE; T001 tồn tại và đang chờ phản hồi | POST /api/drivers/D001/trips/T001/accept            | driverId=D001; tripId=T001 | Trip được D001 chấp nhận; response trả đúng tripId và driverId                    | High     |
| TC-DRV-ACC-002 | Driver chấp nhận chuyến | [INVALID] Driver không tồn tại                   | T001 tồn tại                                      | Gọi Accept với D999                                 | driverId=D999              | Không gán Trip cho Driver không tồn tại                                           | High     |
| TC-DRV-ACC-003 | Driver chấp nhận chuyến | [INVALID] Trip không tồn tại                     | D001 tồn tại                                      | Gọi Accept T999                                     | tripId=T999                | Không tạo/gán Trip ngoài ý muốn                                                   | High     |
| TC-DRV-ACC-004 | Driver chấp nhận chuyến | [NULL] driverId=null                             | Trip tồn tại                                      | Gọi Accept với driverId=null                        | driverId=null              | Không gán Driver hợp lệ nào                                                       | High     |
| TC-DRV-ACC-005 | Driver chấp nhận chuyến | [NULL] tripId=null                               | Driver tồn tại                                    | Gọi Accept với tripId=null                          | tripId=null                | Không xử lý thành Trip hợp lệ                                                     | High     |
| TC-DRV-ACC-006 | Driver chấp nhận chuyến | [BUSINESS RULE] Driver không AVAILABLE cố Accept | D001 không AVAILABLE                              | Gọi Accept T001                                     | status=UNAVAILABLE         | System không cho D001 nhận Trip theo BRULE01                                      | High     |
| TC-DRV-ACC-007 | Driver chấp nhận chuyến | [BUSINESS RULE] Trip đã có Driver khác           | T001 đã được D001 nhận                            | D002 tiếp tục Accept T001                           | D002 + T001                | System không gán thêm D002; một Trip chỉ có một Driver được xác nhận theo BRULE05 | High     |
| TC-DRV-ACC-008 | Driver chấp nhận chuyến | [BUSINESS RULE] Driver chưa xác thực Accept Trip | D001 chưa authentication                          | Gửi Accept                                          | unauthenticated            | System từ chối theo BRULE12                                                       | High     |
| TC-DRV-ACC-009 | Driver chấp nhận chuyến | [EXCEPTION] Mất kết nối ngay khi Accept          | D001 AVAILABLE; T001 hợp lệ                       | 1. Gửi Accept; 2. Mất mạng trước response; 3. Retry | network disconnected       | Không gán Trip hai lần; khi retry phải kiểm tra trạng thái Trip thực tế           | High     |

---

# 7. TS_DRV_06 - Driver từ chối chuyến

| Test Case ID   | Test Scenario         | Test Case                                              | Preconditions                                                     | Test Steps                               | Test Data                  | Expected Result                                                                                    | Priority |
| -------------- | --------------------- | ------------------------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------- | -------- |
| TC-DRV-REJ-001 | Driver từ chối chuyến | [VALID] Driver Reject Trip hợp lệ                      | D001 đang nhận yêu cầu T001                                       | POST /api/drivers/D001/trips/T001/reject | driverId=D001; tripId=T001 | Ghi nhận từ chối; không gán Trip cho D001; System tiếp tục xử lý Trip                              | High     |
| TC-DRV-REJ-002 | Driver từ chối chuyến | [INVALID] Driver không tồn tại                         | T001 tồn tại                                                      | Reject bằng D999                         | driverId=D999              | Không thay đổi Trip dựa trên Driver không tồn tại                                                  | High     |
| TC-DRV-REJ-003 | Driver từ chối chuyến | [INVALID] Trip không tồn tại                           | D001 tồn tại                                                      | Reject T999                              | tripId=T999                | Không cập nhật dữ liệu Trip khác                                                                   | High     |
| TC-DRV-REJ-004 | Driver từ chối chuyến | [NULL] driverId=null                                   | Trip tồn tại                                                      | Reject với driverId=null                 | driverId=null              | Không ghi nhận Reject cho Driver hợp lệ nào                                                        | Medium   |
| TC-DRV-REJ-005 | Driver từ chối chuyến | [NULL] tripId=null                                     | Driver tồn tại                                                    | Reject với tripId=null                   | tripId=null                | Không xử lý request như một Trip hợp lệ                                                            | Medium   |
| TC-DRV-REJ-006 | Driver từ chối chuyến | [INVALID] Driver không phải người đang nhận request    | T001 đang được gửi cho D001                                       | D002 Reject T001                         | driverId=D002              | System không ghi nhận sai Driver nếu nghiệp vụ yêu cầu đúng Driver được mời phản hồi               | High     |
| TC-DRV-REJ-007 | Driver từ chối chuyến | [INVALID STATE] Reject Trip đã COMPLETED               | T001 đã COMPLETED                                                 | D001 Reject T001                         | status=COMPLETED           | System không làm thay đổi một Trip đã hoàn thành bởi Reject không phù hợp trạng thái               | High     |
| TC-DRV-REJ-008 | Driver từ chối chuyến | [BUSINESS RULE] Customer không phải đặt lại sau Reject | D001 Reject T001                                                  | Theo dõi Trip sau Reject                 | T001                       | Trip hiện tại tiếp tục được xử lý theo BRULE03; Customer không tạo lại yêu cầu                     | High     |
| TC-DRV-REJ-009 | Driver từ chối chuyến | [BUSINESS/EXCEPTION] Driver không phản hồi             | Driver nhận request nhưng không thao tác trong thời gian quy định | Chờ hết thời gian phản hồi               | timeout                    | System xử lý trường hợp không phản hồi theo BRULE04/EX02/EX07; không yêu cầu Customer tạo Trip mới | High     |
| TC-DRV-REJ-010 | Driver từ chối chuyến | [BUSINESS RULE] Driver chưa xác thực Reject Trip       | D001 chưa authentication                                          | Gửi Reject                               | unauthenticated            | System từ chối theo BRULE12                                                                        | High     |
| TC-DRV-REJ-011 | Driver từ chối chuyến | [EXCEPTION] Mất kết nối khi Reject                     | D001 đang xử lý request                                           | Gửi Reject rồi mất mạng                  | network disconnected       | Không tạo trạng thái mâu thuẫn; sau reconnect phải kiểm tra kết quả Reject thực tế                 | Medium   |

---

# 8. TS_DRV_07 - Driver cập nhật trạng thái Trip

| Test Case ID       | Test Scenario                   | Test Case                                                   | Preconditions                              | Test Steps                              | Test Data             | Expected Result                                                                                                                            | Priority |
| ------------------ | ------------------------------- | ----------------------------------------------------------- | ------------------------------------------ | --------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| TC-DRV-TRIPSTS-001 | Driver cập nhật trạng thái Trip | [VALID] Cập nhật ARRIVED                                    | D001 đã nhận T001                          | PUT /api/drivers/D001/trips/T001/status | status=ARRIVED        | Trip chuyển thành ARRIVED                                                                                                                  | High     |
| TC-DRV-TRIPSTS-002 | Driver cập nhật trạng thái Trip | [VALID] Cập nhật PICKED_UP                                  | T001 đang ở trạng thái phù hợp             | PUT status=PICKED_UP                    | status=PICKED_UP      | Trip chuyển thành PICKED_UP                                                                                                                | High     |
| TC-DRV-TRIPSTS-003 | Driver cập nhật trạng thái Trip | [VALID] Cập nhật IN_PROGRESS                                | Customer đã được đón                       | PUT status=IN_PROGRESS                  | status=IN_PROGRESS    | Trip chuyển thành IN_PROGRESS                                                                                                              | High     |
| TC-DRV-TRIPSTS-004 | Driver cập nhật trạng thái Trip | [VALID] Cập nhật COMPLETED                                  | Trip đang thực hiện                        | PUT status=COMPLETED                    | status=COMPLETED      | Trip chuyển thành COMPLETED                                                                                                                | High     |
| TC-DRV-TRIPSTS-005 | Driver cập nhật trạng thái Trip | [INVALID/ENUM] Status RUNNING                               | D001 đã nhận T001                          | PUT status=RUNNING                      | status=RUNNING        | Không cập nhật vì RUNNING không thuộc enum được API mô tả                                                                                  | High     |
| TC-DRV-TRIPSTS-006 | Driver cập nhật trạng thái Trip | [EMPTY] Status=""                                           | D001 đã nhận T001                          | PUT status=""                           | status=""             | Không lưu trạng thái rỗng                                                                                                                  | High     |
| TC-DRV-TRIPSTS-007 | Driver cập nhật trạng thái Trip | [NULL] Status=null                                          | D001 đã nhận T001                          | PUT status=null                         | status=null           | Không cập nhật Trip; trạng thái cũ được giữ nguyên                                                                                         | High     |
| TC-DRV-TRIPSTS-008 | Driver cập nhật trạng thái Trip | [NULL] driverId=null                                        | T001 tồn tại                               | Gọi API với driverId=null               | driverId=null         | Không cập nhật Trip bởi Driver không xác định                                                                                              | Medium   |
| TC-DRV-TRIPSTS-009 | Driver cập nhật trạng thái Trip | [NULL] tripId=null                                          | D001 tồn tại                               | Gọi API với tripId=null                 | tripId=null           | Không cập nhật Trip hợp lệ nào                                                                                                             | Medium   |
| TC-DRV-TRIPSTS-010 | Driver cập nhật trạng thái Trip | [INVALID] Driver không tồn tại                              | T001 tồn tại                               | D999 cập nhật T001                      | driverId=D999         | Không thay đổi trạng thái T001                                                                                                             | High     |
| TC-DRV-TRIPSTS-011 | Driver cập nhật trạng thái Trip | [INVALID] Trip không tồn tại                                | D001 tồn tại                               | Cập nhật T999                           | tripId=T999           | Không cập nhật dữ liệu Trip khác                                                                                                           | High     |
| TC-DRV-TRIPSTS-012 | Driver cập nhật trạng thái Trip | [BUSINESS RULE] Driver chưa nhận Trip nhưng cập nhật status | T001 thuộc Driver khác/chưa được D001 nhận | D001 PUT status                         | D001 + T001           | System không cho Driver không phụ trách Trip thay đổi trạng thái                                                                           | High     |
| TC-DRV-TRIPSTS-013 | Driver cập nhật trạng thái Trip | [BUSINESS RULE] Driver chưa xác thực cập nhật Trip          | D001 chưa authentication                   | Gửi PUT status                          | unauthenticated       | System từ chối theo BRULE12                                                                                                                | High     |
| TC-DRV-TRIPSTS-014 | Driver cập nhật trạng thái Trip | [STATE] Bỏ qua thứ tự trạng thái                            | T001 đang ARRIVED                          | PUT trực tiếp COMPLETED                 | ARRIVED → COMPLETED   | Ghi nhận kết quả thực tế và đối chiếu requirement; SRS/API chưa xác định rõ việc bắt buộc đi ARRIVED → PICKED_UP → IN_PROGRESS → COMPLETED | Medium   |
| TC-DRV-TRIPSTS-015 | Driver cập nhật trạng thái Trip | [STATE] Cập nhật ngược trạng thái                           | T001 đang IN_PROGRESS                      | PUT status=ARRIVED                      | IN_PROGRESS → ARRIVED | System không nên làm dữ liệu nghiệp vụ mâu thuẫn; quy tắc transition chính thức cần xác nhận                                               | Medium   |
| TC-DRV-TRIPSTS-016 | Driver cập nhật trạng thái Trip | [EXCEPTION] Chuyến phát sinh lỗi đang thực hiện             | T001 đang IN_PROGRESS                      | Giả lập EX05 trong quá trình Trip       | trip error            | Không đánh dấu COMPLETED giả; Trip phải giữ trạng thái phù hợp để Operations hỗ trợ xử lý                                                  | High     |
| TC-DRV-TRIPSTS-017 | Driver cập nhật trạng thái Trip | [EXCEPTION] Mất mạng trong lúc cập nhật status              | D001 đang thực hiện T001                   | Gửi PUT rồi mất mạng trước response     | network disconnected  | Không hiển thị thành công giả; khi kết nối lại phải lấy trạng thái thực tế trước khi gửi lại                                               | High     |

---

# 9. Coverage Matrix

| Scenario                     | Valid | Invalid | Empty          | Null | Exception | Business Rule                  | Boundary / Enum         |
| ---------------------------- | ----- | ------- | -------------- | ---- | --------- | ------------------------------ | ----------------------- |
| TS_DRV_01 Register           | Có    | Có      | Có             | Có   | Có        | Có                             | Validation cần xác nhận |
| TS_DRV_02 Update Profile     | Có    | Có      | Có             | Có   | Có        | Có - BRULE12                   | Validation cần xác nhận |
| TS_DRV_03 Availability       | Có    | Có      | Có             | Có   | Có        | Có - BRULE01, BRULE12          | Có - Enum Status        |
| TS_DRV_04 Get Driver         | Có    | Có      | Path Parameter | Có   | Có        | Có - BRULE12                   | Không áp dụng           |
| TS_DRV_05 Accept Trip        | Có    | Có      | Path Parameter | Có   | Có        | Có - BRULE01, BRULE05, BRULE12 | Không áp dụng           |
| TS_DRV_06 Reject Trip        | Có    | Có      | Path Parameter | Có   | Có        | Có - BRULE03, BRULE04, BRULE12 | Timeout                 |
| TS_DRV_07 Update Trip Status | Có    | Có      | Có             | Có   | Có        | Có - UC13, BRULE12             | Có - Enum và State      |

---

# 10. Tổng số Test Case

| Scenario                           |     Số Test Case |
| ---------------------------------- | ---------------: |
| TS_DRV_01 - Register               |               10 |
| TS_DRV_02 - Update Profile/Vehicle |               11 |
| TS_DRV_03 - Availability           |               10 |
| TS_DRV_04 - Get Driver             |                6 |
| TS_DRV_05 - Accept Trip            |                9 |
| TS_DRV_06 - Reject Trip            |               11 |
| TS_DRV_07 - Update Trip Status     |               17 |
| **Tổng**                           | **74 Test Case** |

---

# 11. Các Gap cần ghi nhận khi chạy test

| Gap        | Nội dung                                                                         |
| ---------- | -------------------------------------------------------------------------------- |
| GAP-DRV-01 | SRS yêu cầu Driver phải xác thực nhưng Driver API chưa có Login endpoint         |
| GAP-DRV-02 | API chưa mô tả Authorization Header, Token, Session hoặc Role                    |
| GAP-DRV-03 | Validation phone, password, licensePlate và vehicleType chưa quy định rõ         |
| GAP-DRV-04 | Danh sách Driver availability status chưa được xác định đầy đủ                   |
| GAP-DRV-05 | State transition của Trip chưa quy định rõ có bắt buộc tuần tự hay không         |
| GAP-DRV-06 | HTTP Status Code và error response cho các trường hợp lỗi chưa được mô tả đầy đủ |

---

# 12. Nguyên tắc đánh giá PASS/FAIL

Test Case Positive:

`PASS` khi System xử lý thành công và trả đúng dữ liệu mong đợi.

Test Case Invalid / Empty / Null:

`PASS` khi System từ chối dữ liệu sai một cách có kiểm soát, không làm hỏng hoặc cập nhật nhầm dữ liệu.

Test Case Exception:

`PASS` khi System không báo thành công giả, không tạo dữ liệu dở dang/trùng và dữ liệu vẫn nhất quán sau ngoại lệ.

Test Case Business Rule:

`PASS` khi hành vi thực tế tuân thủ Business Rule trong SRS.

Test Case Gap:

Nếu Requirement yêu cầu nhưng API không có khả năng thể hiện hoặc kiểm thử, ghi nhận:

`FAIL / GAP - Requirement/API chưa thống nhất.`

Không tự tạo endpoint, HTTP Status Code hoặc validation rule khi tài liệu chưa quy định.
