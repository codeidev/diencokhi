"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Slider from "@/app/component/Slider";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DetailPage({ params }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/productsdetail/${params.id}`, fetcher, {
    refreshInterval: 6000,
  });
  console.log(product);
  const handleAddToCart = () => {
    console.log("Product:", product);
    console.log("Quantity:", quantity);
    if (product) {
      dispatch(addToCart({ item: product, quantity }));
    }
  };
  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ"; // Trả về 0 nếu không có giá
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/download");
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải dữ liệu");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await fetch(
          `http://localhost:3000/product/${params.id}/comments`
        );
        if (!commentsResponse.ok) {
          throw new Error("Error fetching comments");
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData.comments);
      } catch (error) {
        setCommentsError(error.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [params.id]);

  const [newComment, setNewComment] = useState("");
  const handleAddComment = async () => {
    console.log("Button clicked!"); // Thêm log này
    if (!newComment.trim()) return; // Kiểm tra bình luận không rỗng

    const currentDate = new Date().toLocaleDateString("vi-VN"); // Định dạng ngày theo kiểu Việt Nam
    const commentData = {
      comment: newComment, // Đảm bảo sử dụng 'content' thay vì 'comment' để nhất quán với API
      author: user ? user.name : "Người dùng ẩn danh", // Lấy tên người dùng nếu đã đăng nhập
      date: currentDate,
      img: user && user.img ? `${user.img}` : "../assets/img/avanta.png", // Lấy ảnh người dùng nếu có, nếu không dùng ảnh mặc định
    };

    try {
      // Gửi bình luận mới vào API
      const response = await fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi bình luận");
      }

      const newComment = await response.json(); // Nhận bình luận mới từ server
      // Cập nhật trường comment trong sản phẩm
      await fetch(`http://localhost:3000/products/${params.id}/comments`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: newComment.id, // ID bình luận mới
        }),
      });

      setComments((prevComments) => [...prevComments, newComment]); // Cập nhật danh sách bình luận
      setNewComment(""); // Xóa nội dung bình luận sau khi gửi
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const token = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  const tokenValue = token?.split("=")[1];

  if (!tokenValue) {
    window.location.href = "/dangnhap";
  }

  // Lấy thông tin user bằng token
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/detailuser", {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        const data = await res.json();
        setUser(data);

        // Lấy ảnh từ user ID
        const userRes = await fetch(`http://localhost:3000/users/${data.id}`, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        const userData = await userRes.json();
        setUser((prevUser) => ({ ...prevUser, img: userData.img })); // Cập nhật ảnh
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi hoàn thành
      }
    };
    getUser();
  }, [tokenValue]);

  const [rating, setRating] = useState(0); // Trạng thái để lưu số sao đã chọn

  const handleStarClick = (index) => {
    setRating(index + 1); // Cập nhật số sao khi người dùng nhấp vào
  };

  const handleSubmitRating = async () => {
    if (rating === 0) return; // Không làm gì nếu chưa chọn sao

    const voteData = {
      userId: user.id, // ID người dùng
      name: user.name, // Tên người dùng
      stars: rating, // Số sao đã chọn
    };

    try {
      // Gửi voteData lên bảng votes trước
      const response = await fetch("http://localhost:3000/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi đánh giá");
      }

      const newVote = await response.json(); // Nhận vote mới từ server

      // Cập nhật mảng starts trong bảng products
      const productResponse = await fetch(
        `http://localhost:3000/products/${params.id}/starts`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voteId: newVote.vote.id, // Đảm bảo sử dụng đúng ID
          }),
        }
      );

      if (!productResponse.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật sản phẩm");
      }

      const result = await productResponse.json();
      console.log("Đánh giá đã được lưu:", result);
      // Có thể thêm thông báo thành công hoặc cập nhật giao diện
      setRating(0); // Reset số sao sau khi gửi thành công
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };

  const [votes, setVotes] = useState([]);
  const [ratings, setRatings] = useState(Array(5).fill(0)); // Mảng để lưu số lượng đánh giá cho 5 mức sao

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/${params.id}/votes`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu đánh giá");
        }
        const data = await response.json();

        setVotes(data.votes); // Lưu dữ liệu đánh giá
        calculateRatings(data.votes); // Tính số lượng đánh giá
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchVotes();
  }, [params.id]); // Thêm params.id vào dependencies

  const calculateRatings = (votes) => {
    const ratingCounts = Array(5).fill(0); // Mảng để đếm số lượng đánh giá cho từng mức sao
    votes.forEach((vote) => {
      if (vote.stars >= 1 && vote.stars <= 5) {
        ratingCounts[vote.stars - 1] += 1; // Cộng dồn cho mức sao tương ứng
      }
    });
    setRatings(ratingCounts); // Cập nhật state với số lượng đánh giá
  };

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải...</div>;
  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <Link href={`/`}>Trang chủ</Link> /{" "}
            <a href="#">{product.product.category}</a> /
            <a href="#">
              {product.product.category1[0]} - {product.product.category1[1]}
            </a>{" "}
            /<a href="#">{product.product.name}</a>
          </p>
        </div>
      </section>
      <section className="detailproductfull">
        <div className="container">
          <div className="row">
            <div className="col-5 p-0">
              {/* //show navigate */}
              <Slider params={params} />
            </div>
            <div className="col-5 contentdetail">
              <div className="boxfullcontent">
                <span className="dt-title-or">
                  [Mã bản vẽ {product.product.id}]
                </span>
                <h4 className="dt-title">{product.product.name}</h4>
                <div className="row">
                  <div className="col-6 dt-star">
                    <div className="star star-fix-detail">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="col-6 dt-star2">
                    <p className="number">
                      {product.product.download}
                      <i className="fa-solid fa-download down"></i>
                    </p>
                    <p className="number">
                      {product.product.view}
                      <i className="fa-solid fa-eye"></i>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="dt-sub">
                  <p className="description">{product.product.content}</p>
                </div>
                <hr />
                <div className="category">
                  <p>
                    Danh mục:{" "}
                    <a className="or" href="#">
                      {product.product.category}
                    </a>
                  </p>
                  <p>
                    Thể loại:{" "}
                    <a className="or" href="#">
                      {product.product.category1[0]}
                    </a>{" "}
                    &nbsp;{">"}&nbsp;
                    <a className="or" href="#">
                      {product.product.category1[1]}
                    </a>
                  </p>
                  <p>
                    Ngày đăng: <a>{product.product.date}</a>
                  </p>
                  <p>
                    Loại file: <a>File</a>
                  </p>
                  <p>
                    File download:
                    <a>
                      <img src="../assets/img/ic_rar.png" />
                      &nbsp;
                      <span>
                        <b>{product.product.file}</b>
                      </span>
                    </a>
                  </p>
                </div>
                <div className="clear">
                  <a className="errol" href="#">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>Gửi
                    thông báo lỗi
                  </a>
                  <a className="errol" href="#">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    Báo vi phạm bản quyền
                  </a>
                </div>
                <div className="dt-ch">
                  <div className="userck">CAM KẾT TỪ NGƯỜI BÁN</div>
                  <div className="it-chk">
                    <i className="fa-solid fa-thumbs-up"></i>Cam kết bản vẽ
                    giống hình ảnh
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="boxfullcontent2">
                <div className="pricedetail">
                  <p>Phí download</p>
                  <a href="#">{formatCurrency(product.product?.price)}</a>
                </div>
                <div className="buttondiv">
                  <a href="#" className="gray">
                    Số lượng:{" "}
                    <input
                      className="form-control w-80 m-auto"
                      min="1"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </a>

                  <a
                    className="green"
                    onClick={handleAddToCart}
                    type="button"
                    name="submit"
                    value="addtocard"
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                    hàng
                  </a>
                </div>
                <div className="share">
                  <p>Chia sẻ nhanh</p>
                  <div className="thu">
                    <img src="../assets/img/share-email.png" alt="" />
                    <a href="#">Gửi bản vẽ tới bạn bè</a>
                  </div>
                </div>
                <div className="likeshare">
                  <a href="#">
                    <i className="fa-solid fa-thumbs-up"></i>Like
                  </a>
                  <a href="#">
                    <i className="fa-solid fa-share-from-square"></i>Share
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="descom">
        <div className="container">
          <div className="row">
            <div className="col-9 descomksp">
              <div className="boxks">
                <div className="col-4 ks">
                  <img src={`/assets/img/${product.product.imgen}`} alt="" />
                  <div className="right">
                    <p className="kstitle">
                      Kỹ sư hạ tầng {product.product.engineer}
                    </p>
                    <p className="trophy">
                      <i className="fa-solid fa-trophy"></i>
                      <i className="fa-solid fa-trophy"></i>
                      <i className="fa-solid fa-trophy"></i>
                      <i className="fa-solid fa-trophy"></i>
                      <i className="fa-solid fa-trophy"></i>
                      <span>(Hạng vàng)</span>
                    </p>
                    <a href="#" className="contactks">
                      <i className="fa-solid fa-store"></i> Xem trang
                    </a>
                  </div>
                </div>
                <div className="col-2 boxks-con">
                  <i className="fa-solid fa-pen"></i>
                  <p>Bản vẽ</p>
                  <span>{product.product.blueprint}</span>
                </div>
                <div className="col-3 boxks-con">
                  <i className="fa-solid fa-star"></i>
                  <p>Đánh giá ({product.product.voteen})</p>
                  <span>4/5</span>
                </div>
                <div className="col-3 boxks-con">
                  <i className="fa-solid fa-calendar-days"></i>
                  <p>Ngày tham gia</p>
                  <span>{product.product.dateen}</span>
                </div>
              </div>
              <div className="boxdescribe">
                <div className="container">
                  <div className="row">
                    <span>Mô tả chi tiết</span>
                    <div className="mt-ds">
                      {product.product.description.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                      <br />
                      <br />
                      <p>
                        <span>Hình ảnh Demo</span>
                      </p>
                      {product.product.img.map((imgSrc, index) => (
                        <img
                          key={index}
                          src={`/assets/img/${imgSrc}`}
                          alt={`Hình ảnh ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 bvhot">
              <p>
                <i className="fa-solid fa-star"></i> Bản vẽ nổi bật
              </p>
              <hr />
              {products.length > 0 ? (
                products.map((product) => (
                  <>
                    <div className="box" key={product._id}>
                      <div className="top">
                        <img
                          src={`/assets/img/${product.img[0]}`} // Kiểm tra trường 'image'
                          alt={product.name} // Kiểm tra trường 'name'
                        />
                        <div className="right orange1011">
                          <a href={`/chitietsanpham/${product.id}`}>
                            {product.name} {/* Kiểm tra trường 'name' */}
                          </a>
                          <p>{formatCurrency(product?.price)}</p>{" "}
                          {/* Kiểm tra trường 'price' */}
                        </div>
                      </div>
                      <div className="bottom orange1011">
                        <a href={`/productstools/${product?.category}`}>
                          {product.category}
                        </a>{" "}
                        {/* Kiểm tra trường 'category' */}
                        <p>
                          {product.download}{" "}
                          <i className="fa-solid fa-download"></i>{" "}
                          {/* Kiểm tra trường 'downloads' */}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </>
                ))
              ) : (
                <p>Không có sản phẩm nào để hiển thị.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="boxproduct boxproductdetail">
        <div className="container p-0">
          <div className="row">
            <div className="top">
              <b>Gợi ý đề xuất</b>
            </div>
            <div className="bottom">
              <div className="row" id="boxContainer">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div className="box" key={product._id}>
                      {" "}
                      {/* Gán key tại đây */}
                      <div className="topbox image-container">
                        <a href={`/chitietsanpham/${product.id}`}>
                          <img
                            src={`/assets/img/${product.img[0]}`} // Kiểm tra trường 'image'
                            alt={product.name} // Kiểm tra trường 'name'
                          />
                        </a>
                        <a href={`/chitietsanpham/${product.id}`}>
                          <i
                            className="fas fa-download icon icon-download"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a href="#">
                          <i
                            className="fas fa-heart icon icon-heart"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      <div className="bottombox">
                        <h4>
                          <a href={`/chitietsanpham/${product.id}`}>
                            {product.name} {/* Kiểm tra trường 'name' */}
                          </a>
                        </h4>
                        <div className="cateprice">
                          <a href={`/productstools/${product?.category}`}>
                            {" "}
                            {product.category}
                          </a>
                          <div className="star">
                            <i
                              className="fa-solid fa-star"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa-solid fa-star"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa-solid fa-star"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa-solid fa-star"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa-solid fa-star"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <div className="cateprice">
                          <p className="price">
                            {formatCurrency(product?.price)}
                          </p>
                          <p className="number">
                            {product.download}
                            <i
                              className="fa-solid fa-download down"
                              aria-hidden="true"
                            ></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có sản phẩm nào để hiển thị.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="commentdetail">
        <div className="container">
          <div className="row commentdetailcon">
            <div className="col-3">
              <p>Ý kiến của bạn</p>
              <div className="bottom opinion">
                <div className="infousercomment">
                  <img
                    src={
                      user && user.img
                        ? `http://localhost:3000/img/${user.img}`
                        : "../assets/img/avanta.png"
                    }
                    alt=""
                  />
                  &nbsp;
                  <b>{user ? user.name : "Người dùng ẩn danh"}</b>
                </div>
                <textarea
                  id="commentInput"
                  placeholder="Để lại ý kiến của bạn..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <p>
                  <button
                    onClick={handleAddComment}
                    type="button"
                    className="buttontonow"
                  >
                    <i className="fa-solid fa-comment"></i> Gửi ngay!
                  </button>
                </p>
              </div>
            </div>
            <div className="col-3">
              <p>Hiển thị bình luận</p>
              <div className="commentpage scrollpagecoment">
                <div id="comments">
                  {loadingComments ? (
                    <div>Đang tải bình luận...</div>
                  ) : commentsError ? (
                    <div>{commentsError}</div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment._id} className="comment commentuser">
                        <img
                          src={`http://localhost:3000/img/${comment.img} `}
                          alt=""
                        />
                        <div>
                          <span>
                            <b>
                              {comment.author ? comment.author : "Người dùng"}{" "}
                              <i>{comment.date}</i>
                            </b>{" "}
                            {comment.comment}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <i>Chưa có bình luận nào cho sản phẩm này.</i>
                  )}
                  {/* <div className="comment commentuser">
                    <img src="../assets/img/avanta.png" alt="" />
                    <div>
                      <span>
                        <b>Nguyễn Văn A</b>Duyệt
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-3">
              <div>
                <div className="starrow rowstarti">
                  <p>Đánh giá của bạn</p>
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fa-solid fa-star ${
                        index < rating ? "text-warning" : ""
                      }`}
                      onClick={() => handleStarClick(index)} // Gọi hàm khi sao được nhấp
                    ></i>
                  ))}
                </div>
                <br />
                <button
                  onClick={handleSubmitRating}
                  type="button"
                  className="buttontonow"
                >
                      <i className="fa-solid fa-star"></i>
                  Gửi đánh giá
                </button>
              </div>
            </div>
            <div className="col-3">
              <p>Hiển thị đánh giá</p>
              <div className="star">
                {ratings.map((count, index) => (
                  <div className="starrow" key={index}>
                    {[...Array(5)].map((_, starIndex) => (
                      <i
                        key={starIndex}
                        className={`fa-solid fa-star ${
                          starIndex <= index ? "text-warning" : ""
                        }`}
                      ></i>
                    ))}
                    <span>
                      Bản vẽ {index + 1} sao <b>({count} đánh giá)</b>
                    </span>
                  </div>
                ))}
                {/* <div className="starrow">
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <span>
                    Bản vẽ rất tốt <b>(1 đánh giá)</b>
                  </span>
                </div>
                <div className="starrow">
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star"></i>
                  <span>
                    Bản vẽ tốt <b>(0 đánh giá)</b>
                  </span>
                </div>
                <div className="starrow">
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span>
                    Bản vẽ rất hay <b>(0 đánh giá)</b>
                  </span>
                </div>
                <div className="starrow">
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span>
                    Bản vẽ rất hay <b>(0 đánh giá)</b>
                  </span>
                </div>
                <div className="starrow">
                  <i className="fa-solid fa-star coloror"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span>
                    Bản vẽ rất bình thường <b>(0 đánh giá)</b>
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
