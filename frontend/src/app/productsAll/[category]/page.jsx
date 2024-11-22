"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/app/component/ProductCard";
import Link from "next/link";
import { useParams } from "next/navigation"; // Sử dụng useParams để lấy category

export default function Product() {
  const { category } = useParams(); // Lấy category từ URL
  const decodedCategory = decodeURIComponent(category.replace(/_/g, ' ')); // Giải mã và thay thế dấu gạch dưới thành khoảng trắng
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("asc");

  useEffect(() => {
    async function fetchProducts() {
      if (category) {
        console.log("Fetching products for category:", category);

        const res = await fetch(
          `http://localhost:3000/productsAll/${decodedCategory}`
        );

        if (res.ok) {
          const newProducts = await res.json();
          console.log("Products found:", newProducts);
          setProducts(newProducts);
        } else {
          console.error("Lỗi khi lấy sản phẩm:", res.statusText);
        }
      }
    }
    fetchProducts();
  }, [category]);

  const handleSort = (products) => {
    return [...products].sort((a, b) =>
      sortOption === "asc" ? a.price - b.price : b.price - a.price
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> / <Link href="#">{decodedCategory}</Link>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container p-0">
          <div className="title-fix">
            <b>Danh mục {decodedCategory}</b>
            <div className="d-flex gap-20">
              <select
                className="form-select w-auto"
                onChange={handleSortChange}
              >
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
          <div className="bottom">
            <div className="row" id="boxContainer">
              {handleSort(products).length > 0 ? (
                <ProductCard data={handleSort(products)} />
              ) : (
                <div className="text-center my-5">
                  <p>Không tìm thấy sản phẩm</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>
    </>
  );
}
