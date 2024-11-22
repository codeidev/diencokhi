"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ImageUpload = ({ onFilesChange, imgRefs }) => {
  const [imageInputs, setImageInputs] = useState([1]);
  const [fileNames, setFileNames] = useState("");

  const handleImageUpload = (index) => {
    const files = imgRefs.current[index].files;
    const allFileNames = Array.from(files).map((file) => file.name).join(", ");
    setFileNames(allFileNames);

    onFilesChange(Array.from(files));

    if (files.length > 0) {
      setImageInputs((prev) => [...prev, prev.length + 1]);
    }
  };

  return (
    <div className="form-group my-2">
      <label className="form-label">Hình ảnh</label>
      {imageInputs.map((_, index) => (
        <div className="form-group my-2" key={index}>
          <label className="form-label">Hình ảnh {index + 1}</label>
          <input
            type="file"
            name={`image-${index}`}
            className="form-control"
            ref={(el) => (imgRefs.current[index] = el)}
            multiple
            onChange={() => handleImageUpload(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default function AddProduct() {
  const router = useRouter();
  const name = useRef("");
  const price = useRef("");
  const [description, setDescription] = useState([""]);
  const category = useRef("");
  const category1 = useRef(["", ""]); // Default values for categories
  const content = useRef("");
  const date = useRef("");
  const file = useRef("");
  const link = useRef("");
  const message = useRef("");
  const error = useRef("");
  const [categories, setCategories] = useState([]);
  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const [maxId, setMaxId] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getCategories1 = async () => {
      const res = await fetch("http://localhost:3000/categories1");
      const data1 = await res.json();
      setCategories1(data1);
    };
    getCategories1();
  }, []);

  useEffect(() => {
    const getCategories2 = async () => {
      const res = await fetch("http://localhost:3000/categories2");
      const data2 = await res.json();
      setCategories2(data2);
    };
    getCategories2();
  }, []);

  useEffect(() => {
    const getCategories3 = async () => {
      const res = await fetch("http://localhost:3000/categories3");
      const data3 = await res.json();
      setCategories3(data3);
    };
    getCategories3();
  }, []);

  const handleFilesChange = (filesArray) => {
    setSelectedImages(filesArray);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescription = [...description];
    newDescription[index] = value;
    setDescription(newDescription);
  };

  const addDescriptionField = () => {
    setDescription((prev) => [...prev, ""]);
  };

  const handleCategoryChange = (index, categoryValue) => {
    let defaultValue = "";

    switch (index) {
      case 1:
        defaultValue = "Chuyên ngành"; // Default for categories1
        break;
      case 2:
        defaultValue = "Kiến trúc"; // Default for categories2
        break;
      case 3:
        defaultValue = "Đồ án - Luận văn"; // Default for categories3
        break;
      default:
        break;
    }

    category1.current[0] = defaultValue; // Set default value
    category1.current[1] = categoryValue; // Set user-selected option
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", maxId);
    imgRefs.current.forEach((input) => {
      const files = input.files;
      Array.from(files).forEach((file) => {
        data.append("image", file);
      });
    });

    data.append("name", name.current.value);
    data.append("category", category.current.value);
    data.append("category1", JSON.stringify(category1.current)); // Send category1 as an array
    data.append("price", price.current.value);
    data.append("content", content.current.value);
    data.append("date", date.current.value);
    data.append("file", file.current.value);
    data.append("link", link.current.value);
    data.append("description", JSON.stringify(description));

    const res = await fetch("http://localhost:3000/addproduct", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (result.error) {
      error.current = result.error;
    } else {
      message.current = result.message;
      router.push("/sanpham");
    }
  };

  return (
    <div className="m-3 title-fix">
      <b>Thêm sản phẩm</b>
      <br />
      <br />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ImageUpload onFilesChange={handleFilesChange} imgRefs={imgRefs} />
        <div className="form-group my-2">
          <label className="form-label">Tên sản phẩm</label>
          <input type="text" className="form-control" ref={name} />
        </div>
        <div className="form-group my-2">
          <label className="form-label">Danh mục</label>
          <select className="form-control" id="category" ref={category}>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Categories Dropdowns */}
        <div className="form-group my-2">
          <label className="form-label">Chọn danh mục chuyên ngành</label>
          <select
            className="form-control"
            onChange={(e) => handleCategoryChange(1, e.target.value)}
          >
            <option value="">-- Không chọn --</option>
            {categories1.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group my-2">
          <label className="form-label">Chọn danh mục kiến trúc</label>
          <select
            className="form-control"
            onChange={(e) => handleCategoryChange(2, e.target.value)}
          >
            <option value="">-- Không chọn --</option>
            {categories2.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group my-2">
          <label className="form-label">Chọn danh mục đồ án luận văn</label>
          <select
            className="form-control"
            onChange={(e) => handleCategoryChange(3, e.target.value)}
          >
            <option value="">-- Không chọn --</option>
            {categories3.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group my-2">
          <label className="form-label">Giá</label>
          <input type="number" className="form-control" ref={price} />
        </div>
        <div className="form-group my-2">
          <label className="form-label">Giới thiệu</label>
          <textarea className="form-control" ref={content} />
        </div>
        <div className="form-group my-2">
          <label className="form-label">Ngày đăng</label>
          <input type="date" className="form-control" ref={date} />
        </div>
        <div className="form-group my-2">
          <label className="form-label">Tên file</label>
          <input type="text" className="form-control" ref={file} />
        </div>
        <div className="form-group my-2">
          <label className="form-label">Link</label>
          <input type="text" className="form-control" ref={link} />
        </div>
        <div className="form-group my-2">
          <label className="form-label">Mô tả</label>
          {description.map((desc, index) => (
            <div key={index} className="form-group my-2">
              <label className="form-label">Mô tả {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addDescriptionField}
          >
            Thêm mô tả
          </button>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}