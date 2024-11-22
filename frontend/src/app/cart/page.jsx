"use client";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slices/cartslice";
import { useMemo } from "react";
export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return <div className="p-4 text-center">Giỏ hàng của bạn trống</div>;
  }

  // // Giả sử bạn có một nút thanh toán
  // const handlePayment = async () => {
  //   const response = await fetch('http://localhost:3001/api/payment', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       amount: '5000',
  //       orderInfo: 'Thanh toán đơn hàng của bạn',
  //       redirectUrl: 'https://shopee.vn/',
  //       ipnUrl: 'https://your-ngrok-url/callback',
  //     }),
  //   });

  //   // Kiểm tra mã trạng thái trước khi phân tích JSON
  //   if (!response.ok) {
  //     console.error('HTTP error:', response.status, response.statusText);
  //     return;
  //   }

  //   try {
  //     const data = await response.json();
  //     if (data && data.payUrl) {
  //       window.location.href = data.payUrl;
  //     } else {
  //       console.error('Payment error:', data);
  //     }
  //   } catch (error) {
  //     console.error('Failed to parse JSON:', error);
  //   }
  // };

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> /{" "}
            <Link href={`/cart`}>Giỏ hàng</Link>
          </p>
        </div>
      </section>
      <div className="container-fluid main-page boxproductsearch">
        <div className="app-main">
          <div className="main-content container">
            <br />
            <div className="title-fix">
              <b>Giỏ hàng</b>
            </div>
            <table
              id="example"
              className="table table-striped"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên</th>
                  <th>Ảnh</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.product.name}</td>
                    <td width="200px">
                      <img
                        width="150px"
                        src={`/assets/img/${item.product.img[0]}`}
                        alt={item.product.name}
                      />
                    </td>
                    <td>
                      <input
                        min="1"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateCartItemQuantity({
                              _id: item.product._id,
                              quantity: parseInt(e.target.value),
                            })
                          )
                        }
                      />
                    </td>
                    <td>{item.product.price.toLocaleString()}</td>
                    <td>
                      {(item.product.price * item.quantity).toLocaleString()}
                    </td>{" "}
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch(removeFromCart(item.product.id))
                        }
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="6" style={{ textAlign: "right" }}>
                    Tổng cộng:
                  </th>
                  <th>{totalPrice.toLocaleString()} VNĐ</th>
                </tr>
                <tr>
                  <th colSpan="6" style={{ textAlign: "right" }}></th>
                  <th>
                    <button href={`/instruct`} class="buyaddcart">
                      Thanh toán với MoMo
                    </button>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
