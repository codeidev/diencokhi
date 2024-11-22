"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
export default function Info() {
  // Lấy token từ cookie
  const token = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  const tokenValue = token?.split("=")[1];

  if (!tokenValue) {
    window.location.href = "/dangnhap";
  }

  // Lấy thông tin user bằng token
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Thêm loading state

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/detailuser", {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        const data = await res.json();
        setUser(data);

        // Lấy ảnh từ user ID
        const userRes = await fetch(`http://localhost:3000/users/${data.id}`, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        const userData = await userRes.json();
        setUser((prevUser) => ({ ...prevUser, img: userData.img })); // Cập nhật ảnh
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi hoàn thành
      }
    };
    getUser();
  }, [tokenValue]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo loading
  }

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> /{" "}
            <Link href={`/info`}>Thông tin cá nhân</Link>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container">
          <div className="title-fix">
            <b>Thông tin cá nhân</b>
          </div>
          <div>
            <p>
              <strong>Tên đăng ký:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Mật khẩu:</strong> {user.password} &nbsp;
              <a href={`/doimatkhau`} className="newpass">
                Thay đổi mật khẩu
              </a>
              <br />
              <i className="text-danger">
                {" "}
                // Mật khẩu đã bị mã hóa vì vấn đề bảo mật
              </i>
            </p>
            <p>
              <strong>Họ và tên:</strong> {user.fullname}
            </p>
            <p>
              <strong>Giới tính:</strong> {user.gender}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {user.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {user.address}
            </p>
            {user.img && (
              <p>
                <strong>Ảnh của bạn:</strong>
                <img
                  src={`http://localhost:3000/img/${user.img}`}
                  alt="User"
                  className="user-image"
                  width={180}
                />
              </p>
            )}
          </div>
          <br />
          {/* Nút đăng xuất */}
          <div className="button-info">
            <button
              className="btn btn-danger"
              onClick={() => {
                document.cookie = "token=; path=/; max-age=0";
                window.location.href = "/dangnhap";
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <br />
        <br />
      </section>
    </>
  );
}
