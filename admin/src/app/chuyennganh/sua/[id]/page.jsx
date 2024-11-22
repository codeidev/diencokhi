"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function EditCategory({ params }) {
  const router = useRouter();
  const id = params.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch(`http://localhost:3000/categoriesdetail1/${id}`);
      const data = await res.json();
      setCategory(data);
      // Đặt giá trị ban đầu cho form
      setValue("name", data.name);
    };
    if (id) {
      getCategory();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const res = await fetch(`http://localhost:3000/updatecategory1/${id}`, {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();
    if (!result.error) {
      router.push("/chuyennganh");
    } else {
      // Xử lý hiển thị lỗi
      console.error(result.error);
    }
  };

  return (
    <div className="m-3 title-fix">
      <b>Sửa chuyên ngành</b>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="form-group my-2">
          <label className="form-label">Tên chuyên ngành</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: "Tên chuyên ngành là bắt buộc" })}
          />
          {errors.name && (
            <div className="text-danger">{errors.name.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Cập nhật chuyên ngành
        </button>
      </form>
    </div>
  );
}