"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

// Trang đăng ký
export default function Register() {
  const [maxId, setMaxId] = useState(0);

  // Hàm để lấy ID lớn nhất từ server
  const fetchMaxId = async () => {
    try {
      const res = await fetch("http://localhost:3000/users"); // Đường dẫn đến danh sách người dùng
      const data = await res.json();
      const maxIdValue = Math.max(...data.map((user) => user.id), 0); // Tìm ID lớn nhất
      setMaxId(maxIdValue);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchMaxId();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      fullname: "",
      name: "",
      phone: "",
      gender: "",
      img: "",
      address: "", // Thêm trường địa chỉ
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Vui lòng nhập họ và tên"),
      name: Yup.string().required("Vui lòng nhập tên đăng ký"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
      phone: Yup.string()
        .matches(/^\d+$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
      img: Yup.mixed().required("Vui lòng chọn ảnh"),
      address: Yup.string().required("Vui lòng nhập địa chỉ"), // Thêm xác thực cho trường địa chỉ
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const newUserId = maxId + 1; // Tăng ID lên 1
        const formData = new FormData(); // Tạo FormData

        // Thêm các trường vào FormData
        formData.append("id", newUserId);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("fullname", values.fullname);
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("gender", values.gender);
        formData.append("img", values.img); // Thêm ảnh vào FormData
        formData.append("address", values.address); // Thêm địa chỉ vào FormData

        const res = await fetch("http://localhost:3000/register", {
          method: "POST",
          body: formData, // Gửi FormData
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError("email", "Email đã tồn tại");
          } else {
            throw new Error(errorData.message || "Đăng ký thất bại");
          }
        } else {
          // Xử lý thành công
          alert("Đăng ký thành công");
        }
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false); // Trạng thái cho việc hiển thị mật khẩu
  const [rePassword, setRePassword] = useState(false); // Trạng thái cho mật khẩu xác nhận

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đổi trạng thái hiển thị mật khẩu
  };

  const toggleConfirmPasswordVisibility = () => {
    setRePassword(!rePassword);
  };

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> /{" "}
            <Link href={`dangki`}>Đăng kí</Link>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container">
          <div className="title-fix">
            <b>Đăng kí</b>
          </div>
          <form onSubmit={formik.handleSubmit} className="col-9 m-auto">
            <div className="row">
              <div className="form-group col-6">
                <label>Họ và tên</label>
                <input
                  type="text"
                  className="form-control m-4 p-2"
                  placeholder="Nhập họ và tên của bạn"
                  {...formik.getFieldProps("fullname")}
                />
                {formik.touched.fullname && formik.errors.fullname && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.fullname}
                  </div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Giới tính</label>
                <div className="m-4 row">
                  <div className="form-check col-2">
                    <input
                      type="radio"
                      id="genderMale"
                      name="gender"
                      value="Nam"
                      className="form-check-input"
                      onChange={formik.handleChange} // Sử dụng onChange
                      checked={formik.values.gender === "Nam"} // Đảm bảo rằng radio được chọn đúng
                    />
                    <label htmlFor="genderMale" className="form-check-label">
                      Nam
                    </label>
                  </div>
                  <div className="form-check col-2">
                    <input
                      type="radio"
                      id="genderFemale"
                      name="gender"
                      value="Nữ"
                      className="form-check-input"
                      onChange={formik.handleChange} // Sử dụng onChange
                      checked={formik.values.gender === "Nữ"} // Đảm bảo rằng radio được chọn đúng
                    />
                    <label htmlFor="genderFemale" className="form-check-label">
                      Nữ
                    </label>
                  </div>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.gender}
                  </div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Tên đăng ký</label>
                <input
                  type="text"
                  className="form-control m-4 p-2"
                  placeholder="Nhập tên để đăng ký tài khoản"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control m-4 p-2"
                  placeholder="Nhập email của bạn, thường kết thúc bằng @gmail.com"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Mật khẩu</label>
                <i className="m-xxl-3" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <>
                      <i class="fa-solid fa-eye-slash"></i>
                      <a>Ẩn mật khẩu</a>
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-eye"></i>
                      <a>Hiện mật khẩu</a>
                    </>
                  )}
                </i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control m-4 p-2"
                  placeholder="******** Mật khẩu để bạn đăng nhập"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Nhập lại mật khẩu</label>
                <i
                  className="m-xxl-3"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {rePassword ? (
                    <>
                      <i class="fa-solid fa-eye-slash"></i>
                      <a>Ẩn mật khẩu</a>
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-eye"></i>
                      <a>Hiện mật khẩu</a>
                    </>
                  )}
                </i>
                <input
                  type={rePassword ? "text" : "password"}
                  className="form-control m-4 p-2"
                  placeholder="******** Nhập lại mật khẩu"
                  {...formik.getFieldProps("rePassword")} // Sử dụng rePassword ở đây
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Số điện thoại</label>
                <input
                  type="phone"
                  className="form-control m-4 p-2"
                  placeholder="10 chữ số, đầu +84"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Ảnh của bạn</label>
                <input
                  type="file"
                  className="form-control m-4 p-2"
                  onChange={(event) => {
                    formik.setFieldValue("img", event.currentTarget.files[0]); // Lấy file từ input
                  }}
                />
                {formik.touched.img && formik.errors.img && (
                  <div className="text-danger m-4 p-2">{formik.errors.img}</div>
                )}
              </div>
              <div className="form-group col-6">
                <label>Nhập địa chỉ</label>
                <input
                  type="text"
                  className="form-control m-4 p-2"
                  placeholder="Số nhà, đường, xã, quận, thành phố"
                  {...formik.getFieldProps("address")} // Thêm trường địa chỉ
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-danger m-4 p-2">
                    {formik.errors.address}
                  </div>
                )}
              </div>
            </div>
            <div className="button-register">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                Đăng ký
              </button>
              {formik.errors.general && (
                <p className="my-3 text-danger">{formik.errors.general}</p>
              )}
            </div>
          </form>
        </div>
        <br />
        <br />
      </section>
    </>
  );
}
