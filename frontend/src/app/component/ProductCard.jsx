import React from "react";
import Link from "next/link";

function ProductCard(props) {
  // Kiểm tra xem props.data có phải là một mảng hay không
  if (!Array.isArray(props.data)) {
    return <div>No products available.</div>; // Hoặc hiển thị một thông báo khác
  }
  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ"; // Trả về 0 nếu không có giá
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };
  return (
    <>
      {props.data.map((product) => {
        const { id, name, img, price, category, download } = product;
        return (
          <div className="box" key={id}>
            <div className="topbox image-container">
              <Link href={`/chitietsanpham/${id}`}>
                <img src={`http://localhost:3000/img/${img[0]}`} alt={name} />
              </Link>
              <a href={`/chitietsanpham/${id}`}>
                <i className="fas fa-download icon icon-download"></i>
              </a>
              {/* <a href="#">
                <i className="fas fa-heart icon icon-heart"></i>
              </a> */}
            </div>
            <div className="bottombox">
              <h4>
                <Link href={`/chitietsanpham/${id}`}>{name}</Link>
              </h4>
              <div className="cateprice">
                <a href={`/productstools/${product?.category}`}>{category}</a>
                <div className="star">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="cateprice">
                <p className="price">{formatCurrency(product?.price)}</p>
                <p className="number">
                  {download}
                  <i className="fa-solid fa-download down"></i>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
