"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VoteManagement() {
  const [data, setData] = useState([]);

  const fetchVotes = async () => {
    const res = await fetch("http://localhost:3000/votes", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const deleteVote = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa phiếu bầu này không?')) {
      const res = await fetch(`http://localhost:3000/deletevote/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.message) {
        fetchVotes(); 
      }
    }
  };

  return (
    <>
      <div className="m-3 title-fix">
        <b>Quản lý phiếu bầu</b>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Người dùng</th>
              <th>Số sao</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vote, index) => (
              <tr key={vote._id}>
                <td>{index + 1}</td>
                <td>{vote.name}</td>
                <td>{vote.stars}</td> {/* Assuming 'stars' field exists */}
                <td className="adminoperations">
                  <button className="btn btnred" onClick={() => deleteVote(vote._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}