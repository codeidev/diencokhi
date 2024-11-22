'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Categories() {
  const [data, setData] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories1", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategories = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa chuyên ngành này không?')) {
      const res = await fetch(`http://localhost:3000/deletecategory1/${id}`, {
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
      <b>Quản lý chuyên ngành</b>
      <br />
      <br />
      <Link className="btn btn-primary" href="/chuyennganh/them">Thêm chuyên ngành</Link>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên chuyên ngành</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className="adminoperations">
                 <Link className="btn btnorange" href={`/chuyennganh/sua/${category.id}`}>Sửa</Link>
                <button className="btn btnred" onClick={() => deleteCategories(category._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}