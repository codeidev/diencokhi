"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Statistical() {
  const [bannerCount, setBannerCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryCount, setCategoryCount] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [category1Count, setCategory1Count] = useState(null);
  const [loadingCategory1, setLoadingCategory1] = useState(true);
  const [category2Count, setCategory2Count] = useState(null);
  const [loadingCategory2, setLoadingCategory2] = useState(true);
  const [category3Count, setCategory3Count] = useState(null);
  const [loadingCategory3, setLoadingCategory3] = useState(true);
  const [productCount, setProductCount] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [userCount, setUserCount] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [bankCount, setBankCount] = useState(null);
  const [loadingBanks, setLoadingBanks] = useState(true);

  useEffect(() => {
      const fetchBannerCount = async () => {
          try {
              const response = await fetch('http://localhost:3000/banners');
              if (!response.ok) {
                  throw new Error('Mạng lỗi');
              }
              const banners = await response.json();
              setBannerCount(banners.length); // Giả định dữ liệu là một mảng
          } catch (error) {
              console.error('Có lỗi xảy ra:', error);
              setBannerCount('Không thể lấy số lượng banner.');
          } finally {
              setLoading(false);
          }
      };

      fetchBannerCount();
      const fetchCategoryCount = async () => {
        try {
            const response = await fetch('http://localhost:3000/categories');
            if (!response.ok) {
                throw new Error('Mạng lỗi');
            }
            const categories = await response.json();
            setCategoryCount(categories.length); // Giả định dữ liệu là một mảng
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            setCategoryCount('Không thể lấy số lượng danh mục.');
        } finally {
            setLoadingCategories(false);
        }
    };
    fetchCategoryCount();
    const fetchCategory1Count = async () => {
      try {
          const response = await fetch('http://localhost:3000/categories1');
          if (!response.ok) {
              throw new Error('Mạng lỗi');
          }
          const categories1 = await response.json();
          setCategory1Count(categories1.length);
      } catch (error) {
          console.error('Có lỗi xảy ra:', error);
          setCategory1Count('Không thể lấy số lượng danh mục 1.');
      } finally {
          setLoadingCategory1(false);
      }
  };
  fetchCategory1Count();

  const fetchCategory2Count = async () => {
      try {
          const response = await fetch('http://localhost:3000/categories2');
          if (!response.ok) {
              throw new Error('Mạng lỗi');
          }
          const categories2 = await response.json();
          setCategory2Count(categories2.length);
      } catch (error) {
          console.error('Có lỗi xảy ra:', error);
          setCategory2Count('Không thể lấy số lượng danh mục 2.');
      } finally {
          setLoadingCategory2(false);
      }
  };
  fetchCategory2Count();

  const fetchCategory3Count = async () => {
      try {
          const response = await fetch('http://localhost:3000/categories3');
          if (!response.ok) {
              throw new Error('Mạng lỗi');
          }
          const categories3 = await response.json();
          setCategory3Count(categories3.length);
      } catch (error) {
          console.error('Có lỗi xảy ra:', error);
          setCategory3Count('Không thể lấy số lượng danh mục 3.');
      } finally {
          setLoadingCategory3(false);
      }
  };
  fetchCategory3Count();

  const fetchProductCount = async () => {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Mạng lỗi');
        }
        const products = await response.json();
        setProductCount(products.length);
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        setProductCount('Không thể lấy số lượng sản phẩm.');
    } finally {
        setLoadingProducts(false);
    }
};
fetchProductCount();

const fetchUserCount = async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Mạng lỗi');
        }
        const users = await response.json();
        setUserCount(users.length);
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        setUserCount('Không thể lấy số lượng người dùng.');
    } finally {
        setLoadingUsers(false);
    }
};
fetchUserCount();

const fetchBankCount = async () => {
  try {
    const response = await fetch('http://localhost:3000/banks');
    if (!response.ok) {
      throw new Error('Mạng lỗi');
    }
    const banks = await response.json();
    setBankCount(banks.length); // Corrected from users.length to banks.length
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
    setBankCount('Không thể lấy số lượng đối tác.');
  } finally {
    setLoadingBanks(false);
  }
};
fetchBankCount();

  }, []);

  return (
    <>
      <div className="m-3 title-fix">
        <b>Thống kê dữ liệu</b>
        <br />
        <br />
        <div className="container mt-20">
          <div className="row">
            <div className="col-2 stat-box">
              <i className="bi bi-badge-ad"></i>
              <p>Banner - Quảng cáo</p>
              <h5>SL: {bannerCount}</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-tag"></i>
              <p>Danh mục</p>
              <h5>SL: {categoryCount}</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-tag"></i>
              <p>D.mục Chuyên ngành</p>
              <h5>SL: {category1Count}</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-tag"></i>
              <p>D.mục Kiến trúc</p>
              <h5>SL: {category2Count}</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-tag"></i>
              <p>D.mục Đồ án - Luận văn</p>
              <h5>SL: {category3Count}</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-box-seam"></i>
              <p>Sản phẩm</p>
              <h5>SL: {productCount}</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-chat-left-text-fill me-2"></i>
              <p>Bình luận</p>
              <h5>SL: Đang cập nhật...</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-people"></i>
              <p>Người dùng</p>
              <h5>SL: {userCount}</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-cart"></i>
              <p>Đơn hàng</p>
              <h5>SL: Đang cập nhật...</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-currency-bitcoin"></i>
              <p>Doanh thu</p>
              <h5>SL: Đang cập nhật...</h5>
            </div>
            <div className="col-2 stat-box">
              <i className="bi bi-wallet-fill me-2"></i>
              <p>Đối tác</p>
              <h5>SL: {bankCount}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
