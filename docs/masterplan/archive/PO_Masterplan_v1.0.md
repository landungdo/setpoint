# NOTCH — PO MASTERPLAN

**Ứng dụng theo dõi tập luyện & dinh dưỡng cho người tập lai (hybrid athlete)**

| Mục | Nội dung |
|---|---|
| Tên mã | NOTCH (tên thương mại chưa chốt — xem mục 2.4) |
| Phiên bản tài liệu | **1.0 — Bản nền (baseline)** |
| Ngày | 29/09/2026 |
| Product Owner | Darren (Đỗ Lân Dũng) |
| Trạng thái | Đã duyệt định hướng; còn các quyết định mở ở mục 19 |
| Phạm vi | Thiết kế cho toàn cầu; thử nghiệm song ngữ Tiếng Việt + Tiếng Anh; ra mắt theo từng thị trường |

---

## Mục lục

0. Tóm tắt điều hành
1. Bối cảnh & nghiên cứu thị trường
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
12. Kiến trúc thông tin (màn hình & luồng)
13. Lộ trình & cổng quyết định
14. Chiến lược ra thị trường & mở rộng
15. Mô hình kinh doanh
16. Pháp lý & tuân thủ
17. Quản trị rủi ro
18. Vận hành dự án
19. Quyết định mở
- Phụ lục A — Nguồn tham khảo
- Phụ lục B — Thuật ngữ
- Phụ lục C — Lịch sử phiên bản

---

## 0. Tóm tắt điều hành

**Vấn đề.** Người tập gym nghiêm túc kết hợp thêm một môn thể thao (chạy, cầu lông, pickleball, padel, Hyrox…) đang phải ghép 2–3 ứng dụng: một app ghi tạ, một app đếm calo, một app cardio. Không app nào nhìn toàn bộ tuần tập của họ để trả lời câu hỏi "tuần này tôi tiến hay lùi, và vì sao". Các app dinh dưỡng quốc tế lại yếu với đồ ăn quán và món nhà của các nền ẩm thực không phải phương Tây.

**Giải pháp.** NOTCH là cuốn sổ tập luyện và ăn uống duy nhất hiểu trọn tuần tập của người tập lai: ghi set một chạm, tự gợi ý tăng tạ, quy mọi môn thể thao về một thước đo tải chung, và gợi ý ăn uống theo ẩm thực địa phương với mục tiêu calo tự thích ứng theo xu hướng cân nặng.

**Hai trụ khác biệt.**
1. **Người tập lai:** gym + sân đấu + đường chạy trong một nhịp tuần.
2. **Cuisine Engine:** kiến trúc "gói ẩm thực" — gói Việt Nam là gói đầu tiên, mở rộng sang các nền ẩm thực khác.

**Chiến lược.** Thiết kế cho toàn cầu, ra mắt tại chỗ, mở rộng theo dữ liệu. Kiến trúc quốc tế hóa có từ MVP; thử nghiệm với người dùng Việt Nam và người nói tiếng Anh (Úc); chỉ mở rộng thị trường khi vượt cổng quyết định.

**Chỉ số North Star.** Số *tuần tập trọn vẹn* — tuần người dùng ghi ≥ 3 buổi và mở màn Chốt tuần.

**Lộ trình tóm tắt.** Khám phá (2 tuần) → 4 bản phát hành nội bộ (R0.1–R0.4, ~13 tuần) → Cổng 1 → Beta song ngữ (R1.0) → Cổng 2 → App native trên store (R2.0) → Mở rộng thị trường (R3.0).

---

## 1. Bối cảnh & nghiên cứu thị trường

*Số liệu thu thập tháng 09/2026 từ các bài so sánh và trang chính thức; giá tính theo USD tại Mỹ, thay đổi theo khu vực và thời điểm. Nguồn chi tiết ở Phụ lục A.*

### 1.1 Tổng quan

- Thị trường ứng dụng đếm calo ước tính khoảng **4,14 tỷ USD năm 2026**, tăng trưởng khoảng **9,3%/năm**.
- Thị trường tách thành hai mảng gần như rời nhau: **app ghi tập** và **app dinh dưỡng**. Ngay cả MacroFactor cũng tách mảng tập thành một app riêng, gói cả hai khoảng 90 USD/năm.
- Các bài đánh giá khuyên người vừa tập tạ vừa chạy dùng một app ghi tạ **kèm** một app cardio riêng (Strava, Garmin).
- Nhận định chung của giới review: các app lớn đều ghi set tốt, nhưng không app nào thực sự "coach" và không app nào dùng dữ liệu hồi phục để điều chỉnh buổi tập.

### 1.2 Bản đồ đối thủ

**Nhóm A — App ghi tập luyện**

| App | Điểm mạnh | Hạn chế | Giá tham khảo |
|---|---|---|---|
| **Strong** | Tối giản, ghi nhanh; xuất CSV được đánh giá tốt nhất ngành | Không AI, không giáo án, không video; bản free giới hạn 3 routine | 4,99$/tháng · 29,99$/năm · 99,99$ trọn đời |
| **Hevy** | Bản free hào phóng, đa nền tảng, mạng xã hội; đã thêm Hevy Trainer | Không có dinh dưỡng | ~2,99$/tháng · 23,99$/năm · 74,99$ trọn đời |
| **Jefit** | Hoạt động từ 2010, thư viện >1.300 bài có hoạt ảnh | Có quảng cáo ở bản free; giao diện nặng | 6,99$/tháng · 39,99$/năm |
| **Stronger** | "Strength Score" chấm sức mạnh 12 nhóm cơ | Phân tích nâng cao nằm sau paywall | 9,99$/tháng · 59,99$/năm |
| **Gym Note Plus** | Gõ set như ghi chú, tự phân tích thành dữ liệu — nhanh cho buổi tập tự do | Ít phân tích sâu | — |

**Nhóm B — App tự lập giáo án**

| App | Điểm mạnh | Hạn chế |
|---|---|---|
| **Fitbod** | AI sinh buổi tập theo lịch sử, hồi phục cơ, dụng cụ | Bắt buộc trả phí; người đã có giáo án ít cần |

**Nhóm C — App dinh dưỡng quốc tế**

| App | Điểm mạnh | Hạn chế | Giá tham khảo |
|---|---|---|---|
| **MyFitnessPal** | Cơ sở dữ liệu lớn nhất | Dữ liệu chủ yếu do cộng đồng nhập; nghiên cứu cho thấy 20–27% mục bị sai | Premium 79,99$/năm |
| **Cronometer** | Dữ liệu từ cơ sở dữ liệu chính phủ (USDA, NCCDB), kiểm duyệt nội bộ; bản free tốt | Mục tiêu cố định, không tự thích ứng | Gold 59,99$/năm |
| **MacroFactor** | TDEE thích ứng theo xu hướng cân nặng; 3 chế độ Coached / Collaborative / Manual | Không có bản free (chỉ thử 7 ngày); không theo dõi vi chất | 71,99$/năm |

**Nhóm D — App thị trường Việt Nam**

| App | Điểm mạnh | Hạn chế |
|---|---|---|
| **VietGym** | Thư viện món Việt, AI nhận diện món qua ảnh, video bài tập | Thiên về người mới; logic thăng tiến sức mạnh yếu |
| **Caloer** | Theo dõi cân nặng, dinh dưỡng, tập luyện; dữ liệu thực phẩm Việt (chỉ iOS) | Ghi tạ không chuyên sâu |
| **iEatBetter** | Miễn phí, dùng offline, không cần đăng nhập | Chỉ dinh dưỡng |

### 1.3 Insight chính

1. **Tốc độ ghi là chiến trường chính.** Nỗi đau phổ biến nhất: thời gian nghỉ giữa set biến thành thời gian nhập liệu.
2. **Hiện số liệu lần trước ngay trong ô nhập** là chuẩn mực của nhóm dẫn đầu (Strong, Hevy).
3. **Mục tiêu calo cố định không đủ.** Dữ liệu món ăn luôn có sai số; MacroFactor chứng minh cách bù sai số bằng xu hướng cân nặng thực tế.
4. **Dữ liệu cộng đồng không kiểm duyệt làm giảm độ tin cậy** (bài học MyFitnessPal).
5. **Ẩm thực địa phương là rào cản lớn nhất** ở các thị trường ngoài phương Tây — app quốc tế thiếu món, người dùng phải nhập tay.
6. **Người tập lai bị bỏ ngỏ:** phải dùng nhiều app, không có góc nhìn tải tập tổng hợp.

### 1.4 Khoảng trống thị trường

| Khoảng trống | Ai đang bỏ ngỏ | NOTCH lấp bằng |
|---|---|---|
| Gym + môn thể thao khác trong một app | Tất cả nhóm A, B | Tải tập tổng hợp (mục 6, tính năng ③) |
| Ghi tạ chuyên sâu + dinh dưỡng trong một app | Nhóm A (không có ăn uống), nhóm C/D (ghi tạ yếu) | Một sản phẩm, một nhịp Chốt tuần |
| Đồ ăn quán & món nhà ngoài phương Tây | Nhóm C | Cuisine Engine với gói ẩm thực |
| Tập ở nhiều phòng tập / khi đi du lịch | Tất cả | Hồ sơ phòng tập & chế độ du lịch |

---

## 2. Tầm nhìn, định vị & thương hiệu

### 2.1 Tầm nhìn

Trở thành cuốn sổ tập luyện và ăn uống duy nhất mà người tập lai trên toàn thế giới cần mở mỗi ngày.

### 2.2 Tuyên bố định vị

> Dành cho **người tập gym kết hợp một môn thể thao**, NOTCH là **cuốn sổ tập luyện và ăn uống duy nhất hiểu trọn tuần tập của họ** — gym, sân đấu, đường chạy và bữa ăn theo ẩm thực của chính họ. Khác với Hevy/Strong (chỉ ghi tạ) và MacroFactor (tách tập và ăn thành hai app), NOTCH gộp tất cả vào một nhịp tuần và tự nói cho người dùng khi nào tăng tạ, khi nào nghỉ, hôm nay ăn thêm gì.

### 2.3 Giá trị cốt lõi cho người dùng

- **Nhanh:** ghi một set dưới 3 giây.
- **Rõ:** biết chắc mình đang tiến bộ, và vì sao khi không tiến.
- **Trọn:** mọi hoạt động thể chất và bữa ăn trong một chỗ.
- **Gần:** ăn uống theo món mình thực sự ăn, không phải thực đơn kiểu mẫu.

### 2.4 Thương hiệu

- **Triết lý:** tăng tiến từng nấc nhỏ mỗi tuần ("nhích").
- **Phương án tên:** Notch / Notchly (tăng một nấc), Inchup (nhích lên), Hybridly / Crosslog (nhấn trụ người tập lai).
- **Thị trường Việt Nam:** giữ "Nhích" làm slogan — ví dụ *"Notch — mỗi tuần nhích một chút"*.
- **Điều kiện chốt tên:** qua đủ 4 bước kiểm tra — (1) App Store & Google Play, (2) tên miền .app/.com, (3) thương hiệu (WIPO Global Brand Database và cơ quan sở hữu trí tuệ ở thị trường mục tiêu), (4) handle mạng xã hội.

---

## 3. Người dùng mục tiêu

### 3.1 Persona chính — "Người tập lai" (Hybrid lifter)

- 20–35 tuổi, sống ở thành phố, dân văn phòng hoặc sinh viên năm cuối.
- Tập gym 3–7 buổi/tuần, đã tập ≥ 6 tháng, biết các bài cơ bản, có giáo án riêng.
- Chơi thêm ít nhất một môn: chạy, cầu lông, pickleball, padel, tennis, bóng đá, Hyrox…
- Ăn ngoài thường xuyên; đôi khi tập ở nhiều phòng khác nhau (nhà – quê – công tác).
- **Nỗi đau lớn nhất:** không biết mình có thực sự tiến bộ; không biết ăn đủ protein kiểu gì khi ăn quán; phải ghép nhiều app.

### 3.2 Biến thể theo thị trường

| Thị trường | Môn phổ biến | Đặc điểm | Ghi chú |
|---|---|---|---|
| Việt Nam / Đông Nam Á | Cầu lông, chạy, pickleball | Ăn quán nhiều; nhạy cảm về giá | Thị trường thử nghiệm đầu tiên |
| Úc / Mỹ | Pickleball, Hyrox, chạy | Quen trả phí cho app; so sánh trực tiếp với Hevy/Strong | Thử nghiệm tiếng Anh qua mạng lưới tại Úc |
| Châu Âu | Padel, chạy, bóng đá | Yêu cầu quyền riêng tư cao (GDPR) | Mở rộng sau cùng |

### 3.3 Persona không nhắm (giai đoạn đầu)

- **Người mới đi gym:** đông nhưng đã được phục vụ tốt bởi app có giáo án và video (Fitbod, VietGym…). Có thể mở rộng sau khi lõi sản phẩm vững.
- **Vận động viên chuyên nghiệp / coach quản lý nhiều học viên:** nhu cầu khác biệt, cần tính năng quản lý đội.

### 3.4 Jobs-to-be-done

1. *Khi đứng giữa hai set*, tôi muốn ghi lại thật nhanh, để không mất nhịp nghỉ.
2. *Khi bắt đầu buổi tập*, tôi muốn biết hôm nay nên nâng bao nhiêu, để chắc chắn mình đang tiến.
3. *Khi vừa chơi thể thao nặng hôm trước*, tôi muốn biết có nên giữ hay giảm cường độ buổi gym, để không quá tải.
4. *Khi cuối tuần nhìn lại*, tôi muốn biết mình tiến hay lùi và vì sao, để điều chỉnh tuần sau.
5. *Khi chưa biết tối nay ăn gì*, tôi muốn biết mình còn thiếu bao nhiêu protein và nên gọi món gì, để đạt mục tiêu mà không phải tính toán.
6. *Khi tập ở phòng khác hoặc đi du lịch*, tôi muốn có bài thay thế phù hợp dụng cụ, để không đứt mạch thăng tiến.

---

## 4. Nguyên tắc sản phẩm

Mọi tranh luận về tính năng quay về 5 nguyên tắc sau:

1. **Tốc độ ghi là sống còn.** Mục tiêu < 3 giây/set. Tính năng nào làm chậm việc ghi thì bị loại.
2. **App gợi ý, người dùng quyết.** Mọi đề xuất (tăng tạ, chỉnh calo) đều hiển thị lý do và cho phép ghi đè.
3. **Xu hướng quan trọng hơn con số tuyệt đối.** Cân nặng và macro món ăn đều nhiễu — dùng trung bình động.
4. **Offline trước tiên.** Phòng gym sóng yếu vẫn phải chạy mượt.
5. **Dữ liệu là của người dùng.** Xuất JSON/CSV và xoá toàn bộ dữ liệu bất cứ lúc nào.

---

## 5. Chỉ số thành công

### 5.1 North Star Metric

**Số tuần tập trọn vẹn** — số tuần người dùng ghi ≥ 3 buổi (gym hoặc thể thao) **và** mở màn Chốt tuần.
Lý do: chỉ số này đo đồng thời thói quen dùng (quay lại ghi) và giá trị nhận được (nhìn vào tiến độ).

### 5.2 Chỉ số đầu vào

| Chỉ số | Mục tiêu | Vì sao quan trọng |
|---|---|---|
| Thời gian ghi trung bình mỗi set | < 3 giây | Ma sát ghi chép là lý do số 1 khiến người dùng bỏ app |
| Tỷ lệ buổi tập được ghi trọn | > 90% | Buổi bỏ dở làm sai dữ liệu thăng tiến |
| Tỷ lệ gợi ý tăng tạ được chấp nhận | > 60% | Đo độ tin cậy của logic thăng tiến |
| Số ngày cân trong tuần | ≥ 3 | Điều kiện để TDEE thích ứng hoạt động |
| Tỷ lệ mở Chốt tuần | > 70% tuần hoạt động | Đo giá trị cốt lõi |
| Giữ chân sau 4 tuần (beta) | > 40% | Tín hiệu có nhu cầu thật |

### 5.3 Phân tách đo lường

Từ R1.0, mọi chỉ số được **tách theo thị trường và ngôn ngữ** (VN / EN–Úc / khác) để ra quyết định mở rộng dựa trên dữ liệu.

---

## 6. Giải pháp: tính năng đặc trưng

### ① Buổi tập một chạm
*Học từ Strong/Hevy, đẩy xa hơn.*
- Mỗi set được điền sẵn kg và rep theo gợi ý (dựa trên lần trước + logic thăng tiến).
- Làm đúng gợi ý → bấm ✓. Khác gợi ý → chỉnh bằng nút +/− cỡ lớn, dùng được bằng một tay.
- **Ô gõ tắt** (học từ Gym Note Plus): gõ `80x10x3` hoặc `80 10 10 9` → app tự phân tích thành set.
- Đồng hồ nghỉ tự chạy sau mỗi set, rung báo khi hết giờ.
- Báo PR ngay khi phá kỷ lục.

### ② Bộ theo dõi thăng tiến "Notch"
*Ý tưởng riêng.*
- Mỗi bài có vạch tiến độ trực quan: "còn 2 rep nữa là lên 62.5kg".
- **Chẩn đoán giậm chân:** bài nào 3 tuần liền không tiến → app tự đối chiếu dữ liệu sẵn có (protein tuần đó, tải thể thao bất thường, volume nhóm cơ) → đề xuất deload hoặc đổi biến thể.

### ③ Tải tập tổng hợp cho người tập lai — *tính năng dẫn dắt toàn cầu*
*Lấp khoảng trống lớn nhất thị trường.*
- Mọi hoạt động (gym, chạy, cầu lông, pickleball, padel, tennis, bóng đá, bơi, đạp xe, Hyrox) quy về một đơn vị chung: **tải phiên = số phút × RPE (1–10)** (phương pháp session-RPE).
- Cảnh báo theo ngữ cảnh, ví dụ: "Tối qua đánh cầu 2 giờ mức 8/10 — hôm nay buổi chân, cân nhắc giữ tạ."
- Check-in tùy chọn đầu buổi: "Hôm nay thấy thế nào? 😫 😐 💪" — dữ liệu hồi phục đơn giản nhất mà không cần thiết bị đeo.
- Danh mục môn dạng mô-đun: thêm môn mới gần như không tốn công phát triển.

### ④ Hồ sơ phòng tập & chế độ du lịch
*Ý tưởng riêng.*
- Mỗi phòng tập có danh sách dụng cụ riêng.
- Tập ở phòng thiếu máy / phòng khách sạn → đề xuất bài thay thế đã liên kết sẵn (ví dụ Leg press ↔ Hack squat ↔ Goblet squat).
- Lịch sử thăng tiến được giữ theo **nhóm động tác**, không đứt mạch khi đổi biến thể.

### ⑤ Cuisine Engine — ăn uống theo ẩm thực địa phương
*Kết hợp MacroFactor + app nội địa.*
- **Mục tiêu thích ứng:** công thức Mifflin-St Jeor để khởi đầu → sau 2–3 tuần hiệu chỉnh theo xu hướng cân nặng trung bình tuần. 3 chế độ: Tự động / Gợi ý–duyệt / Tự đặt.
- **Lớp nền toàn cầu:** thực phẩm cơ bản từ nguồn mở (USDA FoodData Central).
- **Lớp gói ẩm thực:** món quán & món nhà theo từng nền ẩm thực; mỗi món có 2 mức "suất quán / tự nấu". Gói Việt Nam là gói mẫu đầu tiên.
- **"Còn thiếu gì hôm nay":** tính phần protein/calo còn thiếu → gợi ý 2–3 phương án thực tế.
- **Rào an toàn:** không đề xuất calo dưới ngưỡng an toàn; giới hạn tốc độ giảm cân (mục 7.4).

### ⑥ Chốt tuần — *trái tim của North Star*
*Ý tưởng riêng.*
- Tối cuối tuần (theo ngày đầu tuần của khu vực), app tổng kết trong một màn hình: số buổi, PR, volume từng nhóm cơ so với khuyến nghị, tải tập tổng, xu hướng cân nặng, đề xuất calo tuần tới, 1–2 nhận định (ví dụ "volume lưng thấp hơn ngực 40%").
- Xuất ảnh chia sẻ theo ngôn ngữ người dùng → vòng lan truyền tự nhiên.

### ⑦ Sức mạnh theo nhóm cơ *(giai đoạn sau)*
*Học từ Stronger.* Biểu đồ radar sức mạnh các nhóm cơ, dựa trên 1RM ước tính chuẩn hoá theo cân nặng.

### 6.1 Chủ động không làm

| Không làm | Lý do |
|---|---|
| Mạng xã hội / feed | Tốn công lớn, Hevy đã làm tốt; lan truyền đã có qua ảnh Chốt tuần |
| AI nhận diện món qua ảnh | Chi phí cao, độ chính xác với món hỗn hợp còn thấp; TDEE thích ứng đã bù sai số |
| Thư viện video bài tập | Persona chính không cần; sân chơi của Jefit/Fitbod |
| Theo dõi vi chất | Ngoài nhu cầu persona chính |
| AI tự sinh giáo án | Persona chính đã có giáo án; sân chơi của Fitbod |

---

## 7. Logic nghiệp vụ cốt lõi

### 7.1 Thăng tiến sức mạnh (double progression)

- Mỗi bài có khoảng rep mục tiêu (mặc định 8–12, tùy chỉnh được).
- **Quy tắc tăng tạ:** tất cả set của lần trước đạt rep trần → lần sau gợi ý tăng một bước.
  - Bước mặc định: thân trên +2.5 kg / +5 lb; thân dưới & bài nặng +5 kg / +10 lb. Tùy chỉnh theo bài và theo dụng cụ (tạ đơn nhảy bước 2 kg…).
- **Chưa đạt:** giữ tạ, mục tiêu +1 rep ở set chưa đạt.
- **Giậm chân:** 3 tuần liền không tăng tạ hoặc tổng rep → gợi ý deload (giảm ~10% tạ trong 1 tuần) hoặc đổi biến thể.
- **1RM ước tính (Epley):** `e1RM = kg × (1 + rep/30)` — dùng để so sánh công bằng giữa các buổi có số rep khác nhau.
- **Volume:** `kg × rep × set`; tổng set theo nhóm cơ/tuần so với khoảng tham chiếu 10–20 set.
- Mọi gợi ý hiển thị lý do, ví dụ: "Lần trước 3×12 → tăng lên 62.5 kg".

### 7.2 Tải tập tổng hợp

- **Tải phiên:** `phút × RPE`. Gym: thời lượng buổi × RPE tổng buổi.
- **Tải tuần:** tổng tải phiên trong tuần.
- **Cảnh báo tăng đột biến:** tải tuần vượt trung bình 4 tuần gần nhất quá ngưỡng (khởi điểm +30%, cần kiểm chứng) → nhắc chú ý hồi phục.
- **Cảnh báo theo ngữ cảnh:** hoạt động RPE ≥ 8 trong 24 giờ trước buổi tập cùng nhóm cơ chính → gợi ý giữ tạ.
- Đây là gợi ý tham khảo, không phải chẩn đoán y khoa.

### 7.3 Dinh dưỡng thích ứng

- **Khởi đầu:** BMR theo Mifflin-St Jeor × hệ số vận động (ước theo tải tuần) → TDEE.
- **Theo mục tiêu:** tăng cơ +5–10%; giảm mỡ −15–20%; giữ form 0%.
- **Protein:** 1,6–2,2 g/kg cân nặng. Phần còn lại chia carb/fat theo lựa chọn người dùng.
- **Thích ứng:**
  - Cân nặng dùng trung bình động 7 ngày.
  - Mỗi tuần so sánh thay đổi thực tế với mục tiêu (ví dụ tăng cơ: +0,25–0,5% cân nặng/tuần).
  - Lệch đáng kể trong ≥ 2 tuần → đề xuất chỉnh ±100–150 kcal; tối đa một lần/tuần.
  - Cần ≥ 3 lần cân/tuần; thiếu dữ liệu thì không chỉnh.

### 7.4 Rào an toàn

- Không đề xuất mức calo dưới ngưỡng an toàn tối thiểu.
- Giới hạn tốc độ giảm cân mục tiêu ở 0,5–1% cân nặng/tuần.
- Tuyên bố miễn trừ theo từng ngôn ngữ: app không thay thế tư vấn y tế hay dinh dưỡng chuyên môn.

---

## 8. Phạm vi & ưu tiên

### 8.1 MoSCoW cho MVP (R0.1)

| Mức | Hạng mục |
|---|---|
| **Must** | Hồ sơ & mục tiêu · Lịch tập & template · Buổi tập một chạm với dữ liệu lần trước · Đồng hồ nghỉ · Ô gõ tắt · Lịch sử buổi tập · Ghi nhanh buổi thể thao (phút + RPE) · Sao lưu/khôi phục JSON · **Quốc tế hóa VI + EN** · **kg/lb** · **Lưu thời gian UTC** |
| **Should** (R0.2) | Gợi ý tăng tạ · PR · Biểu đồ từng bài · Chốt tuần · Ghi cân nặng · Xuất CSV |
| **Could** (R0.3–R0.4) | Cuisine Engine & gói Việt · TDEE thích ứng · Tải tập tổng hợp · Hồ sơ phòng tập & chế độ du lịch · Chẩn đoán giậm chân |
| **Won't (lúc này)** | Tài khoản & đồng bộ đám mây · Mạng xã hội · Sức mạnh theo nhóm cơ · Apple Health / Health Connect · Thanh toán |

### 8.2 Lý do ưu tiên

Dinh dưỡng là một nửa ý tưởng ban đầu nhưng được đặt ở R0.3: nếu việc ghi tạ chưa thành thói quen, thêm dinh dưỡng không cứu được sản phẩm. Làm lõi thật chắc trước, rồi mở rộng.

---

## 9. User stories & tiêu chí chấp nhận

**US-01 — Ghi set một chạm**
*Là người tập, tôi muốn xác nhận set bằng một chạm khi làm đúng gợi ý, để không mất thời gian nghỉ.*
- [ ] Ô nhập điền sẵn kg và rep theo gợi ý.
- [ ] Bấm ✓ → set được lưu và đồng hồ nghỉ chạy trong < 300 ms.
- [ ] Chỉnh kg (bước 1.25/2.5 kg hoặc 2.5/5 lb) và rep bằng nút ≥ 44 pt, thao tác được một tay.
- [ ] Hoạt động khi mất mạng.
- [ ] Hiển thị đúng ở cả VI và EN.

**US-02 — Ô gõ tắt**
*Là người tập, tôi muốn gõ nhanh cả buổi tập theo cú pháp ngắn, để ghi buổi tập tự do không cần template.*
- [ ] `80x10x3` → 3 set × 80 kg × 10 rep.
- [ ] `80 10 10 9` → 3 set 80 kg với rep 10, 10, 9.
- [ ] Hiển thị bản xem trước để xác nhận trước khi lưu.
- [ ] Cú pháp không hợp lệ → báo lỗi thân thiện, không mất dữ liệu đã gõ.

**US-03 — Gợi ý tăng tạ**
*Là người tập, tôi muốn app đề xuất mức tạ buổi sau, để chắc chắn tôi đang tăng tiến.*
- [ ] Tất cả set lần trước đạt rep trần → gợi ý cộng bước tạ của bài.
- [ ] Chưa đạt → giữ tạ, mục tiêu +1 rep.
- [ ] Luôn hiện lý do bằng ngôn ngữ người dùng.
- [ ] Người dùng ghi đè được; hệ thống ghi nhận chấp nhận/từ chối để đo chỉ số.

**US-04 — Ghi buổi thể thao**
*Là người tập lai, tôi muốn ghi buổi cầu lông/chạy trong vài giây, để app hiểu tải tập cả tuần.*
- [ ] Chọn môn → nhập phút → chọn RPE 1–10 → lưu (≤ 4 thao tác).
- [ ] Tải phiên được tính và cộng vào tải tuần.

**US-05 — Chốt tuần**
*Là người tập, tôi muốn xem tổng kết tuần trong một màn hình, để biết mình tiến hay lùi.*
- [ ] Hiển thị số buổi, PR, set theo nhóm cơ so với khoảng 10–20, so sánh tuần trước.
- [ ] Tải xong < 1 giây với 1 năm dữ liệu.
- [ ] Xuất ảnh chia sẻ theo ngôn ngữ người dùng.
- [ ] Ngày chốt theo ngày đầu tuần của khu vực.

**US-06 — Sao lưu & khôi phục**
*Là người dùng, tôi muốn xuất toàn bộ dữ liệu ra file, để không bao giờ mất lịch sử tập.*
- [ ] Xuất một file JSON; nhập lại khôi phục 100% dữ liệu.
- [ ] Nhắc sao lưu nếu đã 7 ngày chưa làm.
- [ ] File có số phiên bản schema để tương thích khi di chuyển sang hệ thống đám mây.

**US-07 — "Còn thiếu gì hôm nay"** *(R0.3)*
*Là người tập, tôi muốn biết nên ăn thêm gì để đủ mục tiêu, để không phải tự tính.*
- [ ] Hiển thị protein/calo còn thiếu trong ngày.
- [ ] Gợi ý 2–3 phương án từ gói ẩm thực đang bật, có mức "suất quán / tự nấu".
- [ ] Không bao giờ gợi ý vượt rào an toàn ở mục 7.4.

---

## 10. Yêu cầu phi chức năng & quốc tế hóa

### 10.1 Phi chức năng

| Hạng mục | Yêu cầu |
|---|---|
| Hiệu năng | Mở app < 2 giây; lưu set < 300 ms; Chốt tuần < 1 giây với 1 năm dữ liệu |
| Offline | Toàn bộ chức năng ghi chép hoạt động không cần mạng |
| Khả dụng | Nút ≥ 44 pt; tương phản đạt WCAG AA; hỗ trợ cỡ chữ động của hệ điều hành |
| Toàn vẹn dữ liệu | Không mất dữ liệu khi tắt app đột ngột; schema có phiên bản & migration |
| Giao diện | Chế độ sáng/tối theo hệ thống |

### 10.2 Quốc tế hóa (bắt buộc từ MVP)

**Ngôn ngữ**
- Không viết cứng chuỗi hiển thị; mọi chuỗi nằm trong file ngôn ngữ (`vi.json`, `en.json`), code gọi theo khóa.
- Dùng chuẩn ICU cho số nhiều và biến trong câu.
- Giao diện chừa chỗ cho câu dài hơn ~30% so với tiếng Anh.
- Dữ liệu lưu theo ID, tên hiển thị theo ngôn ngữ (ví dụ `ex_bench_press` → "Đẩy ngực ngang" / "Bench press").
- CSS dùng thuộc tính logic (`margin-inline-start`…) để sẵn sàng cho ngôn ngữ viết từ phải sang trái.
- Nội dung sức khỏe phải được người bản ngữ rà soát; không dùng máy dịch thô.

**Đơn vị & định dạng**
- Lưu nội bộ theo hệ mét (kg, km, cm, kcal); chỉ quy đổi khi hiển thị (lb, dặm, ft/in, kJ).
- Bước tăng tạ tự đổi theo đơn vị.
- Định dạng ngày, số thập phân, ngày đầu tuần theo khu vực.
- Thời gian lưu theo UTC kèm múi giờ ghi nhận.

**Nội dung theo văn hóa**
- Danh mục môn thể thao chọn khi onboarding.
- Gói ẩm thực bật/tắt độc lập (ví dụ người Việt ở Úc bật cả gói Việt và gói Úc).

---

## 11. Kiến trúc kỹ thuật & mô hình dữ liệu

### 11.1 Lộ trình công nghệ

| Giai đoạn | Công nghệ | Lý do |
|---|---|---|
| R0.1–R0.4 (tự dùng) | Web app một file HTML, lưu trên thiết bị (localStorage/IndexedDB), i18n từ đầu | Nhanh, miễn phí, kiểm chứng UX |
| R1.0 Beta | PWA + Supabase (xác thực, đồng bộ), máy chủ khu vực Singapore | Gần VN & Úc; độ trễ thấp |
| R2.0 Global | Đóng gói native (Capacitor hoặc React Native/Expo) lên App Store & Google Play | Người dùng tìm app qua store; cần Apple Health / Health Connect; thanh toán trong app |

**Lưu ý iOS:** dữ liệu web lưu trên thiết bị có thể bị hệ điều hành xoá nếu lâu không dùng → sao lưu JSON + nhắc hàng tuần là bắt buộc ở R0.x.

### 11.2 Mô hình dữ liệu (rút gọn)

| Thực thể | Trường chính |
|---|---|
| `Profile` | id, ngôn ngữ, khu vực, hệ đơn vị, ngày đầu tuần, năm sinh, giới tính sinh học (cho công thức BMR), chiều cao, mục tiêu, chế độ dinh dưỡng |
| `Exercise` | id, tên theo ngôn ngữ, nhóm cơ chính/phụ, nhóm động tác, dụng cụ, khoảng rep, bước tăng tạ |
| `ExerciseLink` | exercise_id_a, exercise_id_b (biến thể thay thế) |
| `Gym` | id, tên, danh sách dụng cụ |
| `Template` | id, tên, danh sách bài + số set |
| `Session` | id, loại (gym/thể thao), môn, gym_id, bắt đầu (UTC), múi giờ, thời lượng, RPE, check-in cảm nhận, ghi chú |
| `Set` | id, session_id, exercise_id, kg, rep, RPE (tùy chọn), là PR, gợi ý được chấp nhận |
| `BodyWeight` | ngày, kg |
| `Food` | id, nguồn (USDA / gói ẩm thực), gói, tên theo ngôn ngữ, khẩu phần "quán / nhà", kcal, P/C/F |
| `MealLog` | ngày, food_id, khẩu phần, số lượng |
| `WeeklyReview` | tuần, chỉ số tổng hợp, đề xuất calo, đã xem |

### 11.3 Chuẩn dữ liệu

- Mọi khóa chính dùng UUID để tránh xung đột khi đồng bộ.
- File sao lưu có `schema_version`.
- Không lưu dữ liệu cá nhân trong URL hoặc log.

---

## 12. Kiến trúc thông tin (màn hình & luồng)

### 12.1 Điều hướng chính (tab bar)

1. **Hôm nay** — buổi tập theo lịch; nút "Bắt đầu"; ngày nghỉ gym → ghi nhanh buổi thể thao; check-in cảm nhận.
2. **Tiến độ** — biểu đồ từng bài (tạ cao nhất, e1RM, volume), danh sách PR, cảnh báo giậm chân.
3. **Chốt tuần** — tổng kết tuần, so sánh tuần trước, xuất ảnh.
4. **Dinh dưỡng** — mục tiêu ngày, "còn thiếu gì hôm nay", ghi nhanh bữa, cân nặng.
5. **Cài đặt** — hồ sơ, ngôn ngữ, đơn vị, lịch tập, bài tập, phòng tập, gói ẩm thực, sao lưu.

### 12.2 Chế độ tập (toàn màn hình)

Danh sách bài của buổi → mỗi bài hiện "lần trước" + ô gợi ý → ✓ / chỉnh → đồng hồ nghỉ → báo PR → kết thúc buổi → nhập RPE tổng buổi → tóm tắt buổi.

### 12.3 Onboarding (≤ 60 giây)

Ngôn ngữ & đơn vị → mục tiêu → chỉ số cơ thể → môn thể thao đang chơi → nhập giáo án (chọn mẫu hoặc tự tạo) → gói ẩm thực (R0.3+).

---

## 13. Lộ trình & cổng quyết định

**Giả định năng lực:** 4–6 giờ/tuần (PO kiêm vai trò chính, làm song song công việc toàn thời gian). Sprint 1 tuần. *Cần xác nhận lại — xem mục 19.*

| Giai đoạn | Thời gian | Kết quả bàn giao | Tiêu chí hoàn thành / cổng |
|---|---|---|---|
| **0. Khám phá** | Tuần 1–2 | Phỏng vấn 5 người VN + 3–5 người nói tiếng Anh; chốt spec; wireframe; kiểm tra tên | ≥ 5/8 người xác nhận nỗi đau "ghép nhiều app" hoặc "không biết mình có tiến không" |
| **R0.1 "Sổ tạ"** (MVP) | Tuần 3–5 | Toàn bộ nhóm Must (mục 8.1) | PO tự dùng liên tục 3 tuần; thời gian ghi < 3 giây/set |
| **R0.2 "Thăng tiến"** | Tuần 6–8 | Gợi ý tăng tạ, PR, biểu đồ, Chốt tuần, cân nặng, CSV | Chấp nhận gợi ý > 60%; Chốt tuần được mở hàng tuần |
| **R0.3 "Cuisine Engine"** | Tuần 9–12 | Kiến trúc gói ẩm thực, gói Việt, lớp nền USDA, TDEE thích ứng | Mục tiêu calo hội tụ sau ~3 tuần dữ liệu |
| **R0.4 "Người tập lai"** | Tuần 13–15 | Tải tập tổng hợp, danh mục môn, hồ sơ phòng tập & chế độ du lịch, chẩn đoán giậm chân | Tự dùng tổng cộng 12 tuần liên tục |
| 🚦 **Cổng 1** | Tuần 16 | Đánh giá Go/No-go | PO dùng đều 12 tuần **và** ≥ 5 người VN + ≥ 5 người nói tiếng Anh xin dùng thử |
| **R1.0 Beta song ngữ** | Tuần 17–24 | PWA + Supabase, onboarding, chia sẻ Chốt tuần, kênh góp ý, chính sách quyền riêng tư | 20–30 người dùng VN + Úc; đo chỉ số tách theo thị trường |
| 🚦 **Cổng 2** | Tuần 25 | Đánh giá Go/No-go | Giữ chân 4 tuần > 40% ở ít nhất một thị trường |
| **R2.0 Ra mắt store** | Từ tuần 26 | App native, Apple Health / Health Connect, thanh toán | Ra mắt tại thị trường có số liệu beta tốt nhất |
| **R3.0 Mở rộng** | Sau R2.0 | Thêm ngôn ngữ & gói ẩm thực | Theo dữ liệu nhu cầu thực tế |

**Nguyên tắc cổng:** không xây hạ tầng thị trường (tài khoản, máy chủ, marketing) trước khi có bằng chứng nhu cầu. Nếu dừng ở bất kỳ cổng nào, toàn bộ tài liệu và sản phẩm vẫn là một case study hoàn chỉnh.

---

## 14. Chiến lược ra thị trường & mở rộng

### 14.1 Thứ tự mở rộng (đề xuất, điều chỉnh theo dữ liệu)

1. **Việt Nam** — thị trường thử nghiệm, gói ẩm thực Việt.
2. **Người Việt ở nước ngoài & Úc** — song ngữ, cầu nối tự nhiên; tận dụng mạng lưới tại Úc.
3. **Đông Nam Á** (Thái Lan, Indonesia, Philippines) — cùng nỗi đau ẩm thực địa phương.
4. **Thị trường nói tiếng Anh rộng hơn** (Mỹ, Anh, Canada).
5. **Châu Âu** — sau khi tuân thủ GDPR hoàn chỉnh.

### 14.2 Kênh

| Thị trường | Kênh |
|---|---|
| Việt Nam | Phòng gym (phản hồi trực tiếp), group Facebook gym/cầu lông/chạy bộ, TikTok nội dung "tiến độ 12 tuần" |
| Toàn cầu | Reddit (r/fitness, r/weightroom, r/hybridathlete, r/Pickleball…), cộng đồng Hyrox, ASO với từ khóa "hybrid training tracker", "gym + running log" |
| Chung | Ảnh Chốt tuần tự động theo ngôn ngữ, có watermark nhẹ → vòng lan truyền |

### 14.3 Thông điệp theo trụ

- **Người tập lai:** "Một app cho cả phòng gym lẫn sân đấu."
- **Cuisine Engine:** "Đếm đúng món bạn thực sự ăn."
- **Thăng tiến:** "Biết chắc mỗi tuần bạn mạnh hơn."

---

## 15. Mô hình kinh doanh

*Toàn bộ là giả thuyết, cần kiểm chứng trong Beta.*

- **Freemium:**
  - **Miễn phí vĩnh viễn:** ghi tạ, ghi thể thao, lịch sử, sao lưu/xuất dữ liệu.
  - **Pro:** TDEE thích ứng, tải tập tổng hợp & cảnh báo, chẩn đoán giậm chân, phân tích nâng cao, tích hợp sức khỏe.
- **Định giá theo sức mua từng khu vực** (App Store & Google Play hỗ trợ giá theo quốc gia). Mức giá Việt Nam dự kiến thấp hơn nhiều so với mặt bằng 30–90 USD/năm của app quốc tế; con số cụ thể xác định qua phỏng vấn và thử nghiệm giá.
- **Không bán dữ liệu người dùng; không dùng dữ liệu sức khỏe cho quảng cáo.**

---

## 16. Pháp lý & tuân thủ

**Bắt buộc hoàn thành trước R1.0 (khi thu dữ liệu người dùng thật).**

| Khu vực | Quy định cần xem xét |
|---|---|
| Việt Nam | Luật bảo vệ dữ liệu cá nhân (hiệu lực từ 2026); dữ liệu sức khỏe thuộc nhóm nhạy cảm |
| EU / UK | GDPR — dữ liệu sức khỏe là "dữ liệu loại đặc biệt", cần đồng ý rõ ràng |
| Úc | Privacy Act |
| Mỹ | Luật tiểu bang (ví dụ CCPA – California) |
| Apple / Google | Chính sách cho app sức khỏe; dữ liệu Apple Health không được dùng cho quảng cáo |
| Dữ liệu thực phẩm | USDA FoodData Central (phạm vi công cộng); Open Food Facts dùng giấy phép ODbL — yêu cầu ghi nguồn và chia sẻ lại dữ liệu phái sinh, cần đánh giá trước khi tích hợp |

**Nguyên tắc thiết kế tuân thủ:** thu tối thiểu · đồng ý rõ ràng · xuất & xoá toàn bộ dữ liệu · chính sách quyền riêng tư song ngữ · tuyên bố miễn trừ sức khỏe theo ngôn ngữ.

*Tài liệu này không phải tư vấn pháp lý; cần người có chuyên môn rà soát trước R1.0.*

---

## 17. Quản trị rủi ro

| # | Rủi ro | Khả năng | Tác động | Giảm thiểu | Chủ sở hữu |
|---|---|---|---|---|---|
| R1 | Phình phạm vi do nhiều việc song song và ý tưởng mới | Cao | Cao | MoSCoW cứng; ý tưởng mới vào backlog, chỉ xét ở buổi lên kế hoạch sprint | PO |
| R2 | Người dùng bỏ app vì ghi chép phiền | TB | Rất cao | Theo dõi sát chỉ số thời gian ghi/set; nguyên tắc sản phẩm số 1 | PO |
| R3 | Cạnh tranh trực diện với Hevy/Strong ở tầm toàn cầu | Cao | Cao | Không đấu ở ghi tạ thuần; dẫn dắt bằng trụ người tập lai & Cuisine Engine | PO |
| R4 | iOS xoá dữ liệu web lưu cục bộ | TB | Cao | Sao lưu JSON + nhắc hàng tuần; chuyển Supabase ở R1.0 | PO |
| R5 | Macro món ăn không chính xác | Cao | TB | TDEE thích ứng tự hiệu chỉnh; hiển thị dạng ước lượng | PO |
| R6 | Gợi ý dinh dưỡng gây hại | Thấp | Cao | Rào an toàn mục 7.4; tuyên bố miễn trừ | PO |
| R7 | Dàn trải nguồn lực khi làm nhiều thị trường | Cao | Cao | Cổng quyết định; chỉ mở rộng thị trường có số liệu tốt | PO |
| R8 | Bản dịch kém làm mất uy tín | TB | TB | Người bản ngữ rà soát; không máy dịch thô cho nội dung sức khỏe | PO |
| R9 | Chi phí & độ phức tạp pháp lý khi vào EU | TB | TB | Đặt EU cuối thứ tự mở rộng | PO |
| R10 | Năng lực một người không theo kịp tầm toàn cầu | Cao | Cao | Sau Cổng 2 cân nhắc tìm co-founder kỹ thuật | PO |
| R11 | Tên thương mại trùng / tranh chấp nhãn hiệu | TB | Cao | Kiểm tra 4 bước trước khi chốt tên | PO |

---

## 18. Vận hành dự án

### 18.1 Mô hình làm việc

- **Scrum rút gọn** cho 1 PO + trợ lý AI; sprint 1 tuần.
- **Sprint planning (đầu tuần, 15 phút):** chọn 2–4 story từ backlog theo ưu tiên.
- **Sprint review:** dùng thật trên sàn tập; ghi lại điểm vướng.
- **Retro (cuối tuần, 10 phút):** cái gì trơn tru, cái gì phiền, tuần sau sửa gì.

### 18.2 Definition of Ready

Story có mô tả theo mẫu, tiêu chí chấp nhận rõ, không phụ thuộc chưa giải quyết, ước lượng vừa một sprint.

### 18.3 Definition of Done

- [ ] Chạy được trên iPhone Safari.
- [ ] Hoạt động offline.
- [ ] Hiển thị đúng ở VI và EN; đơn vị kg/lb đúng.
- [ ] Dữ liệu cũ không hỏng (đã chạy migration nếu đổi schema).
- [ ] PO đã tự dùng trong ít nhất một buổi tập thật.
- [ ] Release notes đã cập nhật.

### 18.4 Bộ tài liệu PO cần duy trì

PO Masterplan (tài liệu này) · Product backlog · Biên bản phỏng vấn người dùng · Bảng chỉ số · Release notes · Nhật ký quyết định (decision log).

---

## 19. Quyết định mở

| # | Quyết định | Phương án | Hạn chốt |
|---|---|---|---|
| D1 | Tên thương mại | Notch/Notchly · Inchup · Hybridly · Crosslog · khác — sau kiểm tra 4 bước | Cuối Giai đoạn 0 |
| D2 | Xác nhận năng lực thực tế mỗi tuần | 4–6 giờ (giả định hiện tại) hoặc khác → điều chỉnh lộ trình | Trước sprint 1 |
| D3 | Dinh dưỡng đặt ở R0.3 | Đồng ý / đưa lên sớm hơn | Trước sprint 1 |
| D4 | Giao diện mặc định | Tối / Sáng / theo hệ thống | Giai đoạn 0 |
| D5 | Giáo án hiện tại của PO để nạp sẵn cho MVP | Danh sách buổi & bài tập | Trước sprint 1 |
| D6 | Mục tiêu dinh dưỡng của PO để kiểm thử | Tăng cơ / giảm mỡ / giữ form | Trước R0.3 |

---

## Phụ lục A — Nguồn tham khảo (thu thập 09/2026)

**App ghi tập luyện**
- Fitbod — Best Workout Tracker Apps For 2026: https://fitbod.me/blog/best-workout-tracker-apps-for-2026/
- Stronger — Best Workout Tracker Apps in 2026: https://www.strongermobileapp.com/blog/best-workout-tracker-apps
- Gym Note Plus — 6 Best Workout Tracking Apps in 2026: https://www.gymnoteplus.com/blog/best-workout-tracking-apps
- SensAI — Hevy vs Strong vs Fitbod vs Jefit: https://www.sensai.fit/blog/hevy-vs-strong-vs-fitbod-vs-jefit
- SensAI — Hevy vs Strong vs Fitbod: https://www.sensai.fit/blog/hevy-vs-strong-vs-fitbod
- RepReturn — Best Workout Tracking App in 2026: https://repreturn.com/best-workout-tracking-app/
- GainFrame — 6 Best Workout Tracker Apps for Lifters: https://gainframe.app/blog/best-workout-tracker-apps/

**App dinh dưỡng**
- AI Fit Hub — MacroFactor vs Cronometer 2026: https://aifithub.io/articles/macrofactor-vs-cronometer-2026/
- Nutrola — MyFitnessPal vs Cronometer vs MacroFactor 2026: https://nutrola.app/en/blog/myfitnesspal-vs-cronometer-vs-macrofactor-2026
- NutriScan — MacroFactor vs MyFitnessPal: https://nutriscan.app/blog/posts/macrofactor-vs-myfitnesspal-2026-93f2aa703e
- kcalm — Best Calorie Tracking Apps in 2026: https://kcalm.app/blog/best-calorie-tracking-apps-comparison/

**Thị trường Việt Nam**
- VietGym: https://vietgym.io.vn/
- Caloer (App Store VN): https://apps.apple.com/vn/app/id6474173293
- Wheytot — So sánh app tính calo thực phẩm Việt: https://wheytot.com/blogs/cong-nghe-fitness/app-tinh-calo-thuc-pham-viet
- Hoàng Hà Mobile — Top app tính calo: https://hoanghamobile.com/tin-tuc/app-tinh-calo/

*Lưu ý: một số nguồn là blog của chính đối thủ cạnh tranh; giá và tính năng cần kiểm tra lại trên trang chính thức trước khi dùng cho quyết định định giá.*

---

## Phụ lục B — Thuật ngữ

| Thuật ngữ | Giải thích |
|---|---|
| Người tập lai (hybrid athlete) | Người tập sức mạnh kết hợp ít nhất một môn thể thao/sức bền |
| Double progression | Tăng rep trong khoảng mục tiêu, đạt trần thì tăng tạ và quay về sàn |
| e1RM | 1 rep tối đa ước tính (công thức Epley) |
| Volume | Tổng khối lượng: kg × rep × set |
| RPE | Mức gắng sức tự đánh giá, thang 1–10 |
| Session-RPE / tải phiên | Phút × RPE — thước đo tải tập chung cho mọi môn |
| Deload | Tuần giảm tải để hồi phục |
| TDEE | Tổng năng lượng tiêu hao mỗi ngày |
| TDEE thích ứng | Mục tiêu calo được hiệu chỉnh theo xu hướng cân nặng thực tế |
| Cuisine Engine | Kiến trúc dữ liệu thực phẩm gồm lớp nền toàn cầu + các gói ẩm thực địa phương |
| North Star Metric | Chỉ số dẫn đường duy nhất phản ánh giá trị cốt lõi |
| i18n | Quốc tế hóa — thiết kế để hỗ trợ nhiều ngôn ngữ/khu vực |
| PWA | Progressive Web App — web app cài được lên màn hình chính |
| MoSCoW | Phương pháp ưu tiên Must / Should / Could / Won't |
| ASO | Tối ưu hiển thị trên kho ứng dụng |

---

## Phụ lục C — Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|---|---|---|
| 1.0 | 29/09/2026 | Bản nền: tổng hợp nghiên cứu thị trường, định vị toàn cầu hai trụ, phạm vi MVP có i18n VI + EN, lộ trình với hai cổng quyết định, GTM, tuân thủ, rủi ro |

*— Hết tài liệu —*
