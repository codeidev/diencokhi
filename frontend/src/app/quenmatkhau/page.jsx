"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
    }),
    // Trong component ForgotPassword

    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch(`http://localhost:3000/users`);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Lỗi khi truy vấn người dùng.");
        }

        const users = await res.json();

        // Tìm người dùng theo email
        const userData = users.find((user) => user.email === values.email);
        if (!userData) {
          throw new Error("Người dùng không tồn tại.");
        }

        // Tạo mật khẩu ngẫu nhiên
        const newPassword = Math.random().toString(36).slice(-8);

        // Cập nhật mật khẩu cho người dùng
        const updateRes = await fetch(
          `http://localhost:3000/usersnewpass/${userData._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: newPassword,
            }),
          }
        );

        if (!updateRes.ok) {
          const errorData = await updateRes.json();
          throw new Error(errorData.message || "Cập nhật mật khẩu thất bại.");
        }

        // Gửi email với mật khẩu mới
        const emailRes = await fetch("/api/sendResetPasswordEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email, newPassword }),
        });

        if (!emailRes.ok) {
          const emailError = await emailRes.json();
          throw new Error(emailError.message || "Gửi email thất bại.");
        }

        setEmailSent(true);
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> /{" "}
            <Link href={`/quenmatkhau`}>Quên mật khẩu</Link>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container">
          <div className="title-fix">
            <b>Quên mật khẩu</b>
          </div>
          <form onSubmit={formik.handleSubmit} className="col-9 m-auto">
            <div className="row">
              <div className="form-group col-12">
                <label>Email</label>
                <input
                  placeholder="Nhập email để lấy lại mật khẩu"
                  type="email"
                  name="email"
                  className="form-control"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <br />
            <div className="button-register">
              {formik.errors.general && (
                <div className="text-danger mt-2">{formik.errors.general}</div>
              )}
              {emailSent && (
                <div className="text-success mt-2">
                  Mật khẩu mới đã được gửi đến email của bạn.
                </div>
              )}
              &nbsp; &nbsp;
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                Gửi yêu cầu
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
