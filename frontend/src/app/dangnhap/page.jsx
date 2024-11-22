"use client";
import React, { useState } from "react"; // Import useState
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
      password: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }

        // Lưu token vào cookie
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;

        // Chuyển trang theo role
        const token = data.token;
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Kiểm tra vai trò và chuyển hướng
        if (payload.role === "Admin") {
          window.location.href = "http://localhost:3002"; // Chuyển hướng đến thư mục admin
        } else {
          window.location.href = "/"; // Chuyển hướng đến thư mục frontend
        }
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false); // Trạng thái cho việc hiển thị mật khẩu

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đổi trạng thái hiển thị mật khẩu
  };

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> /{" "}
            <Link href={`/dangnhap`}>Đăng nhập</Link>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container">
          <div className="title-fix">
            <b>Đăng nhập</b>
          </div>
          <form onSubmit={formik.handleSubmit} className="col-9 m-auto">
            <div className="row">
              <div className="form-group col-6">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  name="email"
                  className="form-control"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group col-6">
                <label>Mật khẩu</label>
                <i
                  className="m-xxl-3"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? (
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  className="form-control"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null} <p></p>
                <a href={`/quenmatkhau`} className="newpass">
               
                  Quên mật khẩu ?
                </a>
              </div>
            </div>
            <br />
            <div className="button-register">
              {formik.errors.general ? (
                <div className="text-danger mt-2">{formik.errors.general}</div>
              ) : null}
              &nbsp; &nbsp;
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
        <br />
        <br />
      </section>
    </>
  );
}
