"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Products() {
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products", {
      cache: "no-store",
    });
    const newData = await res.json();
    console.log(newData); // Xem cấu trúc dữ liệu
    setData(newData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const res = await fetch(`http://localhost:3000/deleteproduct/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.message) {
        fetchProducts();
      }
    }
  };

  return (
    <div className="m-3 title-fix">
      <b>Quản lý sản phẩm</b>
      <br />
      <br />
      <Link className="btn btn-primary" href="/sanpham/them">
        Thêm sản phẩm
      </Link>
      <br />
      <br />
      <i>Ấn mũi tên phải bàn phím || Shift + lăn chuột để sang phải</i>
      <div className="table-responsive ">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Danh mục đường dẫn</th>
              <th>Giá</th>
              <th>Giới thiệu</th>
              <th>Ngày đăng</th>
              <th>Tên file</th>
              <th>Link</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  {Array.isArray(product.img) ? (
                    product.img.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:3000/img/${image}`}
                        width="120px"
                        alt={`Product image ${index + 1}`}
                        style={{ marginBottom: "5px" }}
                      />
                    ))
                  ) : (
                    <p>Không có hình ảnh</p> // Hoặc một thông báo khác
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  {Array.isArray(product.category1)
                    ? product.category1.join(" // ")
                    : product.category1}
                </td>
                <td>{product.price}</td>
                <td>{product.content}</td>
                <td>{product.date}</td>
                <td>{product.file}</td>
                <td>{product.link}</td>
                <td>
                  {Array.isArray(product.description) ? (
                    product.description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))
                  ) : (
                    <p>Không có mô tả</p> // Hoặc một thông báo khác
                  )}
                </td>
                <td className="adminoperations">
                  <Link
                    className="btn btn-primary"
                    href={`/sanpham/sua/${product.id}`}
                  >
                    Sửa
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
