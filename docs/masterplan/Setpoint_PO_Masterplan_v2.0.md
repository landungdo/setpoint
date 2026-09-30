# SETPOINT — PO MASTERPLAN

**Người đồng hành cho người vừa tập gym vừa chơi thể thao dùng vợt**
*Gym + Court + Food — ưu tiên châu Á, hướng tới toàn cầu*

| Mục | Nội dung |
|---|---|
| Tên sản phẩm | **Setpoint** (tên mã — chờ kiểm tra nhãn hiệu, xem mục 2.5) |
| Phiên bản tài liệu | **2.0** |
| Ngày | 29/09/2026 |
| Product Owner | Darren (Đỗ Lân Dũng) |
| Trạng thái | Định hướng đã duyệt; còn các quyết định mở ở mục 19 |
| Phạm vi | Thiết kế cho toàn cầu · Thử nghiệm song ngữ Việt – Anh · Ra mắt theo từng thị trường, bắt đầu từ Việt Nam |
| Thay đổi so với v1.0 | Pivot định vị sang "gym + thể thao dùng vợt"; đổi tên; bổ sung đối thủ mới; điều chỉnh chỉ tiêu giữ chân; Cuisine Engine chuyển sang ghi theo khẩu phần (chi tiết Phụ lục C) |

---

## Mục lục

0. Tóm tắt điều hành
1. Nghiên cứu thị trường & đối thủ
2. Tầm nhìn, định vị & thương hiệu
3. Người dùng mục tiêu
4. Nguyên tắc sản phẩm
5. Chỉ số thành công
6. Giải pháp: tính năng đặc trưng
7. Logic nghiệp vụ cốt lõi
8. Phạm vi & ưu tiên
9. User stories & tiêu chí chấp nhận
10. Yêu cầu phi chức năng & quốc tế hóa
11. Kiến trúc kỹ thuật & mô hình dữ liệu
12. Kiến trúc thông tin
13. Lộ trình & cổng quyết định
14. Chiến lược ra thị trường
15. Mô hình kinh doanh
16. Pháp lý & tuân thủ
17. Quản trị rủi ro
18. Vận hành dự án
19. Quyết định mở & giả thuyết cần kiểm chứng
- Phụ lục A — Nguồn tham khảo
- Phụ lục B — Thuật ngữ
- Phụ lục C — Lịch sử phiên bản

---

## 0. Tóm tắt điều hành

**Vấn đề.** Người trẻ ở đô thị châu Á ngày càng kết hợp tập gym với thể thao dùng vợt — pickleball, cầu lông, tennis, padel. Họ phải ghép nhiều ứng dụng rời rạc: một app ghi tạ, một app đếm calo, còn buổi đánh vợt thì không ghi ở đâu cả. Không app nào hiểu rằng buổi pickleball tối qua ảnh hưởng tới buổi đẩy vai hôm nay, và các app dinh dưỡng quốc tế không hiểu một suất cơm quán.

**Bối cảnh cạnh tranh.** Mảng "tập lai" ở phương Tây đã có những đối thủ mạnh (HYBRD, Edge, hệ sinh thái Strava – Runna), nhưng họ xoay quanh chạy, đạp xe, bơi, Hyrox; dựa vào thiết bị đeo; và bán giá cao (~18–22 USD/tháng). **Thể thao dùng vợt và người dùng châu Á là khoảng trống.**

**Giải pháp.** Setpoint là cuốn sổ tập luyện và ăn uống cho người vừa tập gym vừa chơi vợt: ghi set một chạm, tự gợi ý tăng tạ, hiểu tải từ sân đấu, và gợi ý ăn uống theo món thực sự ăn — ghi bằng khẩu phần trực quan, với mục tiêu calo tự hiệu chỉnh như một vòng điều khiển.

**Bốn điểm khác biệt** (xếp theo độ khó sao chép):
1. **Hiểu thể thao dùng vợt** — tải sân ảnh hưởng tới buổi gym; lịch sân cố định hằng tuần.
2. **Cuisine Engine ưu tiên khẩu phần** — món Việt trước, mở rộng Đông Nam Á.
3. **Không cần thiết bị đeo** — nhập tay 5 giây; wearable là tùy chọn.
4. **Giá theo sức mua châu Á.**

**Chỉ số North Star.** Số *tuần tập trọn vẹn* — tuần người dùng ghi ≥ 3 buổi (gym hoặc sân) và mở màn Chốt tuần.

**Lộ trình.** Khám phá & kiểm chứng giả thuyết (2 tuần) → 4 bản phát hành nội bộ (~13 tuần) → Cổng 1 → Beta song ngữ → Cổng 2 → App native trên store → Mở rộng Đông Nam Á.

---

## 1. Nghiên cứu thị trường & đối thủ

*Thu thập tháng 09/2026. Giá tính theo USD tại Mỹ trừ khi ghi khác; thay đổi theo khu vực và thời điểm. Nguồn ở Phụ lục A. Nhiều nguồn so sánh là blog của chính đối thủ — xem mục 1.6.*

### 1.1 Tổng quan

- Thị trường ứng dụng đếm calo ước tính ~4,14 tỷ USD năm 2026, tăng ~9,3%/năm.
- Lượng tìm kiếm về "hybrid athletics" tăng gấp ba trong ba năm (theo HYBRD).
- Thị trường tách thành hai mảng rời: **app ghi tập** và **app dinh dưỡng**. Người tập lai thường phải ghép app chạy (Strava/Runna) với app tạ (Hevy/Strong).
- **Giữ chân là bài toán lớn nhất ngành:** nhóm app sức khỏe & fitness giữ ~3% người dùng sau 30 ngày; app fitness trung bình 8–12%, nhóm dẫn đầu ~25%. App gắn với hành vi ngoài đời (đặt lớp, check-in) giữ chân ổn định hơn (~10–12% sau 30 ngày). Gói năm giữ chân tốt hơn gói tháng 40–60%.

### 1.2 Bản đồ đối thủ

**Nhóm A — App ghi tập luyện**

| App | Điểm mạnh | Hạn chế | Giá tham khảo |
|---|---|---|---|
| Strong | Tối giản, ghi nhanh; xuất CSV tốt nhất ngành | Không giáo án, không dinh dưỡng; free giới hạn 3 routine | 4,99$/th · 29,99$/năm · 99,99$ trọn đời |
| Hevy | Free hào phóng, mạng xã hội, Hevy Trainer | Không dinh dưỡng, không thể thao khác | ~2,99$/th · 23,99$/năm |
| Jefit | Thư viện >1.300 bài | Quảng cáo, giao diện nặng | 6,99$/th · 39,99$/năm |
| Stronger | Strength Score 12 nhóm cơ | Phân tích sau paywall | 9,99$/th · 59,99$/năm |
| Setgraph | Ghi nhanh, 4,7★ với ~5.400 đánh giá | Chỉ gym | Miễn phí |
| Gym Note Plus | Gõ set như ghi chú | Ít phân tích | — |

**Nhóm B — App tự lập giáo án:** Fitbod — AI sinh buổi tập theo lịch sử, hồi phục, dụng cụ; bắt buộc trả phí; mảng cardio sơ sài.

**Nhóm C — App tập lai (đối thủ gần nhất về luận điểm)**

| App | Mô tả | Điểm yếu với persona của Setpoint | Giá |
|---|---|---|---|
| **HYBRD** (Boston, YC, 2024, 5 nhân sự, đội ngũ cựu WHOOP) | Gom dữ liệu Garmin/WHOOP/Strava/Apple Health; AI logger (gõ, ảnh bảng trắng, ảnh chụp màn hình); giáo án từ coach hàng đầu; 4,8★ (366 đánh giá) | Xoay quanh lift/run/bike/swim; dựa vào wearable; giá cao; không dinh dưỡng; không thể thao vợt | ~18–22$/tháng |
| **Edge** (Anh) | Một giáo án chạy + sức mạnh + HIIT + mobility, coach kiểm duyệt; >11.000 người dùng/năm | Nhắm Hyrox/marathon; thị trường Anh | £19,99/th · £179,99/năm |
| **Strava + Runna** | Strava mua Runna (04/2025) và The Breakaway; Runna đã thêm buổi sức mạnh | Buổi sức mạnh nằm ngoài giáo án thích ứng; Strava ghi tạ rất sơ sài | Runna/Strava trả phí |

**Nhóm D — App gym + dinh dưỡng mới nổi (2026)**

| App | Mô tả |
|---|---|
| PlateLoad (ra mắt 15/05/2026) | AI giáo án + bữa ăn theo ẩm thực, logger tạ offline |
| PlateUp Training | Gợi ý tăng tải theo lịch sử + tab dinh dưỡng (TDEE, macro) |

→ Năm 2026 có rất nhiều app nhỏ ra đời nhờ công cụ AI: **tính năng đơn lẻ không còn là rào cản cạnh tranh.**

**Nhóm E — App dinh dưỡng quốc tế**

| App | Điểm mạnh | Hạn chế | Giá |
|---|---|---|---|
| MyFitnessPal | Cơ sở dữ liệu lớn nhất | Dữ liệu cộng đồng, 20–27% mục sai; món châu Á lộn xộn | Premium 79,99$/năm |
| Cronometer | Dữ liệu từ nguồn chính phủ, free tốt | Mục tiêu cố định | Gold 59,99$/năm |
| MacroFactor | TDEE thích ứng theo xu hướng cân nặng; 3 chế độ coaching | Không free; mảng tập là app riêng | 71,99$/năm |

**Nhóm F — App ẩm thực địa phương**

| App | Bài học |
|---|---|
| **HealthifyMe** (Ấn Độ) | Cơ sở dữ liệu món Ấn xây trong 12 năm với 40 triệu người dùng; Smart Plan ~₹2.499/năm (< 3 USD/tháng). **Chứng minh ẩm thực địa phương là lợi thế thật** |
| VietGym, Caloer, iEatBetter (VN) | Mạnh món Việt / dinh dưỡng; yếu logic thăng tiến sức mạnh; không hiểu thể thao |

### 1.3 Xu hướng thị trường mục tiêu

**Pickleball bùng nổ tại Việt Nam**
- Long Biên được coi là "thủ đô pickleball" Hà Nội với >100 sân (nhiều sân ~500.000 đ/giờ); Cầu Giấy có ~30 sân.
- Doanh số vợt trên sàn TMĐT 10 tháng đầu 2025 vượt 988 tỷ đồng; quy mô thị trường tăng từ 15 tỷ (Q1/2024) lên 357 tỷ đồng (Q3/2025).
- Pickleball World Cup 2026 tại Đà Nẵng: gần 5.000 vận động viên từ >80 quốc gia.
- Úc: ~28.000 người chơi đăng ký (06/2026) — xu hướng mang tính toàn cầu.

**Thị trường fitness Việt Nam — tăng trưởng nhưng khắc nghiệt**
- Dịch vụ fitness VN dự báo ~910 triệu USD năm 2031 (tăng ~10,8%/năm); câu lạc bộ thể hình Đông Nam Á ~2,93 tỷ USD năm 2026.
- Số phòng gym VN giảm; vụ phá sản WeFit cho thấy rủi ro của giá quá thấp.

**Thiết bị đeo không phổ biến như giả định**
- Hàn Quốc: 95,3% có smartphone nhưng chỉ 12,9% dùng smartwatch. Đông Nam Á chưa có số liệu đo lường đáng tin.
- Thị trường smartwatch VN ~252 triệu USD (2025), đang tăng nhưng đa số người trẻ chưa sở hữu.

### 1.4 Insight chính

1. **Tốc độ ghi là chiến trường chính** — thời gian nghỉ biến thành thời gian nhập liệu là nỗi đau số 1.
2. **Thể thao dùng vợt bị các app tập lai bỏ quên** — trong khi đang bùng nổ ở chính thị trường đầu tiên.
3. **Chỉnh khẩu phần nhanh quan trọng hơn cơ sở dữ liệu lớn** — bài học HealthifyMe: roti không có kích thước chuẩn; nhập tay thường bỏ sót calo từ dầu, ghee, nước chấm. Món Việt y hệt: bát cơm đầy/vơi, suất quán nhiều/ít mỡ.
4. **Mục tiêu calo cố định không đủ** — TDEE thích ứng (MacroFactor) bù sai số bằng xu hướng cân nặng.
5. **Thiết kế không phụ thuộc wearable là đúng cho châu Á.**
6. **App gắn với hành vi ngoài đời giữ chân tốt hơn** — lịch sân cố định mỗi tuần là "neo" tự nhiên.
7. **Tính năng dễ bị sao chép** — lợi thế bền nằm ở dữ liệu món địa phương, hiểu biết về thể thao vợt và cộng đồng.

### 1.5 Khoảng trống thị trường

| Khoảng trống | Ai đang bỏ ngỏ | Setpoint lấp bằng |
|---|---|---|
| Gym + thể thao dùng vợt trong một app | Nhóm A, B, C | Tải sân & gym (tính năng ③) |
| Ghi tạ chuyên sâu + dinh dưỡng món địa phương | Nhóm A (không ăn uống), E (món châu Á yếu), F (tạ yếu) | Một sản phẩm, một nhịp Chốt tuần |
| Không có wearable vẫn có dữ liệu tải | Nhóm C | Session-RPE nhập tay |
| Giá phù hợp châu Á | Nhóm C | Định giá theo sức mua |

### 1.6 Giới hạn của nghiên cứu

- Nhiều bài so sánh do chính đối thủ viết → có thiên vị.
- Số liệu thị trường VN chênh lệch lớn giữa các hãng do định nghĩa khác nhau → chỉ dùng để thấy xu hướng.
- **Chưa có dữ liệu sơ cấp** → các giả thuyết ở mục 19.2 phải được kiểm chứng ở Giai đoạn 0.

---

## 2. Tầm nhìn, định vị & thương hiệu

### 2.1 Tầm nhìn

Trở thành người đồng hành tập luyện và ăn uống số 1 cho người vừa tập gym vừa chơi thể thao dùng vợt — bắt đầu từ châu Á, mở rộng toàn cầu.

### 2.2 Tuyên bố định vị

> Dành cho **người vừa tập gym vừa chơi thể thao dùng vợt** (pickleball, cầu lông, tennis, padel), **Setpoint** là cuốn sổ tập luyện và ăn uống **hiểu cả phòng gym lẫn sân đấu** — không cần đồng hồ thông minh, ăn uống theo món bạn thực sự ăn, với giá phù hợp châu Á. Khác với HYBRD/Edge (xoay quanh chạy – đạp – bơi, cần wearable, giá cao) và Hevy/Strong (chỉ ghi tạ), Setpoint gộp gym, sân và bữa ăn vào một nhịp tuần.

### 2.3 Giá trị cốt lõi

- **Nhanh** — ghi một set dưới 3 giây.
- **Rõ** — biết chắc mình đang tiến bộ, và vì sao khi không tiến.
- **Trọn** — gym, sân, bữa ăn trong một chỗ.
- **Gần** — ăn uống theo món thực tế, ghi bằng khẩu phần trực quan.

### 2.4 Câu chuyện thương hiệu Setpoint

Một chữ, bốn nghĩa:

| Nghĩa | Ngữ cảnh | Gắn với |
|---|---|---|
| **Set point** | Điểm quyết định một set trong tennis, cầu lông, pickleball | Trụ sân đấu |
| **Set** | Đơn vị cơ bản của buổi tập gym | Trụ gym |
| **Set point cân nặng** | Mức cân nặng cơ thể có xu hướng tự giữ | Trụ dinh dưỡng |
| **Setpoint (kỹ thuật điều khiển)** | Giá trị mục tiêu hệ thống liên tục đo và hiệu chỉnh để bám theo | Cách TDEE thích ứng vận hành |

**Câu chuyện founder:** kinh nghiệm triển khai hệ thống tự động hóa công nghiệp → mang tư duy vòng điều khiển (đặt mục tiêu → đo → hiệu chỉnh) vào tập luyện và ăn uống.

**Slogan đề xuất**
- EN: *"Setpoint — every set counts, on the court and in the gym."*
- VI: *"Setpoint — mỗi tuần nhích một chút."*

**Tên hiển thị trên store:** "Setpoint: Gym & Court" hoặc "Setpoint – Lift & Play" (phần mô tả hỗ trợ tìm kiếm và giảm nhầm lẫn).

**Rào chắn thương hiệu**
- Truyền thông xoay quanh **hiệu suất và thăng tiến**, không xoay quanh giảm cân.
- Không dùng thông điệp kiểu "hạ set point cân nặng" — tránh bị đánh đồng với sách/chương trình ăn kiêng "The Setpoint Diet".

### 2.5 Trạng thái tên & phương án dự phòng

| Bước kiểm tra | Trạng thái |
|---|---|
| App Store / Google Play | Tìm nhanh: chưa thấy app trùng tên chính xác — cần kiểm tra đầy đủ |
| Tên miền | setpoint.com gần như chắc chắn đã có chủ → xem getsetpoint.app, setpoint.fit, trysetpoint.com |
| Nhãn hiệu | **Chưa kiểm tra** — WIPO Global Brand Database + Cục SHTT VN, nhóm 9, 42, 44 |
| Handle mạng xã hội | Chưa kiểm tra |

**Quy tắc quyết định**
- Nhãn hiệu sạch + có tên miền biến thể dùng được → **chốt Setpoint**.
- Vướng nhãn hiệu ở nhóm liên quan → **Gripset** (grip cán vợt/thanh đòn + set tạ/set đấu).
- Nếu Giai đoạn 0 bác bỏ giả thuyết thể thao vợt → **Upweek** (trung tính cho tập lai chung).

---

## 3. Người dùng mục tiêu

### 3.1 Persona chính — "Người tập gym chơi vợt" (Court Lifter)

- 20–35 tuổi, dân văn phòng / sinh viên năm cuối ở đô thị.
- Tập gym 3–6 buổi/tuần, đã tập ≥ 6 tháng, có giáo án riêng.
- Chơi pickleball / cầu lông / tennis / padel 1–4 buổi/tuần, thường theo **lịch sân cố định** (cùng nhóm bạn, cùng khung giờ).
- Có thể chạy bộ thêm; phần lớn **không có** đồng hồ thể thao chuyên dụng.
- Ăn ngoài nhiều; đôi khi tập ở nhiều phòng khác nhau.
- **Nỗi đau:** không biết buổi sân ảnh hưởng thế nào tới buổi gym; không biết mình có thực sự tiến bộ; ăn đủ protein khi ăn quán; ghép nhiều app.

### 3.2 Biến thể theo thị trường

| Thị trường | Môn vợt chủ đạo | Đặc điểm | Vai trò |
|---|---|---|---|
| Việt Nam | Pickleball, cầu lông, tennis | Ăn quán; nhạy cảm giá; sân dày đặc ở đô thị | Thị trường thử nghiệm & ra mắt đầu tiên |
| Đông Nam Á | Cầu lông (Indonesia, Malaysia, Thái Lan), pickleball đang lên | Ẩm thực địa phương, nỗi đau tương tự | Mở rộng thứ hai |
| Úc | Pickleball, tennis, padel | Quen trả phí; cộng đồng người Việt | Kiểm thử tiếng Anh & mở rộng thứ ba |
| Mỹ / châu Âu | Pickleball (Mỹ), padel (châu Âu) | Cạnh tranh cao; yêu cầu quyền riêng tư cao (EU) | Sau cùng |

### 3.3 Persona không nhắm (giai đoạn đầu)

- **Vận động viên sức bền / Hyrox / triathlon:** đã được HYBRD, Edge phục vụ tốt.
- **Người mới đi gym:** cần giáo án và video — sân chơi của Fitbod, VietGym.
- **Coach quản lý nhiều học viên.**

### 3.4 Jobs-to-be-done

1. *Khi đứng giữa hai set*, tôi muốn ghi thật nhanh, để không mất nhịp nghỉ.
2. *Khi bắt đầu buổi tập*, tôi muốn biết hôm nay nên nâng bao nhiêu, để chắc chắn mình đang tiến.
3. *Khi vừa đánh vợt nặng hôm trước*, tôi muốn biết có nên giữ hay giảm buổi gym (đặc biệt vai, cổ tay, chân), để không quá tải hay chấn thương.
4. *Khi lên lịch tuần*, tôi muốn gym xếp hợp lý quanh các buổi sân cố định, để đánh sân vẫn khỏe mà gym vẫn tiến.
5. *Khi cuối tuần nhìn lại*, tôi muốn biết mình tiến hay lùi và vì sao.
6. *Khi chưa biết ăn gì*, tôi muốn biết còn thiếu bao nhiêu protein và nên gọi món gì — ghi lại chỉ bằng vài chạm.
7. *Khi tập ở phòng khác hoặc đi du lịch*, tôi muốn có bài thay thế để không đứt mạch thăng tiến.

---

## 4. Nguyên tắc sản phẩm

1. **Tốc độ ghi là sống còn.** Mục tiêu < 3 giây/set; buổi sân < 10 giây.
2. **App gợi ý, người dùng quyết.** Mọi đề xuất hiển thị lý do và cho ghi đè.
3. **Xu hướng quan trọng hơn con số tuyệt đối.** Dùng trung bình động cho cân nặng và tải.
4. **Offline trước tiên.**
5. **Dữ liệu là của người dùng.** Xuất JSON/CSV và xoá toàn bộ bất cứ lúc nào.
6. **Không cần thiết bị đeo.** Mọi tính năng lõi chạy được chỉ với điện thoại; wearable là tùy chọn bổ sung.

---

## 5. Chỉ số thành công

### 5.1 North Star Metric

**Số tuần tập trọn vẹn** — tuần người dùng ghi ≥ 3 buổi (gym hoặc sân) **và** mở màn Chốt tuần.

### 5.2 Chỉ số đầu vào

| Chỉ số | Mục tiêu | Vì sao |
|---|---|---|
| Thời gian ghi trung bình mỗi set | < 3 giây | Ma sát ghi chép là lý do số 1 bỏ app |
| Thời gian ghi một buổi sân | < 10 giây | Buổi sân phải ghi dễ hơn cả gym |
| Tỷ lệ buổi gym được ghi trọn | > 90% | Dữ liệu thăng tiến chính xác |
| Tỷ lệ gợi ý tăng tạ được chấp nhận | > 60% | Độ tin cậy của logic thăng tiến |
| Số ngày cân trong tuần | ≥ 3 | Điều kiện cho TDEE thích ứng |
| Tỷ lệ mở Chốt tuần | > 70% tuần hoạt động | Giá trị cốt lõi |

### 5.3 Chỉ tiêu giữ chân (điều chỉnh theo mặt bằng ngành)

| Giai đoạn | Chỉ tiêu | Tham chiếu |
|---|---|---|
| Beta (người được mời, quen biết) | ≥ 25% hoạt động ở tuần 4 | Nhóm dẫn đầu ngành ~25% sau 30 ngày |
| Người dùng từ store (R2.0) | ≥ 12% sau 30 ngày; mục tiêu vươn tới 20% | Trung bình app fitness 8–12% |

### 5.4 Phân tách đo lường

Từ R1.0, mọi chỉ số được tách theo **thị trường, ngôn ngữ và môn vợt chính** để ra quyết định mở rộng bằng dữ liệu.

---

## 6. Giải pháp: tính năng đặc trưng

### ① Buổi tập một chạm
- Mỗi set điền sẵn kg và rep theo gợi ý (lần trước + logic thăng tiến).
- Đúng gợi ý → bấm ✓. Khác → chỉnh bằng nút +/− cỡ lớn, dùng được một tay.
- **Ô gõ tắt:** `80x10x3` hoặc `80 10 10 9` → tự phân tích thành set.
- Đồng hồ nghỉ tự chạy, rung khi hết giờ; báo PR ngay khi phá kỷ lục.

### ② Bộ theo dõi thăng tiến
- Vạch tiến độ từng bài: "còn 2 rep nữa là lên 62.5 kg".
- **Chẩn đoán giậm chân:** 3 tuần không tiến → đối chiếu dữ liệu sẵn có (protein, tải sân bất thường, volume nhóm cơ) → gợi ý deload hoặc đổi biến thể.

### ③ Tải sân & gym — *tính năng dẫn dắt*
- **Ghi buổi sân < 10 giây:** chọn môn → phút → RPE 1–10 → lưu. Môn ưu tiên: pickleball, cầu lông, tennis, padel; ngoài ra chạy, bóng đá, bơi, đạp xe.
- **Lịch sân cố định:** khai báo các buổi sân lặp lại hằng tuần (ví dụ pickleball tối thứ 3 & thứ 6) → app nhắc ghi sau buổi và dùng lịch này để gợi ý xếp buổi gym.
- **Hiểu vùng cơ thể chịu tải:** mỗi môn gắn với vùng chịu tải chính (vai & cổ tay/cẳng tay với môn vợt; chi dưới với di chuyển sân) → cảnh báo theo ngữ cảnh, ví dụ: "Tối qua đánh cầu 2 giờ mức 8/10 — hôm nay có bài đẩy vai, cân nhắc giữ tạ."
- **Tải phiên = phút × RPE** (session-RPE), quy mọi hoạt động về một thước đo chung.
- Check-in tùy chọn đầu buổi: "Hôm nay thấy thế nào? 😫 😐 💪".
- Wearable (Apple Health / Health Connect) là **tùy chọn bổ sung** ở R2.0, không bắt buộc.

### ④ Hồ sơ phòng tập & chế độ du lịch
- Mỗi phòng tập có danh sách dụng cụ riêng; đổi phòng → đề xuất bài thay thế đã liên kết (Leg press ↔ Hack squat ↔ Goblet squat).
- Lịch sử thăng tiến giữ theo **nhóm động tác**.

### ⑤ Cuisine Engine — ưu tiên khẩu phần
- **Ghi bằng khẩu phần trực quan**, không bằng gram: bát / đĩa / suất / cái; nhỏ / vừa / to.
- **Một câu hỏi dầu mỡ** cho món xào, chiên, cơm quán: ít / vừa / nhiều.
- **Hai mức nguồn gốc:** "suất quán" và "tự nấu".
- **Chất lượng hơn số lượng:** 100–200 món Việt phổ biến nhất được hiệu chỉnh kỹ, thay vì hàng nghìn món sơ sài.
- **Lớp nền toàn cầu:** thực phẩm cơ bản từ USDA FoodData Central; gói ẩm thực mở rộng dần (Việt → Thái → Indonesia → …).
- **"Còn thiếu gì hôm nay":** tính protein/calo còn thiếu → gợi ý 2–3 phương án thực tế.
- **Vòng điều khiển Setpoint (TDEE thích ứng):** mục tiêu calo tự hiệu chỉnh theo xu hướng cân nặng — lưới an toàn cho mọi sai số khẩu phần. 3 chế độ: Tự động / Gợi ý–duyệt / Tự đặt.
- **Rào an toàn** (mục 7.5).

### ⑥ Chốt tuần — *trái tim của North Star*
- Tổng kết một màn hình: số buổi gym & sân, PR, volume nhóm cơ so với khuyến nghị, tải tuần (gym + sân), xu hướng cân nặng, đề xuất calo tuần tới, 1–2 nhận định.
- Xuất ảnh chia sẻ theo ngôn ngữ người dùng → vòng lan truyền trong nhóm chơi vợt.

### ⑦ Sức mạnh theo nhóm cơ *(giai đoạn sau)*
Biểu đồ radar sức mạnh các nhóm cơ dựa trên 1RM ước tính chuẩn hoá theo cân nặng.

### 6.1 Chủ động không làm

| Không làm | Lý do |
|---|---|
| Phụ thuộc thiết bị đeo | Đa số persona không có; sân chơi của HYBRD |
| AI tự sinh giáo án | Persona đã có giáo án; sân chơi của Fitbod/HYBRD |
| Giáo án chạy/Hyrox chuyên sâu | Sân chơi của Runna, Edge |
| Mạng xã hội / feed | Tốn công; lan truyền đã có qua ảnh Chốt tuần |
| AI nhận diện món qua ảnh | Chi phí cao, khó với món hỗn hợp; khẩu phần + TDEE thích ứng giải quyết tốt hơn |
| Phân tích kỹ thuật đánh vợt bằng video | Sản phẩm khác hẳn; đã có app chuyên (ví dụ OffCourtz cho tennis) |
| Theo dõi vi chất, thư viện video bài tập | Ngoài nhu cầu persona |

---

## 7. Logic nghiệp vụ cốt lõi

### 7.1 Thăng tiến sức mạnh (double progression)

- Khoảng rep mục tiêu mặc định 8–12 (tùy chỉnh).
- Tất cả set lần trước đạt rep trần → gợi ý tăng một bước: thân trên +2.5 kg / +5 lb; thân dưới & bài nặng +5 kg / +10 lb (tùy chỉnh theo bài và dụng cụ).
- Chưa đạt → giữ tạ, mục tiêu +1 rep.
- 3 tuần không tăng tạ hoặc tổng rep → gợi ý deload (~10% trong 1 tuần) hoặc đổi biến thể.
- 1RM ước tính (Epley): `e1RM = kg × (1 + rep/30)`.
- Volume: `kg × rep × set`; set theo nhóm cơ/tuần so với khoảng tham chiếu 10–20.
- Mọi gợi ý hiển thị lý do.

### 7.2 Tải tập tổng hợp

- **Tải phiên** = `phút × RPE`; **tải tuần** = tổng tải phiên.
- **Tăng đột biến:** tải tuần vượt trung bình 4 tuần quá ngưỡng (khởi điểm +30%, cần kiểm chứng) → nhắc chú ý hồi phục.

### 7.3 Quy tắc tải sân → gym *(giả thuyết, cần kiểm chứng với người dùng và tài liệu chuyên môn)*

| Điều kiện | Gợi ý |
|---|---|
| Buổi vợt RPE ≥ 7 trong 24 giờ trước buổi gym có bài đẩy/kéo qua đầu | Giữ tạ bài vai, ưu tiên khởi động kỹ |
| Buổi vợt RPE ≥ 7 trong 24 giờ trước buổi chân nặng | Giữ tạ hoặc giảm 1 set |
| Buổi gym chân nặng trong 24 giờ trước buổi sân cố định | Gợi ý dời buổi chân sang ngày xa lịch sân hơn |
| ≥ 3 buổi vợt/tuần + tổng set vai cao | Nhắc cân nhắc bài bổ trợ vai & cẳng tay |

Toàn bộ là **gợi ý tham khảo**, không phải chẩn đoán y khoa hay chỉ định phòng chống chấn thương.

### 7.4 Dinh dưỡng thích ứng (vòng điều khiển Setpoint)

- **Khởi đầu:** BMR theo Mifflin-St Jeor × hệ số vận động (ước theo tải tuần) → TDEE.
- **Theo mục tiêu:** tăng cơ +5–10%; giảm mỡ −15–20%; giữ form 0%.
- **Protein:** 1,6–2,2 g/kg.
- **Khẩu phần:** hệ số nhỏ ×0,75 / vừa ×1,0 / to ×1,3 (điều chỉnh theo món); mức dầu mỡ cộng thêm ước lượng (ví dụ ít +0 / vừa +~5 g dầu ≈ 45 kcal / nhiều +~10 g dầu ≈ 90 kcal).
- **Vòng hiệu chỉnh:**
  - Cân nặng dùng trung bình động 7 ngày.
  - Mỗi tuần so sánh thay đổi thực tế với mục tiêu (ví dụ tăng cơ +0,25–0,5% cân nặng/tuần).
  - Lệch đáng kể ≥ 2 tuần → đề xuất chỉnh ±100–150 kcal; tối đa một lần/tuần.
  - Cần ≥ 3 lần cân/tuần; thiếu dữ liệu thì không chỉnh.

### 7.5 Rào an toàn

- Không đề xuất calo dưới ngưỡng an toàn tối thiểu.
- Tốc độ giảm cân mục tiêu tối đa 0,5–1% cân nặng/tuần.
- Không dùng ngôn ngữ ăn kiêng khắt khe; truyền thông xoay quanh hiệu suất.
- Tuyên bố miễn trừ theo ngôn ngữ: không thay thế tư vấn y tế, dinh dưỡng hay vật lý trị liệu.

---

## 8. Phạm vi & ưu tiên

### 8.1 MoSCoW

| Mức | Hạng mục |
|---|---|
| **Must** (R0.1) | Hồ sơ & mục tiêu · Lịch tập & template · Buổi tập một chạm · Đồng hồ nghỉ · Ô gõ tắt · Lịch sử · **Ghi buổi sân < 10 giây** · Sao lưu/khôi phục JSON · **i18n VI + EN** · kg/lb · UTC |
| **Should** (R0.2) | Gợi ý tăng tạ · PR · Biểu đồ từng bài · Chốt tuần (gồm tải sân) · Ghi cân nặng · Xuất CSV |
| **Could** (R0.3–R0.4) | Cuisine Engine ưu tiên khẩu phần · TDEE thích ứng · Lịch sân cố định · Quy tắc tải sân → gym · Hồ sơ phòng tập & du lịch · Chẩn đoán giậm chân |
| **Won't (lúc này)** | Tài khoản & đồng bộ · Wearable · Mạng xã hội · Sức mạnh theo nhóm cơ · Thanh toán |

### 8.2 Lý do ưu tiên

- Ghi buổi sân đưa lên **Must** vì đây là trụ khác biệt — phải có dữ liệu sân từ ngày đầu.
- Dinh dưỡng vẫn ở R0.3: logging gym + sân phải thành thói quen trước.
- Quy tắc tải sân → gym ở R0.4 vì cần vài tuần dữ liệu thật để hiệu chỉnh.

---

## 9. User stories & tiêu chí chấp nhận

**US-01 — Ghi set một chạm**
*Là người tập, tôi muốn xác nhận set bằng một chạm khi làm đúng gợi ý, để không mất thời gian nghỉ.*
- [ ] Ô nhập điền sẵn kg và rep theo gợi ý.
- [ ] Bấm ✓ → lưu set và chạy đồng hồ nghỉ < 300 ms.
- [ ] Chỉnh kg (1.25/2.5 kg hoặc 2.5/5 lb) và rep bằng nút ≥ 44 pt, một tay.
- [ ] Hoạt động offline; hiển thị đúng VI và EN.

**US-02 — Ô gõ tắt**
*Là người tập, tôi muốn gõ nhanh buổi tập theo cú pháp ngắn.*
- [ ] `80x10x3` → 3 set × 80 kg × 10 rep; `80 10 10 9` → 3 set 80 kg với rep 10, 10, 9.
- [ ] Xem trước trước khi lưu; cú pháp sai → báo lỗi thân thiện, không mất dữ liệu.

**US-03 — Gợi ý tăng tạ**
*Là người tập, tôi muốn app đề xuất mức tạ buổi sau.*
- [ ] Đạt rep trần mọi set → gợi ý cộng bước tạ; chưa đạt → giữ tạ, +1 rep.
- [ ] Hiện lý do bằng ngôn ngữ người dùng; ghi đè được; ghi nhận chấp nhận/từ chối.

**US-04 — Ghi buổi sân**
*Là người chơi vợt, tôi muốn ghi buổi sân trong vài giây, để app hiểu tải cả tuần.*
- [ ] Chọn môn → phút → RPE → lưu, ≤ 4 thao tác, < 10 giây.
- [ ] Buổi thuộc lịch sân cố định → điền sẵn môn và thời lượng, chỉ cần xác nhận RPE.
- [ ] Tải phiên cộng vào tải tuần.

**US-05 — Lịch sân cố định** *(R0.4)*
*Là người chơi vợt, tôi muốn khai báo lịch sân hằng tuần, để app nhắc ghi và xếp gym hợp lý.*
- [ ] Tạo buổi lặp (môn, thứ, giờ, thời lượng dự kiến).
- [ ] Nhắc ghi sau giờ kết thúc dự kiến (khi được phép gửi thông báo).
- [ ] Hiển thị lịch sân trên màn Hôm nay và Chốt tuần.

**US-06 — Cảnh báo tải sân → gym** *(R0.4)*
*Là người tập, tôi muốn được nhắc khi buổi sân gần đây ảnh hưởng tới buổi gym hôm nay.*
- [ ] Áp dụng quy tắc mục 7.3; hiển thị trên bài bị ảnh hưởng kèm lý do.
- [ ] Người dùng tắt được từng loại cảnh báo.

**US-07 — Chốt tuần**
*Là người tập, tôi muốn xem tổng kết tuần trong một màn hình.*
- [ ] Số buổi gym & sân, PR, set theo nhóm cơ, tải tuần, so sánh tuần trước.
- [ ] Tải < 1 giây với 1 năm dữ liệu; xuất ảnh theo ngôn ngữ; ngày chốt theo khu vực.

**US-08 — Sao lưu & khôi phục**
- [ ] Xuất một file JSON có `schema_version`; nhập lại khôi phục 100%.
- [ ] Nhắc sao lưu nếu 7 ngày chưa làm.

**US-09 — Ghi bữa theo khẩu phần** *(R0.3)*
*Là người ăn quán, tôi muốn ghi bữa bằng vài chạm mà không cần cân đo.*
- [ ] Tìm món → chọn khẩu phần (nhỏ/vừa/to, bát/đĩa/suất) → chọn quán/tự nấu → (nếu áp dụng) chọn mức dầu mỡ → lưu, ≤ 5 thao tác.
- [ ] Hiển thị kcal và protein dạng ước lượng.

**US-10 — "Còn thiếu gì hôm nay"** *(R0.3)*
- [ ] Hiển thị protein/calo còn thiếu; gợi ý 2–3 phương án từ gói ẩm thực đang bật.
- [ ] Không bao giờ vượt rào an toàn mục 7.5.

---

## 10. Yêu cầu phi chức năng & quốc tế hóa

### 10.1 Phi chức năng

| Hạng mục | Yêu cầu |
|---|---|
| Hiệu năng | Mở app < 2 giây; lưu set < 300 ms; Chốt tuần < 1 giây với 1 năm dữ liệu |
| Offline | Toàn bộ chức năng ghi chép không cần mạng |
| Khả dụng | Nút ≥ 44 pt; tương phản WCAG AA; hỗ trợ cỡ chữ động |
| Toàn vẹn dữ liệu | Không mất dữ liệu khi tắt đột ngột; schema có phiên bản & migration |
| Giao diện | Sáng/tối theo hệ thống |

### 10.2 Quốc tế hóa (bắt buộc từ MVP)

- Không viết cứng chuỗi; file ngôn ngữ `vi.json`, `en.json`; chuẩn ICU cho số nhiều.
- Giao diện chừa chỗ cho câu dài hơn ~30%; CSS thuộc tính logic (sẵn sàng RTL).
- Dữ liệu lưu theo ID, tên hiển thị theo ngôn ngữ (bài tập, món ăn, môn thể thao).
- Lưu nội bộ theo hệ mét; hiển thị lb/dặm/ft-in/kJ theo lựa chọn; bước tăng tạ đổi theo đơn vị.
- Ngày, số, ngày đầu tuần theo khu vực; thời gian lưu UTC kèm múi giờ.
- Danh mục môn thể thao và gói ẩm thực bật/tắt theo người dùng.
- Nội dung sức khỏe do người bản ngữ rà soát; không máy dịch thô.

---

## 11. Kiến trúc kỹ thuật & mô hình dữ liệu

### 11.1 Lộ trình công nghệ

| Giai đoạn | Công nghệ | Lý do |
|---|---|---|
| R0.1–R0.4 | Web app một file HTML, lưu trên thiết bị, i18n từ đầu | Nhanh, miễn phí, kiểm chứng UX |
| R1.0 Beta | PWA + Supabase (xác thực, đồng bộ), máy chủ Singapore | Gần VN, Đông Nam Á, Úc |
| R2.0 | Native (Capacitor hoặc React Native/Expo) trên App Store & Google Play; Apple Health / Health Connect tùy chọn; thanh toán trong app | Người dùng tìm app qua store |

**Lưu ý iOS:** dữ liệu web cục bộ có thể bị xoá nếu lâu không dùng → sao lưu JSON + nhắc hằng tuần bắt buộc ở R0.x.

### 11.2 Mô hình dữ liệu (rút gọn)

| Thực thể | Trường chính |
|---|---|
| `Profile` | id, ngôn ngữ, khu vực, hệ đơn vị, ngày đầu tuần, năm sinh, giới tính sinh học (cho BMR), chiều cao, mục tiêu, chế độ dinh dưỡng, môn vợt chính |
| `Exercise` | id, tên theo ngôn ngữ, nhóm cơ chính/phụ, nhóm động tác, vùng chịu tải, dụng cụ, khoảng rep, bước tăng tạ |
| `ExerciseLink` | exercise_id_a, exercise_id_b |
| `Sport` | id, tên theo ngôn ngữ, loại (vợt/sức bền/đồng đội), vùng chịu tải chính |
| `CourtSchedule` | id, sport_id, thứ trong tuần, giờ bắt đầu, thời lượng dự kiến, trạng thái |
| `Gym` | id, tên, dụng cụ |
| `Template` | id, tên, bài + số set |
| `Session` | id, loại (gym/sân/khác), sport_id, gym_id, schedule_id, bắt đầu (UTC), múi giờ, thời lượng, RPE, check-in, ghi chú |
| `Set` | id, session_id, exercise_id, kg, rep, RPE (tùy chọn), là PR, gợi ý được chấp nhận |
| `BodyWeight` | ngày, kg |
| `Food` | id, nguồn (USDA / gói ẩm thực), gói, tên theo ngôn ngữ, đơn vị khẩu phần, kcal & P/C/F theo mức "quán / nhà", có hỏi dầu mỡ |
| `MealLog` | ngày, food_id, đơn vị, cỡ (nhỏ/vừa/to), nguồn (quán/nhà), mức dầu mỡ |
| `Alert` | loại, session liên quan, bài bị ảnh hưởng, đã xem, đã tắt |
| `WeeklyReview` | tuần, chỉ số tổng hợp, đề xuất calo, đã xem |

Khóa chính UUID; file sao lưu có `schema_version`; không lưu dữ liệu cá nhân trong URL hoặc log.

---

## 12. Kiến trúc thông tin

### 12.1 Điều hướng chính

1. **Hôm nay** — buổi gym theo lịch + buổi sân hôm nay (nếu có); cảnh báo tải; check-in; nút ghi nhanh buổi sân.
2. **Tiến độ** — biểu đồ từng bài (tạ cao nhất, e1RM, volume), PR, cảnh báo giậm chân.
3. **Chốt tuần** — tổng kết gym + sân + ăn uống, xuất ảnh.
4. **Ăn uống** — mục tiêu ngày, "còn thiếu gì", ghi bữa theo khẩu phần, cân nặng.
5. **Cài đặt** — hồ sơ, ngôn ngữ, đơn vị, lịch tập, lịch sân, bài tập, phòng tập, gói ẩm thực, sao lưu.

### 12.2 Chế độ tập (toàn màn hình)

Danh sách bài → "lần trước" + ô gợi ý (kèm cảnh báo tải sân nếu có) → ✓ / chỉnh → đồng hồ nghỉ → báo PR → kết thúc → RPE tổng buổi → tóm tắt.

### 12.3 Onboarding (≤ 60 giây)

Ngôn ngữ & đơn vị → mục tiêu → chỉ số cơ thể → **môn vợt đang chơi & lịch sân** → giáo án gym (mẫu hoặc tự tạo) → gói ẩm thực (R0.3+).

---

## 13. Lộ trình & cổng quyết định

**Giả định năng lực:** 4–6 giờ/tuần, sprint 1 tuần *(cần xác nhận — D2)*.

| Giai đoạn | Thời gian | Kết quả bàn giao | Tiêu chí hoàn thành / cổng |
|---|---|---|---|
| **0. Khám phá & kiểm chứng** | Tuần 1–2 | Phỏng vấn 5–8 người VN tập gym + chơi vợt, 3–5 người nói tiếng Anh; kiểm chứng 3 giả thuyết (mục 19.2); test tên; kiểm tra nhãn hiệu Setpoint; wireframe | ≥ 5/8 người xác nhận H1; H2 hoặc H3 có tín hiệu tích cực; tên được chốt theo quy tắc mục 2.5 |
| **R0.1 "Sổ tập"** (MVP) | Tuần 3–5 | Toàn bộ nhóm Must (mục 8.1) | PO dùng liên tục 3 tuần; < 3 giây/set; < 10 giây/buổi sân |
| **R0.2 "Thăng tiến"** | Tuần 6–8 | Gợi ý tăng tạ, PR, biểu đồ, Chốt tuần (có tải sân), cân nặng, CSV | Chấp nhận gợi ý > 60%; Chốt tuần mở hằng tuần |
| **R0.3 "Cuisine Engine"** | Tuần 9–12 | Ghi bữa theo khẩu phần, 100–200 món Việt, lớp nền USDA, TDEE thích ứng | Mục tiêu calo hội tụ sau ~3 tuần dữ liệu; ghi bữa ≤ 5 thao tác |
| **R0.4 "Sân & Gym"** | Tuần 13–15 | Lịch sân cố định, quy tắc tải sân → gym, hồ sơ phòng tập & du lịch, chẩn đoán giậm chân | Tự dùng tổng cộng 12 tuần liên tục |
| 🚦 **Cổng 1** | Tuần 16 | Go/No-go | PO dùng đều 12 tuần **và** ≥ 5 người VN + ≥ 5 người nói tiếng Anh (ưu tiên người chơi vợt) xin dùng thử |
| **R1.0 Beta song ngữ** | Tuần 17–24 | PWA + Supabase, onboarding, chia sẻ Chốt tuần, kênh góp ý, chính sách quyền riêng tư | 20–30 người dùng (VN + Úc), đo chỉ số tách theo thị trường & môn |
| 🚦 **Cổng 2** | Tuần 25 | Go/No-go | ≥ 25% hoạt động ở tuần 4 tại ít nhất một thị trường |
| **R2.0 Ra mắt store** | Từ tuần 26 | App native, wearable tùy chọn, thanh toán | Ra mắt ở thị trường có số liệu beta tốt nhất |
| **R3.0 Mở rộng** | Sau R2.0 | Gói ẩm thực & ngôn ngữ Đông Nam Á | Theo dữ liệu nhu cầu |

**Nguyên tắc cổng:** không xây hạ tầng thị trường trước khi có bằng chứng nhu cầu. Dừng ở bất kỳ cổng nào, sản phẩm và tài liệu vẫn là một case study hoàn chỉnh.

---

## 14. Chiến lược ra thị trường

### 14.1 Thứ tự mở rộng

1. **Việt Nam** — Hà Nội trước (Cầu Giấy, Long Biên: mật độ sân cao), rồi TP.HCM.
2. **Đông Nam Á** — Thái Lan, Indonesia, Malaysia, Philippines: cầu lông mạnh, pickleball đang lên, nỗi đau ẩm thực tương tự.
3. **Úc** — cộng đồng pickleball/tennis và người Việt; kiểm thử tiếng Anh.
4. **Mỹ / châu Âu** — sau khi có số liệu và tuân thủ đầy đủ.

### 14.2 Kênh

| Kênh | Cách làm |
|---|---|
| Nhóm chơi vợt | Mỗi nhóm sân cố định là một cụm người dùng tiềm năng; ảnh Chốt tuần lan trong nhóm chat |
| Chủ sân & câu lạc bộ | Hợp tác thử nghiệm với sân pickleball/cầu lông (giả thuyết B2B2C — xem mục 15) |
| Giải phong trào | Hiện diện tại giải pickleball/cầu lông địa phương |
| Mạng xã hội | TikTok/Facebook: nội dung "12 tuần gym + pickleball"; group gym, group pickleball Hà Nội |
| Toàn cầu | Reddit (r/Pickleball, r/badminton, r/10s, r/fitness); ASO với "gym + pickleball tracker", "badminton strength log" |

### 14.3 Thông điệp

- **Chính:** "Một app cho cả phòng gym lẫn sân đấu."
- **Thăng tiến:** "Every set counts — on the court and in the gym."
- **Ăn uống:** "Ghi bữa bằng vài chạm, theo món bạn thực sự ăn."
- **Không wearable:** "Chỉ cần điện thoại."

---

## 15. Mô hình kinh doanh

*Giả thuyết — kiểm chứng trong Beta.*

- **Freemium**
  - **Miễn phí vĩnh viễn:** ghi gym, ghi sân, lịch sử, sao lưu/xuất dữ liệu.
  - **Pro:** TDEE thích ứng, quy tắc tải sân → gym, chẩn đoán giậm chân, phân tích nâng cao, wearable.
- **Tham chiếu giá:** HealthifyMe Smart Plan < 3 USD/tháng (châu Á) ↔ HYBRD ~18–22 USD/tháng (Mỹ). Setpoint định giá theo sức mua từng khu vực.
- **Ưu tiên gói năm** (giữ chân tốt hơn gói tháng 40–60%).
- **Tránh bán phá giá** — bài học WeFit.
- **Giả thuyết B2B2C:** hợp tác với sân/câu lạc bộ (ưu đãi Pro cho hội viên; sân có công cụ gắn kết người chơi). Chỉ khám phá sau Cổng 2.
- Không bán dữ liệu người dùng; không dùng dữ liệu sức khỏe cho quảng cáo.

---

## 16. Pháp lý & tuân thủ

**Bắt buộc hoàn thành trước R1.0.**

| Khu vực | Nội dung |
|---|---|
| Việt Nam | Luật bảo vệ dữ liệu cá nhân (hiệu lực 2026); dữ liệu sức khỏe là dữ liệu nhạy cảm |
| EU / UK | GDPR — dữ liệu sức khỏe là "dữ liệu loại đặc biệt" |
| Úc | Privacy Act |
| Mỹ | Luật tiểu bang (ví dụ CCPA) |
| Apple / Google | Chính sách app sức khỏe; dữ liệu Apple Health không dùng cho quảng cáo |
| Dữ liệu thực phẩm | USDA FoodData Central (công cộng); Open Food Facts (ODbL — ghi nguồn & chia sẻ lại dữ liệu phái sinh) |
| **Nhãn hiệu** | Kiểm tra "Setpoint" (nhóm 9, 42, 44) tại WIPO & Cục SHTT VN; lưu ý thương hiệu ăn kiêng "The Setpoint Diet" trong mảng sức khỏe |

**Nguyên tắc:** thu tối thiểu · đồng ý rõ ràng · xuất & xoá toàn bộ dữ liệu · chính sách quyền riêng tư song ngữ · miễn trừ sức khỏe theo ngôn ngữ.

*Không phải tư vấn pháp lý; cần người có chuyên môn rà soát trước R1.0.*

---

## 17. Quản trị rủi ro

| # | Rủi ro | Khả năng | Tác động | Giảm thiểu |
|---|---|---|---|---|
| R1 | Phình phạm vi do nhiều việc song song | Cao | Cao | MoSCoW cứng; ý tưởng mới vào backlog |
| R2 | Bỏ app vì ghi chép phiền | TB | Rất cao | Theo dõi sát thời gian ghi; nguyên tắc số 1 |
| R3 | **Giả thuyết "gym + vợt" không đúng** | TB | Rất cao | Kiểm chứng ở Giai đoạn 0; phương án lùi: định vị tập lai chung, tên Upweek |
| R4 | **Pickleball chỉ là trào lưu ngắn hạn** | TB | TB | Không bó vào một môn; phủ cầu lông, tennis, padel |
| R5 | **Strava/Runna làm tốt mảng tạ** | TB | Cao | Bám khác biệt: vợt, châu Á, món địa phương, không wearable |
| R6 | **App nhỏ sao chép tính năng** | Cao | TB | Đầu tư vào dữ liệu món và quy tắc tải sân — thứ khó sao chép |
| R7 | **Tên Setpoint vướng nhãn hiệu / liên tưởng ăn kiêng** | TB | Cao | Kiểm tra 4 bước; rào chắn thương hiệu; dự phòng Gripset |
| R8 | Quy tắc tải sân → gym thiếu cơ sở khoa học | TB | TB | Gắn nhãn "gợi ý"; tham vấn chuyên môn; người dùng tắt được |
| R9 | iOS xoá dữ liệu cục bộ | TB | Cao | Sao lưu JSON + nhắc; Supabase ở R1.0 |
| R10 | Khẩu phần/macro không chính xác | Cao | TB | Khẩu phần + dầu mỡ + TDEE thích ứng |
| R11 | Gợi ý dinh dưỡng gây hại | Thấp | Cao | Rào an toàn 7.5 |
| R12 | Dàn trải khi mở nhiều thị trường | Cao | Cao | Cổng quyết định; mở theo dữ liệu |
| R13 | Năng lực một người không đủ | Cao | Cao | Sau Cổng 2 cân nhắc co-founder kỹ thuật |

---

## 18. Vận hành dự án

- **Scrum rút gọn** (1 PO + trợ lý AI), sprint 1 tuần: planning 15 phút · review trên sàn tập và trên sân · retro 10 phút.
- **Definition of Ready:** story theo mẫu, tiêu chí chấp nhận rõ, không phụ thuộc treo, vừa một sprint.
- **Definition of Done:**
  - [ ] Chạy trên iPhone Safari, offline.
  - [ ] Hiển thị đúng VI và EN; đơn vị đúng.
  - [ ] Dữ liệu cũ không hỏng (migration nếu đổi schema).
  - [ ] PO đã dùng trong ít nhất một buổi gym **hoặc** buổi sân thật.
  - [ ] Release notes cập nhật.
- **Bộ tài liệu PO:** Masterplan · Backlog · Biên bản phỏng vấn · Bảng chỉ số · Release notes · Nhật ký quyết định.

---

## 19. Quyết định mở & giả thuyết cần kiểm chứng

### 19.1 Quyết định mở

| # | Quyết định | Phương án | Hạn chốt |
|---|---|---|---|
| D1 | Tên thương mại | Setpoint (ưu tiên) → Gripset (nếu vướng nhãn hiệu) → Upweek (nếu bác bỏ H1) | Cuối Giai đoạn 0 |
| D2 | Năng lực thực tế mỗi tuần | 4–6 giờ (giả định) hoặc khác | Trước sprint 1 |
| D3 | Dinh dưỡng ở R0.3 | Đồng ý / đưa sớm hơn | Trước sprint 1 |
| D4 | Giao diện mặc định | Tối / Sáng / theo hệ thống | Giai đoạn 0 |
| D5 | Giáo án gym & lịch sân hiện tại của PO | Danh sách buổi, bài, lịch sân | Trước sprint 1 |
| D6 | Mục tiêu dinh dưỡng của PO để kiểm thử | Tăng cơ / giảm mỡ / giữ form | Trước R0.3 |

### 19.2 Giả thuyết cần kiểm chứng ở Giai đoạn 0

| # | Giả thuyết | Cách kiểm chứng | Ngưỡng xác nhận |
|---|---|---|---|
| **H1** | Người tập gym + chơi vợt thấy phiền vì phải dùng nhiều app / không có chỗ ghi buổi sân | Phỏng vấn 5–8 người | ≥ 5/8 xác nhận |
| **H2** | Họ muốn biết buổi sân ảnh hưởng thế nào tới buổi gym | Phỏng vấn + phản ứng với wireframe cảnh báo | ≥ 4/8 quan tâm rõ |
| **H3** | Họ sẵn sàng ghi ăn uống nếu chỉ cần chọn khẩu phần trực quan | Cho thử luồng ghi bữa trên wireframe | ≥ 4/8 sẵn sàng |
| H4 | Tên "Setpoint" gợi đúng sản phẩm và dễ nhớ | Test tên: "đoán app làm gì?", "nhớ tên nào sau 10 phút?" | Setpoint đứng đầu hoặc ngang Gripset |

---

## Phụ lục A — Nguồn tham khảo (thu thập 09/2026)

**App ghi tập luyện**
- Fitbod — Best Workout Tracker Apps 2026: https://fitbod.me/blog/best-workout-tracker-apps-for-2026/
- Stronger — Best Workout Tracker Apps 2026: https://www.strongermobileapp.com/blog/best-workout-tracker-apps
- Gym Note Plus — Best Workout Tracking Apps: https://www.gymnoteplus.com/blog/best-workout-tracking-apps
- SensAI — Hevy vs Strong vs Fitbod vs Jefit: https://www.sensai.fit/blog/hevy-vs-strong-vs-fitbod-vs-jefit
- RepReturn — Best Workout Tracking App 2026: https://repreturn.com/best-workout-tracking-app/
- Setgraph (App Pricing Lab): https://apppricinglab.com/app/apple/1209781676

**App tập lai**
- Athletech News — Hybrd launch: https://athletechnews.com/hybrd-app-launches-to-support-athletes-training-across-disciplines/
- Y Combinator — HYBRD: https://www.ycombinator.com/companies/hybrd
- HYBRD — App Store: https://apps.apple.com/app/id6670271875
- FITT Insider — HYBRD adaptive training plans: https://insider.fitt.co/press-release/hybrd-launches-adaptive-training-plans-for-hybrid-athletes/
- Healthy N Exercise — HYBRD review (giá): https://healthynexercise.com/ai-workouts/hybrd-training-app-review/
- Edge — Best Hybrid Workout Apps 2026: https://www.findyouredge.app/news/best-hybrid-workout-apps-2026-comparison
- Edge — Best Hybrid Training Apps (Apple Watch): https://www.findyouredge.app/news/best-hybrid-training-apps-2026-apple-watch-fitness
- Runna Support — Strength training: https://support.runna.com/en/articles/15624879-adding-strength-training-to-your-runna-plan
- TechCrunch — Strava acquires Runna & The Breakaway: https://techcrunch.com/2025/05/22/strava-is-buying-up-athletic-training-apps-first-runna-and-now-the-breakaway

**App gym + dinh dưỡng mới nổi**
- PlateLoad — App Store: https://apps.apple.com/app/id6762520718
- PlateUp Training — App Store: https://apps.apple.com/app/id6763631312

**App dinh dưỡng**
- AI Fit Hub — MacroFactor vs Cronometer: https://aifithub.io/articles/macrofactor-vs-cronometer-2026/
- Nutrola — MFP vs Cronometer vs MacroFactor: https://nutrola.app/en/blog/myfitnesspal-vs-cronometer-vs-macrofactor-2026
- kcalm — Best Calorie Tracking Apps 2026: https://kcalm.app/blog/best-calorie-tracking-apps-comparison/
- FitTrack AI — HealthifyMe comparison: https://www.fittrackai.in/blog/best-calorie-tracking-app-india-2026-honest-comparison
- NutriScan — HealthifyMe worth it: https://nutriscan.app/blog/posts/healthifyme-worth-it-2026-ria-ai-indian-food-tracker-f3167114ef
- NutriScan — Best Indian food tracker: https://nutriscan.app/blog/posts/best-app-for-indian-food-tracking-2026-21eec085b9

**Thị trường & xu hướng**
- VnExpress International — Pickleball boom: https://e.vnexpress.net/news/life/trend/vietnam-s-pickleball-boom-turns-fast-growing-sport-into-new-gold-mine-4992840.html
- VietNamNet — Pickleball World Cup 2026: https://vietnamnet.vn/en/vietnam-pickleball-tournament-sets-guinness-world-record-2551407.html
- Ken Research — Vietnam Fitness Services Market: https://www.kenresearch.com/industry-reports/vietnam-fitness-services-market
- Mordor Intelligence — SEA Health & Fitness Club Market: https://www.mordorintelligence.com/industry-reports/southeast-asia-health-and-fitness-club-market
- Sahha — Smartphone vs Wearable Adoption: https://sahha.ai/blog/smartphone-vs-wearable-adoption-statistics/
- IMARC — Vietnam Smartwatch Market: https://www.imarcgroup.com/vietnam-smartwatch-market
- Wikipedia — Pickleball in Australia: https://en.wikipedia.org/wiki/Pickleball_in_Australia

**Giữ chân người dùng**
- Business of Apps — Health & Fitness Benchmarks: https://www.businessofapps.com/data/health-fitness-app-benchmarks/
- Lucid — Retention Metrics for Fitness Apps: https://www.lucid.now/blog/retention-metrics-for-fitness-apps-industry-insights/
- Enable3 — App Retention Benchmarks: https://enable3.io/blog/app-retention-benchmarks-2025
- RetentionCheck — Fitness churn: https://retentioncheck.com/churn-benchmarks/fitness-apps

**Tên & thương hiệu**
- The Setpoint Diet (Jonathan Bailor): https://www.waterstones.com/book/9780316483834

*Một số nguồn là blog của đối thủ; giá và số liệu cần kiểm tra lại trên trang chính thức trước khi ra quyết định.*

---

## Phụ lục B — Thuật ngữ

| Thuật ngữ | Giải thích |
|---|---|
| Court Lifter | Persona chính: người vừa tập gym vừa chơi thể thao dùng vợt |
| Người tập lai (hybrid athlete) | Người kết hợp tập sức mạnh với ít nhất một môn khác |
| Double progression | Tăng rep trong khoảng mục tiêu, đạt trần thì tăng tạ |
| e1RM | 1 rep tối đa ước tính (Epley) |
| Volume | kg × rep × set |
| RPE | Mức gắng sức tự đánh giá, thang 1–10 |
| Session-RPE / tải phiên | Phút × RPE — thước đo tải chung cho gym và sân |
| Lịch sân cố định | Buổi thể thao lặp lại hằng tuần cùng thứ, cùng giờ |
| Deload | Tuần giảm tải để hồi phục |
| TDEE | Tổng năng lượng tiêu hao mỗi ngày |
| Vòng điều khiển Setpoint | Cơ chế TDEE thích ứng: đặt mục tiêu → đo xu hướng cân nặng → hiệu chỉnh calo |
| Cuisine Engine | Dữ liệu thực phẩm: lớp nền toàn cầu + gói ẩm thực địa phương, ghi theo khẩu phần |
| North Star Metric | Chỉ số dẫn đường phản ánh giá trị cốt lõi |
| i18n | Quốc tế hóa |
| PWA | Progressive Web App |
| MoSCoW | Ưu tiên Must / Should / Could / Won't |
| ASO | Tối ưu hiển thị trên kho ứng dụng |
| B2B2C | Tiếp cận người dùng cuối thông qua đối tác (ví dụ sân, câu lạc bộ) |

---

## Phụ lục C — Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|---|---|---|
| 1.0 | 29/09/2026 | Bản nền: nghiên cứu thị trường ban đầu, định vị "người tập lai + Cuisine Engine", MVP có i18n VI + EN, lộ trình hai cổng, GTM, tuân thủ, rủi ro. Tên mã NOTCH |
| **2.0** | 29/09/2026 | **Pivot định vị** sang "gym + thể thao dùng vợt, ưu tiên châu Á" · Đổi tên sang **Setpoint** (NOTCH đã bị dùng) · Bổ sung đối thủ HYBRD, Edge, Strava/Runna, PlateLoad, PlateUp Training, HealthifyMe, Setgraph · Thêm dữ liệu pickleball VN, wearable, giữ chân · Hạ chỉ tiêu giữ chân theo mặt bằng ngành · Cuisine Engine chuyển sang ghi theo khẩu phần + câu hỏi dầu mỡ · Thêm lịch sân cố định, quy tắc tải sân → gym, nguyên tắc "không cần wearable" · Thêm bảng giả thuyết H1–H4 · Thứ tự mở rộng: VN → Đông Nam Á → Úc → Mỹ/EU |

*— Hết tài liệu —*
