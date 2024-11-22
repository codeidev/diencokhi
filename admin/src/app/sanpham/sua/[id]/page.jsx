"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ImageUpload = ({ onFilesChange, existingImages }) => {
  const imgRefs = useRef([]);
  const [newFiles, setNewFiles] = useState([]);
  const [removedFiles, setRemovedFiles] = useState([]);

  useEffect(() => {
    setNewFiles(existingImages.map((image) => image));
  }, [existingImages]);

  const handleImageUpload = (index) => {
    const files = imgRefs.current[index]?.files;
    if (files && files.length > 0) {
      const updatedFiles = [...newFiles];
      updatedFiles[index] = files[0]; // Thay thế hình ảnh cũ
      setNewFiles(updatedFiles);
      onFilesChange(updatedFiles, removedFiles); // Gửi cả newFiles và removedFiles
    }
  };

  const handleRemoveImage = (index) => {
  const updatedFiles = [...newFiles];
  const removedImage = updatedFiles[index];

  setRemovedFiles((prev) => [...prev, removedImage]);
  updatedFiles[index] = null; // Đánh dấu để xóa
  setNewFiles(updatedFiles);
  onFilesChange(updatedFiles, [...removedFiles, removedImage]); // Gửi cả newFiles và removedFiles
};

  const handleAddImage = () => {
    setNewFiles((prev) => [...prev, null]);
    onFilesChange([...newFiles, null], removedFiles); // Gửi cập nhật
  };

  return (
    <div className="form-group my-2">
      <label className="form-label">Hình ảnh</label>
      <br />
      <i>Nếu cập nhật ảnh hãy cập nhật lại đủ file ảnh, file ảnh cũ sẽ bị xóa</i>
      {newFiles.map((file, index) => (
        <div className="form-group my-2" key={index}>
          <label className="form-label">Hình ảnh {index + 1}</label>
          <input
            type="file"
            name={`image-${index}`}
            className="form-control"
            ref={(el) => (imgRefs.current[index] = el)}
            onChange={() => handleImageUpload(index)}
          />
          {/* {file && (
            <div>
              <img
                src={`http://localhost:3000/img/${file}`}
                alt={`Image ${index + 1}`}
                style={{ width: '100px', marginRight: '10px' }}
              />
            </div>
          )} */}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary my-2"
        onClick={handleAddImage}
      >
        Thêm ảnh mới
      </button>
    </div>
  );
};

export default function EditProduct({ params }) {
  const router = useRouter();
  const name = useRef(null);
  const price = useRef(null);
  const [description, setDescription] = useState([]);
  const category = useRef(null);
  const category1 = useRef(["", ""]);
  const content = useRef(null);
  const date = useRef(null);
  const file = useRef(null);
  const link = useRef(null);
  const imgRefs = useRef([]);
  const [categories, setCategories] = useState([]);
  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const [existingProduct, setExistingProduct] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]); // Để lưu trữ các file mới
  const [removedFiles, setRemovedFiles] = useState([]); // Để lưu trữ các file mới

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  
  useEffect(() => {
    const fetchCategories1 = async () => {
      const res = await fetch("http://localhost:3000/categories1");
      const data = await res.json();
      setCategories1(data);
    };
    fetchCategories1();
  }, []);

  useEffect(() => {
    const fetchCategories2 = async () => {
      const res = await fetch("http://localhost:3000/categories2");
      const data = await res.json();
      setCategories2(data);
    };
    fetchCategories2();
  }, []);

  useEffect(() => {
    const fetchCategories3 = async () => {
      const res = await fetch("http://localhost:3000/categories3");
      const data = await res.json();
      setCategories3(data);
    };
    fetchCategories3();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
        const res = await fetch(`http://localhost:3000/productsdetail/${params.id}`);
        const data = await res.json();
        setExistingProduct(data);
        if (data && data.product) {
            setTimeout(() => {
                if (name.current) name.current.value = data.product.name;
                if (price.current) price.current.value = data.product.price;
                if (content.current) content.current.value = data.product.content;
                if (date.current) date.current.value = data.product.date;
                if (file.current) file.current.value = data.product.file;
                if (link.current) link.current.value = data.product.link;

                // Gán giá trị cho category và category1
                if (category.current) category.current.value = data.product.category;
                if (data.product.category1 && data.product.category1.length > 0) {
                    category1.current[0] = data.product.category1[0]; // Gán giá trị mặc định
                    category1.current[1] = data.product.category1[1]; // Gán giá trị người dùng chọn
                }

                setDescription(data.product.description || []);
                setExistingImages(data.product.img || []);
            }, 0);
        }
    };
    fetchProduct();
}, [params.id]);

const handleFilesChange = (filesArray, removedFiles) => {
  setNewImageFiles(filesArray); // Lưu trữ các file mới
  // Cập nhật danh sách các file đã xóa nếu cần
  setRemovedFiles(removedFiles);
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

    // Gán giá trị mặc định và giá trị người dùng vào category1
    category1.current[0] = defaultValue; // Gán giá trị mặc định
    category1.current[1] = categoryValue; // Gán giá trị người dùng chọn
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Gửi các file mới
    newImageFiles.forEach((file) => {
      if (file) {
        data.append("image", file);
      }
    });

      // Xóa các file đã chỉ định
  if (Array.isArray(removedFiles)) {
    removedFiles.forEach((removedImage) => {
      data.append("removedImages", removedImage);
    });
  }
  
    data.append("name", name.current.value || existingProduct.name); // Sử dụng tên cũ nếu không có tên mới
    data.append("category", category.current.value || existingProduct.category); // Sử dụng danh mục cũ
    data.append("category1", JSON.stringify(category1.current.length > 0 ? category1.current : existingProduct.category1)); // Giữ category1 cũ
    data.append("price", price.current.value || existingProduct.price); // Giữ giá cũ
    data.append("content", content.current.value || existingProduct.content); // Giữ nội dung cũ
    data.append("date", date.current.value || existingProduct.date); // Giữ ngày cũ
    data.append("file", file.current.value || existingProduct.file); // Giữ file cũ
  // Kiểm tra và gán giá trị cho link
  data.append("link", link.current.value || "Đang cập nhật"); // Gán "Đang cập nhật" nếu không có giá trị mới
    data.append("description", JSON.stringify(description));
  
    const res = await fetch(`http://localhost:3000/updateproduct/${params.id}`, {
      method: "PUT",
      body: data,
    });
    const result = await res.json();
    if (!result.error) {
      router.push("/sanpham");
    } else {
      console.error(result.error);
    }
  };

  if (!existingProduct) return <div>Loading...</div>;

  return (
    <div className="m-3 title-fix">
      <b>Sửa sản phẩm</b>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
       <ImageUpload onFilesChange={handleFilesChange} imgRefs={imgRefs} existingImages={existingImages} />
        <div className="form-group my-2">
          <label className="form-label">Tên sản phẩm</label>
          <input type="text" className="form-control" ref={name} />
        </div>
        <div className="form-group my-2">
          <label className="form-label">Danh mục</label>
          <select className="form-control" ref={category}>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-2">
          <label className="form-label">Chọn danh mục chuyên ngành</label>
          <select className="form-control" onChange={(e) => handleCategoryChange(1, e.target.value)}>
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
          <select className="form-control" onChange={(e) => handleCategoryChange(2, e.target.value)}>
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
          <select className="form-control" onChange={(e) => handleCategoryChange(3, e.target.value)}>
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
          <button type="button" className="btn btn-secondary" onClick={addDescriptionField}>
            Thêm mô tả
          </button>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
}