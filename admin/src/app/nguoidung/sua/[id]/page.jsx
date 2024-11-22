"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function EditUser({ params }) {
  const router = useRouter();
  const id = params.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`http://localhost:3000/users/${id}`);
      const data = await res.json();
      setUser(data);
      // Set initial values for the form
      setValue("name", data.name);
      setValue("fullname", data.fullname);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("gender", data.gender);
      setValue("role", data.role);
      setImagePreview(data.img); // Set initial image preview
    };
    if (id) {
      getUser();
    }
  }, [id, setValue]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update the image preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setImagePreview(null); // Reset preview if no file selected
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch(`http://localhost:3000/updateuser/${id}`, {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();
    if (!result.error) {
      router.push("/nguoidung");
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="m-3">
      <h2>Sửa người dùng</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="form-group my-2">
          <label className="form-label">Tên người dùng</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: "Tên người dùng là bắt buộc" })}
          />
          {errors.name && (
            <div className="text-danger">{errors.name.message}</div>
          )}
        </div>
        <div className="form-group my-2">
          <label className="form-label">Họ và tên</label>
          <input
            type="text"
            className="form-control"
            {...register("fullname", {
              required: "Họ và tên là bắt buộc",
            })}
          />
          {errors.fullname && (
            <div className="text-danger">{errors.fullname.message}</div>
          )}
        </div>
        <div className="form-group my-2">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: "Email là bắt buộc" })}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="form-group my-2">
          <label className="form-label">Số điện thoại</label>
          <input
            type="phone"
            className="form-control"
            {...register("phone", { required: "Số điện thoại là bắt buộc" })}
          />
          {errors.phone && (
            <div className="text-danger">{errors.phone.message}</div>
          )}
        </div>
        <div className="form-group my-2">
          <label className="form-label">Giới tính</label>
          <select
            className="form-control"
            {...register("gender", { required: "Chọn giới tính" })}
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam" selected={user?.gender === 'Nam'}>Nam</option>
            <option value="Nữ" selected={user?.gender === 'Nữ'}>Nữ</option>
          </select>
          {errors.gender && (
            <div className="text-danger">{errors.gender.message}</div>
          )}
        </div>
        <div className="form-group my-2">
          <label className="form-label">Vai trò</label>
          <select
            className="form-control"
            {...register("role", { required: "Chọn vai trò" })}
          >
            <option value="">Chọn vai trò</option>
            <option value="User" selected={user?.role === 'User'}>User</option>
            <option value="Admin" selected={user?.role === 'Admin'}>Admin</option>
          </select>
          {errors.role && (
            <div className="text-danger">{errors.role.message}</div>
          )}
        </div>
        <div className="form-group my-2">
          <label className="form-label">Hình ảnh</label>
          <br />
          {imagePreview && (
            <img
              src={imagePreview.startsWith('http') ? imagePreview : `http://localhost:3000/img/${imagePreview}`}
              alt="Current User"
              width="200px"
            />
          )}
          <input
            type="file"
            className="form-control"
            {...register("image")}
            onChange={handleImageChange} // Handle image change
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Cập nhật người dùng
        </button>
      </form>
    </div>
  );
}