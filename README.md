# ANGLE website

Website ANGLE được tách theo trang, section, layout và phần tương tác dùng chung. Không cần cài thư viện runtime hoặc framework.

## Chạy trên máy

Cần Node.js 20 trở lên.

```sh
npm start
```

Mở `http://localhost:3000`. Sau mỗi lần sửa source, chạy lại lệnh trên; hoặc chạy `npm run build` khi server đang mở rồi tải lại trang.

```sh
npm run build
npm test
```

`dist/index.html` là website hoàn chỉnh. `dist/angle.html` là bản HTML độc lập đã nhúng ảnh, SVG và font.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `src/pages/` | Home, Product, About, Pricing, Contact |
| `src/sections/home/` | Hero, vấn đề người dùng, dịch vụ, tầm nhìn |
| `src/sections/product/` | Giới thiệu sản phẩm, camera demo, dịch vụ |
| `src/sections/about/` | Tiêu đề/tab và nội dung giới thiệu |
| `src/sections/pricing/` | Các card bối cảnh |
| `src/sections/contact/` | Form liên hệ |
| `src/layout/` | Header, footer |
| `src/components/` | Card dùng chung và dialog |
| `src/features/` | Demo camera, carousel, form và xử lý sự kiện |
| `src/core/` | Dữ liệu, trạng thái, ngôn ngữ, theme, router, toast |
| `src/styles/` | CSS gốc, responsive, hệ thống Figma, footer và bản sửa mobile |
| `public/assets/` | Ảnh Figma, logo/icon SVG, font Inter |
| `scripts/` | Build và server phát triển, chỉ dùng thư viện chuẩn Node.js |
| `tests/` | Kiểm tra tính tương đương của nội dung và tính toàn vẹn build |

## Chỉnh nội dung

- Bố cục từng trang: sửa file tương ứng trong `src/pages/`.
- Nội dung từng section: sửa file trong `src/sections/`.
- Ảnh/bối cảnh và danh sách dịch vụ: `src/core/state.js`.
- Logo và điều hướng: `src/layout/header.html`.
- Thông tin công ty, social và policy: `src/layout/footer.html`.
- Màu, font và kích thước từ Figma: `src/styles/figma-system.css`.
- Mobile: `src/styles/figma-responsive.css` và `src/styles/mobile-fixes.css`.
- Thứ tự ghép file: `src/sources.json`. Giữ nguyên thứ tự CSS để bảo toàn cascade hiện tại.

## Các route

`#/`, `#/product`, `#/about/vision`, `#/about/foundation`, `#/about/culture`, `#/pricing`, `#/contact`.

Demo camera chỉ mô phỏng, không truy cập camera hoặc xử lý AI thật. Form liên hệ mở ứng dụng email với bản nháp, không tự động gửi. iOS dùng link App Store của ANGLE; Android chưa có link tải chính thức trong dữ liệu được cung cấp.

## Thiết kế và tài nguyên

Thiết kế tham chiếu: [REVAMP ANGLE](https://www.figma.com/design/3XzGOEJzgvwAhZqqs4sMDJ/REVAMP-ANGLE?node-id=40012015-1953).

Ảnh, logo và icon lấy từ thiết kế ANGLE do người dùng cung cấp. Font Inter được phân phối theo SIL Open Font License; xem `public/assets/INTER-LICENSE.txt`. Không tự động cấp phép lại tài nguyên thương hiệu ANGLE.
