"use client"; // Mark this file as a Client Component
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "./component/ProductCard";

const ProductBox = () => {
  const [error, setError] = useState(null);
  const [ktdateData, setKtdateData] = useState([]); // Khai báo state cho ktdate
  const [ktviewData, setKtviewData] = useState([]); // Khai báo state cho ktview
  const [ktdownloadData, setKtdownloadData] = useState([]); // Khai báo state cho ktview
  const [cndateData, setcndateData] = useState([]); // Khai báo state cho cndate
  const [cnviewData, setcnviewData] = useState([]); // Khai báo state cho cnview
  const [cndownloadData, setcndownloadData] = useState([]); // Khai báo state cho cnview
  const [dalvdateData, setdalvdateData] = useState([]); // Khai báo state cho dalvdate
  const [dalvviewData, setdalvviewData] = useState([]); // Khai báo state cho dalvview
  const [dalvdownloadData, setdalvdownloadData] = useState([]); // Khai báo state cho dalvview

  //Làm phân trang
  const [ktData, setKtData] = useState([]); // Khai báo state cho ktData
  const itemsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Khai báo trang hiện tại

  const totalPages = Math.ceil(ktData.length / itemsPerPage); // Tính tổng số trang

  // Lấy dữ liệu cho trang hiện tại
  const currentItems = ktData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const showPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Khởi tạo trang đầu tiên khi ktData thay đổi
    setCurrentPage(1);
  }, [ktData]);

  useEffect(() => {
    // Search functionality
    const searchInput = document.querySelector(".search-input");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const items = dropdownMenu.querySelectorAll(".search-item");

    const handleInput = () => {
      const filter = searchInput.value.toLowerCase();
      items.forEach((item) => {
        const txtValue = item.textContent || item.innerText;
        item.style.display = txtValue.toLowerCase().includes(filter)
          ? ""
          : "none";
      });
    };

    searchInput.addEventListener("input", handleInput);
    return () => {
      searchInput.removeEventListener("input", handleInput);
    };
  }, []);

  const showProducts = (element) => {
    if (!element) {
      console.error("Element not found");
      return;
    }
    const boxProducts = element
      .closest(".boxfullproduct2")
      .querySelector(".boxproducts");
    const category = element.getAttribute("data-category");
    const boxContents = boxProducts.querySelectorAll(".boxcontent");

    boxContents.forEach((box) => {
      box.classList.remove("active");
    });

    const selectedBox = boxProducts.querySelector(`#box_${category}Products`);
    if (selectedBox) {
      selectedBox.classList.add("active");
    }

    const links = element
      .closest(".select")
      .querySelectorAll("a[data-category]");
    links.forEach((link) => {
      link.classList.remove("active-link");
    });
    element.classList.add("active-link");
  };

  const handleClick = (event) => {
    const target = event.currentTarget;
    showProducts(target);
  };

  useEffect(() => {
    const fetchKtData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/date");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setKtData(jsonData);
      } catch (err) {
        setError(err);
      }
    };
    const fetchKtdateData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/ktdate");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setKtdateData(jsonData);
      } catch (err) {
        setError(err);
      }
    };

    const fetchKtviewData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/ktview");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setKtviewData(jsonData);
      } catch (err) {
        setError(err);
      }
    };
    const fetchKtdownloadData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/ktdownload");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setKtdownloadData(jsonData);
      } catch (err) {
        setError(err);
      }
    };
    const fetchcndateData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/cndate");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setcndateData(jsonData);
      } catch (err) {
        setError(err);
      }
    };

    const fetchcnviewData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/cnview");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setcnviewData(jsonData);
      } catch (err) {
        setError(err);
      }
    };
    const fetchcndownloadData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/cndownload");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setcndownloadData(jsonData);
      } catch (err) {
        setError(err);
      }
    };
    const fetchdalvdateData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/dalvdate");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setdalvdateData(jsonData);
      } catch (err) {
        setError(err);
      }
    };

    const fetchdalvviewData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/dalvview");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setdalvviewData(jsonData);
      } catch (err) {
        setError(err);
      }
    };
    const fetchdalvdownloadData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/dalvdownload");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        console.log(jsonData); // Kiểm tra dữ liệu
        setdalvdownloadData(jsonData);
      } catch (err) {
        setError(err);
      }
    };

    fetchKtData();
    fetchKtdateData();
    fetchKtviewData();
    fetchKtdownloadData();
    fetchcndateData();
    fetchcnviewData();
    fetchcndownloadData();
    fetchdalvdateData();
    fetchdalvviewData();
    fetchdalvdownloadData();
  }, []);

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:3000/banners");
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu banner:", error);
      }
    };

    fetchBanners();
  }, []);

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("http://localhost:3000/banks"); // Thay đổi đường dẫn ở đây
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ngân hàng:", error); // Cập nhật log
      }
    };

    fetchBanks();
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

  const [activeBannerIndex, setActiveBannerIndex] = useState(0); // Lưu chỉ số banner hiện tại
  const [isManualChange, setIsManualChange] = useState(false); // Trạng thái để kiểm soát việc thay đổi thủ công

  const handleThumbnailClick = (index) => {
    setActiveBannerIndex(index); // Cập nhật chỉ số banner khi nhấn vào thumbnail
    setIsManualChange(true); // Đánh dấu rằng có thay đổi thủ công
  };

  // Tự động chuyển đổi banner
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setActiveBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Chuyển ảnh mỗi 3 giây

    return () => clearInterval(autoSlide); // Dọn dẹp interval khi component unmount
  }, [banners.length]);

  // Tự động chuyển sang banner tiếp theo sau 3 giây khi có thay đổi thủ công
  useEffect(() => {
    if (isManualChange) {
      const timer = setTimeout(() => {
        setActiveBannerIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % banners.length; // Chuyển sang ảnh tiếp theo
          return nextIndex; // Cập nhật chỉ số banner
        });
        setIsManualChange(false); // Đánh dấu không còn thay đổi thủ công
      }, 3000);

      return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount hoặc khi có thay đổi
    }
  }, [isManualChange]);

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
      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-2 tool p-0">
              <div className="scrollfix1">
                {categories.map(
                  (category) =>
                    category.name ? ( // Check if category.name is defined
                      <Link
                        className="dropdown-item"
                        href={`/productstools/${category.name}`}
                      >
                        {category.name}
                      </Link>
                    ) : null // Render nothing if category.name is undefined
                )}
              </div>
              <div className="all">
                <Link className="textall" href={`/tonghop`}>
                  Xem tất cả <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-8 p-0 bannerimg">
              <div
                id="carouselExampleInterval"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {banners.map((banner, index) => (
                    <div
                      className={`carousel-item ${
                        index === activeBannerIndex ? "active" : ""
                      }`}
                      data-bs-interval="3000"
                      key={banner._id} // Sử dụng trường id hoặc _id của banner
                    >
                      <img
                        src={`../assets/img/${banner.img}`} // Thay đổi theo cấu trúc dữ liệu của bạn
                        className="d-block w-100"
                        alt={banner.img || "Banner Image"} // Thay đổi theo cấu trúc dữ liệu của bạn
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="prev"
                  onClick={() =>
                    setActiveBannerIndex((prev) =>
                      prev === 0 ? banners.length - 1 : prev - 1
                    )
                  }
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="next"
                  onClick={() =>
                    setActiveBannerIndex((prev) =>
                      prev === banners.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-2 tool p-0 scrollfix2">
              {banners.map((banner, index) => (
                <div
                  key={banner._id}
                  onClick={() => handleThumbnailClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`../assets/img/${banner.img}`} // Thay đổi theo cấu trúc dữ liệu của bạn
                    className="d-block w-100 p-lg-1"
                    alt={banner.img || "Banner Image"} // Thay đổi theo cấu trúc dữ liệu của bạn
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="boxproduct">
        <div className="container p-0">
          <div className="top">
            <b>Bản vẽ mới nhất</b>
          </div>
          <div className="bottom">
            <div className="row" id="boxContainer">
              <ProductCard data={currentItems} />
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination" id="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        showPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="boxfullproduct2">
        <div className="boxfullproduct2">
          <div className="boxproduct2">
            <div className="container">
              <div className="row">
                <div className="col-2 architecture">Kiến trúc</div>
                <div className="col-10 select">
                  <div className="left">
                    <a data-category="new" onClick={handleClick}>
                      Mới nhất
                    </a>
                    <a data-category="popular" onClick={handleClick}>
                      Xem nhiều
                    </a>
                    <a data-category="downloaded" onClick={handleClick}>
                      Tải nhiều
                    </a>
                  </div>
                  <div className="right">
                    <a href="#">
                      Xem tất cả <i className="fa-solid fa-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="boxproduct2-con banner">
            <div className="container">
              <div className="row">
                <div className="col-2 tool p-0 scrollfix3">
                  {categories2.map(
                    (category) =>
                      category.name ? ( // Kiểm tra xem category.name của categories1 có được định nghĩa không
                        <Link
                          className="dropdown-item"
                          href={`/productsAll/${category.name}`}
                        >
                          {category.name}
                        </Link>
                      ) : null // Không render gì nếu category.name không được định nghĩa
                  )}
                  <img src="../assets/img/ban-ve-kien-truc-nha.jpg" alt="" />
                </div>
                <div className="col-10 boxproducts">
                  <div className="row boxcontent active" id="box_newProducts">
                    <ProductCard data={ktdateData} />
                  </div>
                  <div className="row boxcontent" id="box_popularProducts">
                    <ProductCard data={ktviewData} />
                  </div>
                  <div className="row boxcontent" id="box_downloadedProducts">
                    <ProductCard data={ktdownloadData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="boxfullproduct2">
        <div className="boxproduct2 boxproduct2-fixheight">
          <div className="container">
            <div className="row">
              <div className="col-2 architecture">Chuyên ngành</div>
              <div className="col-10 select">
                <div className="left">
                  <a data-category="new1" onClick={handleClick}>
                    Mới nhất
                  </a>
                  <a data-category="popular1" onClick={handleClick}>
                    Xem nhiều
                  </a>
                  <a data-category="downloaded1" onClick={handleClick}>
                    Tải nhiều
                  </a>
                </div>
                <div className="right">
                  <a href="#">
                    Xem tất cả <i className="fa-solid fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="boxproduct2-con banner">
          <div className="container">
            <div className="row">
              <div className="col-2 tool p-0 scrollfix3">
                {categories1.map(
                  (category) =>
                    category.name ? ( // Kiểm tra xem category.name của categories1 có được định nghĩa không
                      <Link
                        className="dropdown-item"
                        href={`/productsAll/${category.name}`}
                      >
                        {category.name}
                      </Link>
                    ) : null // Không render gì nếu category.name không được định nghĩa
                )}
                <img
                  src="../assets/img/ban-ve-chuyen-nganh-co-khi.jpg"
                  alt=""
                />
              </div>
              <div className="col-10 boxproducts">
                <div className="row boxcontent active" id="box_new1Products">
                  <ProductCard data={cndateData} />
                </div>
                <div className="row boxcontent" id="box_popular1Products">
                  <ProductCard data={cnviewData} />
                </div>
                <div className="row boxcontent" id="box_downloaded1Products">
                  <ProductCard data={cndownloadData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="boxfullproduct2">
        <div className="boxproduct2 boxproduct2-fixheight">
          <div className="container">
            <div className="row">
              <div className="col-2 architecture">Đồ án - Luận văn</div>
              <div className="col-10 select">
                <div className="left">
                  <a data-category="new2" onClick={handleClick}>
                    Mới nhất
                  </a>
                  <a data-category="popular2" onClick={handleClick}>
                    Xem nhiều
                  </a>
                  <a data-category="downloaded2" onClick={handleClick}>
                    Tải nhiều
                  </a>
                </div>
                <div className="right">
                  <a href="#">
                    Xem tất cả <i className="fa-solid fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="boxproduct2-con banner">
          <div className="container">
            <div className="row">
              <div className="col-2 tool p-0 scrollfix3">
                {categories3.map(
                  (category) =>
                    category.name ? ( // Kiểm tra xem category.name của categories1 có được định nghĩa không
                      <Link
                        className="dropdown-item"
                        href={`/productsAll/${category.name}`}
                      >
                        {category.name}
                      </Link>
                    ) : null // Không render gì nếu category.name không được định nghĩa
                )}
                <img src="../assets/img/do-an-thiet-ke.jpg" alt="" />
              </div>
              <div className="col-10 boxproducts">
                <div className="row boxcontent active" id="box_new2Products">
                  <ProductCard data={dalvdateData} />
                </div>
                <div className="row boxcontent" id="box_popular2Products">
                  <ProductCard data={dalvviewData} />
                </div>
                <div className="row boxcontent" id="box_downloaded2Products">
                  <ProductCard data={dalvdownloadData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="payload">
        <div className="container">
          <div className="row">
            <div className="top">
              <p className="title">Thanh toán dễ dàng</p>
              <p className="payloadcontent">
                Hỗ trợ thanh toán quốc tế, các ví điện tử và 33 ngân hàng ở Việt
                Nam
              </p>
            </div>
            <div className="bottom">
              {banks.map((bank) => (
                <div className="col-2" key={bank._id}>
                  {" "}
                  {/* Sử dụng trường id hoặc _id của ngân hàng */}
                  <img
                    src={`../assets/img/${bank.img}`} // Đường dẫn hình ảnh cho ngân hàng
                    className="d-block"
                    alt={bank.img || "Bank Image"} // Thay đổi thuộc tính alt cho phù hợp
                  />
                  <h5>{bank.name}</h5> {/* Hiển thị tên ngân hàng */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductBox;
