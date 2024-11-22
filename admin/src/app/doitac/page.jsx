"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Users() {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/banks", {
      cache: "no-store",
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUsers = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa đối tác này không?")) {
      const res = await fetch(`http://localhost:3000/deletebank/${id}`, {
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
      <b>Quản lý đối tác</b>
      <br />
      <br />
      <Link className="btn btn-primary" href="/doitac/them">
        Thêm đối tác
      </Link>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:3000/img/${category.img}`}
                  alt=""
                  width="100px"
                />
              </td>
              <td className="adminoperations">
                <Link
                  className="btn btnorange"
                  href={`/doitac/sua/${category.id}`}
                >
                  Sửa
                </Link>
                <button
                  className="btn btnred"
                  onClick={() => deleteUsers(category._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
