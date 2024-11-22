import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <div className="row">
          <div className="col-md-2 columsleft p-4">
            <img
              className="imgcolumsleft"
              width="30px"
              height="30px"
              src="http://localhost:3000/img/logo.png"
              alt=""
            />
            <h4 className="text-center">
              <span className="">
                Bộ môn <br />{" "}
              </span>{" "}
              Điện cơ khí
            </h4>
            <hr />
            {[
              { link: "thongke", name: "Thống kê" },
              { link: "quangcao", name: "Quảng cáo" },
              { link: "danhmuc", name: "Danh mục" },
              { link: "chuyennganh", name: "Chuyên ngành" },
              { link: "banve", name: "Kiến trúc" },
              { link: "doanluanvan", name: "Đồ án, Luận văn" },
              { link: "sanpham", name: "Sản phẩm" },
              { link: "nguoidung", name: "Người dùng" },
              { link: "donhang", name: "Đơn hàng" },
              { link: "binhluan", name: "Bình luận" },
              { link: "danhgia", name: "Đánh giá" },
              { link: "doitac", name: "Đối tác" },
            ].map(({ link, name }, index) => (
              <p className="mb-4" key={index}>
                <i
                  className={`bi bi-${
                    link === "thongke"
                      ? "pie-chart"
                      : link === "quangcao"
                      ? "badge-ad"
                      : link === "danhmuc"
                      ? "tag"
                      : link === "chuyennganh"
                      ? "tag"
                      : link === "banve"
                      ? "tag"
                      : link === "doanluanvan"
                      ? "tag"
                      : link === "sanpham"
                      ? "box-seam"
                      : link === "nguoidung"
                      ? "people"
                      : link === "donhang"
                      ? "cart"
                      : link === "binhluan"
                      ? "chat"
                      : link === "danhgia"
                      ? "star"
                      : link === "doitac"
                      ? "wallet"
                      : "chat-left-text"
                  }-fill me-2`}
                ></i>
                <Link href={link} className="columsleftext">
                  Q.lý {name}
                </Link>
              </p>
            ))}
            <hr />
          </div>
          <div className="col-md-10 p-0">
            <div className="shadow rowright d-flex justify-content-between align-items-center p-3 pb-1">
              <p>Website của Bộ môn điện cơ khí</p>
              <div>
                <span>BM Điện cơ khí</span>
                <img
                  className="rounded m-1 border border-1 border-white"
                  width="30px"
                  height="30px"
                  src="http://localhost:3000/img/logo.png"
                  alt=""
                />
              </div>
            </div>
            <div className="row"> {children} </div>
          </div>
          <div className="text-center">
            <p>Website của Bộ môn điện cơ khí</p>
          </div>
        </div>
      </body>
    </html>
  );
}
