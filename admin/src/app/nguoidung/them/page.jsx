'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();
  const name = useRef('');
  const fullname = useRef('');
  const email = useRef('');
  const phone = useRef('');
  const address = useRef('');
  const gender = useRef('');
  const role = useRef('');
  const img = useRef(null);
  const [maxId, setMaxId] = useState(0);
  const [message, setMessage] = useState(''); // Add message state variable
  const [error, setError] = useState(''); // Use state for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', maxId);
    data.append('name', name.current.value);
    data.append('fullname', fullname.current.value);
    data.append('email', email.current.value);
    data.append('phone', phone.current.value);
    data.append('address', address.current.value);
    data.append('gender', gender.current.value); // Capture the selected gender
    data.append('role', role.current.value);
    data.append('image', img.current.files[0]);

    try {
      const res = await fetch('http://localhost:3000/adduser', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.error) {
        setError(result.error); // Use setError to update error state
      } else {
        setMessage(result.message); // Use setMessage to update the message state
        router.push('/nguoidung');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Có lỗi xảy ra, vui lòng thử lại.'); // Update error message on catch
    }
  };

  return (
    <div className="m-3">
      <h2>Thêm người dùng</h2>
      {message && <div className="alert alert-success">{message}</div>} {/* Display success message */}
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group my-2">
          <label className='form-label'>Hình ảnh</label>
          <input type="file" className="form-control" ref={img} />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Tên người dùng</label>
          <input type="text" className="form-control" ref={name} />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Họ và tên</label>
          <input type="text" className="form-control" ref={fullname} />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Email</label>
          <input type="email" className="form-control" ref={email} />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Số điện thoại</label>
          <input type="number" className="form-control" ref={phone} />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Địa chỉ</label>
          <input type="text" className="form-control" ref={address} />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Giới tính</label>
          <select className='form-control' ref={gender}>
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Vai trò</label>
          <select className='form-control' ref={role}>
            <option value="">Chọn vai trò</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary my-3">Thêm người dùng</button>
      </form>
    </div>
  );
}