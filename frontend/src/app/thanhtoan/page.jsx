'use client'; // Đảm bảo thành phần là Client Component

import { useState } from 'react';

export default function Footer() {
  const [activeTab, setActiveTab] = useState('boxBankATM'); // Tab mặc định
  const [activeEWalletTab, setActiveEWalletTab] = useState('boxMomo'); // Tab EWallet mặc định

  const showTab = (tabId) => {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.classList.remove('is-active');
    });
    document.getElementById(tabId).classList.add('is-active');
    setActiveTab(tabId);
  };

  const showEWalletTab = (tabId) => {
    const tabs = document.querySelectorAll('#boxEWallet .tab-content');
    tabs.forEach(tab => {
      tab.classList.remove('is-active');
    });
    document.getElementById(tabId).classList.add('is-active');
    setActiveEWalletTab(tabId);
  };

  return (
    <>
      <section className="link">
        <div className="container">
          <p>
            <a href={`/`}>Trang chủ</a> / <a href={`/thanhtoan`}>Thanh toán sản phẩm</a>
          </p>
        </div>
      </section>
      <section className="head-money">
        <div className="container head-money-con">
          <div className="row">
            <div className="col-12 title-headmoney">Thanh toán sản phẩm</div>
            <div className="row">
              <p className="col-9 user-pro">
                <i className="fa-solid fa-user"></i>
                <b id="ucPopupMoney_moneyUser"> Huynh Ngoc Nhi (FPL HCM)</b>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="qr-pay">
        <div className="container qr-pay-con">
          <div className="row">
            <div className="col-12">
              <ul className="tabs-popup" role="tablist">
                <li role="presentation" className={activeTab === 'boxBankATM' ? 'is-active' : ''}>
                  <a href="#" role="tab" onClick={() => showTab('boxBankATM')}>
                    1 - CHUYỂN KHOẢN
                  </a>
                </li>
                <li role="presentation" className={activeTab === 'boxEWallet' ? 'is-active' : ''}>
                  <a href="#" role="tab" onClick={() => {
                    showTab('boxEWallet');
                    showEWalletTab('boxMomo'); // Mặc định chọn tab Momo khi vào EWallet
                  }}>
                    2 - VÍ ĐIỆN TỬ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div id="boxBankATM" className={`tab-content ${activeTab === 'boxBankATM' ? 'is-active' : ''}`}>
                <div className="nhbanking">
                  <p>
                    Bạn vui lòng CK số tiền cần thanh toán bằng cách quét mã QR ngân
                    hàng sau:
                  </p>
                  <img
                    src="../../../assets/img/qrcode-vtin.png"
                    alt="QR Code for Bank Transfer"
                  />
                  <strong>
                    Nội dung CK bắt buộc là:
                    <span className="orangekh">
                    &nbsp; Tài khoản_số tiền giao dịch
                    </span>
                  </strong>
                  <em>
                    (Trong đó <strong>Hệ thống</strong> sẽ xác
                    định tài khoản của bạn; Tiến hành kiểm tra giao dịch)
                  </em>
                  <ul className="introduce-list">
                    <li>
                      Phải nhập chính xác nội dung CK mà hệ thống đã hiển thị
                      sẵn cho bạn, để được CỘNG TIỀN TỰ ĐỘNG.
                    </li>
                    <li>
                      Trường hợp sau vài phút mà bạn không nhận được tiền vui
                      lòng gọi tới số hotline.
                    </li>
                  </ul>
                </div>
              </div>
              <div id="boxEWallet" className={`tab-content ${activeTab === 'boxEWallet' ? 'is-active' : ''}`}>
                <div className="text-center">
                  <ul className="tabs-popup ulpaycardkhoban" role="tablist">
                    <li role="presentation" className={activeEWalletTab === 'boxMomo' ? 'is-active' : ''}>
                      <a
                        href="#"
                        role="tab"
                        onClick={() => showEWalletTab('boxMomo')}
                        id="paycardkhoban"
                      >
                        <img src="../../../assets/img/vi-momo.png" alt="Momo" />
                      </a>
                    </li>
                    <li role="presentation" className={activeEWalletTab === 'boxVietelPay' ? 'is-active' : ''}>
                      <a
                        href="#"
                        role="tab"
                        onClick={() => showEWalletTab('boxVietelPay')}
                        id="paycardkhoban"
                      >
                        <img src="../../../assets/img/vi-vietel-pay.png" alt="Viettel Pay" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="boxMomo" className={`tab-content ${activeEWalletTab === 'boxMomo' ? 'is-active' : ''}`}>
                  <div className="text-center">
                    <p>
                      <b>BƯỚC 1:</b> Nếu bạn đang sử dụng ví MOMO vui lòng quét
                      mã QR sau:
                    </p>
                    <img src="../../../assets/img/qrcode momo.png" alt="QR Code for Momo" />
                    <br />
                    <br />
                    <p>
                      <b>BƯỚC 2:</b> Nhập số tiền muốn nạp
                    </p>
                    <p>
                      <b>BƯỚC 3:</b> Nhập lời nhắn cho người nhận là:
                      <strong className="orange"> 
                        &nbsp; Tài khoản_số tiền giao dịch
                      </strong>
                    </p>
                    <em>
                      (Trong đó <strong>Hệ thống</strong> sẽ xác định tài khoản của bạn; Tiến hành kiểm tra giao dịch
                      )
                    </em>
                    <ul className="introduce-list pbintroduce-list">
                      <li>
                        Phải nhập chính xác "Lời nhắn" (hoặc) "Nội dung chuyển
                        tiền" mà hệ thống đã hiển thị sẵn cho bạn, để được CỘNG
                        TIỀN TỰ ĐỘNG.
                      </li>
                      <li>
                        Trường hợp sau vài phút mà bạn không nhận được tiền vui
                        lòng gọi tới số hotline.
                      </li>
                      <li className="history-card">
                        Xem lịch sử nạp tiền của bạn
                        <a href="#" className="aorange" target="_blank">
                        &nbsp; tại đây &nbsp;
                        </a>
                        (Hoặc)
                        <a href="#" className="aorange" target="_blank"> 
                        &nbsp; Hướng dẫn nạp tiền qua ví điện tử
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="boxVietelPay" className={`tab-content ${activeEWalletTab === 'boxVietelPay' ? 'is-active' : ''}`}>
                  <div className="text-center">
                    <p>
                      <b>BƯỚC 1:</b> Nếu bạn đang sử dụng ví VIETTEL MONEY vui
                      lòng quét mã QR sau:
                    </p>
                    <img
                      src="../../../assets/img/qrcode vietel pay.png"
                      alt="QR Code for Viettel Pay"
                    />
                    <br />
                    <br />
                    <p>
                      <b>BƯỚC 2:</b> Nhập số tiền muốn nạp
                    </p>
                    <p>
                      <b>BƯỚC 3:</b> Nhập nội dung chuyển tiền là:
                      <strong className="orange">
                      &nbsp; Tài khoản_số tiền giao dịch
                      </strong>
                    </p>
                    <em>
                    (Trong đó <strong>Hệ thống</strong> sẽ xác định tài khoản của bạn; Tiến hành kiểm tra giao dịch
                    )
                    </em>
                    <ul className="introduce-list pbintroduce-list">
                      <li>
                        Phải nhập chính xác "Lời nhắn" (hoặc) "Nội dung chuyển
                        tiền" mà hệ thống đã hiển thị sẵn cho bạn, để được CỘNG
                        TIỀN TỰ ĐỘNG.
                      </li>
                      <li>
                        Trường hợp sau vài phút mà bạn không nhận được tiền vui
                        lòng gọi tới số hotline.
                      </li>
                      <li className="history-card">
                        Xem lịch sử nạp tiền của bạn
                        <a href="#" className="aorange" target="_blank">
                        &nbsp; tại đây &nbsp;
                        </a>
                        (Hoặc)
                        <a href="#" className="aorange" target="_blank">
                        &nbsp; Hướng dẫn nạp tiền qua ví điện tử
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footerpaycard">
        <div className="container modalfooterpay">
          <div className="row modalfooterpayrow">
            <div className="col-6 orange-hotline">
              <i className="fa fa-phone-square"></i> Hotline hỗ trợ:
              <span className="pop-hotline"> 0867.864.313</span>
            </div>
            <div className="col-6">
              <p className="green-hotline">
                <img src="../../../assets/img/secure.png" alt="secure" className="pop-secu" /> &nbsp;
                Bảo mật SSL mọi giao dịch đều được mã hóa an toàn!
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>
    </>
  );
}