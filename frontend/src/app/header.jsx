"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce(
    (count, item) => count + Number(item.quantity),
    0
  );
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  // Hàm để xử lý thay đổi trong trường tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách danh mục dựa trên giá trị tìm kiếm
  const filteredCategories = categories.filter(
    (category) =>
      category.name &&
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //tới categories1
  const [categories1, setCategories1] = useState([]);
  useEffect(() => {
    const fetchCategories1 = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories1"); // Thay đổi URL nếu cần
        const data = await response.json();
        setCategories1(data);
      } catch (error) {
        console.error("Error fetching categories1:", error);
      }
    };
  
    fetchCategories1();
  }, []);
  //tới categories2
  const [categories2, setCategories2] = useState([]);
  useEffect(() => {
    const fetchCategories2 = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories2"); // Thay đổi URL nếu cần
        const data = await response.json();
        setCategories2(data);
      } catch (error) {
        console.error("Error fetching categories2:", error);
      }
    };
  
    fetchCategories2();
  }, []);
  //tới categories3
  const [categories3, setCategories3] = useState([]);
  useEffect(() => {
    const fetchCategories3 = async () => {
      try {
      const response = await fetch("http://localhost:3000/categories3"); // Thay đổi URL nếu cần
        const data = await response.json();
      setCategories3(data);
      } catch (error) {
        console.error("Error fetching categories3:", error);
      }
    };
  
  fetchCategories3();
  }, []);

  return (
    <>
      <section className="headertop">
        <div className="container">
          <div className="row rowtop">
            <div className="col-8 contact p-0">
              <a href="tel:0867864313">
                <i className="fa-solid fa-phone"></i> 0867.864.313
              </a>
              <a href="mailto:bmdiencokhi.vn@gmail.com" className="none">
                <i className="fa-solid fa-envelope"></i>
                bmdiencokhi.vn@gmail.com
              </a>
            </div>
            <div className="col-4 login p-0">
              <div className="dropdown">
                <a
                  className="button"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-caret-down"></i>
                </a>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href={`/cart`}>
                      Giỏ hàng
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/dangnhap`}>
                      Đăng nhập
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={"/dangki"}>
                      Đăng kí
                    </a>
                  </li>
                </ul>
              </div>
              <Link className="a-amount-cart" href="/cart">
                <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
                <span id="amount-cart">
                  {cartCount}
                </span>
              </Link>
              <Link href={`/dangnhap`}>
                <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
              </Link>
              <Link
                className="nav-icon position-relative text-decoration-none"
                href={isLoggedIn ? "/info" : "/dangnhap"}
              >
                <i
                  className={`${
                    isLoggedIn ? "fa fa-user" : "fa fa-sign-in-alt"
                  } fs-5 fw-bolder text-dark`}
                />
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  {isLoggedIn ? "Info" : "Login"}
                </span>
              </Link>
              <Link className="none" href={`/dangki`}>
                <i className="fa-solid fa-user-plus"></i> Đăng kí
              </Link>
            </div>
          </div>
          <div className="row rowbottom">
            <div className="col col-2 logo p-0">
              <a href="/">
                <img src="/assets/img/logo.png" alt="" />
              </a>
            </div>
            <div className="col col-5 inputsearch p-0">
              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tìm bản vẽ
                </button>
                <ul className="dropdown-menu" id="dropdown-menu">
                  <li>
                    <input
                      type="text"
                      className="form-control search-input"
                      placeholder="Tìm kiếm"
                      aria-label="Search input"
                      value={searchTerm}
                      onChange={handleSearchChange} // Gọi hàm khi người dùng nhập
                    />
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {filteredCategories.map((category) => (
                    <li className="search-item" key={category.id}>
                      <Link
                        className="dropdown-item"
                        href={`/productstools/${category.name}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href={`/tonghop`}>
                      Tổng hợp
                    </Link>
                  </li>
                </ul>
                <form className="input-icon" action="/timkiem">
                  <input
                    placeholder="Nhập Từ khóa (or) Mã bản vẽ & Enter"
                    type="text"
                    name="keyword"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="col col-5 loaded p-0">
              <a href={`/thanhtoan`}>Thanh toán</a>
            </div>
          </div>
        </div>
      </section>
      <section className="menubanner">
        <div className="container">
          <div className="row">
            <div className="col-2 tools dropdown">
              <div
                className="p button dropdown-menu-detail-tools"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Công cụ <i className="fa-solid fa-bars"></i>
              </div>
              <ul
                className="dropdown-menu dropdown-menu-detail scrollfix"
                aria-labelledby="dropdownMenuLink"
              >
                {categories.map(
                  (category) =>
                    category.name ? ( // Check if category.name is defined
                      <li className="search-item" key={category.id}>
                        <Link
                          className="dropdown-item"
                          href={`/productstools/${category.name}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ) : null // Render nothing if category.name is undefined
                )}
              </ul>
            </div>
            <div className="col-8 menu">
              <div className="dropdown">
                <Link href={`/`}>Trang chủ</Link>
              </div>
              <div className="dropdown">
                <a
                  className="button"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Kiến trúc<i className="fa-solid fa-angle-down"></i>
                </a>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                 {categories2.map(
                    (category) =>
                      category.name ? ( // Kiểm tra xem category.name của categories1 có được định nghĩa không
                        <li>
                          <Link
                            className="dropdown-item"
                            href={`/productsAll/${category.name}`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ) : null // Không render gì nếu category.name không được định nghĩa
                  )}
                </ul>
              </div>
              <div className="dropdown">
                <a
                  className="button"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Chuyên ngành<i className="fa-solid fa-angle-down"></i>
                </a>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  {categories1.map(
                    (category) =>
                      category.name ? ( // Kiểm tra xem category.name của categories1 có được định nghĩa không
                        <li>
                          <Link
                            className="dropdown-item"
                            href={`/productsAll/${category.name}`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ) : null // Không render gì nếu category.name không được định nghĩa
                  )}
                </ul>
              </div>
              <div className="dropdown">
                <a
                  className="button"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Đồ án - Luận văn<i className="fa-solid fa-angle-down"></i>
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                    {categories3.map(
                    (category) =>
                      category.name ? ( // Kiểm tra xem category.name của categories1 có được định nghĩa không
                        <li>
                          <Link
                            className="dropdown-item"
                            href={`/productsAll/${category.name}`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ) : null // Không render gì nếu category.name không được định nghĩa
                  )}
                </ul>
              </div>
              <div className="dropdown">
                <Link href={`/tonghop`}>Tổng hợp</Link>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </section>
    </>
  );
}
