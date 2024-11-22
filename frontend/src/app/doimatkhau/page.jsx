"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userId, setUserId] = useState(null); // Trạng thái cho ID người dùng

  // Lấy token từ cookie
  const token = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  const tokenValue = token?.split("=")[1];

  useEffect(() => {
    // Kiểm tra xem token có tồn tại không
    if (!tokenValue) {
      window.location.href = "/dangnhap";
      return;
    }

    const getUserId = async () => {
      try {
        const res = await fetch("http://localhost:3000/detailuser", {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });

        if (!res.ok) {
          throw new Error("Không thể lấy thông tin người dùng.");
        }

        const data = await res.json();
        setUserId(data.id); // Lưu ID người dùng
      } catch (error) {
        console.error("Lỗi khi lấy ID người dùng:", error);
      }
    };

    getUserId();
  }, [tokenValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId) {
      setError("ID người dùng không được xác định.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/changePassword/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Đổi mật khẩu thất bại.");
      }

      setSuccess("Mật khẩu đã được đổi thành công!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href="/">Trang chủ</Link> /{" "}
            <Link href="/doimatkhau">Đổi mật khẩu</Link>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container">
          <div className="title-fix">
            <b>Đổi mật khẩu</b>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mật khẩu hiện tại</label>
              <i
                className="m-xxl-3"
                onClick={toggleCurrentPasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showCurrentPassword ? (
                  <>
                    <i className="fa-solid fa-eye-slash"></i>
                    <a> Ẩn mật khẩu</a>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-eye"></i>
                    <a> Hiện mật khẩu</a>
                  </>
                )}
              </i>
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <i
                className="m-xxl-3"
                onClick={toggleNewPasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showNewPassword ? (
                  <>
                    <i className="fa-solid fa-eye-slash"></i>
                    <a> Ẩn mật khẩu</a>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-eye"></i>
                    <a> Hiện mật khẩu</a>
                  </>
                )}
              </i>
              <input
                type={showNewPassword ? "text" : "password"}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Đổi mật khẩu
            </button>
          </form>
          <br />
          {error && <div className="text-danger">{error}</div>}
          {success && <div className="text-success">{success}</div>}
        </div>
        <br />
        <br />
      </section>
    </>
  );
}
