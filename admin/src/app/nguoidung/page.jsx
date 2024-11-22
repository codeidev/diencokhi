'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Users() {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUsers = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      const res = await fetch(`http://localhost:3000/deleteuser/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.message) {
        fetchUsers();
      }
    }
  };


  return (
    <div className="m-3 title-fix">
      <b>Quản lý người dùng</b>
      <br />
      <br />
      <Link className="btn btn-primary" href="/nguoidung/them">Thêm người dùng</Link>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Tên người dùng</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Giới tính</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td><img src={`http://localhost:3000/img/${category.img}`} alt="" width="100px" /></td>
              <td>{category.name}</td>
              <td>{category.fullname}</td>
              <td>{category.email}</td>
              <td>{category.phone}</td>
              <td>{category.address}</td>
              <td>{category.gender}</td>
              <td>{category.role}</td>
              <td className="adminoperations">
                 <Link className="btn btnorange" href={`/nguoidung/sua/${category.id}`}>Sửa</Link>
                <button className="btn btnred" onClick={() => deleteUsers(category._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}