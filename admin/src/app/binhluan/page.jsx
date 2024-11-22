"use client";
import { useEffect, useState } from "react";

export default function CommentManagement() {
  const [data, setData] = useState([]);

  const fetchComments = async () => {
    const res = await fetch("http://localhost:3000/comments", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const deleteComment = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa bình luận này không?')) {
      const res = await fetch(`http://localhost:3000/deletecomment/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.message) {
        fetchComments(); 
      }
    }
  };

  return (
    <>
      <div className="m-3 title-fix">
        <b>Quản lý bình luận</b>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Người dùng</th>
              <th>Ảnh</th>
              <th>Bình luận</th>
              <th>Ngày</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.author}</td>
                <td>
                  <img src={`http://localhost:3000/img/${comment.img}`} alt="Comment Image" style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{comment.comment}</td>
                <td>{comment.date}</td>
                <td className="adminoperations">
                  <button className="btn btnred" onClick={() => deleteComment(comment._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}