'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Categories() {
  const [data, setData] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories3", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategories = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa đồ án - luận văn này không?')) {
      const res = await fetch(`http://localhost:3000/deletecategory3/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.message) {
        fetchCategories(); 
      }
    }
  };

  return (
    <div className="m-3 title-fix">
      <b>Quản lý đồ án - luận văn</b>
      <br />
      <br />
      <Link className="btn btn-primary" href="/doanluanvan/them">Thêm đồ án - luận văn</Link>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên đồ án - luận văn</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className="adminoperations">
                 <Link className="btn btnorange" href={`/doanluanvan/sua/${category.id}`}>Sửa</Link>
                <button className="btn btnred" onClick={() => deleteCategories(category._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}