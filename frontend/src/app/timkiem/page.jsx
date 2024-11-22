import React from "react";
import ProductCard from "../component/ProductCard";
import Link from "next/link";

export default async function Search(params) {
  const res = await fetch(
    "http://localhost:3000/search/" + params.searchParams.keyword
  );
  const productSearch = await res.json();

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> /{" "}
            <a href={`/timkiem`}>Tìm kiếm từ khóa: {params.searchParams.keyword}</a>
          </p>
        </div>
      </section>
      <section className="boxproduct boxproductsearch">
        <div className="container p-0">
          <div className="title-fix">
            <b>Kết quả tìm kiếm cho từ khóa: {params.searchParams.keyword}</b>
          </div>
          <div className="bottom">
            <div className="row" id="boxContainer">
              {productSearch.length > 0 ? (
                <ProductCard data={productSearch} />
              ) : (
                <p>Không tìm thấy sản phẩm nào!</p> // Hiển thị thông báo nếu không có sản phẩm
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