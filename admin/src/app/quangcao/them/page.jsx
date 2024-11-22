'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();
  const img = useRef(null);
  const [maxId, setMaxId] = useState(0);
  const [message, setMessage] = useState(''); // Add message state variable
  const [error, setError] = useState(''); // Use state for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', maxId);
    data.append('image', img.current.files[0]);

    try {
      const res = await fetch('http://localhost:3000/addbanner', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.error) {
        setError(result.error); // Use setError to update error state
      } else {
        setMessage(result.message); // Use setMessage to update the message state
        router.push('/quangcao');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Có lỗi xảy ra, vui lòng thử lại.'); // Update error message on catch
    }
  };

  return (
    <div className="m-3">
      <h2>Thêm quảng cáo</h2>
      {message && <div className="alert alert-success">{message}</div>} {/* Display success message */}
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group my-2">
          <label className='form-label'>Hình ảnh</label>
          <input type="file" className="form-control" ref={img} />
        </div>
        <button type="submit" className="btn btn-primary my-3">Thêm quảng cáo</button>
      </form>
    </div>
  );
}