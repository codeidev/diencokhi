'use client';

import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'


export default function AddCategory() {
  const router = useRouter();
  const name = useRef('');
  const img = useRef(null);
  const message = useRef('');
  const error = useRef('');
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    const getCategories = async () => {

      // Find the maximum id in the categories
      const res2 = await fetch('http://localhost:3000/categories');
      const categories = await res2.json();
      const maxId = categories.reduce((max, category) => Math.max(max, category._id), 0);
      setMaxId(maxId + 1);
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', maxId);
    data.append('name', name.current.value);
    
    const res = await fetch('http://localhost:3000/addcategory', {
      method: 'POST',
      body: data,
    });
    const result = await res.json();
    if (result.error) {
      error.current = result.error;
    } else {
      message.current = result.message;
      router.push('/danhmuc');
    }
  };

  return (
    <div className="m-3 title-fix">
      <b>Thêm danh mục</b>
      <br />
      <br />
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="form-group my-2">
          <label className='form-label'>Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            ref={name}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">Thêm danh mục</button>
      </form>
    </div>
  );
}