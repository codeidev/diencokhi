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
      const res = await fetch(`http://localhost:3000/bankdetail/${id}`);
      if (!res.ok) {
        console.error("Failed to fetch user details");
        return;
      }
      const data = await res.json();
      setUser(data);
      setImagePreview(data.img); // Set initial image preview
    };
    if (id) {
      getUser();
    }
  }, [id]);

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
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // Append new image if it exists
    }

    // Add any other data you want to update
    formData.append("img", imagePreview); // Ensure this matches your server-side expectations

    try {
      const res = await fetch(`http://localhost:3000/updatebank/${id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        router.push("/doitac");
      } else {
        console.error(result.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  return (
    <div className="m-3">
      <h2>Sửa đối tác</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="form-group my-2">
          <label className="form-label">Hình ảnh</label>
          <br />
          {imagePreview && (
            <img
              src={imagePreview.startsWith("http")
                ? imagePreview
                : `http://localhost:3000/img/${imagePreview}`}
              alt="Current Banner"
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
          Cập nhật đối tác
        </button>
      </form>
    </div>
  );
}