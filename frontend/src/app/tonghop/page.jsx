"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/app/component/ProductCard";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:3000/products");
      const newProducts = await res.json();
      setProducts(newProducts);
    }
    fetchProducts();
  }, []);

  const handleSort = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };
  const handleFilterByCategory = (products) => {
    if (filterCategory === "all") {
      return products;
    } else {
      return products.filter((product) =>
        product.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> / <Link href={`/tonghop`}>Tổng hợp</Link>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container p-0">
          <div className="title-fix">
            <b>Tổng hợp sản phẩm</b>
            <div className="d-flex gap-20">
              <select
                className="form-select w-auto"
                onChange={handleSortChange}
              >
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
              <select
                className="form-select w-auto"
                onChange={handleFilterCategoryChange}
              >
                <option value="all">Danh mục - All</option>
                <option value="Autocard">Autocard</option>
                <option value="3Dmax">3Dmax</option>
                <option value="Corel Draw">Corel Draw</option>
                <option value="Photoshop">Photoshop</option>
                <option value="Illustrator">Illustrator</option>
                <option value="InDesign">InDesign</option>
                <option value="Revit">Revit</option>
              </select>
            </div>
          </div>
          <div className="bottom">
            <div className="row" id="boxContainer">
              {handleSort(handleFilterByCategory(products)).length > 0 ? (
                <ProductCard
                  data={handleSort(handleFilterByCategory(products))}
                />
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
