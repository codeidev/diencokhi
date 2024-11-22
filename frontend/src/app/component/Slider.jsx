"use client"; // Marks this as a client component

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Slider({ params }) {
    const { data: product, error, isLoading } = useSWR(
        `http://localhost:3000/productsdetail/${params.id}`,
        fetcher
    );

    const [imgs, setImgs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (product && product.images) {
            const imageUrls = product.images.map(img => 
                `${img.trim()}` // Chỉ tạo đường dẫn một lần
            );
            console.log("Image URLs:", imageUrls); // Kiểm tra đường dẫn ảnh
            setImgs(imageUrls);
        }
    }, [product]);

    const changeSlide = (direction) => {
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + direction;
            if (newIndex < 0) return imgs.length - 1;
            if (newIndex >= imgs.length) return 0;
            return newIndex;
        });
    };

    const selectSlide = (selectedIndex) => {
        setCurrentIndex(selectedIndex);
    };

    const formatCurrency = (amount) => {
        if (!amount) return '0 VNĐ';
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
    };

    if (error) return <div>Lỗi load dữ liệu.</div>;
    if (isLoading) return <div>Đang tải...</div>;

    return (
        <div>
            <div className="slider-container">
                <div className="slider">
                    {imgs.length > 0 ? imgs.map((img, index) => (
                        <img
                            key={index}
                            src={`/assets/img/${img}`} // Sử dụng đường dẫn đã tạo
                            alt={`Slide ${index}`}
                            className={`slide-image ${index === currentIndex ? "active" : ""}`}
                        />
                    )) : <div>Không có ảnh để hiển thị.</div>}
                </div>
                <br />
                <p>
                    <a href="#">Ảnh demo ({imgs.length})</a>
                </p>
                <div className="thumbnails" id="thumbnails">
                    <div className="thumbnail-wrapper" id="thumbnail-wrapper">
                        {imgs.map((img, index) => (
                            <img
                                key={index}
                                src={`/assets/img/${img}`} // Sử dụng đường dẫn đã tạo
                                alt={`Thumbnail ${index}`}
                                className="thumbnail"
                                onClick={() => selectSlide(index)}
                            />
                        ))}
                    </div>
                </div>
                <button className="button prev" onClick={() => changeSlide(-1)}> &#10094;</button>
                <button className="button next" onClick={() => changeSlide(1)}> &#10095;</button>
            </div>
        </div>
    );
}